<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Product extends ParrentModel
{
    use HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'added_by',
        'user_id',
        'category_id',
        'brand_id',
        'gallery_image',
        'thumbnail_image',
        'video_provider',
        'video_link',
        'tags',
        'description',
        'current_stock',
        'stock_visibility_state',
        'unit',
        'unit_price',
        'weight',
        'min_qty',
        'low_stock_qty',
        'stock_visibility_state',
        'discount',
        'discount_type',
        'discount_start_date',
        'discount_end_date',
        'variant_product',
        'tax',
        'tax_type',
        'shipping_type',
        'shipping_cost',
        'is_quantity_multiplied',
        'cash_on_delivery',
        'est_shipping_days',
        'meta_title',
        'meta_description',
        'meta_image',
        'barcode',
        'colors',
        'choice_options',
        'attributes',
        'published',
        'approved',
    ];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'unit_price' => 'float',
        'featured' => 'boolean',
        'published' => 'boolean',
        'approved' => 'boolean',
        'featured' => 'boolean',
        'todays_deal' => 'boolean',
        'seller_featured' => 'boolean',
        'is_quantity_multiplied' => 'boolean',
        'cash_on_delivery' => 'boolean',
        'digital' => 'boolean',
        'variant_product' => 'boolean',
        'colors' => 'array',
        'choice_options' => 'array',
        'attributes' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // protected $with = ['stocks', 'reviews'];

    public $translatable = ["name", "description"];


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);
    }

    public function user()
    {
        if ($this->added_by === 'admin')
            return $this->belongsTo(Admin::class, 'user_id');
        else
            return $this->belongsTo(Seller::class, 'user_id');
    }

    public function stocks()
    {
        return $this->hasMany(ProductStock::class, 'product_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_id');
    }

    public function active_reviews()
    {
        return $this->reviews()->where('status', 1);
    }

    public function product_query()
    {
        return $this->hasMany(ProductQuery::class, 'product_id');
    }

    public function flash_deal_product()
    {
        return $this->hasMany(FlashDealProduct::class, 'product_id');
    }



    public function scopeAddedByAdmin($query)
    {
        return $query->where('added_by', 'admin');
    }

    public function scopeAddedBySeller($query)
    {
        return $query->where('added_by', 'seller');
    }

    public function scopePhysical($query)
    {
        return $query->where('digital', 0);
    }

    public function scopeDigital($query)
    {
        return $query->where('digital', 1);
    }

    public function scopeIsApprovedPublished($query)
    {
        return $query->where('approved', 1)->where('published', 1);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        });
    }
}
