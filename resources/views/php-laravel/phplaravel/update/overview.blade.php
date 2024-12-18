@extends('php-laravel.phplaravel.layouts.master-update')

@section('template_title')
    {{ trans('default_messages.envato.templateTitle') }}
@endsection

@section('title')
    <i class="fa fa-database" aria-hidden="true"></i>
    {{ __('Product Update') }}
@endsection
@section('container')
<form method="post" action="{{ route('LaravelUpdater::downloadUpdatedCode') }}" class="tabs-wrap">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">

    <div class="form-group {{ $errors->has('code') ? ' has-error ' : '' }}">
        <label for="purchase_code">
            {{ __('Purchase Code') }}
        </label>
        <input type="text" name="code" id="purchase_code" value="{{ $purchase_code }}" placeholder="{{ __('Envato purchase code')}}" />
        @if ($errors->has('code'))
            <span class="error-block">
                        <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                {{ $errors->first('code') }}
            </span>
        @endif
    </div>
    @if(isset($version_list[0]))
        <div class="form-group {{ $errors->has('version') ? ' has-error ' : '' }}">
            <label for="environment">
                {{ __('Select a version to get updated code') }}
            </label>
            <select name="version">
                @foreach ($version_list as $version)
                <option value="{{ $version['product_version'] }}">{{ $version['product_version'] }}</option>
                @endforeach
            </select>
            
            @if ($errors->has('version'))
                <span class="error-block">
                    <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                    {{ $errors->first('version') }}
                </span>
            @endif
        </div>
    @endif
    
    <div class="buttons">
        <button class="button" type="submit">
            {{ __('Download') }}
            <i class="fa fa-angle-right fa-fw" aria-hidden="true"></i>
        </button>
    </div>
</form>
@stop
