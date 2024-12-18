<?php

namespace App\Http\Resources\Customer;

use App\Http\Resources\Customer\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'quantity' => $this->quantity,
            'variation' => $this->variation,
            'price' => convert_price($this->price),
            'discount' => convert_price($this->discount),
            'tax' => convert_price($this->tax),
            'shipping_cost' => convert_price($this->shipping_cost),
            'coupon_code' => $this->coupon_code,
            'coupon_applied' => $this->coupon_applied,
            'product' => new ProductResource($this->product),
        ];
    }
}
