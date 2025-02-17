<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use Illuminate\Http\Request;
use App\Models\CombinedOrder;
use App\Http\Controllers\SSLCommerz;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Session;

// session_start();

class SslcommerzController extends Controller
{
    public function pay(Request $request)
    {
        # Here you have to receive all the order data to initate the payment.
        # Lets your oder trnsaction informations are saving in a table called "orders"
        # In orders table order uniq identity is "order_id","order_status" field contain status of the transaction, "grand_total" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.
        if (Session::has('payment_type')) {
            $userID = auth('customer')->user()->id;
            $paymentType = Session::get('payment_type');
            $paymentData = $request->session()->get('payment_data');

            $post_data['currency'] = "BDT";
            $post_data['tran_id'] = substr(md5($userID), 0, 10); // tran_id must be unique
            $post_data['value_a'] = $post_data['tran_id'];

            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));
                $post_data = array();
                $post_data['total_amount'] = $combined_order->grand_total; # You cant not pay less than 10
                $post_data['tran_id'] = substr(md5($request->session()->get('combined_order_id')), 0, 10); // tran_id must be unique
                $post_data['value_a'] = $post_data['tran_id'];
                $post_data['value_b'] = $request->session()->get('combined_order_id');
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                $post_data = array();
                $post_data['total_amount'] = $order->grand_total; # You cant not pay less than 10
                $post_data['value_b'] = $paymentData['order_id'];
            } elseif ($paymentType == 'wallet_payment') {
                $post_data = array();
                $post_data['total_amount'] = $paymentData['amount']; # You cant not pay less than 10
                $post_data['value_b'] = $paymentData['amount'];
            }

            $post_data['value_c'] = $paymentType;
            $post_data['value_d'] = $userID;

            # CUSTOMER INFORMATION
            $user = auth('customer')->user();
            $post_data['cus_name'] = $user->name;
            $post_data['cus_add1'] = $user->address;
            $post_data['cus_city'] = $user->city;
            $post_data['cus_postcode'] = $user->postal_code;
            $post_data['cus_country'] = $user->country;
            $post_data['cus_phone'] = $user->phone;
            $post_data['cus_email'] = $user->email;
        }

        $server_name = $request->root() . "/";
        $post_data['success_url'] = $server_name . "sslcommerz/success";
        $post_data['fail_url'] = $server_name . "sslcommerz/fail";
        $post_data['cancel_url'] = $server_name . "sslcommerz/cancel";
        // dd($post_data);
        # SHIPMENT INFORMATION
        // $post_data['ship_name'] = 'ship_name';
        // $post_data['ship_add1 '] = 'Ship_add1';
        // $post_data['ship_add2'] = "";
        // $post_data['ship_city'] = "";
        // $post_data['ship_state'] = "";
        // $post_data['ship_postcode'] = "";
        // $post_data['ship_country'] = "Bangladesh";

        # OPTIONAL PARAMETERS
        // $post_data['value_a'] = "ref001";
        // $post_data['value_b'] = "ref002";
        // $post_data['value_c'] = "ref003";
        // $post_data['value_d'] = "ref004";

        $sslc = new SSLCommerz();

        # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
        $payment_options = $sslc->initiate($post_data, false);
        if (!is_array($payment_options)) {
            print_r($payment_options);
            $payment_options = array();
        }
    }

    public function success(Request $request)
    {
        //echo "Transaction is Successful";

        $sslc = new SSLCommerz();
        #Start to received these value from session. which was saved in index function.
        $tran_id = $request->value_a;
        #End to received these value from session. which was saved in index function.
        $payment = json_encode($request->all());

        if (isset($request->value_c)) {
            if ($request->value_c == 'cart_payment') {
                return (new CheckoutController)->checkout_done($request->value_b, $payment);
            } elseif ($request->value_c == 'order_re_payment') {
                $data['order_id'] = $request->value_b;
                $data['payment_method'] = 'sslcommerz';
                Auth::login(User::find($request->value_d));

                return (new CheckoutController)->orderRePaymentDone($data, $payment);
            } elseif ($request->value_c == 'wallet_payment') {
                $data['amount'] = $request->value_b;
                $data['payment_method'] = 'sslcommerz';
                Auth::login(User::find($request->value_d));

                return (new WalletController)->wallet_payment_done($data, $payment);
            }
        }
    }

    public function fail(Request $request)
    {
        $request->session()->forget('order_id');
        $request->session()->forget('payment_data');
        flash_error(translate('Payment Failed'));
        return redirect()->route('home');
    }

    public function cancel(Request $request)
    {
        $request->session()->forget('order_id');
        $request->session()->forget('payment_data');
        flash_error(translate('Payment cancelled'));
        return redirect()->route('home');
    }

    public function ipn(Request $request)
    {
        #Received all the payement information from the gateway
        if ($request->input('tran_id')) #Check transation id is posted or not.
        {

            // $tran_id = $request->input('tran_id');

            // #Check order status in order tabel against the transaction id or order id.
            // $combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));

            // if ($order->payment_status == 'Pending') {
            //     $sslc = new SSLCommerz();
            //     $validation = $sslc->orderValidate($tran_id, $combined_order->grand_total, 'BDT', $request->all());
            //     if ($validation == TRUE) {
            //         /*
            //             That means IPN worked. Here you need to update order status
            //             in order table as Processing or Complete.
            //             Here you can also sent sms or email for successfull transaction to customer
            //             */
            //         echo "Transaction is successfully Complete";
            //     } else {
            //         /*
            //             That means IPN worked, but Transation validation failed.
            //             Here you need to update order status as Failed in order table.
            //             */

            //         echo "validation Fail";
            //     }
            // }
        } else {
            echo "Inavalid Data";
        }
    }
}
