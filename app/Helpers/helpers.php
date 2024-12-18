<?php

use App\Http\Controllers\Admin\CommissionController;
use App\Http\Resources\Customer\ParentCategoryResource;
use App\Models\Addon;
use App\Models\Category;
use App\Models\City;
use App\Models\Currency;
use App\Models\DynamicPopup;
use App\Models\FlashDeal;
use App\Models\FlashDealProduct;
use App\Models\Language;
use App\Models\NotificationType;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\Seller;
use App\Models\Shop;
use App\Models\Wishlist;
use Laraeast\LaravelSettings\Facades\Settings;

if (!function_exists("active_guard")) {
    function active_guard()
    {
        foreach (array_keys(config('auth.guards')) as $guard) {
            if (auth()->guard($guard)->check()) return $guard;
        }
        return null;
    }
}

if (!function_exists("get_settings")) {
    function get_settings($key = null, $default = null)
    {
        // return Cache::remember('get_settings', 600, function () use ($key, $default) {
        $locale = session()->get('locale') ?? 'en';
        return Settings::get($key, $default);
        // });
    }
}

if (!function_exists("set_settings")) {
    function set_settings($key, $value)
    {
        return Settings::set($key, $value);
    }
}

if (!function_exists('envWrite')) {
    function envWrite($key, $value)
    {
        $editor = DotenvEditor::load();
        if (is_bool($value)) {
            $value = $value ? 'true' : 'false';
        } else {
            $value = trim($value);
        }
        $editor->setKey($key, $value);

        if ($editor->hasChanged()) {
            $editor->save();
        }
    }
}

if (!function_exists('business_settings')) {
    function business_settings()
    {

        return Cache::remember('business_settings', 86400, function () {
            $business_settings = [];
            $settings = DB::table('settings')->pluck('key');
            foreach ($settings as $type) {
                $business_settings[$type] = get_settings($type);
            }
            return $business_settings;
        });
    }
}

if (!function_exists('categories')) {
    function categories()
    {
        return Cache::remember('categories', 600, function () {
            return ParentCategoryResource::collection(Category::orderBy('position', 'ASC')->get()->toTree());
        });
    }
}

if (!function_exists('wishlist')) {
    function wishlist()
    {
        return Wishlist::get();
    }
}

if (!function_exists('dynamic_popups')) {
    function dynamic_popups()
    {
        return Cache::remember('dynamic_popups', 86400, function () {
            return DynamicPopup::active()->get();
        });
    }
}

// Addon Activation Check
if (!function_exists('addon_is_activated')) {
    function addon_is_activated($identifier, $default = null)
    {
        $addons = Addon::all();
        $activation = $addons->where('unique_identifier', $identifier)->where('activated', 1)->first();
        return $activation == null ? false : true;
    }
}


// Get notification type
if (!function_exists('get_notification_type')) {
    function get_notification_type($value, $columnNamre)
    {
        $notificationType = NotificationType::query();
        $notificationType = $columnNamre == 'id' ? $notificationType->where('id', $value) : $notificationType->where('type', $value);
        return $notificationType->first();
    }
}

