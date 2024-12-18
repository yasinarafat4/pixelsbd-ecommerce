<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Addon extends ParrentModel
{
    use HasFactory;

    public function scopeActive($query)
    {
        return $query->where('activated', 1);
    }
}
