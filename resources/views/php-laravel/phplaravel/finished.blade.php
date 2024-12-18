@extends('php-laravel.phplaravel.layouts.master')

@section('template_title')
    {{ trans('default_messages.final.templateTitle') }}
@endsection

@section('title')
    <i class="fa fa-flag-checkered fa-fw" aria-hidden="true"></i>
    {{ trans('default_messages.final.title') }}
@endsection

@section('container')

	@if(session('message')['dbOutputLog'])
		<p><strong><small>{{ trans('default_messages.final.migration') }}</small></strong></p>
		<pre><code>{{ session('message')['dbOutputLog'] }}</code></pre>
	@endif

	<p><strong><small>{{ trans('default_messages.final.console') }}</small></strong></p>
	<pre><code>{{ $finalMessages }}</code></pre>

	<p><strong><small>{{ trans('default_messages.final.log') }}</small></strong></p>
	<pre><code>{{ $finalStatusMessage }}</code></pre>

	<p><strong><small>{{ trans('default_messages.final.env') }}</small></strong></p>
	<pre><code>{{ $finalEnvFile }}</code></pre>

    <div class="buttons">
        <a href="{{ url('/') }}" class="button">{{ trans('default_messages.final.exit') }}</a>
    </div>

@endsection
