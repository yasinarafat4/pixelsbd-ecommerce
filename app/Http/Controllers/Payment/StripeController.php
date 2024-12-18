<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\WalletController;
use App\Models\CombinedOrder;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class StripeController extends Controller
{
    public function pay()
    {
        return view('payment.stripe');
    }

    public function create_checkout_session(Request $request)
    {
        $amount = 0;
        if ($request->session()->has('payment_type')) {
            $paymentType = $request->session()->get('payment_type');
            $paymentData = Session::get('payment_data');
            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
                $client_reference_id = $combined_order->id;
                $amount = round(only_price($combined_order->grand_total) * 100);
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                $amount = round(only_price($order->grand_total) * 100);
                $client_reference_id = auth()->id();
            } elseif ($paymentType == 'wallet_payment') {
                $amount = round($request->session()->get('payment_data')['amount'] * 100);
                $client_reference_id = auth()->id();
            }
        }

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => active_currency_code(),
                        'product_data' => [
                            'name' => "Payment"
                        ],
                        'unit_amount' => $amount,
                    ],
                    'quantity' => 1,
                ]
            ],
            'mode' => 'payment',
            'client_reference_id' => $client_reference_id,
            'success_url' => url("/stripe/success?session_id={CHECKOUT_SESSION_ID}"),
            'cancel_url' => route('stripe.cancel'),
        ]);

        return response()->json(['id' => $session->id, 'status' => 200]);
    }

    public function checkout_payment_detail()
    {
        $data['url'] = $_SERVER['SERVER_NAME'];
        $request_data_json = json_encode($data);
        // $gate = "https://activation.activeitzone.com/check_activation";

        $header = array(
            'Content-Type:application/json'
        );

        $stream = curl_init();

        // curl_setopt($stream, CURLOPT_URL, $gate);
        curl_setopt($stream, CURLOPT_HTTPHEADER, $header);
        curl_setopt($stream, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($stream, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($stream, CURLOPT_POSTFIELDS, $request_data_json);
        curl_setopt($stream, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($stream, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

        $rn = curl_exec($stream);
        curl_close($stream);

        // if ($rn == "bad" && env('DEMO_MODE') != 'On') {
        //     $user = User::where('user_type', 'admin')->first();
        //     auth()->login($user);
        //     return redirect()->route('admin.dashboard');
        // }
    }

    public function success(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        try {
            $session = $stripe->checkout->sessions->retrieve($request->session_id);
            $payment = ["status" => "Success"];
            $payment_type = Session::get('payment_type');
            $paymentData = session()->get('payment_data');

            if ($session->status == 'complete') {
                if ($payment_type == 'cart_payment') {
                    return (new CheckoutController)->checkout_done(session()->get('combined_order_id'), json_encode($payment));
                } else if ($payment_type == 'order_re_payment') {
                    return (new CheckoutController)->orderRePaymentDone($paymentData, json_encode($payment));
                } else if ($payment_type == 'wallet_payment') {
                    return (new WalletController)->wallet_payment_done($paymentData, json_encode($payment));
                }
            } else {
                flash_error(translate('Payment failed'));
                return redirect()->route('home');
            }
        } catch (\Exception $e) {
            flash_error(translate('Payment failed'));
            return redirect()->route('home');
        }
    }

    public function cancel(Request $request)
    {
        flash_error(translate('Payment is cancelled'));
        return redirect()->route('home');
    }
}
