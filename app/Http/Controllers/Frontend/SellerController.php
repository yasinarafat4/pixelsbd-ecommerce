<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Customer\CategoryDescendantsResource;
use App\Http\Resources\Customer\ProductResource;
use App\Http\Resources\Customer\SellerResource;
use App\Http\Resources\Customer\ShopResource;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Seller;
use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerController extends Controller
{
    public function all_sellers()
    {
        $sellers = SellerResource::collection(Seller::get());
        return Inertia::render('Frontend/Themes/' . theme_name() . '/AllSellers/AllSellers', [
            'sellers' => $sellers
        ]);
    }

    // public function shop_page($slug)
    // {
    //     $sort_by = request()->input('sort_by');
    //     $min_price = request()->input('min_price');
    //     $max_price = request()->input('max_price');
    //     $color = request()->input('color');
    //     $products = Product::query();

    //     if ($min_price != null && $max_price != null) {
    //         $products->where('unit_price', '>=', $min_price)->where('unit_price', '<=', $max_price);
    //     }

    //     switch ($sort_by) {
    //         case 'newest':
    //             $products->orderBy('created_at', 'desc');
    //             break;
    //         case 'oldest':
    //             $products->orderBy('created_at', 'asc');
    //             break;
    //         case 'price-asc':
    //             $products->orderBy('unit_price', 'asc');
    //             break;
    //         case 'price-desc':
    //             $products->orderBy('unit_price', 'desc');
    //             break;
    //         default:
    //             $products->orderBy('id', 'desc');
    //             break;
    //     }

    //     if ($color != null) {
    //         $products->where('colors', 'like', '%' . $color . '%');
    //     }

    //     $products = ProductResource::collection(filter_products($products)->paginate(8)->appends(request()->query()));
    //     $minimum_price = Product::isApprovedPublished()->where('featured', 1)->min('unit_price');
    //     $maximum_price =  Product::isApprovedPublished()->where('featured', 1)->max('unit_price');
    //     $colors = Color::get();
    //     $shop = new ShopResource(Shop::where('slug', $slug)->first());
    //     // $products = ProductResource::collection(Product::paginate(8));
    //     // $products = ProductResource::collection(filter_products($products)->paginate(8)->appends(request()->query()));

    //     return Inertia::render('Frontend/Themes/' . theme_name() . '/ShopPage/ShopPage', [
    //         'shop' => $shop,
    //         'colors' => $colors,
    //         'products' => $products,
    //         'minimum_price' => $minimum_price,
    //         'maximum_price' => $maximum_price,
    //     ]);
    // }

    public function shop_page($slug)
    {
        $sort_by = request()->input('sort_by');
        $min_price = request()->input('min_price');
        $max_price = request()->input('max_price');
        $color = request()->input('color');

        // Initialize product query
        $shop = new ShopResource(Shop::where('slug', $slug)->first());
        $products = Product::query();
        $products = $products->AddedBySeller()->where('user_id', $shop->seller->id);

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
        $minimum_price = get_product_min_unit_price($shop->seller->id);
        $maximum_price =  get_product_max_unit_price($shop->seller->id);
        $categories = categories();
        $colors = Color::get();


        // Return view
        return Inertia::render('Frontend/Themes/' . theme_name() . '/ShopPage/ShopPage', [
            'shop' => $shop,
            'colors' => $colors,
            'products' => $products,
            'categories' => $categories,
            'minimum_price' => $minimum_price,
            'maximum_price' => $maximum_price,
        ]);
    }
}
