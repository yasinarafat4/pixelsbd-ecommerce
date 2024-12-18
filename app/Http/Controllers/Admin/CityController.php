<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\City;
use App\Models\State;

class CityController extends Controller
{
    protected $title = "City";
    protected $model;

    public function __construct()
    {
        $this->model = new City();
    }

    public function index(Request $request)
    {
        $q = request()->input('search');
        $c = request()->input('state');

        $cities = (new City())->newQuery();
        if (request()->has('search')) {

            $cities->where('name', 'LIKE', '%' . $q . '%');
        }

        if (request()->has('state')) {
            $state = State::where('name', $c)->first();
            $cities->where('state_id', $state->id)->with('state')->paginate(15)->appends(request()->query());
        }

        $cities = $cities->with('state')->paginate(15)->appends(request()->query());
        // $cities = City::with('state')->paginate(10);
        $states = State::get();
        return Inertia::render('Admin/Configurations/City/Index', [
            'cities' => $cities,
            'states' => $states
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Configurations/City/Create');
    }

    public function store(Request $request)
    {
        // return $request->all();
        $request->validate([
            'name' => 'required',
            'cost' => 'required',
            'state_id' => 'required',
        ]);
        $city = new City();
        $city->name = $request->name;
        $city->cost = $request->cost;
        $city->state_id = $request->state_id;
        $city->save();
        return redirect()->route('admin.configuration.shipping.city.index', ['search' => $request->search, 'state' => $request->state, 'page' => $request->page])->with('success', trans('City created Successfully!'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Configurations/City/Show');
    }

    public function edit($id)
    {
        $city = City::where('id', $id)->with('state')->first();
        $states = State::get();
        return Inertia::render('Admin/Configurations/City/Edit', [
            'city' => $city,
            'states' => $states
        ]);
    }

    public function update(Request $request, $id)
    {
        // return $request->all();
        // $request->validate([
        //     'name' => 'required',
        //     'cost' => 'required',
        //     'state_id' => 'required',
        // ]);
        $city = City::find($id);
        $city->name = $request->name;
        $city->cost = $request->cost;
        $city->state_id = $request->state_id;
        $city->save();
        return redirect()->route('admin.configuration.shipping.city.index', ['search' => $request->search, 'state' => $request->state, 'page' => $request->page])->with('success', trans('City updated Successfully!'));
    }

    public function destroy($id)
    {
        $city = City::find($id);
        $city->delete();
        return back()->with('success', trans('City  Deleted Successfully!'));
    }

    public function status(Request $request, $id)
    {
        $city = City::find($id);
        $city->status = $request->status;
        $city->save();
        return back()->with('success', trans('City Status updated Successfully!'));
    }
}
