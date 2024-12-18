<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Addon;

class AddonController extends Controller
{
    protected $title = "Addon";
    protected $model;

    public function __construct()
    {
        $this->model = new Addon();
    }

    public function installed_addon(Request $request)
    {
        $addons = Addon::active()->get();
        return Inertia::render('Admin/Addon/InstalledAddons', [
            'addons' => $addons
        ]);
    }

    public function available_addon(Request $request)
    {
        return Inertia::render('Admin/Addon/AvailableAddons');
    }




    public function create()
    {
        return Inertia::render('Admin/Addon/Create');
    }

    public function store(Request $request) {}

    public function show($id)
    {
        return Inertia::render('Admin/Addon/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Addon/Edit');
    }

    public function update(Request $request, $id) {}

    public function destroy($id) {}
}
