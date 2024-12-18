<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PaymentResource;
use App\Http\Resources\Admin\SellerResource;
use App\Http\Resources\Admin\SellerWithdrawRequestResource;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Seller;
use App\Models\SellerWithdrawRequest;
use App\Models\Shop;
use App\Notifications\ShopVerificationNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;
use Laraeast\LaravelSettings\Facades\Settings;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class SellerController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $sellers = SellerResource::collection(Seller::latest()->paginate(15));
        return Inertia::render('Admin/Seller/Index', [
            'sellers' => $sellers
        ]);
    }

    public function login($id)
    {
        $seller = Seller::findOrFail(base64_decode($id));

        auth('seller')->login($seller, true);

        return redirect()->route('seller.dashboard');
    }

    public function create()
    {
        return Inertia::render('Admin/Seller/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'f_name' => 'required|string|max:255',
            'l_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Seller::class,
            'phone' => 'required',
            'shop_name' => 'required',
            'shop_address' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $slug = Str::slug($request->shop_name);
        $same_slug_count = Shop::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        $seller = new Seller();
        $seller->f_name = $request->f_name;
        $seller->l_name = $request->l_name;
        $seller->phone = $request->phone;
        $seller->image = $request->image;
        $seller->email = $request->email;
        $seller->password = Hash::make($request->password);
        $seller->save();
        $shop = new Shop();
        $shop->seller_id = $seller->id;
        $shop->name = $request->shop_name;
        $shop->slug = $slug;
        $shop->address = $request->shop_address;
        $shop->logo = $request->shop_logo;
        $shop->shop_banner = $request->shop_banner;
        $shop->save();
        return redirect()->route('admin.seller.index')->with('success', trans('Seller Created Successfully!'));
    }

    public function show($id)
    {
        $seller = new SellerResource(Seller::find(base64_decode($id)));
        return Inertia::render('Admin/Seller/Show', [
            'seller' => $seller
        ]);
    }

    public function edit($id)
    {
        $seller = new SellerResource(Seller::find(base64_decode($id)));
        return Inertia::render('Admin/Seller/Edit', [
            'seller' => $seller
        ]);
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'f_name' => 'required|string|max:255',
            'l_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:sellers,email,' . $id,
            'phone' => 'required',
            'shop_name' => 'required',
            'shop_address' => 'required',
        ]);

        $slug = Str::slug($request->shop_name);
        $same_slug_count = Shop::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        // return $request->all();
        $seller = Seller::find($id);
        $seller->f_name = $request->f_name;
        $seller->l_name = $request->l_name;
        $seller->phone = $request->phone;
        $seller->image = $request->image;
        $seller->email = $request->email;
        if ($request->password) {
            $seller->password = Hash::make($request->password);
        }
        $seller->save();
        $shop = $seller->shop;
        $shop->name = $request->shop_name;
        $shop->slug = $slug;
        $shop->address = $request->shop_address;
        $shop->logo = $request->shop_logo;
        $shop->shop_banner = $request->shop_banner;
        $shop->save();
        return redirect()->route('admin.seller.index')->with('success', trans('Seller Updated Successfully!'));
    }

    public function destroy($id) {}


    public function payouts(Request $request)
    {
        $payments = PaymentResource::collection(Payment::orderBy('created_at', 'desc')->paginate(15));
        return Inertia::render('Admin/Seller/Payouts', [
            'payments' => $payments
        ]);
    }

    public function payout_requests(Request $request)
    {
        $seller_withdraw_requests = SellerWithdrawRequestResource::collection(SellerWithdrawRequest::latest()->paginate(15));
        return Inertia::render('Admin/Seller/PayoutRequests', [
            'seller_withdraw_requests' => $seller_withdraw_requests
        ]);
    }

    public function seller_commission(Request $request)
    {
        return Inertia::render('Admin/Seller/SellerCommission');
    }

    public function seller_commission_update(Request $request)
    {
        foreach ($request->types as $key => $type) {
            Settings::set($type, $request->$type);
        }

        \Artisan::call('cache:clear');
        return back()->with('success', trans('Seller Commission updated successfully'));
    }

    public function seller_verification_form(Request $request)
    {
        return Inertia::render('Admin/Seller/SellerVerificationForm');
    }

    /**
     * Update sell verification form.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function seller_verification_form_update(Request $request)
    {
        $form = array();
        $select_types = ['select', 'multi_select', 'radio'];
        $j = 0;
        for ($i = 0; $i < count($request->type); $i++) {
            $item['type'] = $request->type[$i];
            $item['label'] = $request->label[$i];
            if (in_array($request->type[$i], $select_types)) {
                $item['options'] = json_encode($request['options_' . $request->option[$j]]);
                $j++;
            }
            array_push($form, $item);
        }
        Settings::set('verification_form', $form);
        \Artisan::call('cache:clear');
        return back()->with('success', trans("Verification form updated successfully"));
    }

    public function verification($id)
    {
        // base64_decode($id);
        $seller = Seller::find(base64_decode($id));
        return Inertia::render('Admin/Seller/Verification', [
            'seller' => $seller
        ]);
    }

    public function payment_history($id)
    {
        // base64_decode($id);
        $seller = Seller::find(base64_decode($id));
        return Inertia::render('Admin/Seller/PaymentHistory', [
            'seller' => $seller
        ]);
    }
    public function payment_history_show($id)
    {
        $seller = Seller::find(decrypt($id));
        $payments = Payment::where('seller_id', $seller->id)->orderBy('created_at', 'desc')->get();
        if ($payments->count() > 0) {
            return view('backend.sellers.payment', compact('payments', 'user'));
        }
        flash_error(trans('No payment history available for this seller'));
        return back();
    }

    public function approve_seller($id)
    {
        $seller = Seller::findOrFail(base64_decode($id));
        $seller->shop->verification_status = 1;
        $seller->shop->save();
        Cache::forget('verified_sellers_id');

        $data = array();
        $data['shop'] = $seller->shop;
        $data['seller'] = $seller;
        $data['status'] = 'approved';
        $data['notification_type_id'] = get_notification_type('shop_verify_request_approved', 'type')->id;
        Notification::send($seller, new ShopVerificationNotification($data));

        flash_success(trans('Seller has been approved successfully'));
        return redirect()->route('admin.seller.index');
    }

    public function reject_seller($id)
    {
        $seller = Seller::findOrFail(base64_decode($id));
        $seller->shop->verification_status = 2;
        $seller->shop->verification_info = null;
        $seller->shop->save();
        Cache::forget('verified_sellers_id');

        $data = array();
        $data['shop'] = $seller->shop;
        $data['seller'] = $seller;
        $data['status'] = 'rejected';
        $data['notification_type_id'] = get_notification_type('shop_verify_request_rejected', 'type')->id;
        Notification::send($seller, new ShopVerificationNotification($data));

        flash_error(trans('Seller verification request has been rejected successfully'));
        return redirect()->route('admin.seller.index');
    }

    public function ban($id)
    {
        $seller = Seller::findOrFail(base64_decode($id));

        if ($seller->banned == 1) {
            $seller->banned = 0;
            if ($seller->shop->verification_info) {
                $seller->shop->verification_status = 1;
            }
            flash_success(trans('Seller has been unbanned successfully'));
        } else {
            $seller->banned = 1;
            $seller->shop->verification_status = 0;
            flash_success(trans('Seller has been banned successfully'));
        }
        $seller->save();
        $seller->shop->save();
        return back();
    }
}
