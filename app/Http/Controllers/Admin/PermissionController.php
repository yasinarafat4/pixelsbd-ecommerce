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
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    protected $title = "Permission";
    protected $model;

    public function __construct()
    {
        $this->model = new Permission();
    }

    public function index(Request $request)
    {
        $permissions = Permission::get();
        return Inertia::render('Admin/Permission/Index', [
            'permissions' => $permissions
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Permission/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:' . Permission::class,
        ]);
        $permission = new Permission();
        $permission->name = $request->name;
        $permission->save();
    }

    public function show($id)
    {
        return Inertia::render('Admin/Permission/Show');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Admin/Permission/Edit', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        $permission->name = $request->name;
        $permission->save();
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
    }
}
