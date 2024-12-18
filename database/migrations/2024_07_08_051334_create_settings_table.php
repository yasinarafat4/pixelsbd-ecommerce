<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Laraeast\LaravelSettings\Facades\Settings;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('key')->index();
            $table->string('locale')->nullable()->index();
            $table->longText('value')->nullable();
            $table->unique(['key', 'locale']);
            $table->timestamps();
        });

        $headerMenu = [
            [
                'label' => 'Home',
                'link' => 'https://domain.com',
            ],
            [
                'label' => 'Brands',
                'link' => 'https://domain.com/brands',
            ],
            [
                'label' => 'Flash Sale',
                'link' => 'https://domain.com/flash-sale',
            ],
            [
                'label' => 'Sellers',
                'link' => 'https://domain.com/sellers',
            ],
            [
                'label' => 'Coupon',
                'link' => 'https://domain.com/coupon',
            ],
        ];

        $verificationForm = [
            [
                'id' => Carbon::now()->timestamp,
                'label' => 'Name',
                'type' => 'Text',
            ],
            [
                'id' => Carbon::now()->timestamp,
                'label' => 'Phone Number',
                'type' => 'Text',
            ],
            [
                'id' => Carbon::now()->timestamp,
                'label' => 'Gender',
                'type' => 'Select',
                'options' => [
                    [
                        'id' => Carbon::now()->timestamp,
                        'value' => 'Select Gender'
                    ],
                    [
                        'id' => Carbon::now()->timestamp,
                        'value' => 'Male'
                    ],
                    [
                        'id' => Carbon::now()->timestamp,
                        'value' => 'Female',
                    ]
                ]
            ],
            [
                'id' => Carbon::now()->timestamp,
                'label' => 'Address',
                'type' => 'Text',
            ],
            [
                'id' => Carbon::now()->timestamp,
                'label' => 'Trade License',
                'type' => 'File',
            ],
            [
                'id' => Carbon::now()->timestamp,
                'label' => 'NID',
                'type' => 'File',
            ]
        ];


        Settings::set('default_language', 'en');
        Settings::set('default_currency', 1);
        Settings::set('symbol_format', 1);
        Settings::set('decimal_separator', 1);
        Settings::set('no_of_decimal', 1);
        Settings::set('cash_payment', 1);
        Settings::set('primary_color', '#4c52de');
        Settings::set('primary_hover_color', '#373bb3');
        Settings::set('secondary_color', '#41b6e3');
        Settings::set('secondary_hover_color', '#2a8bb3');
        Settings::set('header_menu', $headerMenu);
        Settings::set('current_version', '1.0.0');
        Settings::set('verification_form', $verificationForm);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
