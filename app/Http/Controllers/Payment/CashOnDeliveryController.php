<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CashOnDeliveryController extends Controller
{
    public function pay()
    {

        return redirect()->route('order_confirmed', base64_encode(Session::get('combined_order_id')))->with('success', 'Your order has been placed successfully');
    }
}
