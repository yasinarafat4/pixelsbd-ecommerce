<?php

namespace App\Http\Resources\Seller;

use App\Http\Resources\Seller\OrderDetailsResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class OrderResource extends JsonResource
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
            'guest_id' => $this->guest_id,
            'user' => $this->user,
            'seller' => $this->seller,
            'shipping_address' => json_decode($this->shipping_address),
            'additional_info' => $this->additional_info,
            'payment_type' => $this->payment_type,
            'delivery_status' => $this->delivery_status,
            'payment_status' => $this->payment_status,
            'payment_details' => $this->payment_details,
            'grand_total' => $this->grand_total,
            'coupon_discount' => $this->coupon_discount,
            'code' => $this->code,
            'date' => $this->date,
            'viewed' => $this->viewed,
            'delivery_viewed' => $this->delivery_viewed,
            'assign_delivery_boy' => $this->assign_delivery_boy,
            'payment_status_viewed' => $this->payment_status_viewed,
            'commission_calculated' => $this->commission_calculated,
            'order_details' => OrderDetailsResource::collection($this->orderDetails),
            'subtotal' => $this->orderDetails->sum('price'),
            'shipping_cost' => $this->orderDetails->sum('shipping_cost'),
            'tax' => $this->orderDetails->sum('tax'),
        ];
    }
}
