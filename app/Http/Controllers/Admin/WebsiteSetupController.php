<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BrandResource;
use App\Http\Resources\Admin\ParentCategoryResource;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;

class WebsiteSetupController extends Controller
{
    public function __construct() {}

    public function appearence()
    {
        return Inertia::render('Admin/WebsiteSetup/Appearence');
    }

    public function select_theme()
    {
        return Inertia::render('Admin/WebsiteSetup/SelectTheme');
    }

    public function homepage_setting(Request $request)
    {
        $categories = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        // $categories = AdminParentCategoryResource::collection(Category::where('digital', 0)->get()->toTree());
        $brands = BrandResource::collection(Brand::get());
        return Inertia::render('Admin/WebsiteSetup/HomePageSetting/HomePageSetting', [
            'tab' => $request->input('tab'),
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function header_setting($lang = 'en')
    {
        session()->put('lang', $lang);
        App::setlocale($lang);
        return Inertia::render('Admin/WebsiteSetup/HeaderSetting', [
            'lang' => $lang,
        ]);
    }

    public function footer_setting($lang = 'en')
    {
        App::setlocale($lang);
        return Inertia::render('Admin/WebsiteSetup/FooterSetting', [
            'lang' => $lang,
        ]);
    }

    public function contact_page($lang = 'en')
    {
        App::setlocale($lang);
        return Inertia::render('Admin/WebsiteSetup/ContactPage', [
            'lang' => $lang,
        ]);
    }
}
