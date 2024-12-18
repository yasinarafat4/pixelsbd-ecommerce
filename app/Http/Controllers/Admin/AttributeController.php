<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AttributeResource;
use App\Http\Resources\Admin\ParentCategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Category;
use Illuminate\Support\Facades\App;

class AttributeController extends Controller
{

    public function __construct() {}

    public function index(Request $request)
    {
        $categories = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        $attributes = AttributeResource::collection(Attribute::with('attributeValue', 'categories')->latest()->paginate(10));
        return Inertia::render('Admin/Product/Attribute/Index', [
            'categories' => $categories,
            'attributes' => $attributes,
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Product/Attribute/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $attribute = new Attribute();
        $attribute->title = $request->title;
        $attribute->save();
        $attribute->categories()->sync($request->category_id);
        return redirect()->route('admin.product.attribute.index')->with('success', trans('Attribute added successfully!'));
    }



    public function show($id)
    {
        return Inertia::render('Admin/Product/Attribute/Show');
    }

    public function attribute_edit($lang, $id)
    {
        // return $id;
        App::setlocale($lang);
        $attribute = new AttributeResource(Attribute::where('id', $id)->with('attributeValue', 'categories')->first());
        $categories = ParentCategoryResource::collection(Category::withDepth()->where('digital', 0)->get()->toTree());
        return Inertia::render('Admin/Product/Attribute/Edit', [
            'lang' => $lang,
            'attribute' => $attribute,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $attribute =  Attribute::find($id);
        $attribute->title = $request->title;
        $attribute->save();
        $attribute->categories()->sync($request->category_id);
        return redirect()->route('admin.product.attribute.index')->with('success', trans('Attribute updated successfully'));
    }

    public function destroy($id)
    {
        Attribute::where('id', $id)->delete();
        return back()->with('success', trans('Attribute deleted successfully!'));
    }

    public function attribute_value($id)
    {
        $attribute = new AttributeResource(Attribute::where('id', $id)->with('attributeValue')->first());
        return Inertia::render('Admin/Product/Attribute/AttributeValue', [
            'attribute' => $attribute
        ]);
    }

    public function attribute_value_store(Request $request)
    {
        $request->validate([
            'value' => 'required',
        ]);
        AttributeValue::create($request->all());
    }

    public function attribute_value_edit($id)
    {
        $attributeValue = AttributeValue::where('id', $id)->first();
        return Inertia::render('Admin/Product/Attribute/AttributeValueEdit', [
            'attributeValue' => $attributeValue
        ]);
    }
    public function attribute_value_update(Request $request, $id)
    {
        $request->validate([
            'value' => 'required',
        ]);
        AttributeValue::where('id', $id)->update($request->all());
        return redirect()->route('admin.product.attribute_value', $request->attribute_id)->with('success', trans('Attribute Value updated successfully'));
        // $data = ['value' => $request->value];
        // DB::beginTransaction();
        // try {
        //     $this->attributeValueRepository->update($id, $data);
        //     DB::commit();
        // } catch (\Exception $e) {
        //     DB::rollBack();
        //     return back()->with('error', trans('Something went wrong!!!'));
        // }
    }

    public function attribute_value_destroy($id)
    {
        AttributeValue::where('id', $id)->delete();
        return back()->with('success', trans('Attribute value deleted successfully!'));
        // DB::beginTransaction();
        // try {
        //     $this->attributeValueRepository->delete(params: ['id' => $id]);
        //     DB::commit();
        // } catch (\Exception $e) {
        //     DB::rollBack();
        //     return back()->with('error', trans('Something went wrong!!!') . $e);
        // }
    }
}
