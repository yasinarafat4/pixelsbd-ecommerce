<?php

namespace App\Http\Resources\Customer;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($this->type == "product_base") {
            $products = array();
            foreach (json_decode($this->details) as $key => $value) {
                $product = Product::find($value->product_id);
                array_push($products, $product);
            }
            if ($this->discount_type == 'amount') {
                $discount = single_price($this->discount);
            } else {
                $discount = $this->discount . '%';
            }
            $coupon_data = [
                'id' => $this->id,
                'user' => $this->user,
                'user_type' => $this->user_type,
                'type' => $this->type,
                'code' => $this->code,
                'discount' => $discount,
                'discount_type' => $this->discount_type,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'products' => $products,

            ];
        }
        if ($this->type == "cart_base") {
            $details = json_decode($this->details);
            if ($this->discount_type == 'amount') {
                $discount = single_price($this->discount);
            } else {
                $discount = $this->discount . '%';
            }
            $coupon_data = [
                'id' => $this->id,
                'user' => $this->user,
                'user_type' => $this->user_type,
                'type' => $this->type,
                'code' => $this->code,
                'discount' => $discount,
                'discount_type' => $this->discount_type,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'minimum_buy' => single_price($details->minimum_buy),
                'maximum_discount' => single_price($details->maximum_discount),
            ];
        }
        if ($this->type == "welcome_base") {
            $details = json_decode($this->details);
            if ($this->discount_type == 'amount') {
                $discount = single_price($this->discount);
            } else {
                $discount = $this->discount . '%';
            }
            $coupon_data = [
                'id' => $this->id,
                'user' => $this->user,
                'user_type' => $this->user_type,
                'type' => $this->type,
                'code' => $this->code,
                'discount' => $discount,
                'discount_type' => $this->discount_type,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'minimum_buy' => single_price($details->minimum_buy),
                'validation_days' => $details->validation_days,
            ];
        }
        return $coupon_data;
    }
}
