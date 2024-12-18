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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->mediumText('address');
            $table->bigInteger('country_id');
            $table->bigInteger('state_id');
            $table->bigInteger('city_id');
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->string('zip_code');
            $table->string('phone');
            $table->tinyInteger('set_default')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
