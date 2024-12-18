<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'status' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
