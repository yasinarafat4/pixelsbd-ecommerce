<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CurrencyCollection extends ResourceCollection
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
            'data' => $this->collection->map(
                function ($data) {
                    return [
                        'id' => $data->id,
                        'name' => $data->name,
                        'symbol' => $data->symbol,
                        'code' => $data->code,
                        'exchange_rate' => $data->exchange_rate,
                        'is_default' => get_settings('default_currency') == $data->id ? true : false
                    ];
                }
            ),
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
