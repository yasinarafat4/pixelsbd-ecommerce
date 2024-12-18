<?php

namespace App\Models;

use App\Traits\PreventDemoModeChanges;
use Illuminate\Database\Eloquent\Model;

class ParrentModel extends Model
{
    use PreventDemoModeChanges;
}
