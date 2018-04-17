<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

        <!-- Facebook Meta Tags -->

        <meta property="og:url"                content="https://www.affinitycellular.com/" />
        <meta property="og:type"               content="article" />
        <meta property="og:title"              content="Affinity Cellular - AAA Cell Phones &amp; Plans" />
        <meta property="og:description"        content="Affinity Cellular offers exclusive cellular service promotions to AAA Members" />
        <meta property="og:image"              content="https://www.affinitycellular.com/img/logo/affinity-logo-blue.png" />

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="https://www.affinitycellular.com/" />
        <meta name="twitter:title" content="Affinity Cellular - AAA Cell Phones &amp; Plans" />
        <meta name="twitter:description" content="Affinity Cellular offers exclusive cellular service promotions to AAA Members" />
        <meta name="twitter:image" content="https://www.affinitycellular.com/img/logo/affinity-logo-blue.png" />

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>
            window.Laravel = {!! json_encode([
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>

        <title>@yield('title')</title>
        <meta name="description" content="@yield('meta')"/>
        <meta name="keywords" content="@yield('keywords')">


        <link href="/css/app.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
<!-- Google Tracking Code-->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-32732815-1', 'auto');
      ga('send', 'pageview');

    </script>
    </head>

    <body>
        @section('header')
            @include('common/header')
        @show

        @yield('content')

        @section('footer')
            @include('common/footer')
        @show

        <script src="/js/app.js"></script>

        {{-- Injected Scripts in subviews--}}
        @stack('footerScripts')
    </body>

</html>
