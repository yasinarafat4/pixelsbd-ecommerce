<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentHistoryController extends Controller
{
    public function payment_history(Request $request)
    {
        $payments = Payment::where('seller_id', auth('seller')->user()->id)->paginate(10);
        return Inertia::render('Seller/PaymentHistory/PaymentHistory', [
            'payments' => $payments
        ]);
    }
}
