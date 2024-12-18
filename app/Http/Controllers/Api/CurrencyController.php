<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\CurrencyCollection;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function currencies()
    {
        return new CurrencyCollection(Currency::active()->get());
    }
}
