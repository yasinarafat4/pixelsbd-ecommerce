<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\State;

class StateController extends Controller
{
    public function index(Request $request)
    {
        $q = request()->input('search');
        $c = request()->input('country');

        $states = (new State())->newQuery();
        if (request()->has('search')) {

            $states->where('name', 'LIKE', '%' . $q . '%');
        }

        if (request()->has('country')) {
            $country = Country::where('name', $c)->first();
            $states->where('country_id', $country->id)->with('country')->paginate(15)->appends(request()->query());
        }

        $states = $states->with('country')->paginate(15)->appends(request()->query());

        $countries = Country::get();
        return Inertia::render('Admin/Configurations/State/Index', [
            'states' => $states,
            'countries' => $countries,
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Configurations/State/Create');
    }

    public function store(Request $request)
    {
        // return $request->all();
        $request->validate([
            'name' => 'required',
            'country_id' => 'required',
        ]);
        $state = new State();
        $state->name = $request->name;
        $state->country_id = $request->country_id;
        $state->save();
        return redirect()->route('admin.configuration.shipping.state.index', ['search' => $request->search, 'country' => $request->country, 'page' => $request->page])->with('success', trans('State created Successfully!'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Configurations/State/Show');
    }

    public function edit($id)
    {
        $state = State::where('id', $id)->with('country')->first();
        $countries = Country::get();
        return Inertia::render('Admin/Configurations/State/Edit', [
            'countries' => $countries,
            'state' => $state,
        ]);
    }

    public function update(Request $request, $id)
    {
        $state = State::find($id);
        $state->name = $request->name;
        $state->country_id = $request->country_id;
        $state->save();
        return redirect()->route('admin.configuration.shipping.state.index', ['search' => $request->search, 'country' => $request->country, 'page' => $request->page])->with('success', trans('State updated Successfully!'));
    }

    public function destroy($id)
    {
        $state = State::find($id);
        $state->delete();
        return back()->with('success', trans('State  Deleted Successfully!'));
    }

    public function status(Request $request, $id)
    {
        $state = State::find($id);
        $state->status = $request->status;
        $state->save();
        return back()->with('success', trans('State Status updated Successfully!'));
    }
}
