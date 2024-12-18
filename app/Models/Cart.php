<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends ParrentModel
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = ['address_id', 'price', 'tax', 'shipping_cost', 'discount', 'product_referral_code', 'coupon_code', 'coupon_applied', 'quantity', 'user_id', 'temp_user_id', 'owner_id', 'product_id', 'variation'];

    protected $casts = [
        'price' => 'double',
        'tax' => 'double',
        'shipping_cost' => 'double',
        'discount' => 'double',
        'coupon_code' => 'string',
        'coupon_applied' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
