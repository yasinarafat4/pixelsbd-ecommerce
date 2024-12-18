<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Models\CombinedOrder;
use App\Models\Order;
use Session;
use Auth;

class WalletController extends Controller
{
    public function pay()
    {
        if (Session::has('payment_type')) {
            $paymentType = Session::get('payment_type');
            $paymentData = Session::get('payment_data');
            $user = auth('customer')->user();

            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
                if ($user->balance >= $combined_order->grand_total) {
                    $user->balance -= $combined_order->grand_total;
                    $user->save();
                    return (new CheckoutController)->checkout_done($combined_order->id, null);
                }
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                if ($user->balance >= $order->grand_total) {
                    $user->balance -= $order->grand_total;
                    $user->save();
                    return (new CheckoutController)->orderRePaymentDone($paymentData);
                }
            }
        }
    }
}
