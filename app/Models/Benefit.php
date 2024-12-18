<?php

namespace App\Models;

use App\Traits\PreventDemoModeChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Benefit extends ParrentModel
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title',
        'sub_title',
    ];

    public $translatable = ["title", "sub_title"];
}
