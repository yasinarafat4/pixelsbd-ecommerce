<?php

namespace App\Http\Controllers\DeliveryBoy;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeliveryBoy\OrderResource;
use App\Mail\SecondEmailVerifyMailManager;
use App\Models\DeliveryBoy;
use App\Models\DeliveryHistory;
use App\Models\Order;
use App\Models\SmsTemplate;
use App\Models\User;
use App\Utility\NotificationUtility;
use App\Utility\SmsUtility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DeliveryBoyController extends Controller
{
    public function index()
    {
        $data['total_completed_delivery'] = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'delivered')
            ->count();
        $data['total_pending_delivery'] = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', '!=', 'delivered')
            ->where('delivery_status', '!=', 'cancelled')
            ->where('cancel_request', '0')
            ->count();
        $data['total_cancelled_delivery'] = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'cancelled')
            ->count();
        $data['total_request_to_cancel'] = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', '!=', 'cancelled')
            ->where('cancel_request', 1)
            ->count();
        $data['delivery_boy_info'] = DeliveryBoy::where('id', auth('delivery_boy')->user()->id)->first();
        $earning = '';
        if (get_settings('delivery_boy_payment_type') == 'commission') {
            $earning = $data['delivery_boy_info']->total_earning;
        } elseif (get_settings('delivery_boy_payment_type') == 'salary') {
            $earning = get_settings('delivery_boy_salary');
        };
        $data['total_earning'] = $earning;
        return Inertia::render('DeliveryBoy/Dashboard/Dashboard', $data);
    }

    public function update_delivery_status(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $order->delivery_status = $request->status;
        $order->save();

        foreach ($order->orderDetails as $key => $orderDetail) {
            $orderDetail->delivery_status = $request->status;
            $orderDetail->save();
        }

        if (addon_is_activated('otp') && SmsTemplate::where('identifier', 'delivery_status_change')->first()->status == 1) {
            try {
                SmsUtility::delivery_status_change(json_decode($order->shipping_address)->phone, $order);
            } catch (\Exception $e) {
            }
        }

        //sends Notifications to user
        NotificationUtility::sendNotification($order, $request->status);
        $this->store_delivery_history($order);
    }

    public function cancel_request(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $order->cancel_request = '1';
        $order->cancel_request_at = date("Y-m-d H:i:s");
        $order->save();
        return back();
    }

    public function assigned_delivery()
    {
        $order_query = Order::query();
        $order_query->where('assign_delivery_boy', auth('delivery_boy')->user()->id);

        $order_query->where(function ($query) {
            $query->where(function ($q) {
                $q->where('delivery_status', 'pending')
                    ->where('cancel_request', '0');
            })->orWhere(function ($q) {
                $q->where('delivery_status', 'confirmed')
                    ->where('cancel_request', '0');
            });
        });

        $assigned_deliveries = $order_query->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/AssignedDelivery', [
            'assigned_deliveries' => $assigned_deliveries
        ]);
    }

    public function picked_up_delivery()
    {

        $pickup_deliveries = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'picked_up')
            ->where('cancel_request', '0')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/PickedUpDelivery', [
            'pickup_deliveries' => $pickup_deliveries
        ]);
    }

    public function on_the_way_delivery()
    {
        $on_the_way_deliveries = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'on_the_way')
            ->where('cancel_request', '0')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/OnTheWayDelivery', [
            'on_the_way_deliveries' => $on_the_way_deliveries
        ]);
    }

    public function pending_delivery()
    {
        $pending_deliveries = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', '!=', 'delivered')
            ->where('delivery_status', '!=', 'cancelled')
            ->where('cancel_request', '0')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/PendingDelivery', [
            'pending_deliveries' => $pending_deliveries
        ]);
    }
    public function completed_delivery()
    {
        $completed_deliveries = DeliveryHistory::with('order')->where('delivery_boy_id', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'delivered')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/CompletedDelivery', [
            'completed_deliveries' => $completed_deliveries
        ]);
    }
    public function cancelled_delivery()
    {
        $cancelled_deliveries = Order::where('assign_delivery_boy', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'cancelled')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/CancelledDelivery', [
            'cancelled_deliveries' => $cancelled_deliveries
        ]);
    }

    public function request_to_cancel()
    {
        $order_query = Order::query();
        $order_query = $order_query->where('assign_delivery_boy', auth('delivery_boy')->user()->id);
        $order_query = $order_query->where('delivery_status', '!=', 'cancelled')->where('cancel_request', 1);
        $order_query = $order_query->with('deliveryboy')->paginate(10);

        $cancel_requests = $order_query;
        return Inertia::render('DeliveryBoy/Dashboard/Pages/RequestToCancel', [
            'cancel_requests' => $cancel_requests
        ]);
    }


    public function total_collection()
    {
        $total_collections = DeliveryHistory::with('order')->where('delivery_boy_id', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'delivered')
            ->where('payment_type', 'cash_on_delivery')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/TotalCollection', [
            'total_collections' => $total_collections
        ]);
    }

    public function total_earning()
    {
        $total_earnings = DeliveryHistory::with('order')->where('delivery_boy_id', auth('delivery_boy')->user()->id)
            ->where('delivery_status', 'delivered')
            ->paginate(10);
        return Inertia::render('DeliveryBoy/Dashboard/Pages/Earnings', [
            'total_earnings' => $total_earnings
        ]);
    }

    public function delivery_boy_profile()
    {
        return Inertia::render('DeliveryBoy/Dashboard/Pages/ManageProfile');
    }

    public function delivery_boy_profile_update(Request $request, $id)
    {

        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);
        $delivery_boy = DeliveryBoy::find($id);
        $delivery_boy->name = $request->name;
        $delivery_boy->phone = $request->phone;
        $delivery_boy->image = $request->image;
        $delivery_boy->address = $request->address;
        $delivery_boy->save();
        return back()->with('success', 'Profile Updated Successfully!');
    }

    public function delivery_boy_password_update(Request $request)
    {
        $delivery_boy = DeliveryBoy::find(auth('delivery_boy')->user()->id);
        if (Hash::check($request->old_password, $delivery_boy->password)) {
            $delivery_boy->update(['password' => Hash::make($request->new_password)]);
            return back()->with('success', 'Password updated Successfully!');
        } else {
            return back()->with('error', 'Old password did not matched!');
        }
    }

    public function order_details($id)
    {
        $order = Order::find(base64_decode($id));
        return Inertia::render('DeliveryBoy/Dashboard/Pages/OrderDetails', [
            'order' => new OrderResource($order),
        ]);
    }


    public function invoice_download($id)
    {
        $orderdata = new OrderResource(Order::find(base64_decode($id)));
        $order = json_decode($orderdata->toJson(), true);
        $pdf = Pdf::loadView('exports.invoice', array('order' => $order));
        return $pdf->download('invoice-' . $orderdata->code . '.pdf');
    }


    public function verify_email(Request $request)
    {
        $delivery_boy = DeliveryBoy::where('email', $request->email)->first();
        if ($delivery_boy == null) {
            $response = $this->send_email_change_verification_mail($request, $request->email);
            return json_encode($response);
        } else {
            $response['status'] = 2;
            $response['message'] = trans("Email already exist!");

            return json_encode($response);
        }
    }


    public function send_email_change_verification_mail($request, $email)
    {
        $response['status'] = 0;
        $response['message'] = 'Unknown';

        $verification_code = Str::random(32);

        $array['subject'] = trans('Email Verification');
        $array['from'] = env('MAIL_FROM_ADDRESS');
        $array['content'] = trans('Verify your account');
        $array['link'] = route('delivery_boy.email_change.callback') . '?new_email_verification_code=' . $verification_code . '&email=' . $email;
        $array['sender'] = auth('delivery_boy')->user()->name;
        $array['details'] = trans("Email Second");

        $user = auth('delivery_boy')->user();
        $user->new_email_verification_code = $verification_code;
        /** @disregard */
        $user->save();

        try {
            Mail::to($email)->queue(new SecondEmailVerifyMailManager($array));

            $response['status'] = 1;
            $response['message'] = trans("Verification mail has been sent to your email.");
        } catch (\Exception $e) {
            // return $e->getMessage();
            $response['status'] = 0;
            $response['message'] = $e->getMessage();
        }

        return $response;
    }

    public function email_change_callback(Request $request)
    {
        if ($request->has('new_email_verification_code') && $request->has('email')) {
            $verification_code_of_url_param =  $request->input('new_email_verification_code');
            $delivery_boy = DeliveryBoy::where('new_email_verification_code', $verification_code_of_url_param)->first();

            if ($delivery_boy != null) {

                $delivery_boy->email = $request->input('email');
                $delivery_boy->new_email_verification_code = null;
                $delivery_boy->save();

                auth()->login($delivery_boy, true);

                flash_success(trans('Email Changed successfully'));
                return redirect()->route('delivery_boy.delivery_boy_profile');
            }
        }

        flash_error(trans('Email was not verified. Please resend your mail!'));
        return redirect()->route('delivery_boy.delivery_boy_profile');
    }

    public function store_delivery_history($order)
    {
        $delivery_history = new DeliveryHistory();

        $delivery_history->order_id         = $order->id;
        $delivery_history->delivery_boy_id  = auth('delivery_boy')->user()->id;
        $delivery_history->delivery_status  = $order->delivery_status;
        $delivery_history->payment_type     = $order->payment_type;
        if ($order->delivery_status == 'delivered') {
            $delivery_boy = DeliveryBoy::where('id', auth('delivery_boy')->user()->id)->first();

            if (get_settings('delivery_boy_payment_type') == 'commission') {
                $delivery_history->earning      = get_settings('delivery_boy_commission');
                $delivery_boy->total_earning   += get_settings('delivery_boy_commission');
            }
            if ($order->payment_type == 'cash_on_delivery') {
                $delivery_history->collection    = $order->grand_total;
                $delivery_boy->total_collection += $order->grand_total;

                $order->payment_status           = 'paid';
                if ($order->commission_calculated == 0) {
                    calculateCommissionAffilationClubPoint($order);
                    $order->commission_calculated = 1;
                }
            }

            $delivery_boy->save();
        }
        $order->delivery_history_date = date("Y-m-d H:i:s");

        $order->save();
        $delivery_history->save();
    }
}
