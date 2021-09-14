<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <title>{{ config('app.name') }} | DevIt</title>
    {{--    <link rel="icon" type="image/png" href="{{ mix('favicon.png') }}"/>--}}
    {{--    <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">--}}
    {{--    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>--}}
</head>
<body>
<div id="root"></div>

<script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</body>
</html>
