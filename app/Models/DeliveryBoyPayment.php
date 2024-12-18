<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryBoyPayment extends ParrentModel
{
    use HasFactory;

    public function deliveryboy()
    {
        return $this->belongsTo(DeliveryBoy::class, 'delivery_boy_id');
    }
}
