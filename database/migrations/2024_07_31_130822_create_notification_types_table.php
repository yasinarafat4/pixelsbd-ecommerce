<?php

use App\Models\NotificationType;
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
        Schema::create('notification_types', function (Blueprint $table) {
            $table->id();
            $table->string('user_type');
            $table->string('type');
            $table->string('name');
            $table->string('image')->nullable();
            $table->text('text');
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();
        });
        NotificationType::truncate();
        $path   = base_path('public/sql/notification_type.sql');
        $sql    = file_get_contents($path);
        DB::unprepared($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_types');
    }
};
