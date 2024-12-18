<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\BrandCollection;
use App\Models\Brand;
use App\Utility\SearchUtility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brand_query = Brand::query();
        if ($request->name != "" || $request->name != null) {
            $brand_query->where('name', 'like', '%' . $request->name . '%');
            SearchUtility::store($request->name);
        }
        // return $brand_query->paginate(10);
        return new BrandCollection($brand_query->paginate(10));
    }


    public function getBrands()
    {
        return new BrandCollection(Brand::all());
    }

    public function top()
    {
        return Cache::remember('app.top_brands', 86400, function () {
            $top_brand_ids =  get_settings('top_brands') ?? [];
            return new BrandCollection(Brand::whereIn('id', $top_brand_ids)->get());
        });
    }
}
