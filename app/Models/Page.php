<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Page extends ParrentModel
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title',
        'content',
        'type',
    ];

    public $translatable = ["title", "content"];
}
