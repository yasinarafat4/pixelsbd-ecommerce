<?php

namespace App\Http\Controllers\Seller;

use App\Notifications\ShopVerificationNotification;
use Illuminate\Support\Facades\Notification;
use App\Mail\SecondEmailVerifyMailManager;
use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\ProductResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Seller;
use App\Models\Admin;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Inertia\Inertia;
use Hash;
use Illuminate\Support\Facades\DB;

class SellerDashboardController extends Controller
{

    public function index()
    {
        $data['total_products'] = Product::isApprovedPublished()->addedBySeller()->where('user_id', auth('seller')->user()->id)->count();
        $data['product_rating'] = Product::isApprovedPublished()->addedBySeller()->where('user_id', auth('seller')->user()->id)->where('rating', '!=', 0)->avg('rating');
        $data['total_orders']   = Order::sellerOrders()->where('seller_id', auth('seller')->user()->id)->count();
        $data['total_sale']     = Order::sellerOrders()->where('seller_id', auth('seller')->user()->id)->where('delivery_status', 'delivered')->sum('grand_total');

        $this_year_sales_raw = DB::table('orders')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%b") as month'),
                DB::raw('SUM(grand_total) as total_sale')
            )
            ->whereYear('created_at', Carbon::now()->year)
            ->where('delivery_status', 'delivered')
            ->where('seller_type', 'seller')
            ->where('seller_id', auth('seller')->user()->id)
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%b")'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $data['this_year_sales'] = get_sales_data_by_month($this_year_sales_raw);

        $previous_year_sales_raw = DB::table('orders')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%b") as month'),
                DB::raw('SUM(grand_total) as total_sale')
            )
            ->whereYear('created_at', Carbon::now()->subYear()->year)
            ->where('delivery_status', 'delivered')
            ->where('seller_type', 'seller')
            ->where('seller_id', auth('seller')->user()->id)
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%b")'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $data['previous_year_sales'] = get_sales_data_by_month($previous_year_sales_raw);

        $data['category_wise_product_counts'] = Product::select('categories.name', 'categories.id', DB::raw('COUNT(products.id) as product_count'))
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->where('added_by', 'seller')
            ->where('user_id', auth('seller')->user()->id)
            ->where('approved', 1)
            ->where('published', 1)
            ->groupBy('categories.id')
            ->get();

        $data['total_new_order'] = Order::sellerOrders()->where('seller_id', auth('seller')->user()->id)->where('delivery_status', 'pending')->count();
        $data['total_cancelled_order'] = Order::sellerOrders()->where('seller_id', auth('seller')->user()->id)->where('delivery_status', 'cancelled')->count();
        $data['total_on_delivery_order'] = Order::sellerOrders()->where('seller_id', auth('seller')->user()->id)->where('delivery_status', 'on_the_way')->count();
        $data['total_delivered_order'] = Order::sellerOrders()->where('seller_id', auth('seller')->user()->id)->where('delivery_status', 'delivered')->count();

        $data['products'] = ProductResource::collection(filter_products(Product::where('added_by', 'seller')->where('user_id', Auth::user()->id)->orderBy('num_of_sale', 'desc'))->limit(12)->get());


        return Inertia::render('Seller/Dashboard/Index', $data);
    }

    public function seller_profile()
    {
        return Inertia::render('Seller/Dashboard/SellerProfile');
    }

    public function seller_profile_update(Request $request, $id)
    {
        $request->validate([
            'f_name' => 'required|string|max:255',
            'l_name' => 'required|string|max:255',
        ]);

        $seller = Seller::find($id);
        $seller->f_name = $request->f_name;
        $seller->l_name = $request->l_name;
        $seller->phone = $request->phone;
        $seller->image = $request->image;
        $seller->bank_name = $request->bank_name;
        $seller->holder_name = $request->holder_name;
        $seller->account_no = $request->account_no;
        $seller->bank_routing_no = $request->bank_routing_no;
        $seller->bank_payment_status = $request->bank_payment_status;
        $seller->cash_payment_status = $request->cash_payment_status;
        $seller->save();
        return back()->with('success', trans('Profile updated successfully!'));
    }

    public function verify_email(Request $request)
    {
        $seller = Seller::where('email', $request->email)->first();
        if ($seller == null) {
            $response = $this->send_email_change_verification_mail($request, $request->email);
            return json_encode($response);
        } else {
            $response['status'] = 2;
            $response['message'] = trans("Email already exist!");

            return json_encode($response);
        }
    }

    public function password_update(Request $request)
    {
        $seller = Seller::find(auth('seller')->user()->id);
        if (Hash::check($request->old_password, $seller->password)) {
            $seller->update(['password' => Hash::make($request->new_password)]);
            return back()->with('success', 'Password updated Successfully!');
        } else {
            return back()->with('error', 'Old password did not matched!');
        }
    }

    public function seller_verification()
    {
        if (auth('seller')->user()->shop->verification_info == null) {
            $shop = auth('seller')->user()->shop;
            return Inertia::render('Seller/SellerVerification/SellerVerification');
        } else {
            flash_error(trans('Sorry! You have already sent verification request.'));
            return back();
        }
    }

    public function seller_verification_submit(Request $request)
    {

        $data = array();
        $i = 0;
        foreach (get_settings('verification_form') as $key => $element) {
            $item = array();
            if ($element['type'] == 'Text') {
                $item['type'] = 'text';
                $item['label'] = $element['label'];
                $item['value'] = $request['element_' . $i];
            } elseif ($element['type'] == 'Select' || $element['type'] == 'Radio') {
                $item['type'] = 'select';
                $item['label'] = $element['label'];
                $item['value'] = $request['element_' . $i];
            } elseif ($element['type'] == 'File') {
                $item['type'] = 'file';
                $item['label'] = $element['label'];
                $item['value'] = $request['element_' . $i]->store('public/uploads/verification_form');
            }
            array_push($data, $item);
            $i++;
        }
        $shop = auth('seller')->user()->shop;
        $shop->verification_status = 0;
        $shop->verification_info = $data;
        if ($shop->save()) {
            $users = Admin::get();
            $data = array();
            $data['shop'] = $shop;
            $data['seller'] = auth('seller')->user();
            $data['status'] = 'submitted';
            $data['notification_type_id'] = get_notification_type('shop_verify_request_submitted', 'type')->id;
            Notification::send($users, new ShopVerificationNotification($data));

            flash_success(trans('Your shop verification request has been submitted successfully!'));
            return redirect()->route('seller.dashboard');
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
        $array['link'] = route('seller.email_change.callback') . '?new_email_verification_code=' . $verification_code . '&email=' . $email;
        $array['sender'] = Auth::user()->name;
        $array['details'] = trans("Email Second");

        $user = Auth::user();
        $user->new_email_verification_code = $verification_code;
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
            $seller = Seller::where('new_email_verification_code', $verification_code_of_url_param)->first();

            if ($seller != null) {

                $seller->email = $request->input('email');
                $seller->new_email_verification_code = null;
                $seller->save();

                auth()->login($seller, true);

                flash_success(trans('Email Changed successfully'));
                return redirect()->route('seller.seller_profile');
            }
        }

        flash_error(trans('Email was not verified. Please resend your mail!'));
        return redirect()->route('seller.seller_profile');
    }
}
