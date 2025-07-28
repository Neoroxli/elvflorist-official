<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr" data-mode="light" data-layout-width="default"
    data-layout-position="fixed" data-topbar-color="light" data-menu-color="light" data-sidenav-view="default">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="shortcut icon" href="{{ asset('img/logo.jpg') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <link href="{{ asset('assets/libs/dropzone/min/dropzone.min.css') }}" rel="stylesheet" type="text/css">

    <link href="{{ asset('assets/css/app.min.css') }}" rel="stylesheet" type="text/css">

    <link href="{{ asset('assets/css/icons.min.css') }}" rel="stylesheet" type="text/css">

    {{-- sweet alert --}}
    <link href="{{ asset('assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet" type="text/css">

    <script src="{{ asset('assets/js/config.js') }}"></script>

    <!-- Gridjs Plugin css -->
    <link href="{{ asset('assets/libs/gridjs/theme/mermaid.min.css') }}" rel="stylesheet" type="text/css">

    <!-- css tambahan -->
    <style>
        .img-bucket:hover {
            transition: all;
            transform: translateY(-1px);
            box-shadow: 0 0.1875rem 0.375rem 0 rgba(105, 108, 255, 0.4);
        }
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia

    <!-- Plugin Js -->
    <script src="{{ asset('assets/libs/simplebar/simplebar.min.js') }}"></script>
    <script src="{{ asset('assets/libs/feather-icons/feather.min.js') }}"></script>
    <script src="{{ asset('assets/libs/%40frostui/tailwindcss/frostui.js') }}"></script>

    <!-- App Js -->
    <script src="{{ asset('assets/js/app.js') }}"></script>

    <script src="{{ asset('assets/libs/dropzone/min/dropzone.min.js') }}"></script>

    <!-- Apexcharts js -->
    {{-- <script src="{{ asset('assets/libs/apexcharts/apexcharts.min.js') }}"></script> --}}

    <!-- Dashboard Project Page js -->
    <script src="{{ asset('assets/js/pages/dashboard.js') }}"></script>

    {{-- sweet alert --}}
    <script src="{{ asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('assets/js/pages/extended-sweetalert.js') }}"></script>

    <!-- Gridjs Plugin js -->
    <script src="{{ asset('assets/libs/gridjs/gridjs.umd.js') }}"></script>

    <!-- Gridjs Demo js -->
    <script src="{{ asset('assets/js/pages/table-gridjs.js') }}"></script>

    {{-- <script src="{{ asset('service-worker.js') }}"></script> --}}

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            window.addEventListener('resize', function() {
                const o = document.getElementsByTagName("html")[0];

                window.innerWidth <= 1140 ?
                    o.setAttribute("data-sidenav-view", "mobile") :
                    o.setAttribute("data-sidenav-view", "default");
            })

        });
    </script>
</body>

</html>
