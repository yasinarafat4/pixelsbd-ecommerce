<?php

namespace App\Http\Controllers\Admin;


use App\Repositories\BlogRepository\BlogRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;

class BlogController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $blogs = Blog::with('blogCategory')->latest()->paginate(10);
        return Inertia::render('Admin/Blog/Index', [
            'blogs' => $blogs
        ]);
    }
    public function create()
    {
        $blogCategories = BlogCategory::get();
        return Inertia::render('Admin/Blog/Create', [
            'blogCategories' => $blogCategories
        ]);
    }

    public function store(Request $request)
    {
        Validator::make(
            // input
            $request->all(),
            // rules
            [
                'title' => 'required',
                'short_description' => 'required',
                'slug' => 'required',
                'blog_category_id' => 'required',
            ],
            // messege
            [
                'blog_category_id.required' => 'Blog Category is required!',
            ]
        )->validate();

        // return $request->all();
        $blog = new Blog();
        $blog->title = $request->title;
        $blog->slug = $request->slug;
        $blog->short_description = $request->short_description;
        $blog->description = $request->description;
        $blog->meta_title = $request->meta_title;
        $blog->meta_description = $request->meta_description;
        $blog->blog_banner = $request->blog_banner;
        $blog->meta_image = $request->meta_image;
        $blog->blog_category_id = $request->blog_category_id;
        $blog->save();
        return redirect()->route('admin.blog.blogs.index')->with('success', trans('Blog Created Successfully!'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Blog/Show');
    }

    public function edit($id)
    {
        $blogCategories = BlogCategory::get();
        $blog = Blog::with('blogCategory')->find($id);
        return Inertia::render('Admin/Blog/Edit', [
            'blogCategories' => $blogCategories,
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, $id)

    {
        $request->validate([
            'title' => 'required',
            'short_description' => 'required',
            'slug' => 'required',
            'blog_category_id' => 'required',
        ]);
        $blog = Blog::find($id);
        $blog->title = $request->title;
        $blog->slug = $request->slug;
        $blog->short_description = $request->short_description;
        $blog->description = $request->description;
        $blog->meta_title = $request->meta_title;
        $blog->meta_description = $request->meta_description;
        $blog->blog_banner = $request->blog_banner;
        $blog->meta_image = $request->meta_image;
        $blog->blog_category_id = $request->blog_category_id;
        $blog->save();
        return redirect()->route('admin.blog.blogs.index')->with('success', trans('Blog Updated Successfully!'));
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);
        $blog->delete();
        return back()->with('success', trans('Blog  Deleted Successfully!'));
    }
}
