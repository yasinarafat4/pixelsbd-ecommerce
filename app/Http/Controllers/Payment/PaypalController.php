<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\WalletController;
use App\Models\CombinedOrder;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PaypalController extends Controller
{
    private $base_url;
    private $client_id;
    private $client_secret;

    public function __construct()
    {
        $this->base_url = (get_settings('paypal_sandbox') == 1) ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
        $this->client_id = env('PAYPAL_CLIENT_ID');
        $this->client_secret = env('PAYPAL_CLIENT_SECRET');
    }

    public function token()
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $this->base_url . '/v1/oauth2/token');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
        curl_setopt($ch, CURLOPT_USERPWD, $this->client_id . ':' . $this->client_secret);

        $headers = array();
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $accessToken = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
        return $accessToken;
    }


    public function pay()
    {
        $codes = array('USD', 'THB', 'CHF', 'SEK', 'SGD', 'RUB', 'GBP', 'PLN', 'PHP', 'NOK', 'NZD', 'TWD', 'MXN', 'MYR', 'JPY', 'ILS', 'HUF', 'HKD', 'EUR', 'DKK', 'CZK', 'CNY', 'CAD', 'BRL', 'AUD');
        if (!in_array(active_currency_code(), $codes)) {
            flash_error(trans('Currency ' . active_currency_code() . ' not Supported by Paypal.'));
            return back();
        }
        $accessToken = json_decode($this->token(), true);

        if (Session::has('payment_type')) {
            $paymentType = Session::get('payment_type');
            $paymentData = Session::get('payment_data');

            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
                $client_reference_id = $combined_order->id;
                $amount = only_price($combined_order->grand_total);
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                $amount = only_price($order->grand_total);
                $client_reference_id = auth()->id();
            } elseif ($paymentType == 'wallet_payment') {
                $amount = $paymentData['amount'];
                $client_reference_id = auth()->id();
            }
        }
        if (isset($accessToken['access_token'])) {
            $accessToken = $accessToken['access_token'];
            $payment_data = [];
            $payment_data['purchase_units'] = [
                [
                    'reference_id' => $client_reference_id,
                    'amount' => [
                        'currency_code' => active_currency_code(),
                        'value' => $amount
                    ]
                ]
            ];

            $payment_data['invoice_id'] = rand(000000, 999999);
            $payment_data['invoice_description'] = "Order #{$payment_data['invoice_id']} Invoice";
            $payment_data['total'] = $amount;
            $payment_data['intent'] = 'CAPTURE';
            $payment_data['application_context'] = [
                'return_url' => url('paypal/payment/done'),
                'cancel_url' => url('paypal/payment/cancel')
            ];
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $this->base_url . '/v2/checkout/orders');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,  json_encode($payment_data));

            $headers = array();
            $headers[] = 'Content-Type: application/json';
            $headers[] = "Authorization: Bearer $accessToken";
            $headers[] = "Paypal-Request-Id:" . Str::uuid();
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            }
            curl_close($ch);
        } else {
            flash_error(trans('Something was wrong'));
        };
        $response = json_decode($response);

        // header('Access-Control-Allow-Origin: *');
        $links = $response->links;
        return Inertia::location($links[1]->href);
    }

    public function getCancel(Request $request)
    {
        // Curse and humiliate the user for cancelling this most sacred payment (yours)
        $request->session()->forget('order_id');
        $request->session()->forget('payment_data');
        flash_success(trans('Payment cancelled'));
        return redirect()->route('home');
    }

    public function getDone(Request $request)
    {

        $accessToken = json_decode($this->token(), true);
        $accessToken = $accessToken['access_token'];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $this->base_url . "/v2/checkout/orders/{$request->token}/capture");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);

        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = "Authorization: Bearer  $accessToken";
        $headers[] = 'Paypal-Request-Id:' . Str::uuid();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);

        $response = json_decode($result);

        if ($response->status === 'COMPLETED') {
            if ($request->session()->has('payment_type')) {
                $paymentType = $request->session()->get('payment_type');
                $paymentData = $request->session()->get('payment_data');
                if ($paymentType == 'cart_payment') {
                    return (new CheckoutController)->checkout_done($request->session()->get('combined_order_id'), json_encode($response));
                } elseif ($paymentType == 'order_re_payment') {
                    return (new CheckoutController)->orderRePaymentDone($paymentData, json_encode($response));
                } elseif ($paymentType == 'wallet_payment') {
                    return (new WalletController)->wallet_payment_done($paymentData, json_encode($response));
                }
            }
        }
    }
}
