@extends('php-laravel.phplaravel.layouts.master-update')

@section('title', trans('default_messages.updater.final.title'))
@section('container')
    <p class="paragraph text-center">{{ $message }}</p>
    <div class="buttons">
        <a href="{{ url('/') }}" class="button">{{ trans('default_messages.updater.final.exit') }}</a>
    </div>
@stop
