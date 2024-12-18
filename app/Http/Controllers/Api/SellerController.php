<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ShopCollection;
use App\Models\Seller;
use App\Models\Shop;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function topSellers()
    {
        $best_selers = get_best_sellers(5);
        return new ShopCollection($best_selers);
    }

    public function getSellers()
    {
        return new ShopCollection(Shop::where('verification_status', 1)->orderBy('num_of_sale', 'desc')->get());
    }
}
