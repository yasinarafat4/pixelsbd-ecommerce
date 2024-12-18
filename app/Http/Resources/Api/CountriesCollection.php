<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CountriesCollection extends ResourceCollection
{
    public static $wrap = 'data';

    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($data) {
                return [
                    'id'      => (int) $data->id,
                    'code' => $data->code,
                    'name' => $data->name,
                    'status' => (int) $data->status,
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
