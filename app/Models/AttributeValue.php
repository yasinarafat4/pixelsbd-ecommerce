<?php

namespace App\Models;

use App\Traits\PreventDemoModeChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'attribute_id',
        'value',
    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}
