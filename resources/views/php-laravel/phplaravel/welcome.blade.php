@extends('php-laravel.phplaravel.layouts.master')

@section('template_title')
    {{ trans('default_messages.welcome.templateTitle') }}
@endsection

@section('title')
    {{ trans('default_messages.welcome.title') }}
@endsection

@section('container')
    <p class="text-center">
      {{ trans('default_messages.welcome.message') }}
    </p>
    <p class="text-center">
      <a href="{{ route('PhpLaravel::requirements') }}" class="button">
        {{ trans('default_messages.welcome.next') }}
        <i class="fa fa-angle-right fa-fw" aria-hidden="true"></i>
      </a>
    </p>
@endsection
