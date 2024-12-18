<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
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
            'slug' => $this->slug,
            'shop_banner' => $this->shop_banner,
            'logo' => $this->logo,
            'rating' => $this->rating,
            'num_of_sale' => $this->num_of_sale,
            'num_of_reviews' => $this->num_of_reviews,
            'seller' => new SellerResource($this->seller),
        ];
    }
}
