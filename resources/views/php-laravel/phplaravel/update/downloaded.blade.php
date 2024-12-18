@extends('php-laravel.phplaravel.layouts.master-update')

@section('title', __('Download'))
@section('container')
    <p class="paragraph text-center">{{ __('File downloaded successfully. Now time to update the project') }}</p>
    <div class="buttons">
        <a href="{{ route('LaravelUpdater::updateProcess',['fileName' => $file_name]) }}" class="button">{{ __('Update Product') }}</a>
    </div>
@stop
