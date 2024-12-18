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
        Schema::create('flash_deals', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('slug');
            $table->string('banner')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->tinyInteger('status')->default('0');
            $table->tinyInteger('featured')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flash_deals');
    }
};
