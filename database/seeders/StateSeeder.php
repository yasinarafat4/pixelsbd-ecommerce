<?php

namespace Database\Seeders;

use App\Models\State;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        State::truncate();
        $path   = base_path('public/sql/states.sql');
        $sql    = file_get_contents($path);
        DB::unprepared($sql);
    }
}