// Get notification type
if (!function_exists('get_notification_content')) {
    function get_notification_content($notufication_id, $notification_type_id, $type, $data)
    {
        $notificationType = get_notification_type($notification_type_id, 'id');
        $notifyContent = $notificationType?->text;
        $user_type = auth()->check() ? auth()->user()->user_type : null;
        if ($type == 'App\Notifications\OrderNotification') {
            $orderCode  = $data['order_code'];
            $route = $user_type == 'admin' ? route('admin.notification.read-and-redirect', base64_encode($notufication_id)) : ($user_type == 'seller' ? route('seller.notification.read-and-redirect', base64_encode($notufication_id)) : route('notification.read-and-redirect', base64_encode($notufication_id)));
            $orderCode = "<a style='color:red' href='" . $route . "'>" . $orderCode . "</a>";
            $notifyContent = str_replace('[[order_code]]', $orderCode, $notifyContent);
        } elseif ($type == 'App\Notifications\ShopVerificationNotification') {
            if ($data['status'] == 'submitted') {
                $route = $user_type == 'admin' ? route('admin.notification.read-and-redirect', base64_encode($notufication_id)) : ($user_type == 'seller' ? route('seller.notification.read-and-redirect', base64_encode($notufication_id)) : route('notification.read-and-redirect', base64_encode($notufication_id)));
                $shopName = "<a style='color:red' href='" . $route . "'>" . $data['name'] . "</a>";
                $notifyContent = str_replace('[[shop_name]]', $shopName, $notifyContent);
            }
        } elseif ($type == 'App\Notifications\ShopProductNotification') {
            $route = $user_type == 'admin' ? route('admin.notification.read-and-redirect', base64_encode($notufication_id)) : ($user_type == 'seller' ? route('seller.notification.read-and-redirect', base64_encode($notufication_id)) : route('notification.read-and-redirect', base64_encode($notufication_id)));
            $productName = "<a style='color:red' href='" . $route . "'>" . $data['name'] . "</a>";
            $notifyContent = str_replace('[[product_name]]', $productName, $notifyContent);
        } elseif ($type == 'App\Notifications\PayoutNotification') {
            $amount = single_price($data['payment_amount']);
            $route = $user_type == 'admin' ? route('admin.notification.read-and-redirect', base64_encode($notufication_id)) : ($user_type == 'seller' ? route('seller.notification.read-and-redirect', base64_encode($notufication_id)) : route('notification.read-and-redirect', base64_encode($notufication_id)));
            $shopName = "<a style='color:red' href='" . $route . "'>" . $data['name'] . "</a>";
            $notifyContent = str_replace('[[shop_name]]', $shopName, $notifyContent);
            $notifyContent = str_replace('[[amount]]', $amount, $notifyContent);
        }
        return  $notifyContent;
    }
}

// flash success
if (! function_exists('flash_success')) {
    function flash_success($message)
    {
        session()->flash('success', $message);
    }
}

// flash error
if (! function_exists('flash_error')) {
    function flash_error($message)
    {
        session()->flash('error', $message);
    }
}

// get minimum unit price of products
if (!function_exists('get_product_min_unit_price')) {
    function get_product_min_unit_price($user_id = null, $type = null, $category_ids = null,  $brand_id = null)
    {
        $product_query = Product::query();
        if ($user_id) {
            $product_query = $product_query->where('added_by', 'seller')->where('user_id', $user_id);
        }
        if ($type == 'featured') {
            $product_query = $product_query->where('featured', 1);
        }
        if ($type == 'todays-deal') {
            $product_query = $product_query->where('todays_deal', 1);
        }
        if ($category_ids) {
            $product_query = $product_query->whereIn('category_id', $category_ids);
        }
        if ($brand_id) {
            $product_query = $product_query->where('brand_id', $brand_id);
        }
        return $product_query->isApprovedPublished()->min('unit_price');
    }
}

// get maximum unit price of products
if (!function_exists('get_product_max_unit_price')) {
    function get_product_max_unit_price($user_id = null, $type = null, $category_ids = null,  $brand_id = null)
    {
        $product_query = Product::query();
        if ($user_id) {
            $product_query = $product_query->where('added_by', 'seller')->where('user_id', $user_id);
        }
        if ($type == 'featured') {
            $product_query = $product_query->where('featured', 1);
        }
        if ($type == 'todays-deal') {
            $product_query = $product_query->where('todays_deal', 1);
        }
        if ($category_ids) {
            $product_query = $product_query->whereIn('category_id', $category_ids);
        }
        if ($brand_id) {
            $product_query = $product_query->where('brand_id', $brand_id);
        }
        return $product_query->isApprovedPublished()->max('unit_price');
    }
}

if (!function_exists('product_restock')) {
    function product_restock($orderDetail)
    {
        $variant = $orderDetail->variation;
        if ($orderDetail->variation == null) {
            $variant = '';
        }

        $product_stock = ProductStock::where('product_id', $orderDetail->product_id)
            ->where('variant', $variant)
            ->first();

        if ($product_stock != null && (!in_array($orderDetail->delivery_status, ['delivered', 'cancelled']))) {
            $product = $product_stock->product;
            $product->num_of_sale -= $orderDetail->quantity;
            $product->save();

            $product_stock->qty += $orderDetail->quantity;
            $product_stock->save();
        }
    }
}

//Commission Calculation
if (!function_exists('calculateCommissionAffilationClubPoint')) {
    function calculateCommissionAffilationClubPoint($order)
    {
        (new CommissionController)->calculateCommission($order);
        $order->commission_calculated = 1;
        $order->save();
    }
}

