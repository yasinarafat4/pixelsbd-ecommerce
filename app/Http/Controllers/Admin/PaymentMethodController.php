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
use App\Models\PaymentMethod;

class PaymentMethodController extends Controller
{
    protected $title = "PaymentMethod";
    protected $model;

    public function __construct()
    {
        $this->model = new PaymentMethod();
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Configurations/PaymentMethod/Index');
    }
    public function create()
    {
        return Inertia::render('Admin/Configurations/PaymentMethod/Create');
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        return Inertia::render('Admin/Configurations/PaymentMethod/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Configurations/PaymentMethod/Edit');
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
