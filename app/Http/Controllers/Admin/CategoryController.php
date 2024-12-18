<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AttributeResource;
use App\Http\Resources\Admin\ParentCategoryResource;
use App\Http\Resources\CategoryResource;
use App\Models\Attribute;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function __construct() {}

    public function index(Request $request)
    {
        $categoryList = CategoryResource::collection(Category::latest()->paginate(10));
        return Inertia::render('Admin/Product/Category/Index', [
            'categoryList' => $categoryList,
        ]);
    }


    public function create()
    {
        $back_url = url()->previous() == URL::to('/') || url()->previous() == URL::current() ? URL::route('admin.product.category.index') : url()->previous();
        $categoryList = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributes =  AttributeResource::collection(Attribute::with('attributeValue', 'categories')->get());
        return Inertia::render('Admin/Product/Category/Create', [
            'back_url' => $back_url,
            'categoryList' => $categoryList,
            'attributes' => $attributes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
        ]);

        $lang = $request->lang;
        $category = new Category();
        $category->setTranslation('name', $lang, $request->name);
        $category->slug = Str::of($request->name)->slug('-');
        if ($request->parent_id != null) {
            $category->parent_id = $request->parent_id;
        }
        $category->digital =  $request->digital;
        $category->position =  $request->position;
        $category->commision_rate =  $request->commision_rate;
        $category->icon =  $request->icon;
        $category->cover_image =  $request->cover_image;
        $category->banner_image =  $request->banner_image;
        $category->meta_title =  $request->meta_title;
        $category->meta_description =  $request->meta_description;
        $category->filtering_attributes =  $request->filtering_attributes;
        $category->save();
        return redirect()->route('admin.product.category.index')->with('success', trans('Category Created Successfully!'));
    }

    public function category_edit($lang, $id)
    {
        $back_url = url()->previous() == URL::to('/') || url()->previous() == URL::current() ? URL::route('admin.product.category.index') : url()->previous();
        $page = request()->page;
        App::setlocale($lang);
        $category = new CategoryResource(Category::where('id', $id)->first());
        $categoryList = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributes =  AttributeResource::collection(Attribute::with('attributeValue', 'categories')->get());
        return Inertia::render('Admin/Product/Category/Edit', [
            'back_url' => $back_url,
            'lang' => $lang,
            'categoryList' => $categoryList,
            'category' => $category,
            'attributes' => $attributes,
            'page' => $page,
        ]);
    }

    public function update(Request $request, $id)
    {


        $lang = $request->lang;
        $category = Category::find($id);
        $category->setTranslation('name', $lang, $request->name);

        if ($request->parent_id != null) {
            $category->parent_id = $request->parent_id;
        }

        $category->digital =  $request->digital;
        $category->position =  $request->position;
        $category->commision_rate =  $request->commision_rate;
        $category->icon =  $request->icon;
        $category->cover_image =  $request->cover_image;
        $category->banner_image =  $request->banner_image;
        $category->meta_title =  $request->meta_title;
        $category->meta_description =  $request->meta_description;
        $category->filtering_attributes =  $request->filtering_attributes;
        $category->save();
        return redirect()->route('admin.product.category.index', ['page' => $request->page])->with('success', trans('Category Updated Successfully!'));
    }

    public function featured_status(Request $request, $id)
    {
        Category::where('id', $id)->update(array('featured' => $request->status));
        return back()->with('success', trans('Category Featured status updated Successfully!'));
    }

    public function home_status(Request $request, $id)
    {
        Category::where('id', $id)->update(array('home_status' => $request->status));
        return back()->with('success', trans('Category Home status updated Successfully!'));
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return back()->with('success', trans('Category deleted Successfully!'));
    }

    public function category_based_discount(Request $request)
    {
        $categoryList = CategoryResource::collection(Category::latest()->paginate(10));
        return Inertia::render('Admin/Product/CategoryBasedDiscount/CategoryBasedDiscount', [
            'categoryList' => $categoryList
        ]);
    }
}
