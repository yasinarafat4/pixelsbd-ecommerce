<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => new CategoryResource($this->category),
            'brand' => new BrandResource($this->brand),
            'unit' => $this->unit,
            'weight' => $this->weight,
            'min_qty' => $this->min_qty,
            'barcode' => $this->barcode,
            'tags' => explode(',', $this->tags),
            'description' => $this->description,
            'gallery_image' => explode(',', $this->gallery_image),
            'thumbnail_image' => $this->thumbnail_image,
            'video_provider' => $this->video_provider,
            'video_link' => $this->video_link,
            'unit_price' => $this->unit_price,
            'discount_type' => $this->discount_type,
            'discount' => $this->discount,
            'discount_start_date' => $this->discount_start_date,
            'discount_end_date' => $this->discount_end_date,
            'stocks' => $this->stocks,
            'low_stock_qty' => $this->low_stock_qty,
            'stock_visibility_state' => $this->stock_visibility_state,
            'tax_type' => $this->tax_type,
            'tax' => $this->tax,
            'shipping_type' => $this->shipping_type,
            'shipping_cost' => $this->shipping_cost,
            'cash_on_delivery' => $this->cash_on_delivery,
            'is_quantity_multiplied' => $this->is_quantity_multiplied,
            'est_shipping_days' => $this->est_shipping_days,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_image' => $this->meta_image,
            'stocks' => $this->stocks,
            'user' => $this->user,
            'num_of_sale' => $this->num_of_sale,
            'rating' => $this->rating,
            'digital' => $this->digital,
            'variant_product' => $this->variant_product,
            'published' => $this->published,
            'featured' => $this->featured,
            'todays_deal' => $this->todays_deal,
            'approved' => $this->approved,
            'colors' => $this->colors,
            'attributes' => $this->attributes,
            'dynamic_attributes' => $this->dynamic_attributes,
            'choice_options' => $this->choice_options,
            'reviews' => $this->reviews,
        ];
    }
}
