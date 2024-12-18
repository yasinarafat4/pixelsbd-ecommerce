<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Language;
use Barryvdh\TranslationManager\Manager;
use Barryvdh\TranslationManager\Models\Translation;

class LanguageController extends Controller
{

    public function __construct(private readonly Manager $manager) {}


    public function index()
    {
        $all_languages = Language::latest()->get();
        return Inertia::render('Admin/Configurations/Language/Index', [
            'all_languages' => $all_languages,
        ]);
    }




    public function create()
    {
        return Inertia::render('Admin/Configurations/Language/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required',
        ]);
        Language::create($request->all());
        $this->manager->addLocale($request->code);
        return redirect()->route('admin.configuration.language.index')->with('success', 'Language added successfully');
    }

    public function translate($lang)
    {
        $search = request()->get('search');
        $group = "_json";
        $allTranslations = Translation::query();
        $allTranslations = $allTranslations->where('group', $group)->orderBy('key', 'asc');
        if ($search != null) {
            $allTranslations = $allTranslations->where('key', 'LIKE', "%{$search}%");
        }
        $allTranslations = $allTranslations->get();
        $translations = [];
        foreach ($allTranslations as $translation) {
            $translations[$translation->key][$translation->locale] = $translation;
        }
        $languageName = Language::where('code', $lang)->pluck('name');
        return Inertia::render(
            'Admin/Configurations/Language/Translate',
            [
                'translations' => $translations,
                'lang' => $lang,
                'query' => $search,
                'languageName' => $languageName,

            ]
        );
    }

    public function update_translate(Request $request)
    {
        $group = "_json";
        if (!in_array($group, $this->manager->getConfig('exclude_groups'))) {
            $name = request()->get('name');
            $value = request()->get('value');

            list($locale, $key) = explode('|', $name, 2);
            $translation = Translation::firstOrNew([
                'locale' => $locale,
                'group' => $group,
                'key' => $key,
            ]);
            $translation->value = (string) $value ?: null;
            $translation->status = Translation::STATUS_CHANGED;
            $translation->save();

            $this->manager->exportTranslations($group, true);

            return back()->with('success', 'Translation updated successfully');
        }
    }

    public function edit($id)
    {
        $language = Language::where('id', $id)->first();
        return Inertia::render('Admin/Configurations/Language/Edit', [
            'language' => $language
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required',
        ]);
        Language::where('id', $id)->update($request->all());
        return redirect()->route('admin.configuration.language.index')->with('success', 'Language updated successfully');
    }

    public function status(Request $request, $id)
    {
        // if (get_settings('locale') == $id) {
        //     return back()->with('error', 'Default language can\'t Disable!! ');
        // }

        Language::where('id', $id)->update(array('status' => $request->status));
        return back()->with('success', 'Language Status updated successfully');
    }


    public function destroy($id)
    {
        // if (get_settings('locale') == $id) {
        //     return back()->with('error', 'Default language can\'t Delete!! ');
        // }
        Language::where('id', $id)->delete();
        return back()->with('success', 'Language deleted successfully');
    }
}