//filter products based on vendor activation system
if (!function_exists('filter_products')) {
    function filter_products($products)
    {

        $products = $products->isApprovedPublished();

        $verified_sellers = verified_sellers_id();
        if (get_settings('vendor_system') == 1) {
            return $products->where(function ($p) use ($verified_sellers) {
                $p->where('added_by', 'admin')->orWhere(function ($q) use ($verified_sellers) {
                    $q->whereIn('user_id', $verified_sellers);
                });
            });
        } else {
            return $products->where('added_by', 'admin');
        }
    }
}

if (!function_exists('verified_sellers_id')) {
    function verified_sellers_id()
    {
        return Cache::remember('verified_sellers_id', 86400, function () {
            return Shop::where('verification_status', 1)->pluck('seller_id')->toArray();
        });
    }
}

if (!function_exists('get_featured_categories')) {
    function get_featured_categories()
    {

        return Category::where('featured', 1)->get();
    }
}

if (!function_exists('get_featured_products')) {
    function get_featured_products()
    {
        return Cache::remember('get_featured_products', 600, function () {
            $product_query = Product::query();
            return filter_products($product_query->where('featured', '1'))->latest()->limit(12)->get();
        });
    }
}

if (!function_exists('get_best_selling_products')) {
    function get_best_selling_products($limit = null, $user_id = null)
    {
        return Cache::remember('get_best_selling_products', 600, function () use ($limit, $user_id) {
            $product_query = Product::query();
            if ($user_id) {
                $product_query = $product_query->where('user_id', $user_id);
            }
            return filter_products($product_query->orderBy('num_of_sale', 'desc'))->limit($limit)->get();
        });
    }
}

if (!function_exists('get_top_rated_products')) {
    function get_top_rated_products($limit = null, $user_id = null)
    {

        $product_query = Product::query();
        if ($user_id) {
            $product_query = $product_query->where('user_id', $user_id);
        }
        return filter_products($product_query->orderBy('rating', 'desc'))->limit($limit)->get();
    }
}

// Get Seller Products
if (!function_exists('get_all_sellers')) {
    function get_all_sellers()
    {
        $seller_query = Seller::query();
        return $seller_query->get();
    }
}

// Get Seller Products
if (!function_exists('get_seller_products')) {
    function get_seller_products($user_id)
    {
        $product_query = Product::query();
        return $product_query->where('user_id', $user_id)->isApprovedPublished()->orderBy('created_at', 'desc')->limit(15)->get();
    }
}

//Get best seller
if (!function_exists('get_best_sellers')) {
    function get_best_sellers($limit = '')
    {
        return Cache::remember('best_selers', 86400, function () use ($limit) {
            return Shop::where('verification_status', 1)->orderBy('num_of_sale', 'desc')->take($limit)->get();
        });
    }
}

// Get Seller Best Selling Products
if (!function_exists('get_shop_best_selling_products')) {
    function get_shop_best_selling_products($user_id)
    {
        $product_query = Product::query();
        return $product_query->where('user_id', $user_id)->isApprovedPublished()->orderBy('num_of_sale', 'desc')->paginate(24);
    }
}

if (!function_exists('get_featured_flash_deal')) {
    function get_featured_flash_deal()
    {
        $flash_deal_query = FlashDeal::query();
        $featured_flash_deal = $flash_deal_query->isActiveAndFeatured()
            ->where('start_date', '<=', strtotime(date('Y-m-d H:i:s')))
            ->where('end_date', '>=', strtotime(date('Y-m-d H:i:s')))
            ->first();

        return $featured_flash_deal;
    }
}

if (!function_exists('get_flash_deal_products')) {
    function get_flash_deal_products($flash_deal_id)
    {
        $flash_deal_product_query = FlashDealProduct::query();
        $flash_deal_product_query->where('flash_deal_id', $flash_deal_id);
        $flash_deal_products = $flash_deal_product_query->with('product')->orderBy('id', 'desc')->limit(10)->get();

        return $flash_deal_products;
    }
}

if (!function_exists('get_active_flash_deals')) {
    function get_active_flash_deals()
    {
        $activated_flash_deal_query = FlashDeal::query();
        $activated_flash_deal_query = $activated_flash_deal_query->where("status", 1);

        return $activated_flash_deal_query->get();
    }
}


if (!function_exists('get_system_default_currency')) {
    function get_system_default_currency()
    {
        return Cache::remember('get_system_default_currency', 86400, function () {
            return Currency::find(get_settings('default_currency', 1));
        });
    }
}

