<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'name',
        'logo',
        'top_banner',
        'phone',
        'address',
        'rating',
        'facebook',
        'instagram',
        'google',
        'twitter',
        'youtube',
        'slug',
    ];

    protected $casts = [
        'id' => 'integer',
        'verification_info' => 'array',
        'verification_status' => 'integer',
    ];

    // protected $with = ['seller'];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function followers()
    {
        return $this->hasMany(FollowSeller::class);
    }
}
