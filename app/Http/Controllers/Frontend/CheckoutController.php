<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\CartResource;
use App\Http\Resources\Customer\CombinedOrderResource;
use App\Mail\GuestAccountOpeningMailManager;
use App\Models\Address;
use App\Models\Cart;
use App\Models\CombinedOrder;
use App\Models\Country;
use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\User;
use App\Utility\NotificationUtility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        if (get_settings('guest_checkout') == 0 && Auth::guard('customer')->user() == null) {
            return redirect()->route('login');
        }

        if (Auth::guard('customer')->check() && !$request->user('customer')->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        $country_id = 0;
        $city_id = 0;
        $address_id = 0;
        $shipping_info = array();

        if (Auth::guard('customer')->check()) {
            $user_id = Auth::guard('customer')->user()->id;
            $carts = Cart::where('user_id', $user_id)->active()->get();
            $addresses = Address::where('user_id', $user_id)->get();
            if (count($addresses)) {
                $address = $addresses->toQuery()->first();
                $address_id = $address->id;
                $country_id = $address->country_id;
                $city_id = $address->city_id;
                $default_address = $addresses->toQuery()->where('set_default', 1)->first();
                if ($default_address != null) {
                    $address_id = $default_address->id;
                    $country_id = $default_address->country_id;
                    $city_id = $default_address->city_id;
                }
            }
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = ($temp_user_id != null) ? Cart::where('temp_user_id', $temp_user_id)->active()->get() : [];
        }

        $shipping_info['country_id'] = $country_id;
        $shipping_info['city_id'] = $city_id;
        $total = 0;
        $tax = 0;
        $shipping = 0;
        $subtotal = 0;
        $default_shipping_type = 'home_delivery';
        $digital = 0;
        $cod_on = 1;
        $cod = false;

        if ($carts && count($carts) > 0) {
            $carts->toQuery()->update(['address_id' => $address_id]);
            $carts = $carts->fresh();

            foreach ($carts as $key => $cartItem) {
                $product = Product::find($cartItem['product_id']);
                $tax += cart_product_tax($cartItem, $product, false) * $cartItem['quantity'];
                $subtotal += cart_product_price($cartItem, $product, false, false) * $cartItem['quantity'];
                $cartItem['tax'] = cart_product_tax($cartItem, $product, false) * $cartItem['quantity'];
                $cartItem['shipping_cost'] = getShippingCost($carts, $key, $shipping_info);
                $cartItem['shipping_type'] = $default_shipping_type;
                $shipping += $cartItem['shipping_cost'];
                $cartItem->save();
                if ($product['digital'] == 1) {
                    $digital = 1;
                }
                if ($product['cash_on_delivery'] == 0) {
                    $cod_on = 0;
                }
            }
            $total = $subtotal + $tax + $shipping;
            $carts = CartResource::collection($carts->fresh());
            $countries = Country::active()->get();

            $payment_methods =  PaymentMethod::active()->where(function ($query) {
                $query->whereNull('addon_identifier')
                    ->orWhere(function ($q) {
                        if (addon_is_activated('paytm')) {
                            $q->where('addon_identifier', 'paytm');
                        }
                    })
                    ->orWhere(function ($q) {
                        if (addon_is_activated('african_pg')) {
                            $q->where('addon_identifier', 'african_pg');
                        }
                    });
            })->get();

            if (get_settings('cash_payment') == 1 && $cod_on == 1 && $digital == 0) {
                $cod = true;
            }

            return Inertia::render('Frontend/Themes/' . theme_name() . '/Checkout/Checkout', [
                'carts' => $carts,
                'address_id' => $address_id,
                'countries' => $countries,
                'payment_methods' => $payment_methods,
                'cod' => $cod,
            ]);
        }
        return back()->with('error', trans('Please Select cart items to Proceed'));
    }

    //check the selected payment gateway and redirect to that controller accordingly
    public function checkout(Request $request)
    {
        // if guest checkout, create user
        if (Auth::guard('customer')->user() == null) {
            $guest_user = $this->createUser($request->except('_token', 'payment_option'));
            if (gettype($guest_user) == "object") {
                $errors = $guest_user;
                return back()->with('error', $errors);
            }

            if ($guest_user == 0) {
                return back()->with('error', 'Please try again later.');
            }
        }

        if ($request->payment_option == null) {
            return back()->with('error', 'There is no payment option is selected.');
        }
        $user = Auth::guard('customer')->user();
        // return $user->addresses;
        if (count($user->addresses) === 0) {
            return back()->with('error', 'Your address is mandatory');
        }

        $carts = Cart::where('user_id', $user->id)->active()->get();

        (new OrderController)->store($request);


        if (count($carts) > 0) {
            $carts->toQuery()->delete();
        }

        $request->session()->put('payment_type', 'cart_payment');

        $data['combined_order_id'] = $request->session()->get('combined_order_id');
        $data['payment_method'] = $request->payment_option;
        $request->session()->put('payment_data', $data);
        if ($request->session()->get('combined_order_id') != null) {
            // If block for Online payment, wallet and cash on delivery. Else block for Offline payment
            $decorator = 'App\\Http\\Controllers\\Payment\\' . str_replace(' ', '', ucwords(str_replace('_', ' ', $request->payment_option))) . "Controller";
            if (class_exists($decorator)) {
                return (new $decorator)->pay($request);
            } else {
                return back()->with('error', 'Something Wrong!!!!!!!!!!!!!');
            }
        }
    }

    //redirects to this method after a successfull checkout
    public function checkout_done($combined_order_id, $payment)
    {
        $combined_order = CombinedOrder::findOrFail($combined_order_id);

        foreach ($combined_order->orders as $key => $order) {
            $order = Order::findOrFail($order->id);
            $order->payment_status = 'paid';
            $order->payment_details = $payment;
            $order->save();

            calculateCommissionAffilationClubPoint($order);
        }
        Session::put('combined_order_id', $combined_order_id);
        return redirect()->route('order_confirmed', base64_encode($combined_order_id));
    }

    public function order_confirmed($id)
    {
        $combined_order_id = base64_decode($id) ?? Session::get('combined_order_id');
        $combined_order = new CombinedOrderResource(CombinedOrder::findOrFail($combined_order_id));

        Session::forget('combined_order_id');

        foreach ($combined_order->orders as $order) {
            if ($order->notified == 0) {
                NotificationUtility::sendOrderPlacedNotification($order);
                $order->notified = 1;
                $order->save();
            }
        }
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Checkout/OrderConfirmed', [
            'combined_order' => $combined_order
        ]);
    }

    public function createUser($guest_shipping_info)
    {
        $validator = Validator::make($guest_shipping_info, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'phone' => 'required',
            'address' => 'required|max:255',
            'country_id' => 'required|Integer',
            'state_id' => 'required|Integer',
            'city_id' => 'required|Integer'
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $success = 1;
        $password = substr(hash('sha512', rand()), 0, 8);
        $isEmailVerificationEnabled = get_settings('email_verification');

        // User Create
        $user = new User();
        $user->name = $guest_shipping_info['name'];
        $user->email = $guest_shipping_info['email'];
        $user->phone = addon_is_activated('otp_system') ? '+' . $guest_shipping_info['phone'] : null;
        $user->password = Hash::make($password);
        $user->email_verified_at = $isEmailVerificationEnabled != 1 ? date('Y-m-d H:m:s') : null;
        $user->save();

        // Account Opening and verification(if activated) eamil send
        $array['email'] = $user->email;
        $array['password'] = $password;
        $array['subject'] = trans('Account Opening Email');
        $array['from'] = env('MAIL_FROM_ADDRESS');

        try {
            Mail::to($user->email)->queue(new GuestAccountOpeningMailManager($array));
            if ($isEmailVerificationEnabled == 1) {
                $user->sendEmailVerificationNotification();
            }
        } catch (\Exception $e) {
            $success = 0;
            $user->delete();
        }

        if ($success == 0) {
            return $success;
        }

        // User Address Create
        $address = new Address;
        $address->user_id       = $user->id;
        $address->address       = $guest_shipping_info['address'];
        $address->country_id    = $guest_shipping_info['country_id'];
        $address->state_id      = $guest_shipping_info['state_id'];
        $address->city_id       = $guest_shipping_info['city_id'];
        $address->zip_code      = $guest_shipping_info['zip_code'];
        $address->phone         = $guest_shipping_info['phone'];
        $address->longitude     = isset($guest_shipping_info['longitude']) ? $guest_shipping_info['longitude'] : null;
        $address->latitude      = isset($guest_shipping_info['latitude']) ? $guest_shipping_info['latitude'] : null;
        $address->save();

        $carts = Cart::where('temp_user_id', session('temp_user_id'))->get();
        $carts->toQuery()->update([
            'user_id' => $user->id,
            'temp_user_id' => null
        ]);
        $carts->toQuery()->active()->update([
            'address_id' => $address->id
        ]);

        Auth::guard('customer')->login($user);

        Session::forget('temp_user_id');
        Session::forget('guest_shipping_info');

        return $success;
    }

    public function updateDeliveryAddress(Request $request)
    {
        $default_shipping_type = 'home_delivery';
        $user = Auth::guard('customer')->user();
        $shipping_info = array();

        $carts = $user != null ?
            Cart::where('user_id', $user->id)->active()->get() :
            Cart::where('temp_user_id', $request->session()->get('temp_user_id'))->active()->get();

        $carts->toQuery()->update(['address_id' => $request->address_id]);

        $country_id = $user != null ?
            Address::findOrFail($request->address_id)->country_id :
            $request->country_id;
        $city_id = $user != null ?
            Address::findOrFail($request->address_id)->city_id :
            $request->city_id;
        $shipping_info['country_id'] = $country_id;
        $shipping_info['city_id'] = $city_id;


        $carts = $carts->fresh();

        foreach ($carts as $key => $cartItem) {

            $cartItem['shipping_cost'] = getShippingCost($carts, $key, $shipping_info);

            $cartItem['address_id'] = $user != null ? $request->address_id : 0;
            $cartItem['shipping_type'] = $default_shipping_type;
            $cartItem->save();
        }

        $carts = CartResource::collection($carts->fresh());

        return $carts;
    }


    public function apply_coupon_code(Request $request)
    {
        $user       = auth('customer')->user();
        $temp_user  = Session::has('temp_user_id') ? Session::get('temp_user_id') : null;
        $coupon     = Coupon::where('code', $request->code)->first();
        $response_message = array();

        // if the Coupon type is Welcome base, check the user has this coupon or not
        $canUseCoupon = true;
        if ($coupon && $coupon->type == 'welcome_base') {
            if ($user != null) {
                // $userCoupon = user assigned coupon
                $userCoupon = $user->userCoupon;
                if (!$userCoupon) {
                    $canUseCoupon = false;
                }
            } else {
                $canUseCoupon = false;
            }
        }

        if ($coupon != null && $canUseCoupon) {

            //  Coupon expiry Check
            if ($coupon->type != 'welcome_base') {
                $validationDateCheckCondition  = strtotime(date('d-m-Y')) >= strtotime($coupon->start_date) && strtotime(date('d-m-Y')) <= strtotime($coupon->end_date);
            } else {
                $validationDateCheckCondition = false;
                if ($userCoupon) {
                    $validationDateCheckCondition  = strtotime($userCoupon->expiry_date) >= strtotime(date('d-m-Y H:i:s'));
                }
            }
            if ($validationDateCheckCondition) {
                if (($user == null && Session::has('temp_user_id')) || CouponUsage::where('user_id', $user->id)->where('coupon_id', $coupon->id)->first() == null) {
                    $coupon_details = json_decode($coupon->details);

                    $user_carts = $user != null ?
                        Cart::where('user_id', $user->id)->where('owner_id', $coupon->user_id)->active()->get() :
                        Cart::where('owner_id', $coupon->user_id)->where('temp_user_id', $temp_user)->active()->get();

                    $coupon_discount = 0;

                    if ($coupon->type == 'cart_base' || $coupon->type == 'welcome_base') {
                        $subtotal = 0;
                        $tax = 0;
                        $shipping = 0;
                        foreach ($user_carts as $key => $cartItem) {
                            $product = Product::find($cartItem['product_id']);
                            $subtotal += cart_product_price($cartItem, $product, false, false) * $cartItem['quantity'];
                            $tax += cart_product_tax($cartItem, $product, false) * $cartItem['quantity'];
                            $shipping += $cartItem['shipping_cost'];
                        }
                        $sum = $subtotal + $tax + $shipping;
                        if ($coupon->type == 'cart_base' && $sum >= $coupon_details->minimum_buy) {
                            if ($coupon->discount_type == 'percent') {
                                $coupon_discount = ($sum * $coupon->discount) / 100;
                                if ($coupon_discount > $coupon_details->maximum_discount) {
                                    $coupon_discount = $coupon_details->maximum_discount;
                                }
                            } elseif ($coupon->discount_type == 'amount') {
                                $coupon_discount = $coupon->discount;
                            }
                        } elseif ($coupon->type == 'welcome_base' && $sum >= $userCoupon->minimum_buy) {
                            $coupon_discount  = $userCoupon->discount_type == 'percent' ?  (($sum * $userCoupon->discount) / 100) : $userCoupon->discount;
                        }
                    } elseif ($coupon->type == 'product_base') {
                        foreach ($user_carts as $key => $cartItem) {
                            $product = Product::find($cartItem['product_id']);
                            foreach ($coupon_details as $key => $coupon_detail) {
                                if ($coupon_detail->product_id == $cartItem['product_id']) {
                                    if ($coupon->discount_type == 'percent') {
                                        $coupon_discount += (cart_product_price($cartItem, $product, false, false) * $coupon->discount / 100) * $cartItem['quantity'];
                                    } elseif ($coupon->discount_type == 'amount') {
                                        $coupon_discount += $coupon->discount * $cartItem['quantity'];
                                    }
                                }
                            }
                        }
                    }

                    if ($coupon_discount > 0) {

                        $user_carts->toQuery()->update(
                            [
                                'discount' => $coupon_discount / count($user_carts),
                                'coupon_code' => $request->code,
                                'coupon_applied' => 1
                            ]
                        );

                        $response_message['response'] = 'success';
                        $response_message['message'] = trans('Coupon has been applied');
                    } else {
                        $response_message['response'] = 'warning';
                        $response_message['message'] = trans('This coupon is not applicable to your cart products!');
                    }
                } else {
                    $response_message['response'] = 'warning';
                    $response_message['message'] = trans('You already used this coupon!');
                }
            } else {
                $response_message['response'] = 'warning';
                $response_message['message'] = trans('Coupon expired!');
            }
        } else {
            $response_message['response'] = 'error';
            $response_message['message'] = trans('Invalid coupon!');
        }

        if ($user != null) {
            $carts = CartResource::collection(Cart::where('user_id', $user->id)->with('product')->active()->get());
        } else {
            $carts = ($temp_user != null) ? CartResource::collection(Cart::where('temp_user_id', $temp_user)->with('product')->active()->get()) : [];
        }
        // $shipping_info = Address::where('id', $carts[0]['address_id'])->first();

        return response()->json(array('response_message' => $response_message, 'carts' => $carts));
    }

    public function remove_coupon_code(Request $request)
    {
        $user       = auth('customer')->user();
        $temp_user  = Session::has('temp_user_id') ? Session::get('temp_user_id') : null;
        $carts = $user != null ? Cart::where('user_id', $user->id) : Cart::where('temp_user_id', $temp_user);
        $carts->update(
            [
                'discount' => 0.00,
                'coupon_code' => '',
                'coupon_applied' => 0
            ]
        );

        $coupon = Coupon::where('code', $request->code)->first();
        $carts = CartResource::collection($carts->active()->get());
        return $carts;
    }

    public function orderRePayment(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        if ($order != null) {
            $request->session()->put('payment_type', 'order_re_payment');
            $data['order_id'] = $order->id;
            $data['payment_method'] = $request->payment_option;
            $request->session()->put('payment_data', $data);

            $decorator = 'App\\Http\\Controllers\\Payment\\' . str_replace(' ', '', ucwords(str_replace('_', ' ', $request->payment_option))) . "Controller";
            if (class_exists($decorator)) {
                return (new $decorator)->pay($request);
            } else {
                return back()->with('error', 'Something Wrong!!!!!!!!!!!!!');
            }
        }
        flash_error(trans('Order Not Found'));
        return back();
    }

    public function orderRePaymentDone($payment_data, $payment_details = null)
    {
        $order = Order::findOrFail($payment_data['order_id']);
        $order->payment_status = 'paid';
        $order->payment_details = $payment_details;
        $order->payment_type = $payment_data['payment_method'];
        $order->save();
        calculateCommissionAffilationClubPoint($order);

        if ($order->notified == 0) {
            NotificationUtility::sendOrderPlacedNotification($order);
            $order->notified = 1;
            $order->save();
        }

        Session::forget('payment_type');
        Session::forget('order_id');

        flash_success(trans('Payment done.'));
        return redirect()->route('purchase_history_details', base64_encode($order->id));
    }
}
