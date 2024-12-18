<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BlogCategory;

class BlogCategoryController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $blogCategories = BlogCategory::latest()->paginate(15);
        return Inertia::render('Admin/BlogCategory/Index', [
            'blogCategories' => $blogCategories
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/BlogCategory/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $blogCategory = new BlogCategory();
        $blogCategory->name = $request->name;
        $blogCategory->save();
        return redirect()->route('admin.blog.blogcategory.index')->with('success', 'Blog Category Created Successfully!');
    }

    public function show($id)
    {
        return Inertia::render('Admin/BlogCategory/Show');
    }

    public function edit($id)
    {
        $blogCategory = BlogCategory::find($id);
        return Inertia::render('Admin/BlogCategory/Edit', [
            'blogCategory' => $blogCategory
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $blogCategory = BlogCategory::find($id);
        $blogCategory->name = $request->name;
        $blogCategory->save();
        return redirect()->route('admin.blog.blogcategory.index')->with('success', 'Blog Category Updated Successfully!');
    }

    public function destroy($id)
    {
        $blogCategory = BlogCategory::find($id);
        $blogCategory->delete();
        return back()->with('success', trans('Blog Category Deleted Successfully!'));
    }
}
