<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
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
        $images = array();
        if ($files = $request->file('review_images')) {
            foreach ($files as $file) {
                $name = $file->getClientOriginalName();
                $file->storeAs('uploads/review_images', $name, 'public');
                $url =  '/storage/uploads/review_images/' . $name;
                $images[] = $url;
            }
        }
        $review = new Review;
        $review->product_id = $request->product_id;
        $review->user_id = auth('customer')->user()->id;
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->photos = implode(',', $images);
        $review->viewed = '0';
        $review->save();
        $product = Product::findOrFail($request->product_id);
        if (Review::where('product_id', $product->id)->where('status', 1)->count() > 0) {
            $product->rating = Review::where('product_id', $product->id)->where('status', 1)->sum('rating') / Review::where('product_id', $product->id)->where('status', 1)->count();
        } else {
            $product->rating = 0;
        }
        $product->save();

        if ($product->added_by == 'seller') {
            $seller = $product->user->shop;
            $seller->rating = (($seller->rating * $seller->num_of_reviews) + $review->rating) / ($seller->num_of_reviews + 1);
            $seller->num_of_reviews += 1;
            $seller->save();
        }

        flash_success(trans('Review has been submitted successfully'));
        return back();
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

    function product_review($id)
    {
        $review = Review::where('user_id', auth('customer')->user()->id)->where('product_id', $id)->first();
        return $review;
    }
}
