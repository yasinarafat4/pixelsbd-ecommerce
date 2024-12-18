<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends ParrentModel
{
    use HasFactory;


    public function states()
    {
        return $this->hasMany(State::class);
    }

    public function cities()
    {
        return $this->hasMany(City::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
