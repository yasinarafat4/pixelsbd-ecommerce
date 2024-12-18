<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
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
            'image' => $this->image,
            'email' => $this->email,
            'user_type' => $this->user_type,
            'status' => $this->status,
            // 'products_count' => count($this->products),
            'products' => ProductResource::collection($this->products),
            // 'shop' => '',
        ];
    }
}
