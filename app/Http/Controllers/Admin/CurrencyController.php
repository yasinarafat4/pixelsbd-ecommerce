<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Currency;

class CurrencyController extends Controller
{

    public function __construct() {}

    public function index(Request $request)
    {
        Inertia::share('default_currency', get_settings('default_currency'));
        Inertia::share('symbol_format', get_settings('symbol_format'));
        Inertia::share('decimal_separator', get_settings('decimal_separator'));
        Inertia::share('no_of_decimal', get_settings('no_of_decimal'));

        $currencies = Currency::latest()->get();
        $active_currencies = Currency::active()->get();
        return Inertia::render('Admin/Configurations/Currency/Index', [
            'currencies' => $currencies,
            'active_currencies' => $active_currencies,
        ]);
    }

    public function store(Request $request)
    {
        $currency = new Currency();
        $currency->name = $request->name;
        $currency->symbol = $request->symbol;
        $currency->code = $request->code;
        $currency->exchange_rate = $request->exchange_rate;
        $currency->save();

        return redirect()->route('admin.configuration.currency.index')->with('success', 'Currency added successfully');
    }

    public function update_status(Request $request, $id)
    {
        if (get_settings('default_currency') == $id) {
            return back()->with('error', 'Default currency can\'t Disable!! ');
        }
        Currency::where('id', $id)->update(array('status' => $request->status));
        return back()->with('success', 'Currency Status updated successfully');
    }

    public function edit($id)
    {
        $currency = Currency::where('id', $id)->first();
        return Inertia::render('Admin/Configurations/Currency/Edit', [
            'currency' => $currency
        ]);
    }

    public function update(Request $request, $id)
    {
        Currency::where('id', $id)->update(['name' => $request->name, 'symbol' => $request->symbol, 'code' => $request->code, 'exchange_rate' => $request->exchange_rate]);
        return redirect()->route('admin.configuration.currency.index')->with('success', 'Currency updated successfully');
    }

    public function destroy($id)
    {
        if (get_settings('default_currency') == $id) {
            return back()->with('error', 'Default currency can\'t Delete!! ');
        }
        Currency::where('id', $id)->delete();
        return back()->with('success', 'Currency deleted successfully');
    }
}
