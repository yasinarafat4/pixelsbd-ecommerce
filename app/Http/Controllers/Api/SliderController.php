<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\SliderCollection;

class SliderController extends Controller
{
    public function sliders()
    {
        return new SliderCollection(get_settings('home_sliders'));
    }

    public function bannerOne()
    {
        $banners = get_settings('home_banner_one') ?? [];
        return new SliderCollection($banners);
    }

    public function bannerTwo()
    {
        $banners = get_settings('home_banner_two') ?? [];

        return new SliderCollection($banners);
    }

    public function bannerThree()
    {
        $banners = get_settings('home_banner_three') ?? [];
        return new SliderCollection($banners);
    }
}
