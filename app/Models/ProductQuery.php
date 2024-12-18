<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductQuery extends ParrentModel
{
    use HasFactory;

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function seller()
    {
        if ($this->seller_type === 'admin')
            return $this->belongsTo(Admin::class, 'seller_id');
        else
            return $this->belongsTo(Seller::class, 'seller_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
