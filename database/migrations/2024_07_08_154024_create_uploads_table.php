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
        Schema::create('uploads', function (Blueprint $table) {
            $table->id();
            $table->string('user_type')->default('admin');
            $table->bigInteger('user_id')->nullable();
            $table->string('name');
            $table->string('url');
            $table->string('file_name');
            $table->string('extension')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size');
            $table->unsignedBigInteger('height');
            $table->unsignedBigInteger('width');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uploads');
    }
};
