<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerResource extends JsonResource
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
            'f_name' => $this->f_name,
            'l_name' => $this->l_name,
            'name' => $this->name,
            'image' => $this->image,
            'email' => $this->email,
            'banned' => $this->banned,
            'bank_payment_status' => $this->bank_payment_status,
            'cash_payment_status' => $this->cash_payment_status,
            'bank_name' => $this->bank_name,
            'account_no' => $this->account_no,
            'bank_routing_no' => $this->bank_routing_no,
            'holder_name' => $this->holder_name,
            'branch' => $this->branch,
            'phone' => $this->phone,
            'shop' => $this->shop,
            'products_count' => count($this->products),
            'admin_to_pay' => $this->shop->admin_to_pay,
            'to_pay' => $this->shop->admin_to_pay >= 0 ? 'Due to Seller' : 'Due to Admin',
        ];
    }
}
