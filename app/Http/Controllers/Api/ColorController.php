<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ColorCollection;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function colors()
    {
        $colors = new ColorCollection(Color::all());
        return $colors;
    }
}
