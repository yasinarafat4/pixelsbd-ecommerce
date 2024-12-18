<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerWithdrawRequestResource extends JsonResource
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
            'seller' => new SellerResource($this->seller),
            'amount' => $this->amount,
            'message' => $this->message,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
