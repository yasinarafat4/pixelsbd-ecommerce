<?php

use App\Events\TestEvent;
use App\Http\Controllers\Admin\MarketingController;
use App\Http\Controllers\Frontend\SellerController;
use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\Frontend\ConversationController;
use App\Http\Controllers\Frontend\BrandController;
use App\Http\Controllers\Frontend\CartController;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\CustomerDashboardController;
use App\Http\Controllers\Frontend\HelperController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\NotificationController;
use App\Http\Controllers\Frontend\QueryController;
use App\Http\Controllers\Frontend\ReviewController;
use App\Http\Controllers\Frontend\WalletController;
use App\Http\Controllers\Payment\PaypalController;
use App\Http\Controllers\Payment\SslcommerzController;
use App\Http\Controllers\Payment\StripeController;
use App\Http\Controllers\ProfileController;
use App\Mail\NewsletterMailManager;
use App\Mail\SecondEmailVerifyMailManager;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/clear_cache', function () {
    \Artisan::call('cache:clear');
    dd("Cache is cleared");
});

Route::get('/config_cache', function () {
    \Artisan::call('config:cache');
    dd("Cache is configed");
});

Route::get('/link_storage', function () {
    \Artisan::call('storage:link');
    dd("Storage is linked");
});
Route::get('/optimize_clear', function () {
    \Artisan::call('optimize:clear');
    dd("Optimizeed");
});

Route::get('/test-500', function () {
    abort(500, 'Test Internal Server Error');
});

Route::fallback(function () {
    return Inertia::render('NotFound')->toResponse(request())->setStatusCode(404);
});

Route::get('check/addon/{addon}', function ($addon) {
    return addon_is_activated($addon);
})->name('check.addon');

Route::get('/test-event', function () {
    $user = User::find(5);
    $message = "test message";
    broadcast(new TestEvent($user, $message));
});

Route::get('/prevEmail', function () {
    $array['subject'] = trans('Email Verification');
    $array['from'] = env('MAIL_FROM_ADDRESS');
    $array['content'] = '<p>test</p>';
    $array['link'] = route('seller.email_change.callback') . '?new_email_verification_code=' . 'code83439' . '&email=' . 'email@';
    $array['sender'] = 'New Email';
    $array['details'] = trans("Email Second");
    return new NewsletterMailManager($array);
});

Route::get('/set-locale/{locale}', function (string $locale) {
    session()->put('locale', $locale);
    return back();
})->name('set.locale');

Route::get('/set-currency/{currency}', function (string $currency) {
    $currency = Currency::where('code', $currency)->first();
    session()->put('currency_code', $currency->code);
    session()->put('currency_symbol', $currency->symbol);
    session()->put('currency_exchange_rate', $currency->exchange_rate);
    return back();
})->name('set.currency');


