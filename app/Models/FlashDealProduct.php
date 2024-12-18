<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashDealProduct extends ParrentModel
{
    use HasFactory;

    protected $fillable = ['flash_deal_id', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
