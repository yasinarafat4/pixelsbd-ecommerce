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
        Schema::create('delivery_boys', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('creator_id');
            $table->string('creator_type')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->double('balance')->nullable();
            $table->double('total_collection')->default('0.00');
            $table->double('total_earning')->default('0.00');
            $table->double('monthly_salary')->nullable();
            $table->double('order_commission')->nullable();
            $table->string('image')->nullable();
            $table->string('document_type')->nullable();
            $table->string('nid_front')->nullable();
            $table->string('nid_back')->nullable();
            $table->string('passport')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->rememberToken();
            $table->text('verification_code')->nullable();
            $table->tinyInteger('banned')->default('0');
            $table->bigInteger('country_id');
            $table->bigInteger('state_id');
            $table->bigInteger('city_id');
            $table->text('address');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_boys');
    }
};
