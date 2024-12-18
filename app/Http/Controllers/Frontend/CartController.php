<?php

namespace App\Http\Controllers\Frontend;

use App\Events\WishlistEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\CartResource;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Wishlist;
use App\Utility\CartUtility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{

    public function index(Request $request)
    {
        $carts = array();
        $authUser = Auth::guard('customer')->user();
        if ($authUser != null) {
            $user_id = $authUser->id;
            $data['user_id'] = $user_id;
            $carts = CartResource::collection(Cart::where('user_id', $user_id)->with('product')->get());
        } else {
            if ($request->session()->get('temp_user_id')) {
                $temp_user_id = $request->session()->get('temp_user_id');
            } else {
                $temp_user_id = bin2hex(random_bytes(10));
                $request->session()->put('temp_user_id', $temp_user_id);
            }
            $data['temp_user_id'] = $temp_user_id;
            $carts = CartResource::collection(Cart::where('temp_user_id', $temp_user_id)->with('product')->get());
        }
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Cart/ShoppingCart', [
            'carts' => $carts
        ]);
    }

    public function add_to_cart(Request $request)
    {
        $authUser = Auth::guard('customer')->user();
        if ($authUser != null) {
            $user_id = $authUser->id;
            $data['user_id'] = $user_id;
            $carts = CartResource::collection(Cart::where('user_id', $user_id)->with('product')->get());
        } else {
            if ($request->session()->get('temp_user_id')) {
                $temp_user_id = $request->session()->get('temp_user_id');
            } else {
                $temp_user_id = bin2hex(random_bytes(10));
                $request->session()->put('temp_user_id', $temp_user_id);
            }
            $data['temp_user_id'] = $temp_user_id;
            $carts = CartResource::collection(Cart::where('temp_user_id', $temp_user_id)->with('product')->get());
        }

        $product = Product::find($request->id);
        $carts = array();
        $quantity = $request['quantity'];

        if ($quantity < $product->min_qty) {
            return array(
                'status' => 0,
                'cart_count' => count($carts),
            );
        }

        //check the color enabled or disabled for the product
        $str = CartUtility::create_cart_variant($product, $request->all());
        $product_stock = $product->stocks->where('variant', $str)->first();

        if ($authUser != null) {
            $user_id = $authUser->id;
            $cart = Cart::firstOrNew([
                'variation' => $str,
                'user_id' => $user_id,
                'product_id' => $request['id']
            ]);
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $cart = Cart::firstOrNew([
                'variation' => $str,
                'temp_user_id' => $temp_user_id,
                'product_id' => $request['id']
            ]);
        }

        if ($cart->exists && $product->digital == 0) {
            if ($product_stock->qty < $cart->quantity + $request['quantity']) {
                return array(
                    'status' => 0,
                    'cart_count' => count($carts),
                    // 'modal_view' => view('frontend.partials.outOfStockCart')->render(),
                    // 'nav_cart_view' => view('frontend.partials.cart.cart')->render(),
                );
            }
            $quantity = $cart->quantity + $request['quantity'];
        }


        $price = CartUtility::get_price($product, $product_stock, $request->quantity);
        $tax = CartUtility::tax_calculation($product, $price);

        CartUtility::save_cart_data($cart, $product, $price, $tax, $quantity);

        if ($authUser != null) {
            $user_id = $authUser->id;
            $carts = CartResource::collection(Cart::where('user_id', $user_id)->with('product')->get());
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = CartResource::collection(Cart::where('temp_user_id', $temp_user_id)->with('product')->get());
        }

        return $carts;
    }

    public function add_to_wish_list(Request $request)
    {
        if (auth('customer')->check()) {
            $wishlistQ = Wishlist::where('user_id', auth('customer')->user()->id)->where('product_id', $request->product_id)->first();
            if ($wishlistQ) {
                $wishlistQ->delete();
                $wishlist_count = Wishlist::where('user_id', auth('customer')->user()->id)->count();
                event(new WishlistEvent(auth('customer')->user()->id, $wishlist_count));
                flash_success(trans('Remove from wishlist!'));
                return response()->json(['type' => 'removed'], 200);
            } else {
                $wishlist = new Wishlist();
                $wishlist->user_id = auth('customer')->user()->id;
                $wishlist->product_id = $request->product_id;
                $wishlist->save();
                $wishlist_count = Wishlist::where('user_id', auth('customer')->user()->id)->count();
                event(new WishlistEvent(auth('customer')->user()->id, $wishlist_count));
                return response()->json(['type' => 'added'], 200);
            }
        } else {
            return response()->json(['status' => 401, 'message' => 'Check'], 401);
        }
    }

    public function update_quantity(Request $request)
    {
        $cartItem = Cart::findOrFail($request->id);

        if ($cartItem['id'] == $request->id) {
            $product = Product::find($cartItem['product_id']);
            $product_stock = $product->stocks->where('variant', $cartItem['variation'])->first();
            $quantity = $product_stock->qty;
            $price = $product_stock->price;

            //discount calculation
            $discount_applicable = false;

            if ($product->discount_start_date == null) {
                $discount_applicable = true;
            } elseif (
                strtotime(date('d-m-Y H:i:s')) >= strtotime($product->discount_start_date) &&
                strtotime(date('d-m-Y H:i:s')) <= strtotime($product->discount_end_date)
            ) {
                $discount_applicable = true;
            }

            if ($discount_applicable) {
                if ($product->discount_type == 'percent') {
                    $price -= ($price * $product->discount) / 100;
                } elseif ($product->discount_type == 'amount') {
                    $price -= $product->discount;
                }
            }

            if ($quantity >= $request->quantity) {
                if ($request->quantity >= $product->min_qty) {
                    $cartItem['quantity'] = $request->quantity;
                }
            }

            //calculation of taxes
            $tax = 0;
            if ($product->tax_type == 'percent') {
                $tax += ($price * $product->tax) / 100;
            } elseif ($product->tax_type == 'amount') {
                $tax += $product->tax;
            }

            $cartItem['tax'] = ($tax * $cartItem['quantity']);

            $cartItem['price'] = $price;
            $cartItem->save();
        }

        if (auth()->user() != null) {
            $user_id = Auth::user()->id;
            $carts = CartResource::collection(Cart::where('user_id', $user_id)->get());
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = CartResource::collection(Cart::where('temp_user_id', $temp_user_id)->get());
        }

        return $carts;
    }

    public function remove_from_cart(Request $request)
    {
        Cart::destroy($request->id);
        $authUser = auth()->user();
        if ($authUser != null) {
            $user_id = $authUser->id;
            $carts = CartResource::collection(Cart::where('user_id', $user_id)->get());
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = CartResource::collection(Cart::where('temp_user_id', $temp_user_id)->get());
        }

        return $carts;
    }
}
