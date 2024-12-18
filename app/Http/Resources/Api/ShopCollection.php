<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShopCollection extends ResourceCollection
{
    public static $wrap = 'data';

    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($data) {
                return [
                    'id' => $data->id,
                    'slug' => $data->slug,
                    'name' => $data->name,
                    'logo' => $data->logo ? static_asset($data->logo) : "",
                    'banner' => $data->shop_banner ? static_asset($data->shop_banner) : "",
                    'rating' => $data->rating,
                    'reviews' => $data->num_of_reviews,
                    'products_count' => $data->seller->products->count(),
                ];
            })
        ];
    }

    public function with(Request $request): array
    {
        return [
            'status' => 200,
            'success' => true
        ];
    }
}
