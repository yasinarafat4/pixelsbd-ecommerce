<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\Translatable\HasTranslations;

class Category extends ParrentModel
{
    use HasFactory, HasTranslations, NodeTrait, SoftDeletes;


    protected $fillable = [
        'name',
        'slug',
        'commision_rate',
    ];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'position' => 'integer',
        'commision_rate' => 'integer',
        'home_status' => 'boolean',
        'featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'filtering_attributes' => 'array',
    ];



    public $translatable = ["name"];


    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function childes(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'attribute_category');
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('featured', 1);
    }

    public function scopeHomeStatus(Builder $query): void
    {
        $query->where('home_status', 1);
    }

    protected static function boot(): void
    {
        parent::boot();
    }
}
