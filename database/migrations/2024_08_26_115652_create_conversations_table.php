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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sender_id');
            $table->string('sender_user_type');
            $table->bigInteger('receiver_id');
            $table->string('receiver_user_type');
            $table->text('title')->nullable();
            $table->tinyInteger('sender_viewed')->default('1');
            $table->tinyInteger('receiver_viewed')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
