<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <title>{{ config('app.name') }} | DevIt</title>
    <link rel="icon" type="image/png" href="{{ mix('favicon.png') }}" />
    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
    </style>
</head>

<body class="antialiased">
    <div id="root"></div>

    <script>
        window.language = navigator.language || navigator.userLanguage;
        window.user = @json($user);
    </script>
    <script type="text/javascript" src="{{ asset('js/index.js') }}"></script>
</body>

</html>
