<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\WalletController;
use App\Models\CombinedOrder;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SebaCarrasco93\LaravelPayku\Facades\LaravelPayku;
use SebaCarrasco93\LaravelPayku\Models\PaykuTransaction;
use Session;
use Auth;

class PaykuController
{
    public function pay(Request $request)
    {
        if ($request->session()->has('payment_type')) {
            $paymentType = $request->session()->get('payment_type');
            $paymentData = Session::get('payment_data');

            $orderCode = rand(0000000, 11111111) . date('is');
            $email = Auth::user()->email;

            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
                $data = [
                    'order' => $orderCode,
                    'subject' => 'Cart Payment',
                    'amount' => $combined_order->grand_total,
                    'email' => $email
                ];
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                $data = [
                    'order' => $orderCode,
                    'subject' => 'Order Re Payment',
                    'amount' => $order->grand_total,
                    'email' => $email
                ];
            } elseif ($paymentType == 'wallet_payment') {
                $data = [
                    'order' => $orderCode,
                    'subject' => 'Wallet Payment',
                    'amount' => $paymentData['amount'],
                    'email' => $email
                ];
            }
        }

        return LaravelPayku::create($data['order'], $data['subject'], $data['amount'], $data['email']);
    }

    public function return($order)
    {
        $detail = LaravelPayku::return($order);

        return $detail;
    }

    public function notify($order)
    {
        $result = LaravelPayku::notify($order);
        $routeName = config('laravel-payku.route_finish_name');

        $routeExists = Route::has($routeName);

        if ($routeExists) {
            return redirect()->route($routeName, $result);
        }

        return view('payku::notify.missing-route', compact('result', 'routeName'));
    }

    public function callback($id)
    {
        $paykuTransaction = PaykuTransaction::find($id);

        if ($paykuTransaction->status == 'success') {
            $payment_type = Session::get('payment_type');
            $paymentData = session()->get('payment_data');

            if ($payment_type == 'cart_payment') {
                return (new CheckoutController)->checkout_done(session()->get('combined_order_id'), $paykuTransaction->toJson());
            } elseif ($payment_type == 'order_re_payment') {
                return (new CheckoutController)->orderRePaymentDone($paymentData, $paykuTransaction->toJson());
            } elseif ($payment_type == 'wallet_payment') {
                return (new WalletController)->wallet_payment_done($paymentData, $paykuTransaction->toJson());
            }
        } else {
            flash_error(trans('Payment failed'));
            return redirect()->route('home');
        }
    }
}
