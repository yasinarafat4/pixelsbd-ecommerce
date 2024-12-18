<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashDeal extends ParrentModel
{
    use HasFactory;

    protected $casts = [
        'slug' => 'string',
        'status' => 'boolean',
        'featured' => 'boolean',
    ];

    public function flash_deal_products()
    {
        return $this->hasMany(FlashDealProduct::class, 'flash_deal_id');
    }

    public function scopeIsActiveAndFeatured($query)
    {
        return $query->where('status', '1')->where('featured', '1');
    }

    public function scopeIsValid($query)
    {
        return $query->where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now());
    }

    public function scopeActive($query)
    {
        return $query->where('status', '1');
    }
}
