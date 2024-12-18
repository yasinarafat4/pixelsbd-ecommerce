<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FlashDealCollection extends ResourceCollection
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
                    'id' => $data->id,
                    'slug' => $data->slug,
                    'title' => $data->title,
                    'date' => $data->end_date,
                    'banner' => static_asset($data->banner),
                    'products' => new FlashDealProductCollection($data->flash_deal_products()->get())
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
