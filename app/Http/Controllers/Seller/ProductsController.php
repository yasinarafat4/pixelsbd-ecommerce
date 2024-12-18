<?php

namespace App\Http\Controllers\Seller;;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\Admin\AttributeResource;
use App\Http\Resources\Admin\BrandResource;
use App\Http\Resources\Admin\ParentCategoryResource;
use App\Http\Resources\Admin\ProductResource;
use App\Http\Resources\Admin\ReviewResource;
use App\Http\Resources\CategoryResource;
use App\Models\Admin;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Review;
use App\Notifications\ShopProductNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CombinationService;
use App\Services\ProductService;
use App\Services\ProductStockService;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;

class ProductsController extends Controller
{
    public function __construct(protected readonly ProductService $productService, protected readonly ProductStockService $productStockService) {}

    public function index(Request $request)
    {
        $products = ProductResource::collection(Product::where('user_id', auth('seller')->user()->id)->where('added_by', 'seller')->latest()->paginate(10));
        return Inertia::render('Seller/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $categoryList = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributeList = AttributeResource::collection(Attribute::with('attributeValue', 'categories')->get());
        $attributeValueList = AttributeValue::get();
        $colorsList = Color::get();
        $brandList =  BrandResource::collection(Brand::get());
        return Inertia::render('Seller/Products/Create', [
            'categoryList'       => $categoryList,
            'attributeList'      => $attributeList,
            'attributeValueList' => $attributeValueList,
            'colorsList'         => $colorsList,
            'brandList'          => $brandList,
        ]);
    }


    public function sku_combination(Request $request)
    {

        $options = array();
        if ($request->has('colors') && count($request->colors) > 0) {
            $colors_active = 1;
            array_push($options, $request->colors);
        } else {
            $colors_active = 0;
        }

        $unit_price = $request->unit_price;
        $product_name = $request->name;

        if ($request->has('choice_no')) {
            foreach ($request->choice_no as $key => $no) {
                $name = 'choice_options_' . $no;
                if (isset($request[$name]) && $request[$name] != null) {
                    $data = array();
                    foreach ($request[$name] as $key => $item) {
                        array_push($data, $item);
                    }
                    array_push($options, $data);
                }
            }
        }

        $combinations = (new CombinationService())->generate_combination($options);

        $data = [
            'combinations' => $combinations,
            'unit_price' => $unit_price,
            'colors_active' => $colors_active,
            'product_name' => $product_name
        ];
        return $data;
    }

    public function store(ProductRequest $request)
    {
        $product = $this->productService->store($request->except(['sku']));
        $request->merge(['product_id' => $product->id]);

        //Product Stock
        $this->productStockService->store($request->only([
            'variant_product',
            'colors_active',
            'colors',
            'choice_no',
            'unit_price',
            'sku',
            'current_stock',
            'product_id'
        ]), $product);

        if (get_settings('product_approve_by_admin') == 1) {
            $users = Admin::findMany(Admin::permission('Products')->get());
            $data = array();
            $data['product_type']   = 'physical';
            $data['status']         = 'pending';
            $data['product']        = $product;
            $data['notification_type_id'] = get_notification_type('seller_product_upload', 'type')->id;

            Notification::send($users, new ShopProductNotification($data));
        }

        flash_success(trans('Product has been inserted successfully'));

        return redirect()->route('seller.product.products.index');
    }

    public function show($id)
    {
        return $id;
    }

    public function edit($id) {}


    public function product_edit($lang, $id)
    {
        $page = request()->page;
        App::setlocale($lang);
        $categoryList = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributeList = AttributeResource::collection(Attribute::with('attributeValue', 'categories')->get());
        $attributeValueList = AttributeValue::get();
        $colorsList = Color::get();
        $brandList =  BrandResource::collection(Brand::get());
        $product = new ProductResource(Product::find(base64_decode($id)));
        return Inertia::render('Seller/Products/Edit', [
            'lang' => $lang,
            'categoryList'       => $categoryList,
            'attributeList'      => $attributeList,
            'attributeValueList' => $attributeValueList,
            'colorsList'         => $colorsList,
            'brandList'          => $brandList,
            'product'            => $product,
            'page'               => $page,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        //Product
        $product = $this->productService->update($request->except([
            'sku'
        ]), $product);
        // return $product;
        $request->merge(['product_id' => $product->id]);

        //Product Stock
        $product->stocks()->delete();
        $this->productStockService->store($request->only([
            'variant_product',
            'colors_active',
            'colors',
            'choice_no',
            'unit_price',
            'sku',
            'current_stock',
            'product_id'
        ]), $product);


        flash_success(trans('Product has been updated successfully'));

        // \Artisan::call('view:clear');
        // \Artisan::call('cache:clear');
        // if ($request->has('tab') && $request->tab != null) {
        //     return Redirect::to(URL::previous() . "#" . $request->tab);
        // }
        return redirect()->route('seller.product.products.index');
    }


    public function duplicate(Request $request, $id)
    {
        $product = Product::find($id);

        //Product
        $product_new = $this->productService->product_duplicate_store($product);

        //Product Stock
        $this->productStockService->product_duplicate_store($product->stocks, $product_new);

        flash_success(trans('Product has been duplicated successfully'));
        // if ($request->type == 'In House')
        //     return redirect()->route('products.admin');
        // elseif ($request->type == 'Seller')
        //     return redirect()->route('products.seller');
        // elseif ($request->type == 'All')
        return back();
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return back()->with('success', trans('Product Deleted Successfully!'));
    }



    public function published_status(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->published = $request->status;
        $product->save();

        // \Artisan::call('view:clear');
        // \Artisan::call('cache:clear');
        return back()->with('success', trans('Product published status updated successfully!'));
    }

    public function featured_status(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->featured = $request->status;
        if ($product->save()) {
            // \Artisan::call('view:clear');
            // \Artisan::call('cache:clear');
            return back()->with('success', trans('Product featured status updated successfully!'));
        }
        return back()->with('error', trans('Something went wrong!'));
    }

    public function todays_deal_status(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->todays_deal = $request->status;
        if ($product->save()) {
            // \Artisan::call('view:clear');
            // \Artisan::call('cache:clear');
            Cache::forget('todays_deal_products');
            return back()->with('success', trans('Product todaysDeal status update successfully!'));
        }
        return back()->with('error', trans('Something went wrong!'));
    }


    public function category_based_discount(Request $request)
    {
        $categoryList = CategoryResource::collection(Category::latest()->paginate(10));
        return Inertia::render('Seller/Products/CategoryBasedDiscount/CategoryBasedDiscount', [
            'categoryList' => $categoryList
        ]);
    }

    public function bulk_import(Request $request)
    {
        return Inertia::render('Seller/Products/BulkImport/BulkImport');
    }

    public function product_reviews(Request $request)
    {
        $sellerId = auth('seller')->user()->id;
        $reviews = ReviewResource::collection(Review::whereHas('product.user', function ($q) use ($sellerId) {
            $q->where('id', $sellerId)->where('added_by', 'seller');
        })->latest()->paginate(10));

        return Inertia::render('Seller/Products/ProductReviews/ProductReviews', [
            'reviews' => $reviews
        ]);
    }
}
