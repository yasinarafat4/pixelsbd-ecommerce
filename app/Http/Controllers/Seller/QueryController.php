<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ProductQueryResource;
use App\Models\Product;
use App\Models\ProductQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QueryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sellerId = auth('seller')->user()->id;

        // $queries = ProductQueryResource::collection(ProductQuery::whereHas('seller', function ($q) use ($sellerId) {
        //     $q->where('id', $sellerId)->where('user_type', 'seller');
        // })->latest()->paginate(10));
        $queries = ProductQueryResource::collection(ProductQuery::whereHas('seller', function ($q) use ($sellerId) {
            $q->where('id', $sellerId);
        })->latest()->get()->filter(function ($productQuery) {
            return $productQuery->seller->user_type === 'seller';
        }));


        return Inertia::render('Seller/Products/ProductQueries/Index', [
            'queries' => $queries
        ]);
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
        $query = new ProductQueryResource(ProductQuery::find($id));
        return Inertia::render('Seller/Products/ProductQueries/QueryAnswer', [
            'query' => $query
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product_query = ProductQuery::find($id);
        $product_query->answer = $request->answer;
        $product_query->save();
        return redirect()->route('seller.product.query.index')->with('success', 'Answer given successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
