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
use App\Models\Page;
use Illuminate\Support\Facades\App;

class PageController extends Controller
{
    protected $title = "Pages";
    protected $model;

    public function __construct()
    {
        $this->model = new Page();
    }

    public function index(Request $request)
    {
        $pages = Page::get();
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages
        ]);
    }


    public function page_edit($lang, $id)
    {
        App::setlocale($lang);

        $page = Page::find($id);
        return Inertia::render('Admin/Pages/Edit', [
            'lang' => $lang,
            'page' => $page
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
        ]);

        $lang = $request->lang;
        $page = Page::find($id);
        $page->setTranslation('title', $lang, $request->title);
        $page->setTranslation('content', $lang, $request->content);
        $page->save();
        flash_success(trans('Page updated successfully!'));
        return redirect()->route('admin.website.pages.index');
    }

    public function destroy($id) {}
}
