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
        Schema::create('seller_withdraw_requests', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('seller_id');
            $table->double('amount')->nullable();
            $table->text('message')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->tinyInteger('viewed')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_withdraw_requests');
    }
};
