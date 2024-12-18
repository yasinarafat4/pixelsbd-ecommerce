<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Language extends ParrentModel
{
    use HasFactory;


    protected $fillable = [
        'name',
        'rtl',
        'code'
    ];

    protected $casts = [
        'name' => 'string',
        'rtl' => 'boolean',
        'code' => 'string',
        'status' => 'boolean',
    ];

    public function scopeActive(Builder $query): void
    {
        $query->where('status', 1);
    }
}
