<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CombinedOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'grand_total' => $this->grand_total,
            'first_order' => new  OrderResource($this->orders->first()),
            'orders' => OrderResource::collection($this->orders),
        ];
    }
}
