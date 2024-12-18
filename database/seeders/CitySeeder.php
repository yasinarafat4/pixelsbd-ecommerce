<?php

namespace Database\Seeders;

use App\Models\City;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        City::truncate();
        $path   = base_path('public/sql/cities.sql');
        $sql    = file_get_contents($path);
        DB::unprepared($sql);
    }
}
