<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\UploadResource;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Upload;
use Intervention\Image\Facades\Image;
use Laraeast\LaravelSettings\Facades\Settings;
use Storage;

class UploadController extends Controller
{
    public function index(Request $request)
    {
        $images = UploadResource::collection(Upload::latest()->paginate(15));
        return Inertia::render('Admin/Upload/Index', [
            'images' => $images,
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Upload/Create');
    }

    public function store(Request $request) {}

    public function show($id)
    {
        return Inertia::render('Admin/Upload/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Upload/Edit');
    }

    public function update(Request $request, $id) {}

    public function destroy($id)
    {
        $upload = Upload::find($id);
        // $file = Storage::path('public/uploads/' . $upload->name);
        Storage::delete('public/uploads/' . $upload->name);
        $upload->delete();
        flash_success(trans('Image Deleted Successfully!'));
    }

    public function image_list()
    {
        return $images = Upload::orderBy('created_at', 'desc')->paginate(15);
    }

    public function image_upload_modal(Request $request)
    {
        Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'image' => 'required|image|mimes:png,jpg,jpeg,webp',
            ],
            [
                'name.required' => 'Image name is required!',
                'name.string' => 'Image name must be string!',
                'image.required' => 'Image is required!',
            ]
        )->validate();



        $type = $request->type;
        $folder = 'uploads';
        if ($request->hasFile('image')) {

            // Resize and optimize
            $resizedImage = Image::make($request->image)
                ->resize(960, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 80);

            $imageName = time() . '.webp';
            Storage::put("public/uploads/{$imageName}", $resizedImage);
            $mimeType = $resizedImage->mime();
            $extension = match ($mimeType) {
                'image/jpeg' => 'jpg',
                'image/png'  => 'png',
                'image/gif'  => 'gif',
                'image/webp' => 'webp',
                default      => null,
            };

            $url =  '/storage/' . $folder . '/' . $imageName;

            if ($type) {
                Settings::set($type, $url);
            }

            $upload = new Upload();
            $upload->user_type  = 'admin';
            $upload->user_id    = Auth::guard('admin')->user()->id;
            $upload->name       = $imageName;
            $upload->file_name  = $request->name;
            $upload->url        = $url;
            $upload->extension  = $extension;
            $upload->mime_type  = $mimeType;
            $upload->size       = strlen($resizedImage->encode());
            $upload->width      = $resizedImage->width();
            $upload->height     = $resizedImage->height();
            $upload->save();
            flash_success(trans('Image Uploaded Successfully!'));
        }
    }
    public function image_upload(Request $request)
    {
        Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'image' => 'required|image|mimes:png,jpg,jpeg,webp',
            ],
            [
                'name.required' => 'Image name is required!',
                'name.string' => 'Image name must be string!',
                'image.required' => 'Image is required!',
            ]
        )->validate();



        $type = $request->type;
        $folder = 'uploads';
        if ($request->hasFile('image')) {

            // Resize and optimize
            $resizedImage = Image::make($request->image)
                ->resize(960, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp', 80);

            $imageName = time() . '.webp';
            Storage::put("public/uploads/{$imageName}", $resizedImage);
            $mimeType = $resizedImage->mime();
            $extension = match ($mimeType) {
                'image/jpeg' => 'jpg',
                'image/png'  => 'png',
                'image/gif'  => 'gif',
                'image/webp' => 'webp',
                default      => null,
            };

            $url =  '/storage/' . $folder . '/' . $imageName;

            if ($type) {
                Settings::set($type, $url);
            }

            $upload = new Upload();
            $upload->user_type  = 'admin';
            $upload->user_id    = Auth::guard('admin')->user()->id;
            $upload->name       = $imageName;
            $upload->file_name  = $request->name;
            $upload->url        = $url;
            $upload->extension  = $extension;
            $upload->mime_type  = $mimeType;
            $upload->size       = strlen($resizedImage->encode());
            $upload->width      = $resizedImage->width();
            $upload->height     = $resizedImage->height();
            $upload->save();
            flash_success(trans('Image Uploaded Successfully!'));
            return redirect()->route('admin.upload.index');
        }
    }
}
