<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('combined_order_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('guest_id')->nullable();
            $table->string('seller_type')->nullable();
            $table->bigInteger('seller_id')->nullable();
            $table->longText('shipping_address')->nullable();
            $table->longText('additional_info')->nullable();
            $table->string('shipping_type')->nullable();
            $table->string('order_from')->nullable();
            $table->string('delivery_status')->default('pending');
            $table->string('payment_type')->nullable();
            $table->string('payment_status')->default('unpaid');
            $table->longText('payment_details')->nullable();
            $table->double('grand_total')->default('0.00');
            $table->double('coupon_discount')->default('0.00');
            $table->string('code')->nullable();
            $table->longText('tracking_code')->nullable();
            $table->date('date')->nullable();
            $table->tinyInteger('viewed')->default('0');
            $table->tinyInteger('delivery_viewed')->default('0');
            $table->tinyInteger('payment_status_viewed')->default('0');
            $table->tinyInteger('commission_calculated')->default('0');
            $table->tinyInteger('notified')->default('0');
            $table->bigInteger('assign_delivery_boy')->nullable();
            $table->tinyInteger('cancel_request')->default('0');
            $table->tinyInteger('cancel_request_at')->default('0');
            $table->timestamp('delivery_history_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
