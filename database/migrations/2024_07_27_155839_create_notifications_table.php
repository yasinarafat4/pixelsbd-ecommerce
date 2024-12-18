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
        Schema::create('notifications', function (Blueprint $table) {
            $table->char('id');
            $table->integer('notification_type_id');
            $table->string('type');
            $table->string('notifiable_type');
            $table->bigInteger('notifiable_id')->unsigned();
            $table->text('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->primary('id');
            $table->index(['notifiable_type', 'notifiable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
