<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\Admin\AttributeResource;
use App\Http\Resources\Admin\BrandResource;
use App\Http\Resources\Admin\ParentCategoryResource;
use App\Http\Resources\Admin\ProductResource;
use App\Http\Resources\Admin\ReviewResource;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\ShopProductNotification;
use App\Services\CombinationService;
use App\Services\ProductService;
use App\Services\ProductStockService;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Request as FacadesRequest;

class ProductsController extends Controller
{
    public function __construct(protected readonly ProductService $productService, protected readonly ProductStockService $productStockService) {}

    public function index()
    {
        $products = ProductResource::collection(Product::latest()->filter(FacadesRequest::only('search'))->paginate()->appends(FacadesRequest::all()));
        return Inertia::render('Admin/Product/Products/Index', [
            'filters' => FacadesRequest::all('search'),
            'products' => $products,
        ]);
    }

    public function admin_products(Request $request)
    {
        $products = ProductResource::collection(Product::AddedByAdmin()->latest()->filter(FacadesRequest::only('search'))->paginate());
        return Inertia::render('Admin/Product/Products/Index', [
            'filters' => FacadesRequest::all('search'),
            'products' => $products,
        ]);
    }

    public function seller_products(Request $request)
    {
        $products = ProductResource::collection(Product::latest()->AddedBySeller()->filter(FacadesRequest::only('search'))->paginate());
        return Inertia::render('Admin/Product/Products/Index', [
            'filters' => FacadesRequest::all('search'),
            'products' => $products,
        ]);
    }

    public function bulk_import(Request $request)
    {
        return Inertia::render('Admin/Product/BulkImport/BulkImport');
    }

    public function create()
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('create', Product::class)) {
            return Inertia::render('Unauthorized');
        }

        $categoryList = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributeList = AttributeResource::collection(Attribute::with('attributeValue', 'categories')->get());
        $attributeValueList = AttributeValue::get();
        $colorsList = Color::get();
        $brandList =  BrandResource::collection(Brand::get());
        return Inertia::render('Admin/Product/Products/Create', [
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
                        array_push($data, $item['label']);
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

        // return $request->all();
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('store', Product::class)) {
            flash_error(trans('You don\'t have permission to create product'));
            return back();
        }
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

        flash_success(trans('Product has been inserted successfully'));

        return redirect()->route('admin.product.products.index');
    }

    public function product_edit($lang, $id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('edit', Product::class)) {
            flash_error(trans('You don\'t have permission to edit product'));
            return back();
        }
        $page = request()->page;
        App::setlocale($lang);
        $categoryList = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributeList = AttributeResource::collection(Attribute::with('attributeValue', 'categories')->get());
        $attributeValueList = AttributeValue::get();
        $colorsList = Color::get();
        $brandList =  BrandResource::collection(Brand::get());
        $product = new ProductResource(Product::find(base64_decode($id)));
        return Inertia::render('Admin/Product/Products/Edit', [
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
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('update', Product::class)) {
            flash_error(trans('You don\'t have permission to edit product'));
            return back();
        }
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

        if ($request->has('tab') && $request->tab != null) {
            return Redirect::to(URL::previous() . "#" . $request->tab);
        }
        return redirect()->route('admin.product.products.index');
    }


    public function duplicate(Request $request, $id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('clone', Product::class)) {
            flash_error(trans('You don\'t have permission to clone product'));
            return back();
        }
        $product = Product::find($id);

        //Product
        $product_new = $this->productService->product_duplicate_store($product);

        //Product Stock
        $this->productStockService->product_duplicate_store($product->stocks, $product_new);

        flash_success(trans('Product has been duplicated successfully'));

        return back();
    }

    public function destroy($id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('delete', Product::class)) {
            flash_error(trans('You don\'t have permission to delete product'));
            return back();
        }
        $product = Product::find($id);
        $product->delete();
        return back()->with('success', trans('Product Deleted Successfully!'));
    }

    public function published_status(Request $request, $id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('edit', Product::class)) {
            flash_error(trans('You don\'t have permission to edit product'));
            return back();
        }
        $product = Product::findOrFail($id);
        $product->published = $request->status;
        $product->save();
        return back()->with('success', trans('Product published status update successfully!'));
    }

    public function featured_status(Request $request, $id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('edit', Product::class)) {
            flash_error(trans('You don\'t have permission to edit product'));
            return back();
        }
        $product = Product::findOrFail($id);
        $product->featured = $request->status;
        if ($product->save()) {
            return back()->with('success', trans('Product featured status update successfully!'));
        }
        return back()->with('error', trans('Something went wrong!'));
    }

    public function todays_deal_status(Request $request, $id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('edit', Product::class)) {
            flash_error(trans('You don\'t have permission to edit product'));
            return back();
        }
        $product = Product::findOrFail($id);
        $product->todays_deal = $request->status;
        if ($product->save()) {
            Cache::forget('todays_deal_products');
            return back()->with('success', trans('Product todaysDeal status update successfully!'));
        }
        return back()->with('error', trans('Something went wrong!'));
    }

    public function approved_status(Request $request, $id)
    {
        /** @disregard [OPTIONAL CODE] [OPTIONAL DESCRIPTION] */
        if (auth('admin')->user()->cannot('edit', Product::class)) {
            flash_error(trans('You don\'t have permission to edit product'));
            return back();
        }
        $product = Product::findOrFail($id);
        $product->approved = $request->status;
        $product->save();
        if ($product->added_by == 'seller') {
            $users                  = $product->user;
            $data = array();
            $data['product_type']   = $product->digital ==  0 ? 'physical' : 'digital';
            $data['status']         = $product->status == 1 ? 'approved' : 'rejected';
            $data['product']        = $product;
            $data['notification_type_id'] = get_notification_type('seller_product_approved', 'type')->id;
            Notification::send($users, new ShopProductNotification($data));
        }
        return back()->with('success', trans('Product approved status update successfully!'));
    }

    public function product_review(Request $request)
    {
        $reviews = ReviewResource::collection(Review::with(['product', 'user'])->latest()->paginate(10));
        return Inertia::render('Admin/Product/ProductReview/ProductReview', [
            'reviews' => $reviews
        ]);
    }

    public function product_review_status(Request $request, $id)
    {
        $review = Review::find($id);
        $review->status = $request->status;
        $review->save();
        $product = Product::where('id', $review->product_id)->first();

        if (Review::where('product_id', $product->id)->where('status', 1)->count() > 0) {
            $product->rating = Review::where('product_id', $product->id)->where('status', 1)->sum('rating') / Review::where('product_id', $product->id)->where('status', 1)->count();
        } else {
            $product->rating = 0;
        }
        $product->save();
        if ($product->added_by == 'seller') {
            $seller = $product->user->shop;
            $seller->rating = (($seller->rating * $seller->num_of_reviews) + $review->rating) / ($seller->num_of_reviews + 1);
            $seller->num_of_reviews += 1;
            $seller->save();
        }
        return back()->with('success', trans('Review status updated successfully!'));
    }
}
