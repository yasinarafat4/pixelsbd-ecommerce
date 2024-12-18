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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('status')->default('1');
            $table->bigInteger('owner_id');
            $table->bigInteger('user_id')->nullable();
            $table->string('temp_user_id')->nullable();
            $table->bigInteger('address_id')->nullable();
            $table->bigInteger('product_id');
            $table->integer('quantity');
            $table->text('variation')->nullable();
            $table->double('price')->default('0.00');
            $table->double('discount')->default('0.00');
            $table->double('tax')->default('0.00');
            $table->double('shipping_cost')->default('0.00');
            $table->string('shipping_type')->nullable();
            $table->string('product_referral_code')->nullable();
            $table->string('coupon_code')->nullable();
            $table->tinyInteger('coupon_applied')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
