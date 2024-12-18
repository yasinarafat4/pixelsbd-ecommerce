<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FlashDealProductCollection extends ResourceCollection
{
    public static $wrap = 'data';
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($data) {
                return [
                    'id' => $data->product_id,
                    'name' => $data->product->name,
                    'slug' => $data->product->slug,
                    'thumbnail_image' => static_asset($data->product->thumbnail_image),
                    'has_discount' => home_base_price($data->product, false) != home_discounted_base_price($data->product, false),
                    'discount' => "-" . discount_in_percentage($data->product) . "%",
                    'stroked_price' => home_base_price($data->product),
                    'main_price' => home_discounted_base_price($data->product),
                    'rating' => (float) $data->product->rating,
                    'links' => [
                        'details' => route('products.show', $data->product_id),
                    ]
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
