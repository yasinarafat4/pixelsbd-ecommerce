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
use App\Models\SmtpSetting;

class SmtpSettingController extends Controller
{

    public function index(Request $request)
    {
        return Inertia::render('Admin/Configurations/SmtpSetting/Index');
    }
    public function create()
    {
        return Inertia::render('Admin/Configurations/SmtpSetting/Create');
    }

    public function store(Request $request) {}

    public function show($id)
    {
        return Inertia::render('Admin/Configurations/SmtpSetting/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Configurations/SmtpSetting/Edit');
    }

    public function update(Request $request, $id) {}

    public function destroy($id) {}
}
