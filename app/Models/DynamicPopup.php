<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DynamicPopup extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'summary',
        'image',
        'background_color',
        'text_color',
        'link',
        'status'
    ];

    public function scopeActive($query)
    {
        return $query->where('status', '1');
    }
}
