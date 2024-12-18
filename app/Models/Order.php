<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends ParrentModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'combined_order_id',
        'user_id',
        'guest_id',
        'seller_type',
        'seller_id',
        'shipping_address',
        'additional_info',
        'shipping_type',
        'delivery_status',
        'payment_type',
        'payment_status',
        'payment_details',
        'grand_total',
        'coupon_discount',
        'code',
        'date',
    ];

    // protected $with = ['orderDetails', 'user', 'seller'];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function seller()
    {
        if ($this->seller_type == 'admin')
            return $this->belongsTo(Admin::class, 'seller_id', 'id');
        else
            return $this->belongsTo(Seller::class, 'seller_id', 'id');
    }

    public function deliveryboy()
    {
        return $this->belongsTo(DeliveryBoy::class, 'assign_delivery_boy');
    }

    public function scopeAdminOrders($query)
    {
        return $query->where("seller_type", "admin");
    }

    public function scopeSellerOrders($query)
    {
        return $query->where('seller_type', 'seller');
    }
}
