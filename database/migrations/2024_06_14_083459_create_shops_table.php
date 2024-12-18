<?php

use App\Models\Shop;
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
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('seller_id');
            $table->string('name');
            $table->string('logo')->nullable();
            $table->string('shop_banner')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->double('rating')->nullable()->default('0.00');
            $table->integer('num_of_sale')->default('0');
            $table->integer('num_of_reviews')->default('0');
            $table->integer('verification_status')->default('0');
            $table->longText('verification_info')->nullable();
            $table->integer('cash_on_delivery_status')->default('0');
            $table->double('admin_to_pay')->default('0.00');
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('google')->nullable();
            $table->string('twitter')->nullable();
            $table->string('youtube')->nullable();
            $table->string('slug')->nullable();
            $table->string('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->double('shipping_cost')->default('0.00');
            $table->float('delivery_pickup_latitude')->nullable();
            $table->float('delivery_pickup_longitude')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Shop::create([
            'seller_id' => 1,
            'name' => 'Seller Shop',
            'slug' => 'seller-shop',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shops');
    }
};
