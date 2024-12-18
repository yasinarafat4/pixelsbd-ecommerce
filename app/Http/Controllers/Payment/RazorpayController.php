<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\WalletController;
use Illuminate\Http\Request;
use App\Models\CombinedOrder;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Razorpay\Api\Api;
use Session;


class RazorpayController extends Controller
{
    public function pay(Request $request)
    {
        $payment_track = array();
        $api = new Api(env('RAZOR_KEY'), env('RAZOR_SECRET'));
        if (Session::has('payment_type')) {
            $paymentType = Session::get('payment_type');
            $paymentData = Session::get('payment_data');

            if ($paymentType == 'cart_payment') {

                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
                $res = $api->order->create(array('receipt' => '123', 'amount' => round($combined_order->grand_total) * 100, 'currency' => 'INR', 'notes' => array('key1' => 'value3', 'key2' => 'value2')));

                return view('frontend.razor_wallet.order_payment_Razorpay', compact('combined_order', 'res'));
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                $res = $api->order->create(array('receipt' => '123', 'amount' => $order->amount * 100, 'currency' => 'INR', 'notes' => array('key1' => 'value3', 'key2' => 'value2')));

                return view('frontend.razor_wallet.order_re_payment_Razorpay', compact('res'));
            } elseif ($paymentType == 'wallet_payment') {

                $res = $api->order->create(array('receipt' => '123', 'amount' => $paymentData['amount'] * 100, 'currency' => 'INR', 'notes' => array('key1' => 'value3', 'key2' => 'value2')));
                return view('frontend.razor_wallet.wallet_payment_Razorpay', compact('res'));
            }
        }
    }

    public function payment(Request $request)
    {

        //Input items of form
        $input = $request->all();
        //get API Configuration
        $api = new Api(env('RAZOR_KEY'), env('RAZOR_SECRET'));

        //Fetch payment information by razorpay_payment_id
        $payment = $api->payment->fetch($input['razorpay_payment_id']);
        $response =  $payment;

        if ($payment->notes['user_id']) {
            $user = User::find((int) $payment->notes['user_id']);
            Auth::login($user);
        }

        if (count($input)  && !empty($input['razorpay_payment_id'])) {
            $payment_detalis = null;

            if ($payment['status'] != 'captured') {
                try {
                    // Verify Payment Signature
                    $attributes = array(
                        'razorpay_order_id' => $input['razorpay_order_id'],
                        'razorpay_payment_id' => $input['razorpay_payment_id'],
                        'razorpay_signature' => $input['razorpay_signature']
                    );
                    $api->utility->verifyPaymentSignature($attributes);
                    //End of  Verify Payment Signature
                    $response = $api->payment->fetch($input['razorpay_payment_id'])->capture(array('amount' => $payment['amount']));
                } catch (\Exception $e) {
                    return  $e->getMessage();
                    \Session::put('error', $e->getMessage());
                    return redirect()->route('home');
                }
            }

            $payment_detalis = json_encode(
                array(
                    'id' => $response['id'],
                    'method' => $response['method'],
                    'amount' => $response['amount'],
                    'currency' => $response['currency']
                )
            );


            // Do something here for store payment details in database...
            if (Session::has('payment_type')) {
                $paymentType = Session::get('payment_type');
                $paymentData = Session::get('payment_data');

                if ($paymentType == 'cart_payment') {
                    return (new CheckoutController)->checkout_done(Session::get('combined_order_id'), $payment_detalis);
                } elseif ($paymentType == 'order_re_payment') {
                    return (new CheckoutController)->orderRePaymentDone($paymentData, $payment_detalis);
                } elseif ($paymentType == 'wallet_payment') {
                    return (new WalletController)->wallet_payment_done($paymentData, $payment_detalis);
                }
            }
        }
    }
}
