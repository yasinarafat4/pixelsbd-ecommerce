<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $payment_methods =  PaymentMethod::active()->get();
        $wallets = Wallet::where('user_id', auth('customer')->user()->id)->latest()->paginate(10);
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/Wallet', [
            'wallets' => $wallets,
            'payment_methods' => $payment_methods
        ]);
    }

    public function recharge(Request $request)
    {
        $data['amount'] = $request->amount;
        $data['payment_method'] = $request->payment_method;

        $request->session()->put('payment_type', 'wallet_payment');
        $request->session()->put('payment_data', $data);

        $decorator = 'App\\Http\\Controllers\\Payment\\' . str_replace(' ', '', ucwords(str_replace('_', ' ', $request->payment_method))) . "Controller";
        if (class_exists($decorator)) {
            return (new $decorator)->pay($request);
        } else {
            return back()->with('error', 'Something Wrong!!!!!!!!!!!!!');
        }
    }

    public function wallet_payment_done($payment_data, $payment_details)
    {
        $user = auth('customer')->user();
        $user->balance = $user->balance + $payment_data['amount'];
        /** @disregard */
        $user->save();

        $wallet = new Wallet;
        $wallet->user_id = $user->id;
        $wallet->amount = $payment_data['amount'];
        $wallet->payment_method = $payment_data['payment_method'];
        $wallet->payment_details = $payment_details;
        $wallet->save();

        Session::forget('payment_data');
        Session::forget('payment_type');

        flash_success(trans('Recharge completed'));
        return redirect()->route('wallet');
    }

    public function offline_recharge(Request $request)
    {
        $wallet = new Wallet;
        $wallet->user_id = auth('customer')->user()->id;
        $wallet->amount = $request->amount;
        $wallet->payment_method = $request->payment_option;
        $wallet->payment_details = $request->trx_id;
        $wallet->approval = 0;
        $wallet->offline_payment = 1;
        $wallet->reciept = $request->photo;
        $wallet->save();
        flash_success(trans('Offline Recharge has been done. Please wait for response.'));
        return redirect()->route('wallet.index');
    }

    public function offline_recharge_request(Request $request)
    {
        $wallets = Wallet::where('offline_payment', 1);
        $type = null;
        if ($request->type != null) {
            $wallets = $wallets->where('approval', $request->type);
            $type = $request->type;
        }
        $wallets = $wallets->orderBy('id', 'desc')->paginate(10);
        return view('manual_payment_methods.wallet_request', compact('wallets', 'type'));
    }

    public function updateApproved(Request $request)
    {
        $wallet = Wallet::findOrFail($request->id);
        $wallet->approval = $request->status;
        if ($request->status == 1) {
            $user = $wallet->user;
            $user->balance = $user->balance + $wallet->amount;
            $user->save();
        } else {
            $user = $wallet->user;
            $user->balance = $user->balance - $wallet->amount;
            $user->save();
        }
        if ($wallet->save()) {
            return 1;
        }
        return 0;
    }
}
