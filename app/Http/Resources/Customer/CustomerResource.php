<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'image' => $this->image,
            'balance' => single_price($this->balance),
            'without_symbol_balance' => only_price($this->balance),
            'addresses' => AddressResource::collection($this->whenLoaded('addresses')),
            'wishlists' => $this->wishlists,
        ];
    }
}
