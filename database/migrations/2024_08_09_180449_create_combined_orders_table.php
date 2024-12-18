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
        Schema::create('combined_orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->text('shipping_address')->nullable();
            $table->double('grand_total')->default('0.00');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('combined_orders');
    }
};
