<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\FlashDealResource;
use App\Http\Resources\Admin\ProductResource;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\FlashDeal;
use App\Models\FlashDealProduct;
use App\Models\Product;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Str;

class FlashDealController extends Controller
{
    protected $title = "FlashDeal";
    protected $model;

    public function __construct()
    {
        $this->model = new FlashDeal();
    }

    public function index(Request $request)
    {
        $flashDeals = FlashDeal::latest()->paginate(10);
        return Inertia::render('Admin/Marketing/FlashDeal/Index', [
            'flashDeals' => $flashDeals
        ]);
    }
    public function create()
    {
        $products = ProductResource::collection(Product::latest()->get());
        return Inertia::render('Admin/Marketing/FlashDeal/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        Validator::make(
            $request->all(),
            [
                'title' => 'required|string|max:255',
                'banner' => 'required',
                'start_date' => 'required|date',
                'end_date' => 'required|date'
            ],
            [
                'start_date.required' => 'The start date field',
                'end_date.required' => 'and the end date field is required.',
            ]
        )->validate();

        $slug = Str::slug($request->title);
        $same_slug_count = FlashDeal::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        $flashDeal = new FlashDeal();
        $flashDeal->title = $request->title;
        $flashDeal->slug = $slug;
        $flashDeal->banner = $request->banner;
        $flashDeal->status = 1;
        $flashDeal->start_date = $request->start_date;
        $flashDeal->end_date = $request->end_date;
        if ($flashDeal->save()) {
            foreach ($request->products as $key => $product) {
                $flashDealProduct = new FlashDealProduct();
                $flashDealProduct->flash_deal_id = $flashDeal->id;
                $flashDealProduct->product_id = $product;
                $flashDealProduct->discount = $request['discount_' . $product];
                $flashDealProduct->discount_type = $request['discount_type_' . $product];
                $flashDealProduct->save();
                $mainProduct = Product::find($product);
                $mainProduct->discount = $request['discount_' . $product];
                $mainProduct->discount_type = $request['discount_type_' . $product];
                $mainProduct->discount_start_date = $request->start_date;
                $mainProduct->discount_end_date = $request->end_date;
                $mainProduct->save();
            }
        }
        return redirect()->route('admin.marketing.flashdeal.index')->with('success', trans('Flash Deal Created Successfully!'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/FlashDeal/Show');
    }

    public function edit($id)
    {
        $products = ProductResource::collection(Product::latest()->get());
        $flashDeal = FlashDeal::where('id', $id)->first();
        $flashDealProductId = $flashDeal->flash_deal_products->pluck('product_id');
        return Inertia::render('Admin/Marketing/FlashDeal/Edit', [
            'flashDeal' => $flashDeal,
            'products' => $products,
            'flashDealProductId' => $flashDealProductId
        ]);
    }

    public function update(Request $request, $id)
    {
        Validator::make(
            $request->all(),
            [
                'title' => 'required|string|max:255',
                'banner' => 'required',
                'start_date' => 'required',
                'end_date' => 'required'
            ],
            [
                'start_date.required' => 'The start date field',
                'end_date.required' => 'and the end date field is required.',
            ]
        )->validate();
        $flashDeal = FlashDeal::find($id);

        if ($flashDeal->title != $request->title) {
            $slug = Str::slug($request->title);
            $same_slug_count = FlashDeal::where('slug', 'LIKE', $slug . '%')->count();
            $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
            $slug .= $slug_suffix;
        } else {
            $slug = $flashDeal->slug;
        }

        $flashDeal->title = $request->title;
        $flashDeal->slug = $slug;
        $flashDeal->banner = $request->banner;
        $flashDeal->status = 1;
        $flashDeal->start_date = $request->start_date;
        $flashDeal->end_date = $request->end_date;
        if ($flashDeal->save()) {
            $flashDealProduct = FlashDealProduct::where('flash_deal_id', $flashDeal->id)->delete();
            foreach ($request->products as $key => $product) {
                $flashDealProduct = new FlashDealProduct();
                $flashDealProduct->flash_deal_id = $flashDeal->id;
                $flashDealProduct->product_id = $product;
                $flashDealProduct->discount = $request['discount_' . $product];
                $flashDealProduct->discount_type = $request['discount_type_' . $product];
                $flashDealProduct->save();
                $mainProduct = Product::find($product);
                $mainProduct->discount = $request['discount_' . $product];
                $mainProduct->discount_type = $request['discount_type_' . $product];
                $mainProduct->discount_start_date = $request->start_date;
                $mainProduct->discount_end_date = $request->end_date;
                $mainProduct->save();
            }
        }
        return redirect()->route('admin.marketing.flashdeal.index')->with('success', trans('Flash Deal Updated Successfully!'));
    }

    public function destroy($id)
    {
        $flash_deal = FlashDeal::find($id);
        $flash_deal->delete();
        return back()->with('success', trans('Flash Deal Deleted successfully!'));
    }

    public function flash_deal_status(Request $request, $id)
    {
        $flash_deal = FlashDeal::find($id);
        $flash_deal->status = $request->status;
        $flash_deal->save();
        return back()->with('success', trans('Status updated successfully!'));
    }

    public function flash_deal_featured(Request $request, $id)
    {
        $flash_deal = FlashDeal::find($id);
        $flash_deal->featured = $request->featured;
        $flash_deal->save();
        return back()->with('success', trans('Featured updated successfully!'));
    }
}
