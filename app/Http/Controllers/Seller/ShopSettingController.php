<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\Shop;
use App\Models\ShopSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShopSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shop = Shop::where('seller_id', auth('seller')->user()->id)->first();
        return Inertia::render('Seller/ShopSetting/Index', [
            'shop' => $shop
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_shop_info(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required'
        ]);

        $slug = Str::slug($request->name);
        $same_slug_count = Shop::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        $shop = Shop::find($id);
        $shop->name = $request->name;
        $shop->slug = $slug;
        $shop->address = $request->address;
        $shop->phone = $request->phone;
        $shop->logo = $request->logo;
        $shop->shop_banner = $request->shop_banner;
        $shop->shipping_cost = $request->shipping_cost;
        $shop->meta_title = $request->meta_title;
        $shop->meta_description = $request->meta_description;
        $shop->save();
        flash_success(trans('Shop Info Updated successfully!'));
        return back();
    }

    public function update_delivery_pickup_point(Request $request, $id)
    {
        $request->validate([
            'delivery_pickup_latitude' => 'required',
            'delivery_pickup_longitude' => 'required',
        ]);

        $shop = Shop::find($id);
        $shop->delivery_pickup_latitude = $request->delivery_pickup_latitude;
        $shop->delivery_pickup_longitude = $request->delivery_pickup_longitude;
        $shop->save();
        flash_success(trans('Delivery Pickup Point Updated successfully!'));
        return back();
    }

    public function update_social_media_links(Request $request, $id)
    {
        $shop = Shop::find($id);
        $shop->facebook = $request->facebook;
        $shop->instagram = $request->instagram;
        $shop->twitter = $request->twitter;
        $shop->google = $request->google;
        $shop->youtube = $request->youtube;
        $shop->save();
        flash_success(trans('Social Media Links Updated successfully!'));
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShopSetting $shopSetting)
    {
        //
    }
}
