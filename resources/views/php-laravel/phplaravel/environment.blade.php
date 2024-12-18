@extends('php-laravel.phplaravel.layouts.master')

@section('template_title')
    {{ trans('default_messages.environment.menu.templateTitle') }}
@endsection

@section('title')
    <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
    {!! trans('default_messages.environment.menu.title') !!}
@endsection

@section('container')

    <p class="text-center">
        {!! trans('default_messages.environment.menu.desc') !!}
    </p>
    <div class="buttons">
        <a href="{{ route('PhpLaravel::environmentWizard') }}" class="button button-wizard">
            {{ __('Next') }}
            <i class="fa fa-angle-right fa-fw" aria-hidden="true"></i>
        </a>
    </div>

@endsection
