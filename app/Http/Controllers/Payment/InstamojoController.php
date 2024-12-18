<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\WalletController;
use Illuminate\Http\Request;
use App\Models\CombinedOrder;
use App\Models\Order;
use Session;
use Auth;

class InstamojoController extends Controller
{
    public function pay()
    {
        if (Session::has('payment_type')) {
            $user = Auth::user();
            $paymentType = Session::get('payment_type');
            $paymentData = Session::get('payment_data');

            $endPoint = get_settings('instamojo_sandbox') == 1 ? 'https://test.instamojo.com/api/1.1/' : 'https://www.instamojo.com/api/1.1/';

            $api = new \Instamojo\Instamojo(
                env('IM_API_KEY'),
                env('IM_AUTH_TOKEN'),
                $endPoint
            );

            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));

                if (preg_match_all('/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/im', $user->phone)) {
                    try {
                        /** @disregard */
                        $response = $api->paymentRequestCreate(array(
                            "purpose" => ucfirst(str_replace('_', ' ', $paymentType)),
                            "amount" => round($combined_order->grand_total),
                            "send_email" => false,
                            "email" => $user->email,
                            "phone" => $user->phone,
                            "redirect_url" => url('instamojo/payment/pay-success')
                        ));
                        return redirect($response['longurl']);
                    } catch (\Exception $e) {
                        print('Error: ' . $e->getMessage());
                    }
                } else {
                    flash_error(trans('Please add phone number to your profile'));
                    return redirect()->route('profile');
                }
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);

                if (preg_match_all('/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/im', $user->phone)) {
                    try {
                        /** @disregard */
                        $response = $api->paymentRequestCreate(array(
                            "purpose" => ucfirst(str_replace('_', ' ', $paymentType)),
                            "amount" => round($order->grand_total),
                            "send_email" => false,
                            "email" => $user->email,
                            "phone" => $user->phone,
                            "redirect_url" => url('instamojo/payment/pay-success')
                        ));
                        return redirect($response['longurl']);
                    } catch (\Exception $e) {
                        print('Error: ' . $e->getMessage());
                    }
                } else {
                    flash_error(trans('Please add phone number to your profile'));
                    return redirect()->route('profile');
                }
            } elseif ($paymentType == 'wallet_payment') {
                if (preg_match_all('/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/im', $user->phone)) {
                    try {
                        /** @disregard */
                        $response = $api->paymentRequestCreate(array(
                            "purpose" => ucfirst(str_replace('_', ' ', $paymentType)),
                            "amount" => round($paymentData['amount']),
                            "send_email" => false,
                            "email" => $user->email,
                            "phone" => $user->phone,
                            "redirect_url" => url('instamojo/payment/pay-success')
                        ));
                        return redirect($response['longurl']);
                        // dd($response);
                    } catch (\Exception $e) {
                        return back();
                    }
                } else {
                    flash_error(trans('Please add phone number to your profile'));
                    return redirect()->route('profile.edit');
                }
            } else {
                flash_error(trans('Please add phone number to your profile'));
                return redirect()->route('profile');
            }
        }
    }

    // success response method.
    public function success(Request $request)
    {
        try {
            $endPoint = get_settings('instamojo_sandbox') == 1 ? 'https://test.instamojo.com/api/1.1/' : 'https://www.instamojo.com/api/1.1/';

            $api = new \Instamojo\Instamojo(
                env('IM_API_KEY'),
                env('IM_AUTH_TOKEN'),
                $endPoint
            );
            /** @disregard */
            $response = $api->paymentRequestStatus(request('payment_request_id'));

            if (!isset($response['payments'][0]['status'])) {
                flash_error(trans('Payment Failed'));
                return redirect()->route('home');
            } else if ($response['payments'][0]['status'] != 'Credit') {
                flash_error(trans('Payment Failed'));
                return redirect()->route('home');
            }
        } catch (\Exception $e) {
            flash_error(trans('Payment Failed'));
            return redirect()->route('home');
        }

        $payment = json_encode($response);

        if (Session::has('payment_type')) {
            $paymentType = Session::get('payment_type');
            $paymentData = $request->session()->get('payment_data');
            if ($paymentType == 'cart_payment') {
                return (new CheckoutController)->checkout_done(Session::get('combined_order_id'), $payment);
            } elseif ($paymentType == 'order_re_payment') {
                return (new CheckoutController)->orderRePaymentDone($paymentData, $payment);
            } elseif ($paymentType == 'wallet_payment') {
                return (new WalletController)->wallet_payment_done($paymentData, $payment);
            }
        }
    }
}
