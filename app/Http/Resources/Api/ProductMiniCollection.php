<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductMiniCollection extends ResourceCollection
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
                    'slug' => $data->slug,
                    'thumbnail_image' => $data->thumbnail_image ? static_asset($data->thumbnail_image) : "",
                    'has_discount' => home_base_price($data, false) != home_discounted_base_price($data, false),
                    'discount' => "-" . discount_in_percentage($data) . "%",
                    'stroked_price' => home_base_price($data),
                    'main_price' => home_discounted_base_price($data),
                    'rating' => (float) $data->rating,
                    'sales' => (int) $data->num_of_sale,
                    'links' => [
                        'details' => route('products.show', $data->id),
                    ]
                ];
            })
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
            'status' => 200
        ];
    }
}
