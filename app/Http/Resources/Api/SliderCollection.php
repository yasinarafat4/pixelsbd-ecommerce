<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SliderCollection extends ResourceCollection
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
                //dd($data);
                return [
                    'photo' => $data['image'] ? static_asset($data['image']) : "",
                    'url' => $data['link'],
                ];
            })->filter(function ($item) {
                return !empty($item['photo']);
            })->values(),
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
