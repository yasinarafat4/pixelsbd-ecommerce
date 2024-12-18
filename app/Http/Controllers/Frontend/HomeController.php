<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\BrandResource;
use App\Http\Resources\Customer\ParentCategoryResource;
use App\Http\Resources\Customer\SellerResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\Customer\CartResource;
use App\Http\Resources\Customer\CategoryAncestorsResource;
use App\Http\Resources\Customer\CategoryDescendantsResource;
use App\Http\Resources\Customer\CouponResource;
use App\Http\Resources\Customer\FlashDealResource;
use App\Http\Resources\Customer\ProductResource;
use App\Models\Address;
use App\Models\Benefit;
use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Color;
use App\Models\Contact;
use App\Models\Coupon;
use App\Models\FlashDeal;
use App\Models\OrderDetail;
use App\Models\Page;
use App\Models\Product;
use App\Models\Seller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function test()
    {
        $abcd = array();
        $admin = \App\Models\Admin::first();
        array_push($abcd, $admin);
        $seller = \App\Models\Seller::find(8);
        array_push($abcd, $seller);
        $user = \App\Models\User::find(5);
        array_push($abcd, $user);
        return $abcd;
    }

    public function home(Request $request)
    {


        $user = Auth::guard('customer')->user();
        $address_id = 0;
        $country_id = 0;
        $city_id = 0;

        // Handle authenticated customer
        /**@disregard */
        if ($user && !$user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        if ($user) {
            $address = Address::where('user_id', $user->id)->where('set_default', 1)->first();
            if ($address) {
                $address_id = $address->id;
                $country_id = $address->country_id;
                $city_id = $address->city_id;
            }
            $carts = Cart::where('user_id', $user->id)->active()->get();
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = $temp_user_id ? Cart::where('temp_user_id', $temp_user_id)->active()->get() : collect();
        }

        $shipping_info = compact('country_id', 'city_id');
        $carts->each(function ($cartItem) use ($address_id, $shipping_info) {
            $cartItem->update(['address_id' => $address_id]);
        });
        $data['carts'] = CartResource::collection($carts);
        $data['benefits'] = Benefit::where('status', 1)->orderBy('position', 'ASC')->get();


        $data['featuredFlashDealCount'] = FlashDeal::isActiveAndFeatured()->isValid()->count();
        $data['featuredCategoriesCount'] = Category::where('featured', 1)->count();
        $data['todaysDealCount'] = Product::where('todays_deal', 1)->physical()->count();
        $data['featuredProductsCount'] = Product::where('featured', 1)->physical()->count();

        $offerBannerOne = get_settings('home_banner_one');
        $data['offerBannerOneCount'] = count(array_filter($offerBannerOne, function ($item) {
            return !empty($item['image']);
        }));

        $offerBannerTwo = get_settings('home_banner_two');
        $data['offerBannerTwoCount'] = count(array_filter($offerBannerTwo, function ($item) {
            return !empty($item['image']);
        }));

        $offerBannerThree = get_settings('home_banner_three');
        $data['offerBannerThreeCount'] = count(array_filter($offerBannerThree, function ($item) {
            return !empty($item['image']);
        }));

        /**@disregard */
        $data['topSellersCount'] = count(get_best_sellers(5));

        return Inertia::render(
            'Frontend/Themes/' . theme_name() . '/Home',
            $data
        );
    }

    public function singleProduct($slug)
    {

        $product = new ProductResource(Product::where('slug', $slug)->first());
        $category = Category::find($product->category->id);
        $breadcrumbs = CategoryAncestorsResource::collection(Category::ancestorsAndSelf($category->id));


        if ($product->colors) {
            $product_colors = Color::whereIn('name', $product->colors)->get();
            /** @disregard */
            $product->colors = $product_colors;
        }

        $review_status = 0;
        if (auth('customer')->check()) {
            $orderDetailData = OrderDetail::with(['order' => function ($q) {
                $q->where('user_id', auth('customer')->user()->id);
            }])->where('product_id', $product->id)->where("delivery_status", "delivered")->first();
            $review_status = $orderDetailData ? 1 : 0;
        }

        // $reviews = ReviewResource::collection(Review::with(['product', 'user'])->latest()->paginate(10));

        return Inertia::render('Frontend/Themes/' . theme_name() . '/SingleProductPage/SingleProductPage', [
            'product' => $product,
            'breadcrumbs' => $breadcrumbs,
            'review_status' => $review_status,
        ]);
    }

    public function variant_price(Request $request)
    {

        $product = Product::find($request->id);

        $str = '';
        $quantity = 0;
        $tax = 0;
        $max_limit = 0;

        if ($request->has('color')) {
            $str = $request['color'];
        } else if ($product->colors != null) {
            $str = $product->colors[0];
        }

        if ($product->choice_options != null) {
            foreach ($product->choice_options as $key => $choice) {

                if (isset($request['attribute_' . $choice['attribute']])) {
                    $option = $request['attribute_' . $choice['attribute']];
                } else {
                    $option = $choice['values'][0];
                }

                if ($str != null) {
                    $str .= '-' . str_replace(' ', '', $option['label']);
                } else {
                    $str .= str_replace(' ', '', $option['label']);
                }
            }
        }

        $product_stock = $product->stocks->where('variant', $str)->first();
        // if ($product_stock == null) {
        //     return;
        // }

        $price = $product_stock->price;


        if ($product->wholesale_product) {
            $wholesalePrice = $product_stock->wholesalePrices->where('min_qty', '<=', $request->quantity)->where('max_qty', '>=', $request->quantity)->first();
            if ($wholesalePrice) {
                $price = $wholesalePrice->price;
            }
        }

        $quantity = $product_stock->qty;
        $max_limit = $product_stock->qty;

        if ($quantity >= 1 && $product->min_qty <= $quantity) {
            $in_stock = 1;
        } else {
            $in_stock = 0;
        }

        //Product Stock Visibility
        if ($product->stock_visibility_state == 'text') {
            if ($quantity >= 1 && $product->min_qty < $quantity) {
                $quantity = translate('In Stock');
            } else {
                $quantity = translate('Out Of Stock');
            }
        }

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

        // taxes
        if ($product->tax_type == 'percent') {
            $tax += ($price * $product->tax) / 100;
        } elseif ($product->tax_type == 'amount') {
            $tax += $product->tax;
        }

        $price += $tax;

        return array(
            'price' => single_price($price * $request->quantity),
            'quantity' => $quantity,
            'digital' => $product->digital,
            'variation' => $str,
            'max_limit' => $max_limit,
            'in_stock' => $in_stock
        );
    }

    public function categories()
    {
        // Cache::forget('categories');
        // return Cache::get('categories');
        $categories = ParentCategoryResource::collection(Category::orderBy('position', 'ASC')->get()->toTree());
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Categories/Categories', [
            'categories' => $categories
        ]);
    }

    public function track_order()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/TrackOrder/TrackOrder');
    }


    public function contact()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Contact/Contact');
    }

    public function contact_post(Request $request)
    {
        // return $request->all();

        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'message' => 'required',
        ]);
        $contact = new Contact();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->message = $request->message;
        $contact->save();
        flash_success(trans('Form submitted successfully!'));
        return back();
    }

    public function faqs()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/FAQs/FAQs');
    }


    public function about_us()
    {
        $page_data = Page::where('type', 'about_us')->first();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Page/Page', [
            'page_data' => $page_data
        ]);
    }

    public function return_policy()
    {
        $page_data = Page::where('type', 'return_policy')->first();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Page/Page', [
            'page_data' => $page_data
        ]);
    }

    public function refund_policy()
    {
        $page_data = Page::where('type', 'refund_policy')->first();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Page/Page', [
            'page_data' => $page_data
        ]);
    }

    public function privacy_policy()
    {
        $page_data = Page::where('type', 'privacy_policy')->first();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Page/Page', [
            'page_data' => $page_data
        ]);
    }

    public function terms_and_conditions()
    {
        $page_data = Page::where('type', 'terms_and_conditions')->first();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Page/Page', [
            'page_data' => $page_data
        ]);
    }


    public function flashSale()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/FlashSale/FlashSale');
    }



    public function coupon()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/Coupon/Coupon');
    }


    public function childCategories($id)
    {
        return  ParentCategoryResource::collection(Category::descendantsOf($id)->toTree());
    }


    // Search
    public function search(Request $request)
    {
        $label = 'Search Result of';
        $search = request()->input('search');
        $sort_by = request()->input('sort_by');
        $min_price = request()->input('min_price');
        $max_price = request()->input('max_price');
        $color = request()->input('color');

        $products = Product::query()
            ->when($search, function ($query, $search) {
                return $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('name', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%')
                        ->orWhere('tags', 'like', '%' . $search . '%')
                        ->orWhere('choice_options', 'like', '%' . $search . '%')
                        ->orWhereHas('category', function ($q) use ($search) {
                            $q->where('name', 'like', '%' . $search . '%');
                        })->orWhereHas('brand', function ($q) use ($search) {
                            $q->where('name', 'like', '%' . $search . '%');
                        });
                });
            })
            ->when($color, function ($query, $color) {
                return $query->where('colors', 'like', '%' . $color . '%');
            })
            ->when($min_price, function ($query, $minPrice) {
                return $query->where('unit_price', '>=', $minPrice);
            })
            ->when($max_price, function ($query, $maxPrice) {
                return $query->where('unit_price', '<=', $maxPrice);
            });

        switch ($sort_by) {
            case 'newest':
                $products->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $products->orderBy('created_at', 'asc');
                break;
            case 'price-asc':
                $products->orderBy('unit_price', 'asc');
                break;
            case 'price-desc':
                $products->orderBy('unit_price', 'desc');
                break;
            default:
                $products->orderBy('id', 'desc');
                break;
        }

        $products = ProductResource::collection(filter_products($products)->paginate(8)->appends(request()->query()));
        $minimum_price = get_product_min_unit_price();
        $maximum_price =  get_product_max_unit_price();
        $categories = categories();
        $colors = Color::get();

        return Inertia::render('Frontend/Themes/' . theme_name() . '/SearchResult/SearchResult', [
            'label' => $label,
            'products' => $products,
            'minimum_price' => $minimum_price,
            'maximum_price' => $maximum_price,
            'categories' => $categories,
            'colors' => $colors
        ]);
    }

    // Product List
    public function product_list()
    {
        $label = '';
        $type = request()->input('type');
        $sort_by = request()->input('sort_by');
        $min_price = request()->input('min_price');
        $max_price = request()->input('max_price');
        $color = request()->input('color');
        $products = Product::query();

        switch ($type) {
            case 'featured':
                $products->where('featured', '1');
                $label = "Featured Products";
                break;
            case 'new-arrival':
                $label = "New Arrival Products";
                break;
            case 'todays-deal':
                $products->where('todays_deal', '1');
                $label = "Today's Deal Products";
                break;
            case 'best-selling':
                $products->orderBy('num_of_sale', 'desc');
                $label = "Best Selling Products";
                break;
            case 'top-rated':
                $products->orderBy('rating', 'desc');
                $label = "Top Rated Products";
                break;
            case 'inhouse-product':
                $products->AddedByAdmin();
                $label = "In-house Products";
                break;
        }


        if ($min_price != null && $max_price != null) {
            $products->where('unit_price', '>=', $min_price)->where('unit_price', '<=', $max_price);
        }

        switch ($sort_by) {
            case 'newest':
                $products->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $products->orderBy('created_at', 'asc');
                break;
            case 'price-asc':
                $products->orderBy('unit_price', 'asc');
                break;
            case 'price-desc':
                $products->orderBy('unit_price', 'desc');
                break;
            default:
                $products->orderBy('id', 'desc');
                break;
        }

        if ($color != null) {
            $products->where('colors', 'like', '%' . $color . '%');
        }

        $products = ProductResource::collection(filter_products($products)->paginate(8)->appends(request()->query()));
        $minimum_price = get_product_min_unit_price(null, $type);
        $maximum_price =  get_product_max_unit_price(null, $type);
        $categories = categories();
        $colors = Color::get();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/ProductList/ProductList', [
            'label' => $label,
            'products' => $products,
            'minimum_price' => $minimum_price,
            'maximum_price' => $maximum_price,
            'categories' => $categories,
            'colors' => $colors,
        ]);
    }

    // Catgeory wise product
    public function catgeory_wise_product(Request $request, $slug)
    {
        $category = Category::where('slug', $slug)->first();
        $category_ids = $category->descendants()->pluck('id');
        $category_ids[] = $category->getKey();
        $sort_by = request()->input('sort_by');
        $min_price = request()->input('min_price');
        $max_price = request()->input('max_price');

        $color = request()->input('color');
        $products = Product::query();
        $products = $products->whereIn('category_id', $category_ids);



        if ($min_price != null && $max_price != null) {
            $products->where('unit_price', '>=', $min_price)->where('unit_price', '<=', $max_price);
        }

        switch ($sort_by) {
            case 'newest':
                $products->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $products->orderBy('created_at', 'asc');
                break;
            case 'price-asc':
                $products->orderBy('unit_price', 'asc');
                break;
            case 'price-desc':
                $products->orderBy('unit_price', 'desc');
                break;
            default:
                $products->orderBy('id', 'desc');
                break;
        }

        if ($color != null) {
            $products->where('colors', 'like', '%' . $color . '%');
        }

        $products = ProductResource::collection(filter_products($products)->paginate(12)->appends(request()->query()));
        $colors = Color::get();
        $minimum_price = get_product_min_unit_price(null, null, $category_ids);
        $maximum_price = get_product_max_unit_price(null, null, $category_ids);
        $breadcrumbs = CategoryAncestorsResource::collection(Category::ancestorsAndSelf($category->id));
        $childcategories = new CategoryDescendantsResource(Category::where('id', $category->id)->with('childes')->first());
        return Inertia::render('Frontend/Themes/' . theme_name() . '/CategoryWiseProductPage/CategoryWiseProductPage', [
            'colors' => $colors,
            'products' => $products,
            'breadcrumbs' => $breadcrumbs,
            'minimum_price' => $minimum_price,
            'maximum_price' => $maximum_price,
            'childcategories' => $childcategories,
        ]);
    }

    // Flash deal products
    public function flash_deal_details(Request $request, $slug)
    {
        // return $request->all();
        // $flash_deal = FlashDealResource::collection(FlashDeal::isActiveAndFeatured()->with(['flash_deal_products', 'flash_deal_products.product'])->get());
        $flash_deal = FlashDeal::where('slug', $slug)->first();
        $label = $flash_deal->title;
        $slug = $flash_deal->slug;
        $sort_by = request()->input('sort_by');
        $min_price = request()->input('min_price');
        $max_price = request()->input('max_price');

        $color = request()->input('color');
        $products = Product::query();

        $products = $products->whereHas('flash_deal_product', function ($q) use ($flash_deal) {
            $q->where('flash_deal_id', $flash_deal->id);
        });

        if ($min_price != null && $max_price != null) {
            $products->where('unit_price', '>=', $min_price)->where('unit_price', '<=', $max_price);
        }

        switch ($sort_by) {
            case 'newest':
                $products->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $products->orderBy('created_at', 'asc');
                break;
            case 'price-asc':
                $products->orderBy('unit_price', 'asc');
                break;
            case 'price-desc':
                $products->orderBy('unit_price', 'desc');
                break;
            default:
                $products->orderBy('id', 'desc');
                break;
        }

        if ($color != null) {
            $products->where('colors', 'like', '%' . $color . '%');
        }

        $products = ProductResource::collection(filter_products($products)->paginate(12)->appends(request()->query()));
        $minimum_price = get_product_min_unit_price();
        $maximum_price =  get_product_max_unit_price();
        $categories = categories();
        $colors = Color::get();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/FlashDealDetailsPage/FlashDealDetailsPage', [
            'label' => $label,
            'slug' => $slug,
            'products' => $products,
            'minimum_price' => $minimum_price,
            'maximum_price' => $maximum_price,
            'categories' => $categories,
            'colors' => $colors
        ]);
    }
}
