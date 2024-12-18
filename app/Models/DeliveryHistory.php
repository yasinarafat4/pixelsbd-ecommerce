<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryHistory extends ParrentModel
{
    use HasFactory;

    public function order()
    {
        return $this->hasOne(Order::class, 'id', 'order_id');
    }
}
