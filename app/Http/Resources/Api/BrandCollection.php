<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BrandCollection extends ResourceCollection
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
                    'logo' => static_asset($data->logo),
                    'links' => [
                        'products' => route('api.products.brand', $data->id)
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
