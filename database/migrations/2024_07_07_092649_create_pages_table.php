<?php

use App\Models\Page;
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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('content')->nullable();
            $table->string('type')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        $pages = [
            [
                'title' => '{"en":"About Us"}',
                'content' => '{"en":""}',
                'type' => 'about_us'
            ],
            [
                'title' => '{"en":"Return Policy"}',
                'content' => '{"en":""}',
                'type' => 'return_policy'
            ],
            [
                'title' => '{"en":"Refund Policy"}',
                'content' => '{"en":""}',
                'type' => 'refund_policy'
            ],
            [
                'title' => '{"en":"Privacy Policy"}',
                'content' => '{"en":""}',
                'type' => 'privacy_policy'
            ],
            [
                'title' => '{"en":"Terms and Conditions"}',
                'content' => '{"en":""}',
                'type' => 'terms_and_conditions'
            ],
        ];

        Page::insert($pages);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
