<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\ProductQuery;
use Illuminate\Http\Request;

class QueryController extends Controller
{

    public function query_store(Request $request)
    {
        $product_query = new ProductQuery();
        $product_query->customer_id = $request->customer_id;
        $product_query->seller_id = $request->seller_id;
        $product_query->seller_type = $request->seller_type;
        $product_query->product_id = $request->product_id;
        $product_query->question = $request->question;
        $product_query->save();
        return back()->with('success', 'Query submitted successfully!');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
