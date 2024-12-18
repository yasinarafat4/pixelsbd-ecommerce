<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RoleRepository\RoleRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $roles = Role::where('name', '!=', 'Super Admin')->latest()->get();
        return Inertia::render('Admin/Role/Index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        if (auth('admin')->user()->cannot('create', Role::class)) {
            flash_error(trans('You don\'t have permission to create role'));
            return back();
        }

        $permissions = Permission::all();
        return Inertia::render('Admin/Role/Create', [
            'permissions' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        if (auth('admin')->user()->cannot('create', Product::class)) {
            flash_error(trans('You don\'t have permission to create role'));
            return back();
        }
        $request->validate([
            'name' => 'required|string|max:255|unique:' . Role::class,
        ]);
        $role = new Role();
        $role->name = $request->name;
        $role->save();
        if (!empty($request->permission)) {
            $role->givePermissionTo($request->permission);
        }
        return redirect()->route('admin.staff.role.index')->with('success', "Role Created Successfully!");
    }

    public function show($id)
    {
        return Inertia::render('Admin/Role/Show');
    }

    public function edit(Role $role)
    {
        if (auth('admin')->user()->cannot('create', Product::class)) {
            flash_error(trans('You don\'t have permission to edit role'));
            return back();
        }
        $permissions = Permission::all();
        $selectedPermissions = $role->permissions->pluck('name');
        return Inertia::render('Admin/Role/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'selectedPermissions' => $selectedPermissions
        ]);
    }

    public function update(Request $request, Role $role)
    {
        if (auth('admin')->user()->cannot('create', Product::class)) {
            flash_error(trans('You don\'t have permission to update role'));
            return back();
        }
        $role->name = $request->name;
        $role->save();
        $role->syncPermissions($request->permission);
        return redirect()->route('admin.staff.role.index')->with('success', "Role Updated Successfully!");
    }

    public function destroy(Role $role)
    {
        if (auth('admin')->user()->cannot('create', Product::class)) {
            flash_error(trans('You don\'t have permission to delete role'));
            return back();
        }
        $role->delete();
        return back()->with('success', "Role Deleted Successfully!");
    }
}
