<?php

use App\Models\Language;
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
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->tinyInteger('rtl')->default('0');
            $table->string('code');
            $table->tinyInteger('status')->default('1');
            $table->tinyInteger('default')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
        $languageData = [
            [
                'name' => 'English',
                'rtl' => false,
                'code' => 'en',
                'status' => 1,
                'default' => 1,
            ]
        ];
        Language::insert($languageData);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('languages');
    }
};
