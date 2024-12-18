<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\StaffResource;
use App\Models\Admin as Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StaffsController extends Controller
{

    public function __construct() {}

    public function index(Request $request)
    {
        $staffs = StaffResource::collection(Staff::withoutRole('Super Admin')->latest()->get());
        return Inertia::render('Admin/Staff/Index', [
            'staffs' => $staffs
        ]);
    }
    public function create()
    {
        $roles = Role::where('name', '!=', 'Super Admin')->get();
        return Inertia::render('Admin/Staff/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => 'required|string|lowercase|email|max:255|unique:' . Staff::class,
            'phone' => ['required'],
            'password' => ['required'],
            'role' => ['required'],
        ]);
        // return $request->role;
        $staff = new Staff();
        $staff->name = $request->name;
        $staff->email = $request->email;
        $staff->phone = $request->phone;
        $staff->image = $request->image;
        $staff->password = $request->password;
        $staff->save();
        // $staff = Staff::insert($request);
        $staff->assignRole($request->role);
        return redirect()->route('admin.staff.staffs.index')->with('success', 'Staff added successfully');
    }

    public function show($id)
    {
        return Inertia::render('Admin/Staff/Show');
    }

    public function edit($id)
    {
        $roles = Role::where('name', '!=', 'Super Admin')->get();
        $staff = new StaffResource(Staff::where('id', $id)->first());

        return Inertia::render('Admin/Staff/Edit', [
            'staff' => $staff,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        $staff = Staff::find($id);
        try {
            $staff->name = $request->name;
            $staff->email = $request->email;
            $staff->phone = $request->phone;
            $staff->image = $request->image;
            if ($request->password) {
                $staff->password = Hash::make($request->password);
            }
            $staff->save();
            $staff->syncRoles($request->role);
            DB::commit();
            return redirect()->route('admin.staff.staffs.index')->with('success', 'Staff updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong!!!' . $e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            Staff::where('id', $id)->delete();
            DB::commit();
            return redirect()->route('admin.staff.staffs.index')->with('success', 'Staff deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong!!!' . $e);
        }
    }
}
