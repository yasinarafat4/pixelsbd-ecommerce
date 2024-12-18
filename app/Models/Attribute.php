<?php

namespace App\Models;

use App\Traits\PreventDemoModeChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Attribute extends ParrentModel
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title'
    ];


    public $translatable = ["title"];

    public function attributeValue()
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'attribute_category');
    }
}
