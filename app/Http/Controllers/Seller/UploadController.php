<?php

namespace App\Http\Controllers\Seller;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\UploadResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Upload;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Laraeast\LaravelSettings\Facades\Settings;
use Storage;

class UploadController extends Controller
{
    protected $title = "Upload";
    protected $model;

    public function __construct()
    {
        $this->model = new Upload();
    }

    public function index(Request $request)
    {
        // return active_guard();
        $images = UploadResource::collection(Upload::whereHas('seller', function ($q) {
            $q->where('id', auth('seller')->user()->id);
        })->where('user_type', 'seller')->latest()->paginate(15));
        return Inertia::render('Seller/Upload/Index', [
            'images' => $images,
        ]);
    }
    public function create()
    {
        return Inertia::render('Seller/Upload/Create');
    }

    public function store(Request $request) {}

    public function show($id)
    {
        return Inertia::render('Seller/Upload/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Seller/Upload/Edit');
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

    public function seller_image_list()
    {
        return $images = Upload::whereHas('user', function ($q) {
            $q->where('id', auth('seller')->user()->id)->where('user_type', 'seller');
        })->latest()->paginate(15);
    }



    public function seller_image_upload_modal(Request $request)
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
            $upload->user_type  = 'seller';
            $upload->user_id    = Auth::guard('seller')->user()->id;
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
    public function seller_image_upload(Request $request)
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
            $upload->user_type  = 'seller';
            $upload->user_id    = Auth::guard('seller')->user()->id;
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
            return redirect()->route('seller.upload.index');
        }
    }
}
