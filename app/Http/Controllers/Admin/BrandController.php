<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class BrandController extends Controller
{

    public function index(Request $request)
    {

        $brands = BrandResource::collection(Brand::orderBy('created_at', 'desc')->paginate(10));
        return Inertia::render('Admin/Product/Brand/Index', [
            'brands' => $brands
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Product/Brand/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $slug = Str::slug($request->name);
        $same_slug_count = Brand::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->slug = $slug;
        $brand->logo = $request->logo;
        $brand->meta_title = $request->meta_title;
        $brand->meta_description = $request->meta_description;
        $brand->save();
        return redirect()->route('admin.product.brand.index')->with('success', trans('Brand added successfully!'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Product/Brand/Show');
    }

    public function brand_edit($id, $lang)
    {
        App::setlocale($lang);
        $brand = new BrandResource(Brand::where('id', $id)->withoutGlobalScopes()->first());
        return Inertia::render('Admin/Product/Brand/Edit', [
            'lang' => $lang,
            'brand' => $brand,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);


        $slug = Str::slug($request->name);
        $same_slug_count = Brand::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        $brand = Brand::find($id);
        $brand->setTranslation('name', $request->lang, $request->name);
        $brand->slug = $slug;
        $brand->logo = $request->logo;
        $brand->meta_title = $request->meta_title;
        $brand->meta_description = $request->meta_description;
        $brand->save();
        return redirect()->route('admin.product.brand.index')->with('success', trans('Brand updated successfully!'));
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);
        $brand->delete();
        return back()->with('success', 'Brand deleted successfully');
    }
}
