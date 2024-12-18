<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path   = base_path('public/sql/paymentmethod.sql');
        $sql    = file_get_contents($path);
        DB::unprepared($sql);
    }
}
