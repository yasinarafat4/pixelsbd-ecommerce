<?php

namespace App\Http\Resources\Customer;

use App\Http\Resources\Admin\BrandResource;
use App\Http\Resources\Admin\ReviewResource;
use App\Http\Resources\CategoryResource;
use App\Models\Review;
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

        $precision = 2;
        $calculable_price = home_discounted_base_price($this, false);
        $calculable_price = number_format($calculable_price, $precision, '.', '');
        $calculable_price = floatval($calculable_price);
        $photo_paths = explode(',', $this->gallery_image);

        $photos = [];


        if (!empty($photo_paths)) {
            for ($i = 0; $i < count($photo_paths); $i++) {
                if ($photo_paths[$i] != "") {
                    $item = array();
                    $item['variant'] = "";
                    $item['path'] = static_asset($photo_paths[$i]);
                    $photos[] = $item;
                } else {
                    $item = array();
                    $item['variant'] = "";
                    $item['path'] = "";
                    $photos[] = $item;
                }
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'added_by' => $this->added_by,
            'seller_id' => $this->user->id,
            'shop_id' => $this->added_by == 'admin' ? 0 : $this->user->shop->id,
            'shop_slug' => $this->added_by == 'admin' ? '' : $this->user->shop->slug,
            'shop_name' => $this->added_by == 'admin' ? translate('In House Product') : $this->user->shop->name,
            'shop_logo' => $this->added_by == 'admin' ? static_asset(get_settings('header_logo')) : static_asset($this->user->shop->logo) ?? "",
            'photos' => $photos,
            'thumbnail_image' => $this->thumbnail_image ? static_asset($this->thumbnail_image) : "",
            'tags' => explode(',', $this->tags),
            'price_high_low' => (float)explode('-', home_discounted_base_price($this, false))[0] == (float)explode('-', home_discounted_price($this, false))[1] ? format_price_with_symbol((float)explode('-', home_discounted_price($this, false))[0]) : "From " . format_price_with_symbol((float)explode('-', home_discounted_price($this, false))[0]) . " to " . format_price_with_symbol((float)explode('-', home_discounted_price($this, false))[1]),
            'choice_options' => $this->choice_options,
            'colors' => $this->colors,
            'has_discount' => home_base_price($this, false) != home_discounted_base_price($this, false),
            'discount' => "-" . discount_in_percentage($this) . "%",
            'stroked_price' => home_base_price($this),
            'main_price' => home_discounted_base_price($this),
            'calculable_price' => $calculable_price,
            'currency_symbol' => active_currency_symbol(),
            'current_stock' => (int)$this->stocks->first()->qty,
            'unit' => $this->unit ?? "",
            'rating' => (float)$this->rating,
            'rating_count' => (int)Review::where(['product_id' => $this->id])->count(),
            'description' => $this->description,
            'est_shipping_time' => (int)$this->est_shipping_days,
            'link' => route('product', $this->slug),

            'category' => new CategoryResource($this->category),
            'brand' => new BrandResource($this->brand),
            'unit' => $this->unit,
            'weight' => $this->weight,
            'min_qty' => $this->min_qty,
            'barcode' => $this->barcode,
            'video_provider' => $this->video_provider,
            'video_link' => $this->video_link,
            'unit_price' => convert_price($this->unit_price),
            'discount_type' => $this->discount_type,
            'discount_start_date' => $this->discount_start_date,
            'discount_end_date' => $this->discount_end_date,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_image' => $this->meta_image,
            // $this->mergeWhen(($this->added_by === 'seller'), [
            //     'user' => new SellerResource($this->user),
            // ]),
            // $this->mergeWhen(($this->added_by === 'admin'), [
            //     'user' => new AdminResource($this->user),
            // ]),
            'user' => $this->user,
            'num_of_sale' => $this->num_of_sale,
            'reviews' => ReviewResource::collection($this->active_reviews),
            'product_query' => ProductQueryResource::collection($this->product_query),
            'attributes' => $this->attributes,
            'dynamic_attributes' => $this->dynamic_attributes,
            'variant_product' => $this->variant_product,
        ];
    }
}
