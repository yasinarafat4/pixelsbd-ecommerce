<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommissionHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->order_id,
            'order_code' => $this->order->code,
            'seller' => $this->seller,
            'admin_commission' => $this->admin_commission,
            'seller_earning' => $this->seller_earning,
            'created_at' => $this->created_at
        ];
    }
}
