<?php

use App\Http\Controllers\Admin\AddonController;
use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\BlogCategoryController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\ColorController;
use App\Http\Controllers\Admin\CommissionController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\ConversationController;
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\CurrencyController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DeliveryBoyController;
use App\Http\Controllers\Admin\DynamicPopupController;
use App\Http\Controllers\Admin\FlashDealController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\MarketingController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\OtpController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\QueryController;
use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SellerController;
use App\Http\Controllers\Admin\StaffsController;
use App\Http\Controllers\Admin\StateController;
use App\Http\Controllers\Admin\SupportController;
use App\Http\Controllers\Admin\SystemController;
use App\Http\Controllers\Admin\TaxController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\WebsiteSetupController;
use App\Http\Controllers\Admin\BenefitController;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

Route::middleware(['XSS', 'licensed'])->group(function () {
    Route::get('admin/login', [LoginController::class, 'index'])->name('admin.login');
    Route::post('admin/login', [LoginController::class, 'login'])->name('admin.login');

    Route::post('admin/logout', [LoginController::class, 'logout'])->name('admin.logout');
    Route::get('last-check', [DashboardController::class, 'last_check'])->name('last_check');

    // Route::get('/token', function () {

    //     //   return  auth('customer')->user();
    //     $user = User::where('email', 'customer@gmail.com')->first();
    //     // $user = User::where('email', email)->update(array('last_login' => date('Y-m-d H:i:s')));
    //     return $user->createToken('token')->plainTextToken;
    // });

    Route::get('/admin', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/cache-clear', function () {
        Cache::flush();
        return back()->with('success', trans('Cache Cleared!'));
    })->name('cache_clear');


    Route::group(['prefix' => 'admin', 'middleware' => ['auth:admin']], function () {
        Route::name('admin.')->group(function () {
            // Upload routes
            Route::resource("upload", UploadController::class);
            Route::get('image/list', [UploadController::class, 'image_list'])->name('image_list');
            Route::post('image/upload/modal', [UploadController::class, 'image_upload_modal'])->name('image_upload_modal');
            Route::post('image/upload', [UploadController::class, 'image_upload'])->name('image_upload');

            // auto-routes: admin
            Route::get('all-notifications', [NotificationController::class, 'all_notifications'])->name('all_notifications');
            Route::get('/notification/read-and-redirect/{id}', [NotificationController::class, 'readAndRedirect'])->name('notification.read-and-redirect');
            Route::delete('notification/destroy/{id}', [NotificationController::class, 'notification_destroy'])->name('notification_destroy');

            //Dashboard
            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
            Route::post('/dashboard/inhouse-top-brands', [DashboardController::class, 'inhouse_top_brands'])->name('dashboard.inhouse_top_brands');
            Route::post('/dashboard/inhouse-top-categories', [DashboardController::class, 'inhouse_top_categories'])->name('dashboard.inhouse_top_categories');
            Route::post('/dashboard/top-sellers-products-section', [DashboardController::class, 'top_sellers_products_section'])->name('dashboard.top_sellers_products_section');

            Route::get('admin-profile', [DashboardController::class, 'admin_profile'])->name('admin_profile');
            Route::put('admin-profile/{id}', [DashboardController::class, 'admin_profile_update'])->name('admin_profile_update');
            Route::post('/update-password', [DashboardController::class, 'password_update'])->name('password_update');

            // Products
            Route::name('product.')->group(function () {
                Route::resource("products", ProductsController::class);
                Route::get('/product/admin', [ProductsController::class, 'admin_products'])->name('admin');
                Route::get('/product/seller', [ProductsController::class, 'seller_products'])->name('seller');
                Route::get('product/edit/{lang}/{id}', [ProductsController::class, 'product_edit'])->name('product_edit');
                Route::get('/products/duplicate/{id}', [ProductsController::class, 'duplicate'])->name('duplicate');
                Route::put('product/published_status/{id}', [ProductsController::class, 'published_status'])->name('published_status');
                Route::put('product/featured_status/{id}', [ProductsController::class, 'featured_status'])->name('featured_status');
                Route::put('product/todays_deal_status/{id}', [ProductsController::class, 'todays_deal_status'])->name('todays_deal_status');
                Route::put('product/approved_status/{id}', [ProductsController::class, 'approved_status'])->name('approved_status');
                Route::post("product/sku-combination", [ProductsController::class, 'sku_combination'])->name('sku_combination');
                Route::post("product/selected-attribute", [ProductsController::class, 'selected_attribute'])->name('selected_attribute');


                Route::get('/product/bulk-import', [ProductsController::class, 'bulk_import'])->name('bulk_import');
                Route::get('/product/product-review', [ProductsController::class, 'product_review'])->name('product_review');
                Route::put('/product/product-review/status/{id}', [ProductsController::class, 'product_review_status'])->name('product_review_status');


                Route::resource("category", CategoryController::class);
                Route::get('category/edit/{lang}/{id}', [CategoryController::class, 'category_edit'])->name('category_edit');
                Route::put('category/featured_status/{id}', [CategoryController::class, 'featured_status'])->name('category.featured_status');
                Route::put('category/home_status/{id}', [CategoryController::class, 'home_status'])->name('category.home_status');

                Route::get('category-based-discount', [CategoryController::class, 'category_based_discount'])->name('category_based_discount');

                Route::resource("brand", BrandController::class);
                Route::get('brand/edit/{id}/{lang}', [BrandController::class, 'brand_edit'])->name('brand_edit');

                Route::resource("color", ColorController::class);

                Route::resource("attribute", AttributeController::class);
                Route::get('attribute-edit/{lang}/{id}', [AttributeController::class, 'attribute_edit'])->name('attribute_edit');
                Route::get('attribute/value/{id}', [AttributeController::class, 'attribute_value'])->name('attribute_value');
                Route::post('attribute/value/store', [AttributeController::class, 'attribute_value_store'])->name('attribute_value_store');
                Route::get('attribute/value/edit/{id}', [AttributeController::class, 'attribute_value_edit'])->name('attribute_value_edit');
                Route::put('attribute/value/update/{id}', [AttributeController::class, 'attribute_value_update'])->name('attribute_value_update');
                Route::delete('attribute/value/destroy/{id}', [AttributeController::class, 'attribute_value_destroy'])->name('attribute_value_destroy');
            });

            // Orders
            Route::resource("orders", OrderController::class);
            Route::get('/inhouse-orders', [OrderController::class, 'index'])->name('orders.inhouse_orders');
            Route::get('/seller_orders', [OrderController::class, 'index'])->name('orders.seller_orders');
            Route::get('invoice-download/{id}', [OrderController::class, 'invoice_download'])->name('invoice_download');
            Route::post('/orders/update_delivery_status', [OrderController::class, 'update_delivery_status'])->name('orders.update_delivery_status');
            Route::post('/orders/update_payment_status', [OrderController::class, 'update_payment_status'])->name('orders.update_payment_status');
            Route::post('/orders/delivery-boy-assign', [OrderController::class, 'assign_delivery_boy'])->name('orders.delivery-boy-assign');


            //Delivery Boy
            Route::name('deliveryboy.')->group(function () {
                Route::get("all-delivery-boys", [DeliveryBoyController::class, 'all_delivery_boys'])->name('all_delivery_boys');
                Route::get("create-delivery-boy", [DeliveryBoyController::class, 'create_delivery_boy'])->name('create_delivery_boy');
                Route::post("store-delivery-boy", [DeliveryBoyController::class, 'store'])->name('store_delivery_boy');
                Route::get("edit-delivery-boy/{id}", [DeliveryBoyController::class, 'edit_delivery_boy'])->name('edit_delivery_boy');
                Route::put("update-delivery-boy/{id}", [DeliveryBoyController::class, 'update'])->name('update_delivery_boy');

                Route::post("delivery-boy-collection", [DeliveryBoyController::class, 'delivery_boy_collection'])->name('delivery_boy_collection');
                Route::get("collected-histories", [DeliveryBoyController::class, 'collected_histories'])->name('collected_histories');

                Route::post("delivery-boy-payment", [DeliveryBoyController::class, 'delivery_boy_payment'])->name('delivery_boy_payment');
                Route::get("payment-histories", [DeliveryBoyController::class, 'payment_histories'])->name('payment_histories');

                Route::get("cancel-request", [DeliveryBoyController::class, 'cancel_request'])->name('cancel_request');
                Route::get("configuration", [DeliveryBoyController::class, 'configuration'])->name('configuration');
                Route::put("ban-delivery-boy/{id}", [DeliveryBoyController::class, 'ban_delivery_boy'])->name('ban_delivery_boy');
            });

            // Customer
            Route::resource("customer", CustomerController::class);
            Route::put("ban-customer/{id}", [CustomerController::class, 'ban_customer'])->name('ban_customer');

            // Seller
            Route::resource("seller", SellerController::class);
            Route::name('seller.')->group(function () {
                Route::get('/sellers/login/{id}', [SellerController::class, 'login'])->name('login');
                Route::get('sellers_ban/{id}', [SellerController::class, 'ban'])->name('ban');
                Route::get('/sellers/approve/{id}', [SellerController::class, 'approve_seller'])->name('approve');
                Route::get('/sellers/reject/{id}', [SellerController::class, 'reject_seller'])->name('reject');
                Route::get('/payouts', [SellerController::class, 'payouts'])->name('payouts');
                Route::get('/payout/requests', [SellerController::class, 'payout_requests'])->name('payout_requests');
                Route::get('/seller_commission', [SellerController::class, 'seller_commission'])->name('seller_commission');
                Route::post('/seller_commission_update', [SellerController::class, 'seller_commission_update'])->name('seller_commission_update');
                Route::get('/seller/verification/{id}', [SellerController::class, 'verification'])->name('verification');
                Route::get('/verification/form', [SellerController::class, 'seller_verification_form'])->name('seller_verification_form');
                Route::post('/verification/form', [SellerController::class, 'seller_verification_form_update'])->name('seller_verification_form_update');
                Route::get('/seller/payment-history/{id}', [SellerController::class, 'payment_history'])->name('payment_history');
                Route::get('/seller/payments/show/{id}', [SellerController::class, 'payment_history_show'])->name('payment_history.show');
            });
            Route::post('/pay_to_seller', [CommissionController::class, 'pay_to_seller'])->name('commissions.pay_to_seller');

            // Report
            Route::name('report.')->group(function () {
                Route::get("reports/commission-history", [ReportsController::class, 'commission_history'])->name('commission_history');
                Route::get("reports/earning-report", [ReportsController::class, 'earning_report'])->name('earning_report');
                Route::get("reports/inhouse-product-sale", [ReportsController::class, 'inhouse_product_sale'])->name('inhouse_product_sale');
                Route::get("reports/products-stock", [ReportsController::class, 'products_stock'])->name('products_stock');
                Route::get("reports/products-wishlist", [ReportsController::class, 'products_wishlist'])->name('products_wishlist');
                Route::get("reports/seller-product-sale", [ReportsController::class, 'seller_product_sale'])->name('seller_product_sale');
                Route::get("reports/user-searches", [ReportsController::class, 'user_searches'])->name('user_searches');
                Route::get("reports/wallet-recharge-history", [ReportsController::class, 'wallet_recharge_history'])->name('wallet_recharge_history');
            });

            // Blog
            Route::name('blog.')->group(function () {
                Route::resource("blogs", BlogController::class);
                Route::resource("blogcategory", BlogCategoryController::class);
            });

            // Marketing
            Route::name('marketing.')->group(function () {
                Route::resource("coupon", CouponController::class);
                Route::put("update-coupon-status/{id}", [CouponController::class, 'update_coupon_status'])->name('update_coupon_status');

                Route::resource("flashdeal", FlashDealController::class);
                Route::put("flash-deal-status/{id}", [FlashDealController::class, 'flash_deal_status'])->name('flash_deal_status');
                Route::put("flash-deal-featured/{id}", [FlashDealController::class, 'flash_deal_featured'])->name('flash_deal_featured');

                Route::resource("dynamicpopup", DynamicPopupController::class);
                Route::put("dynamicpopup/status/{id}", [DynamicPopupController::class, 'status'])->name('dynamicpopup.status');

                Route::get("newsletters", [MarketingController::class, 'newsletters'])->name('newsletters');
                Route::post("send/newsletter", [MarketingController::class, 'send_newsletter'])->name('send_newsletter');

                Route::get("subscribers", [MarketingController::class, 'subscribers'])->name('subscribers');
                Route::delete("subscriber-delete/{id}", [MarketingController::class, 'subscriber_delete'])->name('subscriber_delete');


                Route::name('notification.')->group(function () {
                    Route::resource("notification/notification", NotificationController::class);
                    Route::get("/notification-settings", [NotificationController::class, 'notification_settings'])->name('notification_settings');

                    Route::get("/notification-types", [NotificationController::class, 'notification_types'])->name('notification_types');
                    Route::post("/notification-types", [NotificationController::class, 'notification_types_store'])->name('notification_types.store');
                    Route::get("/notification-type-edit/{id}", [NotificationController::class, 'notification_type_edit'])->name('notification_type_edit');
                    Route::put("/notification-type-update/{id}", [NotificationController::class, 'notification_type_update'])->name('notification_type_update');
                    Route::delete("/notification-type-delete/{id}", [NotificationController::class, 'notification_type_delete'])->name('notification_type_delete');
                    Route::put("/notification-types-status/{id}", [NotificationController::class, 'notification_type_status'])->name('notification_type_status');


                    Route::get("/custom-notification", [NotificationController::class, 'custom_notification'])->name('custom_notification');
                    Route::post('/custom-notification/send', [NotificationController::class, 'sendCustomNotification'])->name('custom_notification.send');
                    Route::get("/custom-notification-history", [NotificationController::class, 'custom_notification_history'])->name('custom_notification_history');

                    Route::post('/custom-notified-customers-list', [NotificationController::class, 'custom_notified_customers_list'])->name('custom_notified_customers_list');
                    Route::get('/custom-notification-delete/{identifier}', [NotificationController::class, 'custom_notification_delete'])->name('custom_notification_delete');
                });
            });

            // Support
            Route::name('support.')->group(function () {
                Route::resource("tickets", SupportController::class);
                Route::get('ticket/ticket-replay/{id}', [SupportController::class, 'ticket_replay'])->name('ticket_replay');
                Route::post('ticket/replay-store', [SupportController::class, 'ticket_replay_store'])->name('ticket_replay.store');
                Route::put('ticket_status/{id}', [SupportController::class, 'ticket_status'])->name('ticket_status');

                Route::get("conversations", [ConversationController::class, 'admin_conversations'])->name('conversations');
                Route::get('/conversation-details/{id}', [ConversationController::class, 'admin_conversation_details'])->name('conversations_details');
                Route::post('/conversation-replay', [ConversationController::class, 'admin_replay_store'])->name('admin_replay.store');

                Route::resource('query', QueryController::class);

                Route::get('contact-messages', [SupportController::class, 'contact_messages'])->name('contact_messages');
                Route::put('contact-status/{id}', [SupportController::class, 'contact_status'])->name('contact_status');
                Route::delete("/contact-messages-delete/{id}", [SupportController::class, 'contact_messages_delete'])->name('contact_messages_delete');
            });

            // OTP
            Route::name('otp.')->group(function () {
                Route::get("/otp-configuration", [OtpController::class, 'otp_configuration'])->name('otp_configuration');


                Route::get("/sms-templates", [OtpController::class, 'sms_templates'])->name('sms_templates');
                Route::post("/sms-templates-update", [OtpController::class, 'sms_templates_update'])->name('sms_templates_update');
            });



            // Website Setup
            Route::name('website.')->group(function () {
                Route::resource('pages', PageController::class);
                Route::get('pages/edit/{lang}/{id}', [PageController::class, 'page_edit'])->name('page_edit');

                Route::get('website/appearence', [WebsiteSetupController::class, 'appearence'])->name('appearence');
                Route::get('website/select-theme', [WebsiteSetupController::class, 'select_theme'])->name('select_theme');
                Route::get('website/homepage-setting', [WebsiteSetupController::class, 'homepage_setting'])->name('homepage_setting');
                Route::get('website/header-setting/{lang?}', [WebsiteSetupController::class, 'header_setting'])->name('header_setting');
                Route::get('website/footer-setting/{lang?}', [WebsiteSetupController::class, 'footer_setting'])->name('footer_setting');
                Route::get('website/contact-page/{lang?}', [WebsiteSetupController::class, 'contact_page'])->name('contact_page');

                Route::get('website/benefits', [BenefitController::class, 'benefits'])->name('benefits');
                Route::get('benefit/edit/{lang}/{id}', [BenefitController::class, 'benefit_edit'])->name('benefit_edit');
                Route::put('benefit/update/{id}', [BenefitController::class, 'benefit_update'])->name('benefit_update');
                Route::put('benefit/status/{id}', [BenefitController::class, 'benefit_status'])->name('benefit_status');
            });

            // Setup & Configaretion
            Route::name('configuration.')->group(function () {
                Route::resource("language", LanguageController::class);
                Route::post('features/activation', [ConfigurationController::class, 'FeaturesActivation'])->name('features.activation');
                Route::put('language/status/{id}', [LanguageController::class, 'status'])->name('language.status');
                Route::get("language/translate/{lang}", [LanguageController::class, 'translate'])->name('language.translate');
                Route::put("language/translate/{id}", [LanguageController::class, 'update_translate'])->name('language.update_translate');
                Route::get("features-activation", [ConfigurationController::class, 'features_activation'])->name('features_activation');
                Route::post("language/translate", [LanguageController::class, 'update_translate'])->name('language.update_translate');
                Route::get("smtpsetting", [ConfigurationController::class, 'smtp_setting'])->name('smtp_setting');
                Route::post('/test/smtp', [ConfigurationController::class, 'testEmail'])->name('test.smtp');

                Route::get("paymentmethod", [ConfigurationController::class, 'payment_method'])->name('payment_method');
                Route::post('/payment_method_activation', [ConfigurationController::class, 'payment_method_activation'])->name('payment_method_activation');
                Route::post('/payment_method_update', [ConfigurationController::class, 'payment_method_update'])->name('payment_method_update');

                Route::post('configuration/update/{lang?}', [ConfigurationController::class, 'settingsUpdate'])->name('update');
                Route::post('configuration/env-update/', [ConfigurationController::class, 'envUpdate'])->name('envUpdate');

                Route::get("/socialmedialogins", [ConfigurationController::class, 'social_media_logins'])->name('social_media_logins');
                Route::get("/facebook", [ConfigurationController::class, 'facebook'])->name('facebook');
                Route::get("/google", [ConfigurationController::class, 'google'])->name('google');
                Route::get("/pusher", [ConfigurationController::class, 'pusher'])->name('pusher');
                Route::post("/pusher/update", [ConfigurationController::class, 'pusher_update'])->name('pusher_update');

                Route::name('shipping.')->group(function () {
                    Route::get("shipping_configuration", [ConfigurationController::class, 'shipping_configuration'])->name('shipping_configuration');
                    Route::post("shipping_configuration/update", [ConfigurationController::class, 'shipping_configuration_update'])->name('shipping_configuration_update');
                    //Country Route
                    Route::resource("country", CountryController::class);
                    Route::put("country/status/{id}", [CountryController::class, 'status'])->name('country.status');
                    //State Route
                    Route::resource("state", StateController::class);
                    Route::put("state/status/{id}", [StateController::class, 'status'])->name('state.status');
                    //City Route
                    Route::resource("city", CityController::class);
                    Route::put("city/status/{id}", [CityController::class, 'status'])->name('city.status');
                    Route::get('city/edit/{lang}/{id}', [CityController::class, 'city_edit'])->name('city_edit');
                });

                Route::controller(LanguageController::class)->group(function () {
                    Route::put('language/status/{id}', 'status')->name('language.status');
                    Route::put('language/default/{id}', 'default')->name('language.default');
                    Route::get("language/translate/{lang}", 'translate')->name('language.translate');
                    Route::put("language/translate/{id}", 'update_translate')->name('language.update_translate');
                    Route::post("language/translate", 'update_translate')->name('language.update_translate');
                });

                Route::resource("currency", CurrencyController::class);
                Route::put('currency/update_status/{id}', [CurrencyController::class, 'update_status'])->name('currency.update_status');
                // Route::resource("tax", TaxController::class);
            });


            // Staff
            Route::name('staff.')->group(function () {
                Route::resource("staffs", StaffsController::class);
                Route::resource("permission", PermissionController::class);
                Route::resource("role", RoleController::class);
            });

            // System
            Route::name('system.')->group(function () {
                Route::get("server_status", [SystemController::class, 'server_status'])->name('server_status');
                Route::get("update_system", [SystemController::class, 'update_system'])->name('update_system');
            });

            Route::get('/is_addon_activated/{addon}', function (string $addon) {
                return true;
                // return addon_is_activated($addon);
            })->name('is_addon_activated');

            // Addon
            Route::name('addon.')->group(function () {
                Route::get('installed-addon', [AddonController::class, 'installed_addon'])->name('installed_addon');
                Route::get('available-addon', [AddonController::class, 'available_addon'])->name('available_addon');
            });
        });
    });
});
