<?php

use App\Http\Controllers\Seller\Auth\LoginController;
use App\Http\Controllers\Seller\CommissionHistoryController;
use App\Http\Controllers\Seller\ConversationController;
use App\Http\Controllers\Seller\CouponController;
use App\Http\Controllers\Seller\DeliveryBoyController;
use App\Http\Controllers\Seller\MoneyWithdrawController;
use App\Http\Controllers\Seller\NotificationController;
use App\Http\Controllers\Seller\OrderController;
use App\Http\Controllers\Seller\PaymentHistoryController;
use App\Http\Controllers\Seller\SellerDashboardController;
use App\Http\Controllers\Seller\ProductsController;
use App\Http\Controllers\Seller\QueryController;
use App\Http\Controllers\Seller\ShopSettingController;
use App\Http\Controllers\Seller\SupportController;
use App\Http\Controllers\Seller\UploadController;

Route::middleware(['XSS', 'licensed', 'seller_system'])->group(function () {

    Route::get('seller/login', [LoginController::class, 'index'])->name('seller.login');
    Route::post('seller/login', [LoginController::class, 'login'])->name('seller.login');

    Route::get('seller/register', [LoginController::class, 'register'])->name('seller.register');
    Route::post('seller/register', [LoginController::class, 'store'])->name('seller.register');


    Route::post('seller/logout', [LoginController::class, 'logout'])->name('seller.logout');

    Route::get('/seller', function () {
        return redirect()->route('seller.dashboard');
    });

    Route::group(['prefix' => 'seller', 'middleware' => ['auth:seller', 'seller_unbanned']], function () {


        Route::name('seller.')->group(function () {
            // Upload routes
            Route::resource("upload", UploadController::class);
            Route::get('image/list', [UploadController::class, 'seller_image_list'])->name('image_list');
            Route::post('image/upload/modal', [UploadController::class, 'seller_image_upload_modal'])->name('image_upload_modal');
            Route::post('image/upload', [UploadController::class, 'seller_image_upload'])->name('image_upload');

            Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('dashboard');

            Route::get('seller-profile', [SellerDashboardController::class, 'seller_profile'])->name('seller_profile');
            Route::put('seller-profile/{id}', [SellerDashboardController::class, 'seller_profile_update'])->name('seller_profile_update');
            Route::post('verify-email', [SellerDashboardController::class, 'verify_email'])->name('verify_email');
            Route::get('email-change/callback', [SellerDashboardController::class, 'email_change_callback'])->name('email_change.callback');
            Route::post('/update-password', [SellerDashboardController::class, 'password_update'])->name('password_update');

            Route::get('seller/verification', [SellerDashboardController::class, 'seller_verification'])->name('seller_verification');
            Route::post('verification/form', [SellerDashboardController::class, 'seller_verification_submit'])->name('seller_verification_submit');


            Route::name('product.')->group(function () {
                Route::resource("products", ProductsController::class);
                Route::resource('query', QueryController::class);
                Route::get('product/edit/{lang}/{id}', [ProductsController::class, 'product_edit'])->name('product_edit');
                Route::get('/products/duplicate/{id}', [ProductsController::class, 'duplicate'])->name('duplicate');
                Route::put('product/published_status/{id}', [ProductsController::class, 'published_status'])->name('published_status');
                Route::put('product/featured_status/{id}', [ProductsController::class, 'featured_status'])->name('featured_status');
                Route::post("product/sku-combination", [ProductsController::class, 'sku_combination'])->name('sku_combination');
                Route::post("product/selected-attribute", [ProductsController::class, 'selected_attribute'])->name('selected_attribute');
                Route::get('category-based-discount', [ProductsController::class, 'category_based_discount'])->name('category_based_discount');
                Route::get('/product/bulk-import', [ProductsController::class, 'bulk_import'])->name('bulk_import');
                Route::get('/product/product-reviews', [ProductsController::class, 'product_reviews'])->name('product_reviews');
            });

            // Orders
            Route::get("orders", [OrderController::class, 'seller_orders'])->name('seller_orders');
            Route::get("orders/view/{id}", [OrderController::class, 'seller_orders_view'])->name('seller_orders_view');
            Route::get('invoice-download/{id}', [OrderController::class, 'invoice_download'])->name('invoice_download');
            Route::delete('orders/destroy/{id}', [OrderController::class, 'seller_orders_delete'])->name('seller_orders_delete');
            Route::post('/orders/update_delivery_status', [OrderController::class, 'update_delivery_status'])->name('update_delivery_status');
            Route::post('/orders/update_payment_status', [OrderController::class, 'update_payment_status'])->name('update_payment_status');
            Route::post('/orders/delivery-boy-assign', [OrderController::class, 'assign_delivery_boy'])->name('delivery-boy-assign');


            Route::get('all-notifications', [NotificationController::class, 'index'])->name('all_notifications');
            Route::get('/notification/read-and-redirect/{id}', [NotificationController::class, 'readAndRedirect'])->name('notification.read-and-redirect');
            Route::delete('notification/destroy/{id}', [NotificationController::class, 'notification_destroy'])->name('notification_destroy');

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
            });

            Route::resource("coupon", CouponController::class);
            Route::put("update-coupon-status/{id}", [CouponController::class, 'update_coupon_status'])->name('update_coupon_status');

            Route::get("shop-setting", [ShopSettingController::class, 'index'])->name('shop_setting.index');
            Route::put("update-shop-info/{id}", [ShopSettingController::class, 'update_shop_info'])->name('update_shop_info');
            Route::put("update-delivery-pickup-point/{id}", [ShopSettingController::class, 'update_delivery_pickup_point'])->name('update_delivery_pickup_point');
            Route::put("update-social-media-links/{id}", [ShopSettingController::class, 'update_social_media_links'])->name('update_social_media_links');

            Route::get('payment-history', [PaymentHistoryController::class, 'payment_history'])->name('payment_history');
            Route::get('money-withdraw', [MoneyWithdrawController::class, 'money_withdraw'])->name('money_withdraw');
            Route::post('money-withdraw/store', [MoneyWithdrawController::class, 'money_withdraw_store'])->name('money_withdraw_store');

            Route::get('commission-history', [CommissionHistoryController::class, 'commission_history'])->name('commission_history');

            Route::get("conversation", [ConversationController::class, 'seller_conversation'])->name('conversation');
            Route::get('/conversation-details/{id}', [ConversationController::class, 'seller_conversation_details'])->name('conversation_details');
            Route::post('/replay', [ConversationController::class, 'seller_replay_store'])->name('seller_replay.store');


            Route::get("support-ticket", [SupportController::class, 'support_ticket'])->name('support_ticket');
            Route::get("support-ticket/create", [SupportController::class, 'create'])->name('support_ticket.create');
            Route::post('/support-ticket-store', [SupportController::class, 'support_ticket_store'])->name('support_ticket_store');
            Route::get('/support-ticket-details/{id}', [SupportController::class, 'support_ticket_details'])->name('support_ticket_details');
            Route::post('/ticket-replay', [SupportController::class, 'ticket_replay_store'])->name('ticket_replay.store');

            // Route::name('report.')->group(function () {
            //     Route::get("reports/commission-history", [ReportsController::class, 'commission_history'])->name('commission_history');
            //     Route::get("reports/earning-report", [ReportsController::class, 'earning_report'])->name('earning_report');
            //     Route::get("reports/inhouse-product-sale", [ReportsController::class, 'inhouse_product_sale'])->name('inhouse_product_sale');
            //     Route::get("reports/products-stock", [ReportsController::class, 'products_stock'])->name('products_stock');
            //     Route::get("reports/products-wishlist", [ReportsController::class, 'products_wishlist'])->name('products_wishlist');
            //     Route::get("reports/seller-product-sale", [ReportsController::class, 'seller_product_sale'])->name('seller_product_sale');
            //     Route::get("reports/user-searches", [ReportsController::class, 'user_searches'])->name('user_searches');
            //     Route::get("reports/wallet-recharge-history", [ReportsController::class, 'wallet_recharge_history'])->name('wallet_recharge_history');
            // });


            // Route::name('support.')->group(function () {
            //     Route::resource("ticket", SupportController::class);
            //     Route::get('ticket/ticket-replay/{id}', [SupportController::class, 'ticket_replay'])->name('ticket_replay');
            //     Route::get('ticket/update_replay/{id}', [SupportController::class, 'update_replay'])->name('update_replay');
            // });
        });
    });
});
