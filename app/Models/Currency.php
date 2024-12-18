<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'name',
        'symbol',
        'code',
        'exchange_rate',
    ];

    protected $casts = [
        'name' => 'string',
        'symbol' => 'string',
        'code' => 'string',
        'exchange_rate' => 'double',
        'status' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeActive(Builder $query): void
    {
        $query->where('status', 1);
    }
}
