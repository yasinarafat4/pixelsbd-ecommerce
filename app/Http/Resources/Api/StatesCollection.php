<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StatesCollection extends ResourceCollection
{
    public static $wrap = 'data';

    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($data) {
                return [
                    'id'      => (int) $data->id,
                    'country_id' => (int) $data->country_id,
                    'name' => $data->name,
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
