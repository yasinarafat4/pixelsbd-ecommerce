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
        Schema::create('delivery_histories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('delivery_boy_id');
            $table->bigInteger('order_id');
            $table->string('delivery_status');
            $table->string('payment_type');
            $table->double('earning')->default('0.00');
            $table->double('collection')->default('0.00');
            $table->timestamps();
            $table->softDeletes();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_histories');
    }
};