//Shows Price on page based on low to high
if (!function_exists('home_price')) {
    function home_price($product, $formatted = true)
    {
        $lowest_price = $product->unit_price;
        $highest_price = $product->unit_price;

        if ($product->variant_product) {
            foreach ($product->stocks as $key => $stock) {
                if ($lowest_price > $stock->price) {
                    $lowest_price = $stock->price;
                }
                if ($highest_price < $stock->price) {
                    $highest_price = $stock->price;
                }
            }
        }

        if ($product->tax_type == 'percent') {
            $lowest_price += ($lowest_price * $product->tax) / 100;
            $highest_price += ($highest_price * $product->tax) / 100;
        } elseif ($product->tax_type == 'amount') {
            $lowest_price += $product->tax;
            $highest_price += $product->tax;
        }

        if ($formatted) {
            if ($lowest_price == $highest_price) {
                return format_price_with_symbol(convert_price($lowest_price));
            } else {
                return format_price_with_symbol(convert_price($lowest_price)) . ' - ' . format_price_with_symbol(convert_price($highest_price));
            }
        } else {
            return $lowest_price . ' - ' . $highest_price;
        }
    }
}

//Shows Price on page based on low to high with discount
if (!function_exists('home_discounted_price')) {
    function home_discounted_price($product, $formatted = true)
    {
        $lowest_price = $product->unit_price;
        $highest_price = $product->unit_price;

        if ($product->variant_product) {
            foreach ($product->stocks as $key => $stock) {
                if ($lowest_price > $stock->price) {
                    $lowest_price = $stock->price;
                }
                if ($highest_price < $stock->price) {
                    $highest_price = $stock->price;
                }
            }
        }

        $discount_applicable = false;

        if ($product->discount_start_date == null) {
            $discount_applicable = true;
        } elseif (
            strtotime(date('d-m-Y')) >= strtotime($product->discount_start_date) &&
            strtotime(date('d-m-Y')) <= strtotime($product->discount_end_date)
        ) {
            $discount_applicable = true;
        }

        if ($discount_applicable) {
            if ($product->discount_type == 'percent') {
                $lowest_price -= ($lowest_price * $product->discount) / 100;
                $highest_price -= ($highest_price * $product->discount) / 100;
            } elseif ($product->discount_type == 'amount') {
                $lowest_price -= $product->discount;
                $highest_price -= $product->discount;
            }
        }

        if ($product->tax_type == 'percent') {
            $lowest_price += ($lowest_price * $product->tax) / 100;
            $highest_price += ($highest_price * $product->tax) / 100;
        } elseif ($product->tax_type == 'amount') {
            $lowest_price += $product->tax;
            $highest_price += $product->tax;
        }

        if ($formatted) {
            if ($lowest_price == $highest_price) {
                return format_price_with_symbol(convert_price($lowest_price));
            } else {
                return format_price_with_symbol(convert_price($lowest_price)) . ' - ' . format_price_with_symbol(convert_price($highest_price));
            }
        } else {
            return $lowest_price . ' - ' . $highest_price;
        }
    }
}

if (!function_exists('discount_in_percentage')) {
    function discount_in_percentage($product)
    {
        $base = home_base_price($product, false);
        $reduced = home_discounted_base_price($product, false);
        $discount = $base - $reduced;
        $dp = ($discount * 100) / ($base > 0 ? $base : 1);
        return round($dp);
    }
}

if (!function_exists('home_base_price')) {
    function home_base_price($product, $formatted = true)
    {
        $price = $product->unit_price;
        $tax = 0;

        if ($product->tax_type == 'percent') {
            $tax += ($price * $product->tax) / 100;
        } elseif ($product->tax_type == 'amount') {
            $tax += $product->tax;
        }
        $price += $tax;
        return $formatted ? format_price_with_symbol(convert_price($price)) : convert_price($price);
    }
}

//Shows Base Price with discount
if (!function_exists('home_discounted_base_price')) {
    function home_discounted_base_price($product, $formatted = true)
    {
        $price = $product->unit_price;
        $tax = 0;

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

        if ($product->tax_type == 'percent') {
            $tax += ($price * $product->tax) / 100;
        } elseif ($product->tax_type == 'amount') {
            $tax += $product->tax;
        }
        $price += $tax;


        return $formatted ? format_price_with_symbol(convert_price($price)) : convert_price($price);
    }
}

