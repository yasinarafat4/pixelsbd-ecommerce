<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends ParrentModel
{
    use HasFactory;

    // Relations
    public function blogCategory(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }
}
