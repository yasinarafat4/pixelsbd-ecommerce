<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends ParrentModel
{
    use HasFactory;

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
