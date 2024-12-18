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
use App\Models\Country;

class CountryController extends Controller
{
    protected $title = "Country";
    protected $model;

    public function __construct()
    {
        $this->model = new Country();
    }

    public function index(Request $request)
    {
        $countries = Country::paginate(15);
        return Inertia::render('Admin/Configurations/Country/Index', [
            'countries' => $countries
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Configurations/Country/Create');
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        return Inertia::render('Admin/Configurations/Country/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Configurations/Country/Edit');
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }

    public function status(Request $request, $id)
    {
        $country = Country::find($id);
        $country->status = $request->status;
        $country->save();
        return back()->with('success', trans('Country Status updated Successfully!'));
    }
}
