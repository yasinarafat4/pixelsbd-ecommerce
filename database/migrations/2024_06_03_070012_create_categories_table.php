<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Kalnoy\Nestedset\NestedSet;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->string('slug');
            $table->integer('position')->nullable();
            $table->integer('digital')->default('0');
            $table->double('commision_rate')->default('0.00');
            $table->integer('home_status')->default('0');
            $table->integer('featured')->default('0');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('filtering_attributes')->nullable();
            $table->string('icon')->default('/assets/placeholder/placeholder-1-1.png');
            $table->string('cover_image')->default('/assets/placeholder/placeholder-1-1.png');
            $table->string('banner_image')->default('/assets/placeholder/placeholder-1-1.png');
            NestedSet::columns($table);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
