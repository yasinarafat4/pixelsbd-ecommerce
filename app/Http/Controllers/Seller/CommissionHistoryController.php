<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\Seller\CommissionHistoryResource;
use App\Models\CommissionHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommissionHistoryController extends Controller
{
    public function commission_history(Request $request)
    {
        $seller_id = null;
        $date_range = null;

        $commission_history = CommissionHistory::where('seller_id', auth('seller')->user()->id)->orderBy('created_at', 'desc');

        if ($request->date_range) {
            $date_range = $request->date_range;
            $date_range1 = explode(" / ", $request->date_range);
            $commission_history = $commission_history->where('created_at', '>=', $date_range1[0]);
            $commission_history = $commission_history->where('created_at', '<=', $date_range1[1]);
        }

        $commission_history = CommissionHistoryResource::collection($commission_history->paginate(15));
        return Inertia::render('Seller/CommissionHistory/CommissionHistory', [
            'commission_history' => $commission_history
        ]);
    }
}
