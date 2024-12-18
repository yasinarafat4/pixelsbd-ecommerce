<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\BusinesSettingsCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BusinessSettingsController extends Controller
{
    public function business_settings()
    {
        return new BusinesSettingsCollection(DB::table('settings')->pluck('key'));
    }
}
