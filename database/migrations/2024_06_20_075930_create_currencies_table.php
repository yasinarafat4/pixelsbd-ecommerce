<?php

use App\Models\Currency;
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
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('symbol');
            $table->string('code');
            $table->double('exchange_rate', 10, 5);
            $table->tinyInteger('status')->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};
