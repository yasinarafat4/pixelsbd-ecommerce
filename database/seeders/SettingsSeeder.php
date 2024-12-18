<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Laraeast\LaravelSettings\Facades\Settings;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Settings::set('default_language', 'en');
        Settings::set('default_currency', 1);
        Settings::set('symbol_format', 1);
        Settings::set('decimal_separator', 1);
        Settings::set('no_of_decimal', 1);
        Settings::set('primary_color', '#85B567');
        Settings::set('primary_hover_color', '#85B567');
        Settings::set('secondary_color', '#D42D2A');
        Settings::set('secondary_hover_color', '#D42D2A');
        Settings::set('header_menu', []);
    }
}
