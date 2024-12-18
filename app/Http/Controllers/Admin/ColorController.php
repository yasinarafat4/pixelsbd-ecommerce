<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Color;

class ColorController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $colors = Color::latest()->paginate(10);
        return Inertia::render('Admin/Product/Color/Index', [
            'colors' => $colors
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Product/Color/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'color_code' => 'required',
        ]);
        $color = new Color();
        $color->name = $request->name;
        $color->color_code = $request->color_code;
        $color->save();
        return back()->with('success', trans('Color Added Successfully!'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Product/Color/Show');
    }

    public function edit($id)
    {
        $color = Color::find($id);
        return Inertia::render('Admin/Product/Color/Edit', [
            'color' => $color
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'color_code' => 'required',
        ]);
        $color = Color::find($id);
        $color->name = $request->name;
        $color->color_code = $request->color_code;
        $color->save();
        return redirect()->route('admin.product.color.index')->with('success', trans('Color Updated Successfully!'));
    }

    public function destroy($id)
    {
        $color = Color::find($id);
        $color->delete();
        return back()->with('success', trans('Color Deleted Successfully!'));
    }
}
