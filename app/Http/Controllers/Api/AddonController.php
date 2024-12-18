<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use Illuminate\Http\Request;

class AddonController extends Controller
{
    public function addon_list()
    {
        $addon = Addon::all();
        return response()->json($addon);
    }
}
