<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\FlashDealCollection;
use App\Http\Resources\Api\ProductMiniCollection;
use App\Models\FlashDeal;
use App\Models\Product;

class FlashDealController extends Controller
{
    public function featured_flash_deals()
    {
        return new FlashDealCollection(FlashDeal::IsActiveAndFeatured()->isValid()->get());
    }

    public function flash_deals()
    {
        return new FlashDealCollection(FlashDeal::active()->isValid()->get());
    }

    public function info($slug)
    {
        return new FlashDealCollection(FlashDeal::where('slug', $slug)->active()->isValid()->get());
    }

    public function flash_deal_products($id)
    {
        $flash_deal = FlashDeal::where("id", $id)->first();
        $products = collect();
        foreach ($flash_deal->flash_deal_products as $key => $flash_deal_product) {
            if (Product::find($flash_deal_product->product_id) != null) {
                $products->push(Product::find($flash_deal_product->product_id));
            }
        }
        return new ProductMiniCollection($products);
    }
}
