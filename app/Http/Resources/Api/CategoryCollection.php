<?php

namespace App\Http\Resources\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryCollection extends ResourceCollection
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
                    'banner' => $data->banner_image ? static_asset($data->banner_image) : placeholder1_1(),
                    'icon' => $data->icon ? static_asset($data->icon) : placeholder1_1(),
                    'cover_image' => $data->cover_image ? static_asset($data->cover_image) :  placeholder6_1(),
                    'number_of_children' => Category::whereAncestorOf($data->id)->count(),
                    'products' => new ProductDetailCollection($data->products->take(4)),
                    'links' => [
                        'products' => route('api.products.category', $data->id),
                        'sub_categories' => route('subCategories.index', $data->id)
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
