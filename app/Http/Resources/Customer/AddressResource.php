<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
            'address' => $this->address,
            'phone' => $this->phone,
            'country' => $this->country->name,
            'country_id' => $this->country_id,
            'state' => $this->state->name,
            'state_id' => $this->state_id,
            'city' => $this->city->name,
            'city_id' => $this->city_id,
            'zip_code' => $this->zip_code,
            'set_default' => $this->set_default,
        ];
    }
}
