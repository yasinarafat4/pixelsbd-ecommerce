<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Translatable\HasTranslations;

class Brand extends ParrentModel
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'logo'
    ];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $translatable = ["name"];
}
