<?php

use App\Http\Controllers\DeliveryBoy\Auth\LoginController;
use App\Http\Controllers\DeliveryBoy\DeliveryBoyController;

Route::middleware(['XSS', 'licensed', 'delivery_boy_system'])->group(function () {
    Route::get('/delivery-boy/login', [LoginController::class, 'index'])->name('delivery_boy.login');
    Route::post('/delivery-boy/login', [LoginController::class, 'login'])->name('delivery_boy.login.post');

    Route::post('/delivery_boy/logout', [LoginController::class, 'logout'])->name('delivery_boy.logout');

    Route::get('/delivery-boy', function () {
        return redirect()->route('delivery_boy.dashboard');
    });

    Route::group(['prefix' => 'delivery-boy', 'middleware' => ['auth:delivery_boy']], function () {

        Route::name('delivery_boy.')->group(function () {

            Route::get('/dashboard', [DeliveryBoyController::class, 'index'])->name('dashboard');

            Route::get('/assigned-delivery', [DeliveryBoyController::class, 'assigned_delivery'])->name('assigned_delivery');
            Route::get('/picked-up-delivery', [DeliveryBoyController::class, 'picked_up_delivery'])->name('picked_up_delivery');
            Route::get('/on-the-way-delivery', [DeliveryBoyController::class, 'on_the_way_delivery'])->name('on_the_way_delivery');
            Route::get('/pending-delivery', [DeliveryBoyController::class, 'pending_delivery'])->name('pending_delivery');
            Route::get('/completed-delivery', [DeliveryBoyController::class, 'completed_delivery'])->name('completed_delivery');
            Route::get('/cancelled-delivery', [DeliveryBoyController::class, 'cancelled_delivery'])->name('cancelled_delivery');
            Route::get('/request-to-cancel', [DeliveryBoyController::class, 'request_to_cancel'])->name('request_to_cancel');
            Route::get('/total-collection', [DeliveryBoyController::class, 'total_collection'])->name('total_collection');
            Route::get('/total-earnings', [DeliveryBoyController::class, 'total_earning'])->name('earnings');
            Route::post('/update_delivery_status', [DeliveryBoyController::class, 'update_delivery_status'])->name('update_delivery_status');
            Route::post('/cancel-request', [DeliveryBoyController::class, 'cancel_request'])->name('cancel_request');

            Route::get('delivery-boy-profile', [DeliveryBoyController::class, 'delivery_boy_profile'])->name('delivery_boy_profile');
            Route::put('delivery-boy-profile/{id}', [DeliveryBoyController::class, 'delivery_boy_profile_update'])->name('delivery_boy_profile_update');
            Route::post('delivery-boy-password', [DeliveryBoyController::class, 'delivery_boy_password_update'])->name('delivery_boy_password_update');

            Route::get('/order-details/{id}', [DeliveryBoyController::class, 'order_details'])->name('order_details');
            Route::get('invoice-download/{id}', [DeliveryBoyController::class, 'invoice_download'])->name('invoice_download');

            Route::post('verify-email', [DeliveryBoyController::class, 'verify_email'])->name('verify_email');
            Route::get('email-change/callback', [DeliveryBoyController::class, 'email_change_callback'])->name('email_change.callback');
        });
    });
});
