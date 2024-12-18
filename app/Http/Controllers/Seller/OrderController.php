<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\Seller\OrderResource;
use App\Mail\InvoiceEmailManager;
use App\Models\DeliveryBoy;
use App\Models\DeliveryHistory;
use App\Models\Order;
use App\Models\SmsTemplate;
use App\Models\User;
use App\Utility\NotificationUtility;
use App\Utility\SmsUtility;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function seller_orders(Request $request)
    {
        $date = $request->date;
        $sort_search = null;
        $delivery_status = null;
        $payment_status = '';

        $orders = Order::where('seller_id', auth('seller')->user()->id)->orderBy('id', 'desc');

        if ($request->search) {
            $sort_search = $request->search;
            $orders = $orders->where('code', 'like', '%' . $sort_search . '%');
        }
        if ($request->payment_status != null) {
            $orders = $orders->where('payment_status', $request->payment_status);
            $payment_status = $request->payment_status;
        }
        if ($request->delivery_status != null) {
            $orders = $orders->where('delivery_status', $request->delivery_status);
            $delivery_status = $request->delivery_status;
        }
        if ($date != null) {
            $orders = $orders->where('created_at', '>=', date('Y-m-d', strtotime(explode(" to ", $date)[0])) . '  00:00:00')
                ->where('created_at', '<=', date('Y-m-d', strtotime(explode(" to ", $date)[1])) . '  23:59:59');
        }
        $orders = OrderResource::collection($orders->paginate(15));

        return Inertia::render('Seller/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function seller_orders_view($id)
    {
        $order = Order::find(base64_decode($id));
        $order->viewed = 1;
        $order->save();
        $order_shipping_address = json_decode($order->shipping_address);
        $delivery_boy_list = DeliveryBoy::where('creator_type', 'seller')->where('creator_id', auth('seller')->user()->id)->whereHas('city', function ($q) use ($order_shipping_address) {
            $q->where('name', $order_shipping_address->city);
        })->get();

        return Inertia::render('Seller/Orders/View', [
            'order' => new OrderResource($order),
            'delivery_boy_list' => $delivery_boy_list,
        ]);
    }

    public function invoice_download($id)
    {
        $orderdata = new OrderResource(Order::find($id));
        $order = json_decode($orderdata->toJson(), true);
        $pdf = Pdf::loadView('exports.invoice', array('order' => $order));
        return $pdf->download('invoice-' . $orderdata->code . '.pdf');
    }

    public function seller_orders_delete($id)
    {
        $order = new OrderResource(Order::find(base64_decode($id)));
        $order->delete();
        return back()->with('success', trans('Order Deleted Successfully!'));
    }

    public function assign_delivery_boy(Request $request)
    {
        if (addon_is_activated('delivery_boy')) {

            $order = Order::findOrFail($request->order_id);
            $order->assign_delivery_boy = $request->delivery_boy;
            $order->delivery_history_date = date("Y-m-d H:i:s");
            $order->save();

            $delivery_history = DeliveryHistory::where('order_id', $order->id)
                ->where('delivery_status', $order->delivery_status)
                ->first();

            if (empty($delivery_history)) {
                $delivery_history = new DeliveryHistory;

                $delivery_history->order_id = $order->id;
                $delivery_history->delivery_status = $order->delivery_status;
                $delivery_history->payment_type = $order->payment_type;
            }
            $delivery_history->delivery_boy_id = $request->delivery_boy;

            $delivery_history->save();

            if (env('MAIL_USERNAME') != null && get_settings('delivery_boy_mail_notification') == '1') {
                $array['view'] = 'emails.invoice';
                $array['subject'] = translate('You are assigned to delivery an order. Order code') . ' - ' . $order->code;
                $array['from'] = env('MAIL_FROM_ADDRESS');
                $array['order'] = $order;

                try {
                    Mail::to($order->delivery_boy->email)->queue(new InvoiceEmailManager($array));
                } catch (\Exception $e) {
                }
            }

            if (addon_is_activated('otp_system') && SmsTemplate::where('identifier', 'assign_delivery_boy')->first()->status == 1) {
                try {
                    SmsUtility::assign_delivery_boy($order->delivery_boy->phone, $order->code);
                } catch (\Exception $e) {
                }
            }
        }
        flash_success(trans('Delivery boy assigned successfully!'));
        return back();
    }


    public function update_delivery_status(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $order->delivery_viewed = '0';
        $order->delivery_status = $request->status;
        $order->save();

        if ($request->status == 'cancelled' && $order->payment_type == 'wallet') {
            $user = User::where('id', $order->user_id)->first();
            $user->balance += $order->grand_total;
            $user->save();
        }

        // If the order is cancelled and the seller commission is calculated, deduct seller earning
        if ($request->status == 'cancelled' && $order->user->user_type == 'seller' && $order->payment_status == 'paid' && $order->commission_calculated == 1) {
            $sellerEarning = $order->commissionHistory->seller_earning;
            $shop = $order->shop;
            $shop->admin_to_pay -= $sellerEarning;
            $shop->save();
        }

        foreach ($order->orderDetails as $key => $orderDetail) {

            $orderDetail->delivery_status = $request->status;
            $orderDetail->save();

            if ($request->status == 'cancelled') {
                product_restock($orderDetail);
            }
        }

        if (addon_is_activated('otp_system') && SmsTemplate::where('identifier', 'delivery_status_change')->first()->status == 1) {
            try {
                SmsUtility::delivery_status_change(json_decode($order->shipping_address)->phone, $order);
            } catch (\Exception $e) {
            }
        }

        //sends Notifications to user
        NotificationUtility::sendNotification($order, $request->status);

        return back()->with('success', trans('Order delivery status updated successfully!'));
    }


    public function update_payment_status(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $order->payment_status_viewed = '0';
        $order->save();


        foreach ($order->orderDetails as $key => $orderDetail) {
            $orderDetail->payment_status = $request->status;
            $orderDetail->save();
        }


        $status = 'paid';
        foreach ($order->orderDetails as $key => $orderDetail) {
            if ($orderDetail->payment_status != 'paid') {
                $status = 'unpaid';
            }
        }
        $order->payment_status = $status;
        $order->save();


        if (
            $order->payment_status == 'paid' &&
            $order->commission_calculated == 0
        ) {
            calculateCommissionAffilationClubPoint($order);
        }

        //sends Notifications to user
        NotificationUtility::sendNotification($order, $request->status);


        if (addon_is_activated('otp_system') && SmsTemplate::where('identifier', 'payment_status_change')->first()->status == 1) {
            try {
                SmsUtility::payment_status_change(json_decode($order->shipping_address)->phone, $order);
            } catch (\Exception $e) {
            }
        }
        return back()->with('success', trans('Order payment status updated successfully!'));
    }
}
