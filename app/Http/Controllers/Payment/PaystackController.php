<?php

namespace App\Http\Controllers\Payment;

use Auth;
use Session;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\CombinedOrder;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Models\Order;
use Unicodeveloper\Paystack\Facades\Paystack;

class PaystackController extends Controller
{
    public function pay(Request $request)
    {
        $post_data = array();
        $post_data['payment_type'] = Session::get('payment_type');

        $user = Auth::user();
        $currency = env('PAYSTACK_CURRENCY_CODE', 'NGN');
        $paymentData = Session::get('payment_data');

        if (Session::get('payment_type') == 'cart_payment') {
            $post_data['combined_order_id'] = Session::get('combined_order_id');
            $array = ['custom_fields' => $post_data];

            $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
            /** @disregard */
            $request->email = $user->email;
            /** @disregard */ $request->amount = round($combined_order->grand_total * 100);
            /** @disregard */ $request->currency = $currency;
            /** @disregard */ $request->metadata = json_encode($array);
            /** @disregard */ $request->reference = Paystack::genTranxRef();
            return Paystack::getAuthorizationUrl()->redirectNow();
        } elseif (Session::get('payment_type') == 'order_re_payment') {
            $post_data['payment_method'] = $paymentData['payment_method'];
            $post_data['order_id'] = $paymentData['order_id'];
            $array = ['custom_fields' => $post_data];

            $order = Order::findOrFail($paymentData['order_id']);

            /** @disregard */ $request->email = $user->email;
            /** @disregard */ $request->amount = round($order->grand_total * 100);
            /** @disregard */ $request->currency = $currency;
            /** @disregard */ $request->metadata = json_encode($array);
            /** @disregard */ $request->reference = Paystack::genTranxRef();
            return Paystack::getAuthorizationUrl()->redirectNow();
        } elseif (Session::get('payment_type') == 'wallet_payment') {
            $post_data['payment_method'] = $paymentData['payment_method'];
            $array = ['custom_fields' => $post_data];

            /** @disregard */ $request->email = $user->email;
            /** @disregard */ $request->amount = round($paymentData['amount'] * 100);
            /** @disregard */ $request->currency = $currency;
            /** @disregard */ $request->metadata = json_encode($array);
            /** @disregard */ $request->reference = Paystack::genTranxRef();
            return Paystack::getAuthorizationUrl()->redirectNow();
        }
    }

    public function paystackNewCallback()
    {
        Paystack::getCallbackData();
    }


    /**
     * Obtain Paystack payment information
     * @return void
     */
    public function handleGatewayCallback()
    {
        // Now you have the payment details,
        // you can store the authorization_code in your db to allow for recurrent subscriptions
        // you can then redirect or do whatever you want
        $payment = Paystack::getPaymentData();

        if ($payment['data']['metadata'] && $payment['data']['metadata']['custom_fields']) {
            $payment_type = $payment['data']['metadata']['custom_fields']['payment_type'];
            if ($payment_type == 'cart_payment') {
                $payment_detalis = json_encode($payment);
                if (!empty($payment['data']) && $payment['data']['status'] == 'success') {
                    Auth::login(User::where('email', $payment['data']['customer']['email'])->first());
                    return (new CheckoutController)->checkout_done($payment['data']['metadata']['custom_fields']['combined_order_id'], $payment_detalis);
                }
                Session::forget('combined_order_id');
                flash_success(trans('Payment cancelled'));
                return redirect()->route('home');
            } elseif ($payment_type == 'order_re_payment') {
                $payment_detalis = json_encode($payment);
                if (!empty($payment['data']) && $payment['data']['status'] == 'success') {
                    $payment_data['order_id'] = $payment['data']['metadata']['custom_fields']['order_id'];
                    $payment_data['payment_method'] = $payment['data']['metadata']['custom_fields']['payment_method'];
                    Auth::login(User::where('email', $payment['data']['customer']['email'])->first());
                    return (new CheckoutController)->orderRePaymentDone($payment_data, $payment);
                }
                Session::forget('payment_data');
                flash_success(trans('Payment cancelled'));
                return redirect()->route('home');
            } elseif ($payment_type == 'wallet_payment') {
                $payment_detalis = json_encode($payment);
                if (!empty($payment['data']) && $payment['data']['status'] == 'success') {
                    $payment_data['amount'] = $payment['data']['amount'] / 100;
                    $payment_data['payment_method'] = $payment['data']['metadata']['custom_fields']['payment_method'];
                    Auth::login(User::where('email', $payment['data']['customer']['email'])->first());
                    return (new WalletController)->wallet_payment_done($payment_data, $payment_detalis);
                }
                Session::forget('payment_data');
                flash_success(trans('Payment cancelled'));
                return redirect()->route('home');
            }
        }
        // for mobile app
        else {
            if (!empty($payment['data']) && $payment['data']['status'] == 'success') {
                return response()->json(['result' => true, 'message' => "Payment is successful", 'payment_details' => $payment]);
            } else {
                return response()->json(['result' => false, 'message' => "Payment unsuccessful", 'payment_details' => $payment]);
            }
        }
    }
}
