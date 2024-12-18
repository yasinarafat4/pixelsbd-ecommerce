<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\CouponCollection;
use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function coupon()
    {
        return new CouponCollection(Coupon::where('type', '!=', 'welcome_base')->isValid()->get());
    }
}
