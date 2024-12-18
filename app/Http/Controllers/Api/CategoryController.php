<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index($parent_id = 0)
    {
        if (request()->has('parent_id') && request()->parent_id) {
            $category = Category::where('slug', request()->parent_id)->first();
            $parent_id = $category->id;
        }

        // return Cache::remember("app.categories-$parent_id", 86400, function () use ($parent_id) {
        return new CategoryCollection(Category::orderBy('position', 'ASC')->get()->toTree());
        // });
    }

    public function info($slug)
    {
        return new CategoryCollection(Category::where('slug', $slug)->get());
    }

    public function featured()
    {
        // return Cache::remember('app.featured_categories', 86400, function () {
        return new CategoryCollection(Category::where('featured', 1)->get());
        // });
    }

    public function home()
    {
        $home_category_ids =  get_settings('home_categories') ?? [];
        return new CategoryCollection(Category::whereIn('id', $home_category_ids)->get());
    }

    public function top()
    {
        $home_category_ids =  get_settings('home_categories') ?? [];
        return new CategoryCollection(Category::whereIn('id', $home_category_ids)->limit(20)->get());
        // });
    }
}
