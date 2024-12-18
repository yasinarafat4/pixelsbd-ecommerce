<?php

namespace App\Http\Resources\Api;

use App\Models\Attribute;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductDetailCollection extends ResourceCollection
{
    public static $wrap = 'data';

    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($data) {
                $precision = 2;
                $calculable_price = home_discounted_base_price($data, false);
                $calculable_price = number_format($calculable_price, $precision, '.', '');
                $calculable_price = floatval($calculable_price);
                $photo_paths = explode(',', $data->gallery_image);

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

                foreach ($data->stocks as $stockItem) {
                    if ($stockItem->image != null && $stockItem->image != "") {
                        $item = array();
                        $item['variant'] = $stockItem->variant;
                        $item['path'] = static_asset($stockItem->image);
                        $photos[] = $item;
                    }
                }

                $brand = [
                    'id' => 0,
                    'name' => "",
                    'slug' => "",
                    'logo' => "",
                ];

                if ($data->brand != null) {
                    $brand = [
                        'id' => $data->brand->id,
                        'slug' => $data->brand->slug,
                        'name' => $data->brand->name,
                        'logo' => static_asset($data->brand->logo),
                    ];
                }

                return [
                    'id' => (int)$data->id,
                    'name' => $data->name,
                    'slug' => $data->slug,
                    'added_by' => $data->added_by,
                    'seller_id' => $data->user->id,
                    'shop_id' => $data->added_by == 'admin' ? 0 : $data->user->shop->id,
                    'shop_slug' => $data->added_by == 'admin' ? '' : $data->user->shop->slug,
                    'shop_name' => $data->added_by == 'admin' ? translate('In House Product') : $data->user->shop->name,
                    'shop_logo' => $data->added_by == 'admin' ? static_asset(get_settings('header_logo')) : static_asset($data->user->shop->logo) ?? "",
                    'photos' => $photos,
                    'thumbnail_image' => $data->thumbnail_image ? static_asset($data->thumbnail_image) : "",
                    'tags' => explode(',', $data->tags),
                    'price_high_low' => (float)explode('-', home_discounted_base_price($data, false))[0] == (float)explode('-', home_discounted_price($data, false))[1] ? format_price_with_symbol((float)explode('-', home_discounted_price($data, false))[0]) : "From " . format_price_with_symbol((float)explode('-', home_discounted_price($data, false))[0]) . " to " . format_price_with_symbol((float)explode('-', home_discounted_price($data, false))[1]),
                    'choice_options' => '',
                    'colors' => $data->colors ?? [],
                    'has_discount' => home_base_price($data, false) != home_discounted_base_price($data, false),
                    'discount' => "-" . discount_in_percentage($data) . "%",
                    'stroked_price' => home_base_price($data),
                    'main_price' => home_discounted_base_price($data),
                    'calculable_price' => $calculable_price,
                    'currency_symbol' => active_currency_symbol(),
                    'current_stock' => (int)$data->stocks->first()->qty,
                    'unit' => $data->unit ?? "",
                    'rating' => (float)$data->rating,
                    'rating_count' => (int)Review::where(['product_id' => $data->id])->count(),
                    'earn_point' => (float)$data->earn_point,
                    'description' => $data->description,
                    'downloads' => $data->pdf ? static_asset($data->pdf) : null,
                    'video_link' => $data->video_link != null ?  $data->video_link : "",
                    'brand' => $brand,
                    'link' => route('product', $data->slug),
                    'est_shipping_time' => (int)$data->est_shipping_days,

                ];
            })
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
            'status' => 200
        ];
    }

    protected function convertToChoiceOptions($data)
    {
        $result = array();
        if ($data) {
            foreach ($data as $key => $choice) {
                $item['name'] = $choice->attribute_id;
                $item['title'] = Attribute::find($choice->attribute_id)->name;
                $item['options'] = $choice->values;
                array_push($result, $item);
            }
        }
        return $result;
    }

    protected function convertPhotos($data)
    {
        $result = array();
        foreach ($data as $key => $item) {
            array_push($result, static_asset($item));
        }
        return $result;
    }
}
