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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('added_by')->default('admin');
            $table->bigInteger('user_id');
            $table->bigInteger('category_id');
            $table->bigInteger('brand_id')->nullable();
            $table->mediumText('gallery_image')->nullable('/assets/placeholder/placeholder-1-1.png');
            $table->string('thumbnail_image')->default('/assets/placeholder/placeholder-1-1.png');
            $table->string('video_provider')->nullable();
            $table->string('video_link')->nullable();
            $table->string('tags')->nullable();
            $table->longText('description')->nullable();
            $table->double('purchase_price')->nullable()->default('0.00');
            $table->integer('variant_product')->nullable()->default('0');
            $table->mediumText('attributes')->nullable();
            $table->mediumText('choice_options')->nullable();
            $table->mediumText('colors')->nullable();
            $table->mediumText('variations')->nullable();
            $table->integer('todays_deal')->nullable()->default('0');
            $table->integer('published')->nullable()->default('0');
            $table->integer('approved')->nullable()->default('0');
            $table->string('stock_visibility_state')->nullable();
            $table->integer('cash_on_delivery')->nullable()->default('0');
            $table->integer('featured')->default('0');
            $table->integer('seller_featured')->default('0');
            $table->integer('current_stock')->default('0');
            $table->string('unit')->nullable();
            $table->double('unit_price')->nullable()->default('0.00');
            $table->double('weight')->nullable();
            $table->integer('min_qty')->nullable()->default('0');
            $table->integer('low_stock_qty')->nullable()->default('0');
            $table->double('discount')->nullable()->default('0.00');
            $table->string('discount_type')->nullable();
            $table->date('discount_start_date')->nullable();
            $table->date('discount_end_date')->nullable();
            $table->double('tax')->nullable()->default('0.00');
            $table->string('tax_type')->nullable()->default('amount');
            $table->string('shipping_type')->nullable();
            $table->double('shipping_cost')->nullable()->default('0.00');
            $table->integer('is_quantity_multiplied')->nullable()->default('0');
            $table->string('est_shipping_days')->nullable();
            $table->integer('num_of_sale')->nullable()->default('0');
            $table->string('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->string('meta_image')->nullable();
            $table->string('slug');
            $table->double('rating')->nullable()->default('0.00');
            $table->string('barcode')->nullable();
            $table->integer('digital')->nullable()->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
