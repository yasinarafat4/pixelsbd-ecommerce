<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\BrandResource;
use App\Http\Resources\Customer\ProductResource;
use App\Http\Resources\Customer\ShopResource;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function brands()
    {
        $brands = BrandResource::collection(Brand::orderBy('created_at', 'desc')->get());
        return Inertia::render('Frontend/Themes/' . theme_name() . '/AllBrands/AllBrands', [
            'brands' => $brands
        ]);
    }

    public function brand_page($slug)
    { {
            $sort_by = request()->input('sort_by');
            $min_price = request()->input('min_price');
            $max_price = request()->input('max_price');
            $color = request()->input('color');

            // Initialize product query
            $brand = new BrandResource(Brand::where('slug', $slug)->first());
            $products = Product::query();
            $products = $products->where('brand_id', $brand->id);

            // Price range filtering
            if ($min_price != null && $max_price != null) {
                $products->where('unit_price', '>=', $min_price)->where('unit_price', '<=', $max_price);
            }

            // Sorting logic
            switch ($sort_by) {
                case 'newest':
                    $products->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $products->orderBy('created_at', 'asc');
                    break;
                case 'price-asc':
                    $products->orderBy('unit_price', 'asc');
                    break;
                case 'price-desc':
                    $products->orderBy('unit_price', 'desc');
                    break;
                default:
                    $products->orderBy('id', 'desc');
                    break;
            }

            // Color filtering
            if ($color != null) {
                $products->where('colors', 'like', '%' . $color . '%');
            }

            // Paginate filtered products
            $products = ProductResource::collection($products->paginate(8)->appends(request()->query()));

            // Additional data
            $minimum_price = get_product_min_unit_price(null, null, null, $brand->id);
            $maximum_price =  get_product_max_unit_price(null, null, null, $brand->id);
            $colors = Color::get();


            // Return view
            return Inertia::render('Frontend/Themes/' . theme_name() . '/BrandPage/BrandPage', [
                'brand' => $brand,
                'colors' => $colors,
                'products' => $products,
                'minimum_price' => $minimum_price,
                'maximum_price' => $maximum_price,
            ]);
        }
    }
}
