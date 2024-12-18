<?php

namespace App\Http\Controllers\Frontend;

use App\Exports\InvoiceExport;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DeliveryBoy\DeliveryBoyController;
use App\Http\Resources\OrderResource;
use App\Models\Address;
use App\Models\Cart;
use App\Models\CombinedOrder;
use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\SmsTemplate;
use App\Models\User;
use App\Utility\NotificationUtility;
use App\Utility\SmsUtility;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->date;
        $sort_search = null;
        $delivery_status = null;
        $payment_status = '';

        $orders = Order::orderBy('id', 'desc');

        if (
            Route::currentRouteName() == 'admin.orders.inhouse_orders' &&
            Auth::user()->can('Inhouse Orders')
        ) {
            $orders = $orders->where('orders.seller_type', '=', 'admin');
        } else if (
            Route::currentRouteName() == 'admin.orders.seller_orders' &&
            Auth::user()->can('Seller Orders')
        ) {
            $orders = $orders->where('orders.seller_type', '=', 'seller');
        }

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

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $carts = Cart::where('user_id', Auth::guard('customer')->user()->id)->active()->get();

        if ($carts->isEmpty()) {
            return redirect()->route('home')->with('error', 'Your cart is empty');
        }

        $address = Address::where('id', $carts[0]['address_id'])->first();

        $shippingAddress = [];
        if ($address != null) {
            $shippingAddress['name']        = Auth::guard('customer')->user()->name;
            $shippingAddress['email']       = Auth::guard('customer')->user()->email;
            $shippingAddress['address']     = $address->address;
            $shippingAddress['country']     = $address->country->name;
            $shippingAddress['state']       = $address->state->name;
            $shippingAddress['city']        = $address->city->name;
            $shippingAddress['zip_code'] = $address->zip_code;
            $shippingAddress['phone']       = $address->phone;
            if ($address->latitude || $address->longitude) {
                $shippingAddress['lat_lang'] = $address->latitude . ',' . $address->longitude;
            }
        }

        $combined_order = new CombinedOrder();
        $combined_order->user_id = Auth::guard('customer')->user()->id;
        $combined_order->shipping_address = json_encode($shippingAddress);
        $combined_order->save();

        $seller_products = array();
        foreach ($carts as $cartItem) {
            $product_ids = array();
            $product = Product::find($cartItem['product_id']);
            if (isset($seller_products[$product->user_id])) {
                $product_ids = $seller_products[$product->user_id];
            }
            array_push($product_ids, $cartItem);
            $seller_products[$product->user_id] = $product_ids;
        }

        foreach ($seller_products as $seller_product) {
            $order = new Order;
            $order->combined_order_id = $combined_order->id;
            $order->user_id = Auth::guard('customer')->user()->id;
            $order->shipping_address = $combined_order->shipping_address;
            $order->additional_info = $request->additional_info;
            $order->payment_type = $request->payment_option;
            $order->delivery_viewed = '0';
            $order->payment_status_viewed = '0';
            $order->code = date('Ymd-His') . rand(10, 99);
            $order->date = date(now());
            $order->save();

            $subtotal = 0;
            $tax = 0;
            $shipping = 0;
            $coupon_discount = 0;

            //Order Details Storing
            foreach ($seller_product as $cartItem) {
                $product = Product::find($cartItem['product_id']);

                $subtotal += cart_product_price($cartItem, $product, false, false) * $cartItem['quantity'];
                $tax +=  cart_product_tax($cartItem, $product, false) * $cartItem['quantity'];
                $coupon_discount += $cartItem['discount'];

                $product_variation = $cartItem['variation'];

                $product_stock = $product->stocks->where('variant', $product_variation)->first();
                if ($product->digital != 1 && $cartItem['quantity'] > $product_stock->qty) {
                    $order->delete();
                    return redirect()->route('cart')->with('error', 'The requested quantity is not available for');
                } elseif ($product->digital != 1) {
                    $product_stock->qty -= $cartItem['quantity'];
                    $product_stock->save();
                }

                $order_detail = new OrderDetail();
                $order_detail->order_id = $order->id;
                $order_detail->seller_id = $product->user_id;
                $order_detail->product_id = $product->id;
                $order_detail->variation = $product_variation;
                $order_detail->price = cart_product_price($cartItem, $product, false, false) * $cartItem['quantity'];
                $order_detail->tax = cart_product_tax($cartItem, $product, false) * $cartItem['quantity'];
                $order_detail->shipping_type = $cartItem['shipping_type'];
                $order_detail->product_referral_code = $cartItem['product_referral_code'];
                $order_detail->shipping_cost = $cartItem['shipping_cost'];

                $shipping += $order_detail->shipping_cost;
                //End of storing shipping cost

                $order_detail->quantity = $cartItem['quantity'];

                if (addon_is_activated('club_point')) {
                    $order_detail->earn_point = $product->earn_point;
                }

                $order_detail->save();

                $product->num_of_sale += $cartItem['quantity'];
                $product->save();

                $order->seller_type = $product->added_by;
                $order->seller_id = $product->user_id;
                $order->shipping_type = $cartItem['shipping_type'];

                if ($cartItem['shipping_type'] == 'pickup_point') {
                    $order->pickup_point_id = $cartItem['pickup_point'];
                }
                if ($cartItem['shipping_type'] == 'carrier') {
                    $order->carrier_id = $cartItem['carrier_id'];
                }

                if ($product->added_by == 'seller' && $product->user->seller != null) {
                    $seller = $product->user->seller;
                    $seller->num_of_sale += $cartItem['quantity'];
                    $seller->save();
                }
            }

            $order->grand_total = $subtotal + $tax + $shipping;

            if ($seller_product[0]->coupon_code != null) {
                $order->coupon_discount = $coupon_discount;
                $order->grand_total -= $coupon_discount;

                $coupon_usage = new CouponUsage();
                $coupon_usage->user_id = Auth::guard('customer')->user()->id;
                $coupon_usage->coupon_id = Coupon::where('code', $seller_product[0]->coupon_code)->first()->id;
                $coupon_usage->save();
            }

            $combined_order->grand_total += $order->grand_total;

            $order->save();
        }

        $combined_order->save();

        $request->session()->put('combined_order_id', $combined_order->id);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::find(base64_decode($id));
        $delivery_boy = addon_is_activated('delivery_boy');
        return Inertia::render('Admin/Orders/View', [
            'order' => new OrderResource($order),
            'delivery_boy' => $delivery_boy
        ]);
    }

    public function invoice_download($id)
    {
        $orderdata = new OrderResource(Order::find($id));
        $order = json_decode($orderdata->toJson(), true);
        $pdf = Pdf::loadView('exports.invoice', array('order' => $order));
        return $pdf->download('invoice.pdf');
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

        if (Auth::user()->user_type == 'seller') {
            foreach ($order->orderDetails->where('seller_id', Auth::user()->id) as $key => $orderDetail) {
                $orderDetail->delivery_status = $request->status;
                $orderDetail->save();

                if ($request->status == 'cancelled') {
                    product_restock($orderDetail);
                }
            }
        } else {
            foreach ($order->orderDetails as $key => $orderDetail) {

                $orderDetail->delivery_status = $request->status;
                $orderDetail->save();

                if ($request->status == 'cancelled') {
                    product_restock($orderDetail);
                }
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
        // if (get_settings('google_firebase') == 1 && $order->user->device_token != null) {
        //     $request->device_token = $order->user->device_token;
        //     $request->title = "Order updated !";
        //     $status = str_replace("_", "", $order->delivery_status);
        //     $request->text = " Your order {$order->code} has been {$status}";

        //     $request->type = "order";
        //     $request->id = $order->id;
        //     $request->user_id = $order->user->id;

        //     NotificationUtility::sendFirebaseNotification($request);
        // }


        if (addon_is_activated('delivery_boy')) {
            if (Auth::user()->user_type == 'delivery_boy') {
                $deliveryBoyController = new DeliveryBoyController;
                $deliveryBoyController->store_delivery_history($order);
            }
        }

        return back()->with('success', trans('Order delivery status updated successfully!'));
    }


    public function update_payment_status(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $order->payment_status_viewed = '0';
        $order->save();

        if (Auth::user()->user_type == 'seller') {
            foreach ($order->orderDetails->where('seller_id', Auth::user()->id) as $key => $orderDetail) {
                $orderDetail->payment_status = $request->status;
                $orderDetail->save();
            }
        } else {
            foreach ($order->orderDetails as $key => $orderDetail) {
                $orderDetail->payment_status = $request->status;
                $orderDetail->save();
            }
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
        // if (get_settings('google_firebase') == 1 && $order->user->device_token != null) {
        //     $request->device_token = $order->user->device_token;
        //     $request->title = "Order updated !";
        //     $status = str_replace("_", "", $order->payment_status);
        //     $request->text = " Your order {$order->code} has been {$status}";

        //     $request->type = "order";
        //     $request->id = $order->id;
        //     $request->user_id = $order->user->id;

        //     NotificationUtility::sendFirebaseNotification($request);
        // }


        if (addon_is_activated('otp_system') && SmsTemplate::where('identifier', 'payment_status_change')->first()->status == 1) {
            try {
                SmsUtility::payment_status_change(json_decode($order->shipping_address)->phone, $order);
            } catch (\Exception $e) {
            }
        }
        return back()->with('success', trans('Order payment status updated successfully!'));
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('Admin/Orders/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = new OrderResource(Order::find(base64_decode($id)));
        $order->delete();
        return back()->with('success', trans('Order Deleted Successfully!'));
    }

    // Seller Methods
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
        $order = new OrderResource(Order::find(base64_decode($id)));
        $delivery_boy = addon_is_activated('delivery_boy');
        return Inertia::render('Seller/Orders/View', [
            'order' => $order,
            'delivery_boy' => $delivery_boy
        ]);
    }
    public function seller_orders_delete($id)
    {
        $order = new OrderResource(Order::find(base64_decode($id)));
        $order->delete();
        return back()->with('success', trans('Order Deleted Successfully!'));
    }


    public function seller_invoice_download($id)
    {
        $orderdata = new OrderResource(Order::find($id));
        $order = json_decode($orderdata->toJson(), true);
        $pdf = Pdf::loadView('exports.invoice', array('order' => $order));
        return $pdf->download('invoice.pdf');
    }
}
