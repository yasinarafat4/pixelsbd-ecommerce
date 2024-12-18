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
        Schema::create('firebase_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('text')->nullable();
            $table->string('item_type');
            $table->integer('item_type_id');
            $table->integer('receiver_id');
            $table->tinyInteger('is_read')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('firebase_notifications');
    }
};
