<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderResource;
use App\Models\Country;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DeliveryBoy;
use App\Models\DeliveryBoyCollection;
use App\Models\DeliveryBoyPayment;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Hash;

class DeliveryBoyController extends Controller
{
    protected $title = "DeliveryBoy";
    protected $model;

    public function __construct()
    {
        $this->model = new DeliveryBoy();
        $this->middleware(['permission:All Delivery Boys']);
    }

    public function all_delivery_boys(Request $request)
    {
        $delivery_boys = DeliveryBoy::where('creator_type', 'admin')->with('city')->latest()->paginate(10);
        return Inertia::render('Admin/Plugins/DeliveryBoy/AllDeliveryBoys', [
            'delivery_boys' => $delivery_boys
        ]);
    }
    public function create_delivery_boy()
    {
        $countries = Country::active()->get();
        return Inertia::render('Admin/Plugins/DeliveryBoy/Create', [
            'countries' => $countries
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:delivery_boys',
            'phone' => 'required',
            'password' => 'required',
            'country_id' => 'required',
            'state_id' => 'required',
            'city_id' => 'required',
            'document_type' => 'required',
            'nid_front' => ['required_if:document_type,nid'],
            'nid_back' => ['required_if:document_type,nid'],
            'passport' => ['required_if:document_type,passport'],
            'address' => 'required',
        ]);
        $delivery_boy = new DeliveryBoy();
        $delivery_boy->creator_id = auth('admin')->user()->id;
        $delivery_boy->creator_type = auth('admin')->user()->user_type;
        $delivery_boy->name = $request->name;
        $delivery_boy->email = $request->email;
        $delivery_boy->phone = $request->phone;
        $delivery_boy->password = Hash::make($request->password);
        $delivery_boy->country_id = $request->country_id;
        $delivery_boy->state_id = $request->state_id;
        $delivery_boy->city_id = $request->city_id;
        $delivery_boy->image = $request->image;
        $delivery_boy->document_type = $request->document_type;
        $delivery_boy->nid_front = $request->nid_front;
        $delivery_boy->nid_back = $request->nid_back;
        $delivery_boy->passport = $request->passport;
        $delivery_boy->address = $request->address;
        $delivery_boy->save();
        return redirect()->route('admin.deliveryboy.all_delivery_boys')->with('success', 'Delivery Boy Created Successfully!');
    }

    public function edit_delivery_boy($id)
    {
        $delivery_boy = DeliveryBoy::find($id);
        $countries = Country::active()->get();
        return Inertia::render('Admin/Plugins/DeliveryBoy/Edit', [
            'delivery_boy' => $delivery_boy,
            'countries' => $countries,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'country_id' => 'required',
            'state_id' => 'required',
            'city_id' => 'required',
            'document_type' => 'required',
            'nid_front' => ['required_if:document_type,nid'],
            'nid_back' => ['required_if:document_type,nid'],
            'passport' => ['required_if:document_type,passport'],
            'address' => 'required',
        ]);
        $delivery_boy = DeliveryBoy::find($id);
        $delivery_boy->creator_id = auth('admin')->user()->id;
        $delivery_boy->creator_type = auth('admin')->user()->user_type;
        $delivery_boy->name = $request->name;
        $delivery_boy->email = $request->email;
        $delivery_boy->phone = $request->phone;
        if ($request->password) {
            $delivery_boy->password = Hash::make($request->password);
        }
        $delivery_boy->country_id = $request->country_id;
        $delivery_boy->state_id = $request->state_id;
        $delivery_boy->city_id = $request->city_id;
        $delivery_boy->image = $request->image;
        $delivery_boy->document_type = $request->document_type;
        $delivery_boy->nid_front = $request->nid_front;
        $delivery_boy->nid_back = $request->nid_back;
        $delivery_boy->passport = $request->passport;
        $delivery_boy->address = $request->address;
        $delivery_boy->save();
        return redirect()->route('admin.deliveryboy.all_delivery_boys')->with('success', 'Delivery Boy Updated Successfully!');
    }

    public function delivery_boy_payment(Request $request)
    {
        $delivery_boy = DeliveryBoy::find($request->delivery_boy_id);
        if ($request->paid_amount > $delivery_boy->total_earning) {
            flash_error('Paid amount cannot be larger than payable amount!');
        } else {
            $payment = new DeliveryBoyPayment();
            $payment->delivery_boy_id = $request->delivery_boy_id;
            $payment->paid_amount = $request->paid_amount;
            if ($payment->save()) {
                $delivery_boy->total_earning = $delivery_boy->total_earning - $request->paid_amount;
                $delivery_boy->save();
            }
            flash_success('Payment sent successfully!');
        }
    }

    public function payment_histories(Request $request)
    {
        $payments = DeliveryBoyPayment::whereHas('deliveryboy', function ($q) {
            $q->where('creator_type', 'admin');
        })->with('deliveryboy')->paginate(10);
        return Inertia::render('Admin/Plugins/DeliveryBoy/PaymentHistories', [
            'payments' => $payments
        ]);
    }

    public function delivery_boy_collection(Request $request)
    {
        $delivery_boy = DeliveryBoy::find($request->delivery_boy_id);
        if ($request->collection_amount > $delivery_boy->total_collection) {
            flash_error('Collection amount cannot be larger than collected amount!');
        } else {
            $collection = new DeliveryBoyCollection();
            $collection->delivery_boy_id = $request->delivery_boy_id;
            $collection->collection_amount = $request->collection_amount;
            if ($collection->save()) {
                $delivery_boy->total_collection = $delivery_boy->total_collection - $request->collection_amount;
                $delivery_boy->save();
            }
            flash_success(trans('Collection sent successfully!'));
        }
    }

    public function collected_histories(Request $request)
    {
        $collections = DeliveryBoyCollection::whereHas('deliveryboy', function ($q) {
            $q->where('creator_type', 'admin');
        })->with('deliveryboy')->paginate(10);
        return Inertia::render('Admin/Plugins/DeliveryBoy/CollectedHistories', [
            'collections' => $collections
        ]);
    }

    public function cancel_request(Request $request)
    {
        $order = Order::where('delivery_status', '!=', 'cancelled')->where('cancel_request', 1);
        $order = $order->whereHas('deliveryboy', function ($q) {
            $q->where('creator_type', 'admin');
        })->with('deliveryboy')->paginate(10);
        $cancel_requests = $order;
        return Inertia::render('Admin/Plugins/DeliveryBoy/CancelRequest', [
            'cancel_requests' => $cancel_requests
        ]);
    }

    public function ban_delivery_boy($id)
    {
        $delivery_boy = DeliveryBoy::findOrFail($id);

        if ($delivery_boy->banned == 1) {
            $delivery_boy->banned = 0;
            flash_success(trans('Delivery Boy UnBanned Successfully'));
        } else {
            $delivery_boy->banned = 1;
            flash_success(trans('Delivery Boy Banned Successfully'));
        }
        $delivery_boy->save();
    }

    public function order_details($id)
    {
        $order = Order::find(base64_decode($id));
        return Inertia::render('Admin/Plugins/DeliveryBoy/OrderDetails', [
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


    public function configuration(Request $request)
    {
        return Inertia::render('Admin/Plugins/DeliveryBoy/Configuration');
    }


    public function destroy($id) {}
}
