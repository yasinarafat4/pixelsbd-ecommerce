<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends ParrentModel
{
    use HasFactory;

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
