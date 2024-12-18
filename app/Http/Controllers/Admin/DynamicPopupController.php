<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DynamicPopup;

class DynamicPopupController extends Controller
{
    protected $title = "DynamicPopup";
    protected $model;

    public function __construct()
    {
        $this->model = new DynamicPopup();
    }

    public function index(Request $request)
    {
        // return Flasher::all();
        $dynamic_popups = DynamicPopup::latest()->paginate(10);
        return Inertia::render('Admin/Marketing/DynamicPopup/Index', [
            'dynamic_popups' => $dynamic_popups
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Marketing/DynamicPopup/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'summary' => 'required',
            'link' => 'required'
        ]);
        DynamicPopup::create($request->all());

        return redirect()->route('admin.marketing.dynamicpopup.index')->with('success', 'Dynamic Popup Added successfully');
    }

    public function show($id)
    {
        return Inertia::render('Admin/Marketing/DynamicPopup/Show');
    }

    public function edit($id)
    {
        $dynamic_popup = DynamicPopup::find($id);

        return Inertia::render('Admin/Marketing/DynamicPopup/Edit', [
            'dynamic_popup' => $dynamic_popup
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'summary' => 'required',
            'link' => 'required'
        ]);
        $dynamic_popup = DynamicPopup::find($id);
        $dynamic_popup->title                = $request->title;
        $dynamic_popup->summary              = $request->summary;
        $dynamic_popup->background_color     = $request->background_color;
        $dynamic_popup->text_color           = $request->text_color;
        $dynamic_popup->image                = $request->image;
        $dynamic_popup->link                 = $request->link;
        $dynamic_popup->save();
        return redirect()->route('admin.marketing.dynamicpopup.index')->with('success', 'Dynamic Popup Updated successfully');
    }

    public function destroy($id)
    {
        $dynamic_popup = DynamicPopup::find($id);
        $dynamic_popup->delete();
        return back()->with('success', trans('Dynamic Popup Deleted Successfully!'));
    }

    public function status($id)
    {
        $dynamic_popup = DynamicPopup::find($id);
        $dynamic_popup->status = !$dynamic_popup->status;
        $dynamic_popup->save();
        return back()->with('success', 'Dynamic Popup Status Updated successfully');
    }
}
