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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id');
            $table->bigInteger('seller_id')->nullable();
            $table->bigInteger('product_id');
            $table->longText('variation')->nullable();
            $table->double('price')->nullable();
            $table->double('tax')->nullable();
            $table->double('shipping_cost')->nullable();
            $table->integer('quantity')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('delivery_status')->nullable();
            $table->string('shipping_type')->nullable();
            $table->string('product_referral_code')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
