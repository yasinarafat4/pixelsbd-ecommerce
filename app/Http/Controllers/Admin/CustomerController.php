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
use App\Models\Customer;
use App\Models\User;
use App\Repositories\CustomerRepository\CustomerRepositoryInterface;
use Carbon\Carbon;
use Hash;

class CustomerController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $customers = User::latest()->paginate(10);
        return Inertia::render('Admin/Customer/Index', [
            'customers' => $customers
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Customer/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => 'required',
        ]);

        $customer = new User();
        $customer->name = $request->name;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        $customer->email_verified_at = Carbon::now();
        $customer->password = Hash::make($request->password);
        $customer->image = $request->image;
        $customer->save();
        return redirect()->route('admin.customer.index')->with('success', trans('Customer Created Successfully!'));
    }

    public function show($id)
    {
        $customer = User::find(base64_decode($id));
        return Inertia::render('Admin/Customer/Show', [
            'customer' => $customer
        ]);
    }

    public function edit($id)
    {
        $customer = User::find(base64_decode($id));
        return Inertia::render('Admin/Customer/Edit', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
        ]);
        $customer = User::find($id);
        $customer->name = $request->name;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        if ($request->password) {
            $customer->password = Hash::make($request->password);
        }
        $customer->image = $request->image;
        $customer->balance = $request->balance;
        $customer->save();
        return redirect()->route('admin.customer.index')->with('success', trans('Customer Updated Successfully!'));
    }


    public function ban_customer($id)
    {
        $customer = User::findOrFail($id);

        if ($customer->banned == 1) {
            $customer->banned = 0;
            flash_success(trans('Customer UnBanned Successfully'));
        } else {
            $customer->banned = 1;
            flash_success(trans('Customer Banned Successfully'));
        }
        $customer->save();
    }

    public function destroy($id)
    {
        $customer = User::find($id);
        $customer->delete();
        return back()->with('success', trans('Customer Deleted Successfully!'));
    }
}
