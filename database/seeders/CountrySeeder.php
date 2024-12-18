<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path   = base_path('public/sql/countries.sql');
        $sql    = file_get_contents($path);
        DB::unprepared($sql);
    }
}
