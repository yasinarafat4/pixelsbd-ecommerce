<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Benefit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class BenefitController extends Controller
{

    public function benefits(Request $request)
    {
        $benefits = Benefit::get();
        return Inertia::render('Admin/WebsiteSetup/Benefits/Benefits', [
            'benefits' => $benefits
        ]);
    }


    public function benefit_edit($lang, $id)
    {
        App::setlocale($lang);
        $benefit = Benefit::find($id);
        return Inertia::render('Admin/WebsiteSetup/Benefits/Edit', [
            'lang' => $lang,
            'benefit' => $benefit
        ]);
    }

    public function benefit_update(Request $request, $id)
    {
        $lang = $request->lang;
        $benefit = Benefit::find($id);
        $benefit->setTranslation('title', $lang, $request->title);
        $benefit->setTranslation('sub_title', $lang, $request->sub_title);
        $benefit->position = $request->position;
        $benefit->image = $request->image;
        $benefit->save();
        flash_success(trans('Benefit data updated successfully!'));
        return redirect()->route('admin.website.benefits');
    }

    public function benefit_status($id)
    {
        $benefit = Benefit::find($id);
        $benefit->status = !$benefit->status;
        // if ($benefit->status == 0) {
        //     $benefit->status = !$benefit->status;
        // }
        $benefit->save();
        flash_success(trans('Benefit status updated successfully!'));
        return redirect()->route('admin.website.benefits');
    }
}
