<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends ParrentModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'user_type',
        'type',
        'code',
        'start_date',
        'end_date',
        'details',
        'discount',
        'discount_type',
        'status'
    ];

    public function user()
    {
        if ($this->user_type == 'admin')
            return $this->belongsTo(Admin::class, 'user_id');
        else
            return $this->belongsTo(Seller::class, 'user_id');
    }

    public function scopeIsValid($query)
    {
        return $query->where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now());
    }
}
