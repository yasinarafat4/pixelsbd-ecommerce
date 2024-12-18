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
use App\Models\CustomAlert;

class CustomAlertController extends Controller
{
    protected $title = "CustomAlert";
    protected $model;

    public function __construct()
    {
        $this->model = new CustomAlert();
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Marketing/CustomAlert/Index');
    }
    public function create()
    {
        return Inertia::render('Admin/Marketing/ustomAlert/Create');
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        return Inertia::render('Admin/CustomAlert/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Marketing/CustomAlert/Edit');
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