//Shows Price on page based on carts
if (!function_exists('cart_product_price')) {
    function cart_product_price($cart_product, $product, $formatted = true, $tax = true)
    {
        if ($product->auction_product == 0) {
            $str = '';
            if ($cart_product['variation'] != null) {
                $str = $cart_product['variation'];
            }
            $price = 0;
            $product_stock = $product->stocks->where('variant', $str)->first();
            if ($product_stock) {
                $price = $product_stock->price;
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
        } else {
            $price = $product->bids->max('amount');
        }

        //calculation of taxes
        if ($tax) {
            $taxAmount = 0;
            if ($product->tax_type == 'percent') {
                $taxAmount += ($price * $product->tax) / 100;
            } elseif ($product->tax_type == 'amount') {
                $taxAmount += $product->tax;
            }
            $price += $taxAmount;
        }

        if ($formatted) {
            return format_price_with_symbol(convert_price($price));
        } else {
            return $price;
        }
    }
}

if (!function_exists('cart_product_tax')) {
    function cart_product_tax($cart_product, $product, $formatted = true)
    {
        $str = '';
        if ($cart_product['variation'] != null) {
            $str = $cart_product['variation'];
        }
        $product_stock = $product->stocks->where('variant', $str)->first();
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

        //calculation of taxes
        $tax = 0;
        if ($product->tax_type == 'percent') {
            $tax += ($price * $product->tax) / 100;
        } elseif ($product->tax_type == 'amount') {
            $tax += $product->tax;
        }

        if ($formatted) {
            return format_price_with_symbol(convert_price($tax));
        } else {
            return $tax;
        }
    }
}

if (!function_exists('getShippingCost')) {
    function getShippingCost($carts, $index, $shipping_info = '')
    {
        $shipping_type = get_settings('shipping_type');
        $admin_products = array();
        $seller_products = array();
        $admin_product_total_weight = 0;
        $admin_product_total_price = 0;
        $seller_product_total_weight = array();
        $seller_product_total_price = array();

        $cartItem = $carts[$index];
        $product = Product::find($cartItem['product_id']);

        if ($product->digital == 1) {
            return 0;
        }

        foreach ($carts as $key => $cart_item) {
            $item_product = Product::find($cart_item['product_id']);
            if ($item_product->added_by == 'admin') {
                array_push($admin_products, $cart_item['product_id']);
            } else {
                $product_ids = array();
                $weight = 0;
                $price = 0;
                if (isset($seller_products[$item_product->user_id])) {
                    $product_ids = $seller_products[$item_product->user_id];
                }

                array_push($product_ids, $cart_item['product_id']);
                $seller_products[$item_product->user_id] = $product_ids;
            }
        }

        if ($shipping_type == 'flat_rate') {
            return get_settings('flat_rate_shipping_cost') / count($carts);
        } elseif ($shipping_type == 'seller_wise_shipping') {
            if ($product->added_by == 'admin') {
                return get_settings('shipping_cost_admin') / count($admin_products);
            } else {
                return Shop::where('seller_id', $product->user_id)->first()->shipping_cost / count($seller_products[$product->user_id]);
            }
        } elseif ($shipping_type == 'area_wise_shipping') {
            $city = City::where('id', $shipping_info['city_id'])->first();

            if ($city != null) {
                if ($product->added_by == 'admin') {
                    return $city->cost / count($admin_products);
                } else {
                    return $city->cost / count($seller_products[$product->user_id]);
                }
            }
            return 0;
        } else {
            if ($product->is_quantity_multiplied && ($shipping_type == 'product_wise_shipping')) {
                return  $product->shipping_cost * $cartItem['quantity'];
            }
            return $product->shipping_cost;
        }
    }
}


//get active languages
if (!function_exists('active_languages')) {
    function active_languages()
    {
        return Cache::remember('active_languages', 86400, function () {
            return Language::active()->get();
        });
    }
}

//get default language
if (!function_exists('default_language')) {
    function default_language()
    {
        return Cache::remember('default_language', 86400, function () {
            return Language::where('code', get_settings('default_language'))->first();
        });
    }
}

//get default currency symbol
if (!function_exists('active_currency')) {
    function active_currency()
    {
        return Cache::remember('active_currency', 86400, function () {
            return Currency::active()->get();
        });
    }
}

//get default currency symbol
if (!function_exists('active_currency_symbol')) {
    function active_currency_symbol()
    {
        return Cache::remember('active_currency_symbol', 86400, function () {
            if (Session::has('currency_symbol')) {
                return Session::get('currency_symbol');
            }
            if (request()->header('Currency-Code')) {
                return request()->header('Currency-Code');
            }
            return get_system_default_currency()->symbol;
        });
    }
}

//get default currency symbol
if (!function_exists('default_currency_symbol')) {
    function default_currency_symbol()
    {
        return Cache::remember('default_currency_symbol', 86400, function () {
            return get_system_default_currency()->symbol;
        });
    }
}

//get default currency code
if (!function_exists('active_currency_code')) {
    function active_currency_code()
    {
        return Cache::remember('active_currency_code', 86400, function () {
            if (Session::has('currency_code')) {
                return Session::get('currency_code');
            }
            return get_system_default_currency()->code;
        });
    }
}

//get default currency code
if (!function_exists('default_currency_code')) {
    function default_currency_code()
    {
        return Cache::remember('default_currency_code', 86400, function () {
            return get_system_default_currency()->code;
        });
    }
}

//converts currency to home default currency
if (!function_exists('convert_price')) {
    function convert_price($price)
    {
        if (Session::has('currency_code') && (Session::get('currency_code') != get_system_default_currency()->code)) {
            $price = floatval($price) / floatval(get_system_default_currency()->exchange_rate);
            $price = floatval($price) * floatval(Session::get('currency_exchange_rate'));
        }

        if (
            request()->header('Currency-Code') &&
            request()->header('Currency-Code') != get_system_default_currency()->code
        ) {
            $price = floatval($price) / floatval(get_system_default_currency()->exchange_rate);
            $price = floatval($price) * floatval(request()->header('Currency-Exchange-Rate'));
        }
        return $price;
    }
}

//formats currency
if (!function_exists('format_price_without_symbol')) {
    function format_price_without_symbol($price)
    {
        if (get_settings('decimal_separator') == 1) {
            $fomated_price = number_format($price, get_settings('no_of_decimal'));
        } else {
            $fomated_price = number_format($price, get_settings('no_of_decimal'), ',', '.');
        }

        return $fomated_price;
    }
}


//formats currency
if (!function_exists('format_price_with_symbol')) {
    function format_price_with_symbol($price, $isMinimize = false)
    {
        if (get_settings('decimal_separator') == 1) {
            $fomated_price = number_format($price, get_settings('no_of_decimal'));
        } else {
            $fomated_price = number_format($price, get_settings('no_of_decimal'), ',', '.');
        }


        // Minimize the price
        if ($isMinimize) {
            $temp = number_format($price / 1000000000, get_settings('no_of_decimal'), ".", "");

            if ($temp >= 1) {
                $fomated_price = $temp . "B";
            } else {
                $temp = number_format($price / 1000000, get_settings('no_of_decimal'), ".", "");
                if ($temp >= 1) {
                    $fomated_price = $temp . "M";
                }
            }
        }

        if (get_settings('symbol_format') == 1) {
            return active_currency_symbol() . $fomated_price;
        } else if (get_settings('symbol_format') == 3) {
            return active_currency_symbol() . ' ' .  $fomated_price;
        } else if (get_settings('symbol_format') == 4) {
            return $fomated_price . ' ' . active_currency_symbol();
        }
        return  $fomated_price . active_currency_symbol();
    }
}

//formats price to home default price with convertion
if (!function_exists('single_price')) {
    function single_price($price)
    {
        return format_price_with_symbol(convert_price($price));
    }
}

if (!function_exists('only_price')) {
    function only_price($price)
    {
        return convert_price($price);
    }
}

if (!function_exists('hex_to_rgba')) {
    function hex_to_rgba($color, $opacity = false)
    {

        $defaultColor = 'rgb(0,0,0)';

        // Return default color if no color provided
        if (empty($color)) {
            return $defaultColor;
        }

        // Ignore "#" if provided
        if ($color[0] == '#') {
            $color = substr($color, 1);
        }

        // Check if color has 6 or 3 characters, get values
        if (strlen($color) == 6) {
            $hex = array($color[0] . $color[1], $color[2] . $color[3], $color[4] . $color[5]);
        } elseif (strlen($color) == 3) {
            $hex = array($color[0] . $color[0], $color[1] . $color[1], $color[2] . $color[2]);
        } else {
            return $defaultColor;
        }

        // Convert hex values to rgb values
        $rgb =  array_map('hexdec', $hex);

        // Check if opacity is set(rgba or rgb)
        if ($opacity) {
            if (abs($opacity) > 1) {
                $opacity = 1.0;
            }
            $output = 'rgba(' . implode(",", $rgb) . ',' . $opacity . ')';
        } else {
            $output = 'rgb(' . implode(",", $rgb) . ')';
        }

        // Return rgb(a) color string
        return $output;
    }
}

if (!function_exists('get_sales_data_by_month')) {
    function get_sales_data_by_month($sales)
    {
        $months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        // Create an associative array with months initialized to 0
        $salesData = array_fill_keys($months, 0);

        foreach ($sales as $sale) {
            $salesData[$sale->month] = $sale->total_sale;
        }

        return $salesData;
    }
}

if (!function_exists('static_asset')) {

    function static_asset($path = null, $secure = null)
    {
        if (strpos(php_sapi_name(), 'cli') !== false || defined('LARAVEL_START_FROM_PUBLIC')) :
            return app('url')->asset($path, $secure);
        else:
            return app('url')->asset($path, $secure);
        // return app('url')->asset('public/' . $path, $secure);
        endif;
    }
}

if (!function_exists('placeholder1_1')) {

    function placeholder1_1()
    {

        return app('url')->asset('/assets/placeholder/placeholder-1-1.webp');
    }
}

if (!function_exists('placeholder6_1')) {

    function placeholder6_1()
    {
        return app('url')->asset('/assets/placeholder/placeholder-6-1.webp');
    }
}

if (! function_exists('blank')) {
    /**
     * Determine if the given value is "blank".
     *
     * @param  mixed  $value
     * @return bool
     */
    function blank($value)
    {
        if (is_null($value)) {
            return true;
        }

        if (is_string($value)) {
            return trim($value) === '';
        }

        if (is_numeric($value) || is_bool($value)) {
            return false;
        }

        if ($value instanceof Countable) {
            return count($value) === 0;
        }

        return empty($value);
    }
}


if (!function_exists('curlRequest')) {
    function curlRequest($url, $fields, $method = 'POST', $headers = [])
    {
        $client = new \GuzzleHttp\Client(['verify' => false]);
        $response = $client->request($method, $url, [
            'form_params' => $fields,
            'headers' => $headers,
        ]);

        $result = $response->getBody()->getContents();
        return json_decode($result);
    }
}

if (!function_exists('httpRequest')) {
    function httpRequest($url, $fields, $headers = [], $is_form = false, $method = 'POST')
    {
        if ($is_form) {
            $response = Http::withHeaders($headers)->asForm()->$method($url, $fields);
        } else {
            $response = Http::withHeaders($headers)->$method($url, $fields);
        }

        return $response->json();
    }
}

if (!function_exists('isInstalled')) {
    function isInstalled()
    {
        return \config('app.app_installed');
    }
}


if (!function_exists('validate_purchase')) {
    function validate_purchase($code, $data)
    {
        $script_url = str_replace("install/process", "", (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");

        $response      = false;

        $fields = [
            'domain'        => urlencode($_SERVER['SERVER_NAME']),
            'url'           => urlencode($script_url),
            'purchase_code' => urlencode($code),
        ];

        $curl_response = curlRequest("https://Gupta.com/verifying/purchase", $fields);

        if (property_exists($curl_response, 'status') && $curl_response->status):
            envWrite('DB_HOST',     $data['DB_HOST']);
            envWrite('DB_DATABASE', $data['DB_DATABASE']);
            envWrite('DB_USERNAME', $data['DB_USERNAME']);
            envWrite('DB_PASSWORD', $data['DB_PASSWORD']);
            sleep(3);

            $zip_file = $curl_response->release_zip_link;

            if ($zip_file) {
                try {
                    $file_path = base_path('public/install/installer.zip');
                    file_put_contents($file_path, file_get_contents($zip_file));
                } catch (Exception $e) {
                    return 'Zip file cannot be Imported. Please check your server permission or Contact with Script Author.';
                }
            } else {
                return 'Zip file cannot be Imported. Please check your server permission or Contact with Script Author.';
            }

            return 'success';
        else:
            return $curl_response->message;
        endif;
    }
}


if (!function_exists('arrayCheck')) {
    function arrayCheck($key, $array): bool
    {
        return is_array($array) && count($array) > 0 && array_key_exists($key, $array) && !empty($array[$key]) && $array[$key] != 'null';
    }
}

if (!function_exists('app_config')) {
    function app_config()
    {
        $default_language = get_settings('default_language');

        if (!empty($default_language)) :
            Config::set('app.locale', $default_language);
        endif;

        $timezone = get_settings('timezone');

        if (!empty($timezone)) :
            date_default_timezone_set($timezone);
        else :
            date_default_timezone_set('Asia/Dhaka');
        endif;
    }
}

if (!function_exists('pwa_config')) {
    function pwa_config()
    {
        $icon = get_settings('favicon');
        $short_name = get_settings('system_short_name') != '' ? get_settings('system_short_name') : 'Pixels Store';
        $pwa = array(
            'name' => 'Pixels Store',
            'manifest' => [
                'name' => config('app.name'),
                'short_name' => $short_name,
                'scope' => '/',
                'start_url' => '/',
                'background_color' => '#ffffff',
                'theme_color' => '#000000',
                'display' => 'standalone',
                'orientation' => 'portrait',
                'status_bar' => 'black',
                'icons' => [
                    '72x72' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-72x72.png'),
                        'purpose' => 'any'
                    ],
                    '96x96' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-96x96.png'),
                        'purpose' => 'any'
                    ],
                    '128x128' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-128x128.png'),
                        'purpose' => 'any'
                    ],
                    '144x144' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-144x144.png'),
                        'purpose' => 'maskable any'
                    ],
                    '152x152' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-152x152.png'),
                        'purpose' => 'any'
                    ],
                    '192x192' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-192x192.png'),
                        'purpose' => 'any'
                    ],
                    '384x384' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-384x384.png'),
                        'purpose' => 'any'
                    ],
                    '512x512' => [
                        'path' => get_settings('mobile_logo') ? static_asset(get_settings('mobile_logo')) : static_asset('images/ico/favicon-512x512.png'),
                        'purpose' => 'any'
                    ],
                ],
                'splash' => [
                    '640x1136' => @is_file_exists(@$icon['splash_640x1136_url']) ? static_asset(@$icon['splash_640x1136_url']) : static_asset('images/ico/splash-640x1136.png'),
                    '750x1334' => @is_file_exists(@$icon['splash_750x1334_url']) ? static_asset(@$icon['splash_750x1334_url']) : static_asset('images/ico/splash-750x1334.png'),
                    '828x1792' => @is_file_exists(@$icon['splash_828x1792_url']) ? static_asset(@$icon['splash_828x1792_url']) : static_asset('images/ico/splash-828x1792.png'),
                    '1125x2436' => @is_file_exists(@$icon['splash_1125x2436_url']) ? static_asset(@$icon['splash_1125x2436_url']) : static_asset('images/ico/splash-1125x2436.png'),
                    '1242x2208' => @is_file_exists(@$icon['splash_1242x2208_url']) ? static_asset(@$icon['splash_1242x2208_url']) : static_asset('images/ico/splash-1242x2208.png'),
                    '1242x2688' => @is_file_exists(@$icon['splash_1242x2688_url']) ? static_asset(@$icon['splash_1242x2688_url']) : static_asset('images/ico/splash-1242x2688.png'),
                    '1536x2048' => @is_file_exists(@$icon['splash_1536x2048_url']) ? static_asset(@$icon['splash_1536x2048_url']) : static_asset('images/ico/splash-1536x2048.png'),
                    '1668x2224' => @is_file_exists(@$icon['splash_1668x2224_url']) ? static_asset(@$icon['splash_1668x2224_url']) : static_asset('images/ico/splash-1668x2224.png'),
                    '1668x2388' => @is_file_exists(@$icon['splash_1668x2388_url']) ? static_asset(@$icon['splash_1668x2388_url']) : static_asset('images/ico/splash-1668x2388png'),
                    '2048x2732' => @is_file_exists(@$icon['splash_2048x2732_url']) ? static_asset(@$icon['splash_2048x2732_url']) : static_asset('images/ico/splash-2048x2732.png'),
                ],
                @'custom' => []
            ]
        );

        Config::set('laravelpwa', $pwa);
    }
}

if (!function_exists('is_file_exists')) {
    function is_file_exists($item, $storage = 'local')
    {
        if (is_array($item)) {
            return false;
        }
        if ($item && $storage) :
            if ($storage == 'local') :
                if (file_exists('public/' . $item)) :
                    return true;
                endif;
            elseif ($storage == 'aws_s3') :
                if (Storage::disk('s3')->exists($item)) :
                    return true;
                endif;
            elseif ($storage == 'wasabi') :
                if (Storage::disk('wasabi')->exists($item)) :
                    return true;
                endif;
            endif;

        endif;

        return false;
    }
}