Route::middleware(['XSS', 'licensed'])->group(function () {
    Route::get('/test', [HomeController::class, 'test'])->name('test');

    // Search route
    Route::get('/search', [HomeController::class, 'search'])->name('search');

    // Page routes
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::get('/brands', [BrandController::class, 'brands'])->name('brands');
    Route::get('/brand/{slug}', [BrandController::class, 'brand_page'])->name('brand_page');
    Route::get('/categories', [HomeController::class, 'categories'])->name('categories');
    Route::get('/category/{slug}', [HomeController::class, 'catgeory_wise_product'])->name('catgeory_wise_product');
    Route::get('/product/{slug}', [HomeController::class, 'singleProduct'])->name('product');
    Route::get('/flash-sale', [HomeController::class, 'flashSale'])->name('flashSale');
    Route::get("/flash-deal/{slug}", [HomeController::class, 'flash_deal_details'])->name('flash_deal_details');
    Route::get('/sellers', [SellerController::class, 'all_sellers'])->name('all_sellers');
    Route::get('/shop/{slug}', [SellerController::class, 'shop_page'])->name('shop_page');
    Route::get('coupon', [HomeController::class, 'coupon'])->name('coupon');
    Route::post('/product/variant-price', [HomeController::class, 'variant_price'])->name('product.variant_price');

    // Browse all routes
    Route::get('/best-selling/product-list', [HomeController::class, 'best_selling_product_list'])->name('best_selling_product_list');
    Route::get('/top-rated/product-list', [HomeController::class, 'top_rated_product_list'])->name('top_rated_product_list');
    Route::get('/similar/product-list', [HomeController::class, 'similar_product_list'])->name('similar_product_list');


    Route::get('/product-list', [HomeController::class, 'product_list'])->name('product_list');
    Route::post("subscriber-store", [MarketingController::class, 'subscriber_store'])->name('subscriber_store');

    Route::get("unsubscribe/{email}", [MarketingController::class, 'unsubscribe'])->name('unsubscribe');


    //shopping-cart Routs
    Route::prefix('cart')->group(function () {
        Route::controller(CartController::class)->group(function () {
            Route::get('/', 'index')->name('cart');
            Route::post('/add-to-cart', 'add_to_cart')->name('add_to_cart');
            Route::post('/add-to-wish-list', 'add_to_wish_list')->name('add_to_wish_list');
            Route::post('/update-quantity', 'update_quantity')->name('update_quantity');
            Route::post('/remove-from-cart', 'remove_from_cart')->name('remove_from_cart');
        });
    });

    // Checkout Routs
    Route::prefix('checkout')->middleware(['set.intended'])->group(function () {
        Route::controller(CheckoutController::class)->group(function () {
            Route::get('/', 'index')->name('checkout');
            Route::any('/delivery-info', 'store_shipping_info')->name('checkout.store_shipping_infostore');
            Route::post('/payment-select', 'store_delivery_info')->name('checkout.store_delivery_info');
            Route::post('/payment', 'checkout')->name('payment.checkout');
            Route::get('/order-confirmed/{id?}', 'order_confirmed')->name('order_confirmed');
            Route::post('/apply-coupon-code', 'apply_coupon_code')->name('checkout.apply_coupon_code');
            Route::post('/remove-coupon-code', 'remove_coupon_code')->name('checkout.remove_coupon_code');
            Route::post('/guest-customer-info-check', 'guestCustomerInfoCheck')->name('guest_customer_info_check');
            Route::post('/updateDeliveryAddress', 'updateDeliveryAddress')->name('checkout.updateDeliveryAddress');
            Route::post('/updateDeliveryInfo', 'updateDeliveryInfo')->name('checkout.updateDeliveryInfo');
        });
    });


    //Paypal START
    Route::controller(PaypalController::class)->group(function () {
        Route::get('/paypal/payment', 'pay')->name('payment');
        Route::get('/paypal/payment/done', 'getDone')->name('payment.done');
        Route::get('/paypal/payment/cancel', 'getCancel')->name('payment.cancel');
    });

    //Stipe Start
    Route::controller(StripeController::class)->group(function () {
        Route::get('stripe', 'stripe');
        Route::post('/stripe/create-checkout-session', 'create_checkout_session')->name('stripe.get_token');
        Route::any('/stripe/payment/callback', 'callback')->name('stripe.callback');
        Route::get('/stripe/success', 'success')->name('stripe.success');
        Route::get('/stripe/cancel', 'cancel')->name('stripe.cancel');
    });

    // SSLCOMMERZ Start
    Route::controller(SslcommerzController::class)->group(function () {
        Route::get('/sslcommerz/pay', 'index');
        Route::POST('/sslcommerz/success', 'success');
        Route::POST('/sslcommerz/fail', 'fail');
        Route::POST('/sslcommerz/cancel', 'cancel');
        Route::POST('/sslcommerz/ipn', 'ipn');
    });

    Route::get('/state-by-country/{country}', [HelperController::class, 'state_by_country'])->name('state_by_country');
    Route::get('/city-by-state/{state}', [HelperController::class, 'city_by_state'])->name('city_by_state');
    Route::get('/child/categories/{id}', [HomeController::class, 'childCategories'])->name('child.categories');

    // Footer routes
    Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
    Route::post('/contact/post', [HomeController::class, 'contact_post'])->name('contact.post');

    Route::get('/faqs', [HomeController::class, 'faqs'])->name('faqs');
    Route::get('/track-order', [HomeController::class, 'track_order'])->name('track_order');

    Route::get('/about-us', [HomeController::class, 'about_us'])->name('about_us');
    Route::get('/return-policy', [HomeController::class, 'return_policy'])->name('return_policy');
    Route::get('/refund-policy', [HomeController::class, 'refund_policy'])->name('refund_policy');
    Route::get('/privacy-policy', [HomeController::class, 'privacy_policy'])->name('privacy_policy');
    Route::get('/terms-and-conditions', [HomeController::class, 'terms_and_conditions'])->name('terms_and_conditions');

    Route::middleware(['set.intended', 'auth:customer', 'customer_unbanned'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // user dashboard routes
        Route::get('/user-dashboard', [CustomerDashboardController::class, 'user_dashboard'])->name('user_dashboard');
        Route::get('/purchase-history', [CustomerDashboardController::class, 'purchase_history'])->name('purchase_history');
        Route::get('/purchase-history/details/{id}', [CustomerDashboardController::class, 'purchase_history_details'])->name('purchase_history_details');
        Route::get('invoice-download/{id}', [CustomerDashboardController::class, 'customer_invoice_download'])->name('invoice_download');
        Route::get('cancel-order/{id}', [CustomerDashboardController::class, 'cancel_order'])->name('cancel_order');

        // Product Review
        Route::resource('/reviews', ReviewController::class);
        Route::get('/product/review/{id}', [ReviewController::class, 'product_review'])->name('product.review');

        Route::post('/order/re-payment', [CheckoutController::class, 'orderRePayment'])->name('order.re_payment');

        Route::get('/downloads', [CustomerDashboardController::class, 'downloads'])->name('downloads');
        Route::get('/refund-requests', [CustomerDashboardController::class, 'refund_requests'])->name('refund_requests');
        Route::get('/wishlist', [CustomerDashboardController::class, 'wishlist'])->name('wishlist');

        Route::get('/conversations', [ConversationController::class, 'customer_conversations'])->name('conversations');
        Route::post('/conversations', [ConversationController::class, 'conversations_store'])->name('conversations.store');
        Route::get('/conversation-details/{id}', [ConversationController::class, 'customer_conversation_details'])->name('conversations_details');
        Route::get('/conversation-messages/{id}', [ConversationController::class, 'customer_conversation_messages'])->name('conversations_message');
        Route::post('/replay', [ConversationController::class, 'customer_replay_store'])->name('customer_replay.store');

        // Product Query
        Route::post('/query-store', [QueryController::class, 'query_store'])->name('query_store');

        // Wallet
        Route::controller(WalletController::class)->group(function () {
            Route::get('/wallet', 'index')->name('wallet');
            Route::post('/recharge', 'recharge')->name('wallet.recharge');
        });

        // Route::get('/wallet', [CustomerDashboardController::class, 'wallet'])->name('wallet');

        Route::get('/support_ticket', [CustomerDashboardController::class, 'support_ticket'])->name('support_ticket');
        Route::post('/support-ticket-store', [CustomerDashboardController::class, 'support_ticket_store'])->name('support_ticket_store');
        Route::get('/support-ticket-details/{id}', [CustomerDashboardController::class, 'support_ticket_details'])->name('support_ticket_details');
        Route::post('/ticket-replay', [CustomerDashboardController::class, 'ticket_replay_store'])->name('ticket_replay.store');

        Route::get('/manage_profile', [CustomerDashboardController::class, 'manage_profile'])->name('manage_profile');
        Route::put('/manage_profile/{id}', [CustomerDashboardController::class, 'user_profile_update'])->name('user_profile_update');
        Route::post('/update-password', [CustomerDashboardController::class, 'password_update'])->name('password_update');

        // Notification
        Route::controller(NotificationController::class)->group(function () {
            Route::get('all-notifications', 'index')->name('all_notifications');
            Route::delete('notification/destroy/{id}', 'notification_destroy')->name('notification_destroy');
            Route::get('/notification/read-and-redirect/{id}', 'readAndRedirect')->name('notification.read-and-redirect');
            Route::get('/non-linkable-notification-read', 'nonLinkableNotificationRead')->name('non-linkable-notification-read');
        });


        Route::post('/add-address', [CustomerDashboardController::class, 'add_address'])->name('add_address');
        Route::put('/update-address/{id}', [CustomerDashboardController::class, 'update_address'])->name('update_address');
        Route::delete('/address/{id}', [CustomerDashboardController::class, 'destroy'])->name('address.destroy');
        Route::put('/default/address/{id}', [CustomerDashboardController::class, 'make_default_address'])->name('make_default_address');
    });

    require __DIR__ . '/auth.php';

    Route::get('auth/{provider}/redirect', [SocialLoginController::class, 'redirect'])->name('auth.socialite.redirect');
    Route::get('auth/{provider}/callback', [SocialLoginController::class, 'callback'])->name('auth.socialite.callback');
});
