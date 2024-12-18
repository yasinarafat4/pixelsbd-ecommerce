<?php

use App\Models\Seller;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('f_name');
            $table->string('l_name');
            $table->string('image')->nullable();
            $table->string('country_code')->nullable();
            $table->string('phone')->nullable();
            $table->string('email');
            $table->string('password');
            $table->string('status')->default('pending');
            $table->string('bank_name')->nullable();
            $table->string('branch')->nullable();
            $table->string('account_no')->nullable();
            $table->string('holder_name')->nullable();
            $table->integer('bank_routing_no')->nullable();
            $table->integer('bank_payment_status')->default('0');
            $table->integer('cash_payment_status')->default('0');
            $table->text('auth_token')->nullable();
            $table->text('verification_code')->nullable();
            $table->text('new_email_verification_code')->nullable();
            $table->double('sales_commission_percentage')->nullable();
            $table->text('cm_firebase_token')->nullable();
            $table->tinyInteger('pos_status')->nullable();
            $table->double('minimum_order_amount')->nullable();
            $table->integer('free_delivery_status')->nullable();
            $table->double('free_delivery_over_amount')->nullable();
            $table->tinyInteger('banned')->default('0');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        Seller::create([
            'f_name'  => 'Mr.',
            'l_name'  => 'Seller',
            'email'  => 'seller@gmail.com',
            'password'  => Hash::make('password'),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};
