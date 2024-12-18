<?php

use App\Models\Benefit;
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
        Schema::create('benefits', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('sub_title');
            $table->integer('position')->nullable();
            $table->boolean('status')->default(1);
            $table->string('image')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        $benefits = [
            [
                'title' => '{"en":"Fast Delivery"}',
                'sub_title' => '{"en":"Quick delivery across the country"}',
                'position' => 1,
                'image' => '/assets/placeholder/placeholder-1-1.png'
            ],
            [
                'title' => '{"en":"Safe Payment"}',
                'sub_title' => '{"en":"100% Safe Payment"}',
                'position' => 2,
                'image' => '/assets/placeholder/placeholder-1-1.png'
            ],
            [
                'title' => '{"en":"Customer Support"}',
                'sub_title' => '{"en":"24/7 support via call or email"}',
                'position' => 3,
                'image' => '/assets/placeholder/placeholder-1-1.png'
            ],
            [
                'title' => '{"en":"Money Back Guarantee"}',
                'sub_title' => '{"en":"Any returns within 7 days"}',
                'position' => 4,
                'image' => '/assets/placeholder/placeholder-1-1.png'
            ],
        ];

        Benefit::insert($benefits);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('benefits');
    }
};
