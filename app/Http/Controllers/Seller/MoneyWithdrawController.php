<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\SellerWithdrawRequest;
use App\Notifications\PayoutNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class MoneyWithdrawController extends Controller
{
    public function money_withdraw(Request $request)
    {
        $seller_withdraw_requests = SellerWithdrawRequest::where('seller_id', auth('seller')->user()->id)->latest()->paginate(10);
        return Inertia::render('Seller/MoneyWithdraw/MoneyWithdraw', [
            'seller_withdraw_requests' => $seller_withdraw_requests
        ]);
    }

    function money_withdraw_store(Request $request)
    {

        $seller_withdraw_request = new SellerWithdrawRequest;
        $seller_withdraw_request->seller_id = auth('seller')->user()->id;
        $seller_withdraw_request->amount = $request->amount;
        $seller_withdraw_request->message = $request->message;
        $seller_withdraw_request->status = '0';
        $seller_withdraw_request->viewed = '0';
        if ($seller_withdraw_request->save()) {

            // Seller payout request notification to admin
            $users = Admin::get();
            $data = array();
            $data['user'] = auth('seller')->user();
            $data['amount'] = $request->amount;
            $data['status'] = 'pending';
            $data['notification_type_id'] = get_notification_type('seller_payout_request', 'type')->id;
            Notification::send($users, new PayoutNotification($data));

            flash_success(trans('Request has been sent successfully'));
            return redirect()->route('seller.money_withdraw');
        } else {
            flash_error(trans('Something went wrong'));
            return back();
        }
    }
}
