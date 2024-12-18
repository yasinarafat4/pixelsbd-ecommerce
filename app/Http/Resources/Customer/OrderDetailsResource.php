<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailsResource extends JsonResource
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
            'variation' => $this->variation,
            'price' => single_price($this->price),
            'tax' => $this->tax,
            'shipping_cost' => $this->shipping_cost,
            'quantity' => $this->quantity,
            'payment_status' => $this->payment_status,
            'delivery_status' => $this->delivery_status,
            'shipping_type' => $this->shipping_type,
            'product' => new ProductResource($this->product),
        ];
    }
}
