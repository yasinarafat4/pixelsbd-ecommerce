<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;

class PayfastController extends Controller
{
    public function pay()
    {
        flash_success(trans("Your order has been placed successfully"));
        return redirect()->route('order_confirmed');
    }
}
