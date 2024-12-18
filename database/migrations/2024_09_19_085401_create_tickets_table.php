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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('user_type');
            $table->string('code');
            $table->string('subject');
            $table->longText('details')->nullable();
            $table->longText('files')->nullable();
            $table->string('status')->default('pending');
            $table->tinyInteger('viewed')->default('0');
            $table->tinyInteger('client_viewed')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
