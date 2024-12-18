<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currencyData = [
            [
                'name' => 'Doller',
                'symbol' => '$',
                'code' => 'USD',
                'exchange_rate' => '1.0',
                'status' => 1,
            ],
            [
                'name' => 'Taka',
                'symbol' => '৳',
                'code' => 'BDT',
                'exchange_rate' => '120',
                'status' => 1,
            ],
            [
                'name' => 'Indian Rupee',
                'symbol' => '₹',
                'code' => 'Rupee',
                'exchange_rate' => '117',
                'status' => 1,
            ],
        ];
        Currency::insert($currencyData);
    }
}
