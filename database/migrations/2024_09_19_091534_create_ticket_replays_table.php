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
        Schema::create('ticket_replays', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('user_type');
            $table->bigInteger('ticket_id');
            $table->longText('replay')->nullable();
            $table->longText('files')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_replays');
    }
};
