@extends('php-laravel.phplaravel.layouts.master-update')

@section('title', trans('default_messages.updater.welcome.title'))
@section('container')
    <p class="paragraph text-center">
    	{{ trans('default_messages.updater.welcome.message') }}
    </p>
    <div class="buttons">
        <a href="{{ route('LaravelUpdater::overview') }}" class="button">{{ trans('default_messages.next') }}</a>
    </div>
@stop
