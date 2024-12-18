<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\State;
use Illuminate\Http\Request;

class HelperController extends Controller
{
    public function state_by_country($id)
    {
        return $states = State::where('country_id', $id)->active()->get();
    }

    public function city_by_state($id)
    {
        return $cities = City::where('state_id', $id)->active()->get();
    }
}
