<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\OrderResource;
use App\Http\Resources\Customer\WishlistResource;
use App\Http\Resources\TicketResource;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Country;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Review;
use App\Models\Ticket;
use App\Models\TicketReplay;
use App\Models\User;
use App\Models\Wishlist;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class CustomerDashboardController extends Controller
{
    public function user_dashboard()
    {

        $countries = Country::active()->get();
        $payment_methods =  PaymentMethod::active()->get();
        $wishlists = WishlistResource::collection(Wishlist::where('user_id', auth('customer')->user()->id)->limit(4)->get());
        $expenditure = Order::where('user_id', auth('customer')->user()->id)->where('payment_status', 'paid')->sum('grand_total');
        $cart = Cart::where('user_id', auth('customer')->user()->id)->get();

        $orders       = Order::where('user_id', auth('customer')->user()->id)->get();
        $total_products_ordered = 0;
        foreach ($orders as $order) {
            $total_products_ordered += count($order->orderDetails);
        }

        $default_address = Address::where('user_id', auth('customer')->user()->id)->where('set_default', 1)->with(['country', 'state', 'city'])->first();

        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboard', [
            'wishlists' => $wishlists,
            'countries' => $countries,
            'payment_methods' => $payment_methods,
            'expenditure' => $expenditure,
            'cart' => $cart,
            'total_products_ordered' => $total_products_ordered,
            'default_address' => $default_address,
        ]);
    }
    public function purchase_history()
    {
        $orders = OrderResource::collection(Order::where('user_id', Auth::user('customer')->id)->orderBy('code', 'desc')->paginate(10));
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/PurchaseHistory', [
            'orders' => $orders
        ]);
    }
    public function purchase_history_details($id)
    {
        $order = new OrderResource(Order::findOrFail(base64_decode($id)));
        // $review = Review::where('user_id', auth('customer')->user()->id)->where('product_id', $product->id)->first();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/PurchaseHistoryDetails', [
            'order' => $order
        ]);
    }

    public function customer_invoice_download($id)
    {
        $orderdata = new OrderResource(Order::find(base64_decode($id)));
        $order = json_decode($orderdata->toJson(), true);
        $pdf = Pdf::loadView('exports.invoice', array('order' => $order));
        return $pdf->download('invoice-' . $orderdata->code . '.pdf');
    }

    public function cancel_order($id)
    {
        $order = Order::find(base64_decode($id));
        $order->delivery_status = "cancelled";
        $order->save();

        foreach ($order->orderDetails as $key => $orderDetail) {
            $orderDetail->delivery_status = "cancelled";
            $orderDetail->save();
            product_restock($orderDetail);
        }
    }

    public function downloads()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/Downloads');
    }
    public function refund_requests()
    {
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/RefundRequests');
    }

    public function wishlist(Request $request)
    {
        $wishlists = WishlistResource::collection(Wishlist::where('user_id', auth('customer')->user()->id)->paginate(8));
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/Wishlist', [
            'wishlists' => $wishlists
        ]);
    }

    public function support_ticket()
    {
        $tickets = TicketResource::collection(Ticket::where('user_type', 'customer')->where('user_id', auth('customer')->user()->id)->latest()->paginate(10));
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/SupportTicket', [
            'tickets' => $tickets
        ]);
    }

    public function support_ticket_store(Request $request)
    {
        $request->validate([
            'subject' => 'required',
            'details' => 'required'
        ]);
        $images = array();
        if ($files = $request->file('files')) {
            foreach ($files as $file) {
                $name = $file->getClientOriginalName();
                $file->storeAs('uploads/ticket_images', $name, 'public');
                $url =  $name;
                $images[] = $url;
            }
        }
        $ticket = new Ticket();
        $ticket->user_id = auth('customer')->user()->id;
        $ticket->user_type = auth('customer')->user()->user_type;
        $ticket->code = auth('customer')->user()->id . time();
        $ticket->subject = $request->subject;
        $ticket->details = $request->details;
        $ticket->files = implode(',', $images);
        $ticket->save();
        return back()->with('success', 'Ticket created successfully!');
    }


    public function support_ticket_details($id)
    {
        $ticket_details = new TicketResource(Ticket::find($id));
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/TicketDetails', [
            'ticket_details' => $ticket_details
        ]);
    }

    public function ticket_replay_store(Request $request)
    {
        // return $request->all();
        $request->validate([
            'replay' => 'required',
        ]);

        $images = array();
        if ($files = $request->file('files')) {
            foreach ($files as $file) {
                $name = $file->getClientOriginalName();
                $file->storeAs('uploads/ticket_images', $name, 'public');
                $url =  $name;
                $images[] = $url;
            }
        }
        $ticket_replay = new TicketReplay();
        $ticket_replay->user_id = auth('customer')->user()->id;
        $ticket_replay->user_type = auth('customer')->user()->user_type;
        $ticket_replay->ticket_id = $request->ticket_id;
        $ticket_replay->replay = $request->replay;
        $ticket_replay->files = implode(',', $images);
        $ticket_replay->ticket->viewed = '0';
        $ticket_replay->ticket->client_viewed = '1';
        $ticket_replay->ticket->save();
        $ticket_replay->save();
        return back()->with('success', 'Replay sent!');
    }

    public function manage_profile()
    {
        $countries = Country::active()->get();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/ManageProfile', [
            'countries' => $countries
        ]);
    }

    public function user_profile_update(Request $request, $id)
    {
        // return $request->all();
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $resizedImage = Image::make($file)
                ->resize(200, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 80);

            $imageName = time() . '.webp';
            Storage::put("public/uploads/{$imageName}", $resizedImage);
            $url =  '/storage/uploads/' . $imageName;
        }
        $customer = User::find($id);
        $customer->name = $request->name;
        $customer->phone = $request->phone;
        if ($request->hasFile('image')) {
            $customer->image = $url;
        }
        $customer->save();
        return back()->with('success', trans('Profile Updated Successfully!'));
    }

    public function add_address(Request $request)
    {

        Validator::make(
            $request->all(),
            [
                'address' => 'required',
                'country_id' => 'required',
                'state_id' => 'required',
                'city_id' => 'required',
                'zip_code' => 'required',
                'phone' => 'required',
            ],
            [
                'country_id.required' => 'Selcet country.',
                'state_id.required' => 'Selcet State.',
                'city_id.required' => 'Selcet City.',
            ]
        )->validate();

        $address = new Address();
        $address->user_id       = Auth::guard('customer')->user()->id;
        $address->address       = $request->address;
        $address->country_id    = $request->country_id;
        $address->state_id      = $request->state_id;
        $address->city_id       = $request->city_id;
        $address->zip_code      = $request->zip_code;
        $address->phone         = '+' . $request->phone;
        $address->longitude     = isset($request->longitude) ? $request->longitude : null;
        $address->latitude      = isset($request->latitude) ? $request->latitude : null;
        $address->save();
        return redirect()->back()->with('success', trans('Address added Successfully'));
    }

    public function update_address(Request $request, $id)
    {

        Validator::make(
            $request->all(),
            [
                'address' => 'required',
                'country_id' => 'required',
                'state_id' => 'required',
                'city_id' => 'required',
                'zip_code' => 'required',
                'phone' => 'required'
            ],
            [
                'country_id.required' => 'Selcet country.',
                'state_id.required' => 'Selcet State.',
                'city_id.required' => 'Selcet City.',
            ]
        )->validate();

        $address = Address::find($id);
        $address->address       = $request->address;
        $address->country_id    = $request->country_id;
        $address->state_id      = $request->state_id;
        $address->city_id       = $request->city_id;
        $address->zip_code      = $request->zip_code;
        $address->phone         = $request->phone;
        $address->longitude     = isset($request->longitude) ? $request->longitude : null;
        $address->latitude      = isset($request->latitude) ? $request->latitude : null;
        $address->save();
        return redirect()->back()->with('success', trans('Address updated Successfully'));
    }

    public function password_update(Request $request)
    {
        $user = User::find(auth('customer')->user()->id);
        if (Hash::check($request->old_password, $user->password)) {
            $user->update(['password' => Hash::make($request->new_password)]);
            return back()->with('success', 'Password updated Successfully!');
        } else {
            return back()->with('error', 'Old password did not matched!');
        }
    }

    public function destroy($id)
    {
        $address = Address::find($id);
        $address->delete();
        return back()->with('success', trans('Address deleted Successfully'));
    }

    public function make_default_address($id)
    {
        $address = Address::find($id);
        Address::where('user_id', $address->user_id)->update(['set_default' => 0]);
        if ($address) {
            $address->set_default = 1;
            $address->save();
            return back()->with('success', trans('Default address set successfully'));
        }
    }
}
