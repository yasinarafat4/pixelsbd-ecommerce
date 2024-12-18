@php
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header(
        'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length',
    );
    header('Access-Control-Allow-Origin: *');
@endphp
<!DOCTYPE html>
<html dir="{{ default_language()->rtl == 0 ? 'ltr' : 'rtl' }}" lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    class="scroll-smooth focus:scroll-auto">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>{{ get_settings('meta_title') }}</title>
    <meta name="description" content="{{ get_settings('meta_description') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        $meta_image = static_asset(get_settings('meta_image'));
    @endphp

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="{{ get_settings('meta_title') }}">
    <meta itemprop="description" content="{{ get_settings('meta_description') }}">
    <meta itemprop="image" content="{{ $meta_image }}">

    <!-- Twitter Card data -->
    <meta name="twitter:card" content="product">
    <meta name="twitter:site" content="@publisher_handle">
    <meta name="twitter:title" content="{{ get_settings('meta_title') }}">
    <meta name="twitter:description" content="{{ get_settings('meta_description') }}">
    <meta name="twitter:creator" content="@author_handle">
    <meta name="twitter:image" content="{{ $meta_image }}">

    <!-- Open Graph data -->
    <meta property="og:title" content="{{ get_settings('meta_title') }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ route('home') }}" />
    <meta property="og:image" content="{{ $meta_image }}" />
    <meta property="og:description" content="{{ get_settings('meta_description') }}" />
    <meta property="og:site_name" content="{{ env('APP_NAME') }}" />

    <link rel="icon" href={{ get_settings('site_icon') }}>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
        rel="stylesheet">


    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead


    <style>
        :root {
            --primary: {{ get_settings('primary_color') }};
            --soft-primary: {{ hex_to_rgba(get_settings('primary_color'), 0.15) }};
            --hov-primary: {{ get_settings('primary_hover_color') }};
            --secondary: {{ get_settings('secondary_color') }};
            --soft-secondary: {{ hex_to_rgba(get_settings('secondary_color'), 0.15) }};
            --hov-secondary: {{ get_settings('secondary_hover_color') }};
        }
    </style>
    @addons
    {{-- laravelPWA --}}
    {{-- @laravelPWA --}}
</head>

<body class="font-sans antialiased">
    @inertia

    <input type="hidden" id="token" value="{{ csrf_token() }}">
    <input type="hidden" id="base_url" value="{{ url('/') }}">
    <input type="hidden" id="app_path" value="{{ app_path() }}">
    @if (get_settings('is_pusher_notification_active') == 1 && Sentinel::check())
        <input type="hidden" value="{{ get_settings('pusher_app_key') }}" id="f_pusher_app_key">
        <input type="hidden" value="{{ get_settings('pusher_app_cluster') }}" id="f_pusher_app_cluster"> @endif
</body>

<script>
    window.default_currency_symbol = '{{ default_currency_symbol() }}';
    window.active_currency_symbol = '{{ active_currency_symbol() }}';
    window.default_currency_code = '{{ default_currency_code() }}';
    window.active_currency_code = '{{ active_currency_code() }}';
</script>

</html>
