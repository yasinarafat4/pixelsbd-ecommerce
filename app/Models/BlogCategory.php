<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategory extends ParrentModel
{
    use HasFactory;

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class);
    }
}
