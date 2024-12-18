<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CouponRequest;
use App\Http\Resources\Admin\ProductResource;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Coupon;
use App\Models\Product;

class CouponController extends Controller
{
    protected $title = "Coupon";
    protected $model;

    public function __construct()
    {
        $this->model = new Coupon();
    }

    public function index(Request $request)
    {
        $coupons = Coupon::where('user_type', 'admin')->latest()->paginate(10);
        return Inertia::render('Admin/Marketing/Coupon/Index', [
            'coupons' => $coupons
        ]);
    }

    public function create()
    {
        $products =  ProductResource::collection(Product::AddedByAdmin()->latest()->get());
        return Inertia::render('Admin/Marketing/Coupon/Create', [
            'products' => $products
        ]);
    }

    public function store(CouponRequest $request)
    {
        $user_id = auth('admin')->user()->id;
        $status = $request->type == "welcome_base" ? 0 : 1;
        Coupon::create($request->validated() + [
            'user_id' => $user_id,
            'user_type' => "admin",
            'status' => $status,
        ]);
        return redirect()->route('admin.marketing.coupon.index')->with('success', trans('Coupon has been saved successfully'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Marketing/Coupon/Show');
    }

    public function edit($id)
    {
        $coupon = Coupon::find($id);
        $products =  ProductResource::collection(Product::AddedByAdmin()->latest()->get());
        return Inertia::render('Admin/Marketing/Coupon/Edit', [
            'coupon' => $coupon,
            'products' => $products,
        ]);
    }

    public function update(CouponRequest $request, $id)
    {
        $coupon = Coupon::find($id);
        $coupon->update($request->validated());
        return redirect()->route('admin.marketing.coupon.index')->with('success', trans('Coupon has been updated successfully'));
    }

    public function update_coupon_status(Request $request, $id)
    {
        $coupons = Coupon::where('type', 'welcome_base')->get();
        foreach ($coupons as $key => $coupon) {
            $coupon->status = 0;
            $coupon->save();
        }
        $coupon = Coupon::find($id);
        $coupon->status = $request->status;
        $coupon->save();
        return back()->with('success', trans('Coupon status updated successfully!'));
    }

    public function destroy($id)
    {
        $coupon = Coupon::find($id);
        $coupon->delete();
        return back()->with('success', trans('Coupon Deleted Successfully!'));
    }
}
