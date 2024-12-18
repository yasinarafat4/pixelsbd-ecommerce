<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if (gte mso 9)|(IE)]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
    <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
    <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS -->
    <meta name="format-detection" content="address=no"> <!-- disable auto address linking in iOS -->
    <meta name="format-detection" content="email=no"> <!-- disable auto email linking in iOS -->
    <meta name="author" content="Simple-Pleb.com">
    <title>{{ __('pleb.mail.Welcome Title') }} | {{ config('app.name') }}</title>

    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <style type="text/css">
        /*Basics*/
        body {
            margin: 0px !important;
            padding: 0px !important;
            display: block !important;
            min-width: 100% !important;
            width: 100% !important;
            -webkit-text-size-adjust: none;
        }

        img {
            -ms-interpolation-mode: bicubic;
            width: auto;
            max-width: auto;
            height: auto;
            margin: auto;
            display: block !important;
            border: 0px;
        }

        p {
            margin: 0;
            padding: 0;
        }

        div {
            margin: 0;
            padding: 0;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        .newsletter {
            width: 40%;
            margin: auto;
        }

        .header {
            width: auto;
            /* margin: auto; */
        }

        .header img {
            padding: 50px;
            width: 150px;
        }

        .content {
            padding: 20px;
            background: #fff;
        }

        .footer {
            padding: 20px;
            background: #ddd;
            margin: auto;
        }

        .footer ul {
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        .footer ul li img {
            width: 40px;
        }


        .phone {
            display: flex;
            justify-content: center;
            padding: 10px 0;
        }

        .contact {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
        }



        .unsubscribe {
            display: flex;
            justify-content: center;
            padding-top: 20px;
        }

        /* .unsubscribe a {
            padding: 10px 20px 10px 20px;
        } */

        /*Responsive*/
        @media screen and (max-width: 799px) {
            table.row {
                width: 100% !important;
                max-width: 100% !important;
            }

            td.row {
                width: 100% !important;
                max-width: 100% !important;
            }

            .img-responsive img {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin: auto;
            }

            .center-float {
                float: none !important;
                margin: auto !important;
            }

            .center-text {
                text-align: center !important;
            }

            .container-padding {
                width: 100% !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
            }

            .container-padding10 {
                width: 100% !important;
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            .hide-mobile {
                display: none !important;
            }

            .menu-container {
                text-align: center !important;
            }

            .autoheight {
                height: auto !important;
            }

            .m-padding-10 {
                margin: 10px 0 !important;
            }

            .m-padding-15 {
                margin: 15px 0 !important;
            }

            .m-padding-20 {
                margin: 20px 0 !important;
            }

            .m-padding-30 {
                margin: 30px 0 !important;
            }

            .m-padding-40 {
                margin: 40px 0 !important;
            }

            .m-padding-50 {
                margin: 50px 0 !important;
            }

            .m-padding-60 {
                margin: 60px 0 !important;
            }

            .m-padding-top10 {
                margin: 30px 0 0 0 !important;
            }

            .m-padding-top15 {
                margin: 15px 0 0 0 !important;
            }

            .m-padding-top20 {
                margin: 20px 0 0 0 !important;
            }

            .m-padding-top30 {
                margin: 30px 0 0 0 !important;
            }

            .m-padding-top40 {
                margin: 40px 0 0 0 !important;
            }

            .m-padding-top50 {
                margin: 50px 0 0 0 !important;
            }

            .m-padding-top60 {
                margin: 60px 0 0 0 !important;
            }

            .m-height10 {
                font-size: 10px !important;
                line-height: 10px !important;
                height: 10px !important;
            }

            .m-height15 {
                font-size: 15px !important;
                line-height: 15px !important;
                height: 15px !important;
            }

            .m-height20 {
                font-size: 20px !important;
                line-height: 20px !important;
                height: 20px !important;
            }

            .m-height25 {
                font-size: 25px !important;
                line-height: 25px !important;
                height: 25px !important;
            }

            .m-height30 {
                font-size: 30px !important;
                line-height: 30px !important;
                height: 30px !important;
            }

            .rwd-on-mobile {
                display: inline-block !important;
                padding: 5px;
            }

            .center-on-mobile {
                text-align: center !important;
            }
        }
    </style>

</head>

<body
    style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"
    bgcolor="#f0f0f0">

    <div class="newsletter">
        {{-- Header --}}
        <div style="background-color: {{ get_settings('secondary_color') }}" class="header">
            <a href="{{ url('/') }}">
                <img src="{{ asset(get_settings('site_logo')) }}" border="0" alt="logo"></a>
        </div>
        {{-- Body --}}
        <div class="content">
            {!! $data['content'] !!}
        </div>
        {{-- Footer --}}
        <div class="footer">
            {{-- Social --}}
            <ul>
                @if (get_settings('facebook_link'))
                    <li>
                        <a href="{{ get_settings('facebook_link') }}">
                            <img src="{{ asset('assets/Facebook.png') }}" border="0" alt="logo"></a>
                    </li>
                @endif
                @if (get_settings('instagram_link'))
                    <li>
                        <a href="{{ get_settings('instagram_link') }}">
                            <img src="{{ asset('assets/Instagram.png') }}" border="0" alt="logo"></a>
                    </li>
                @endif
                @if (get_settings('twitter_link'))
                    <li>
                        <a href="{{ get_settings('twitter_link') }}">
                            <img src="{{ asset('assets/Twitter.png') }}" border="0" alt="logo"></a>
                    </li>
                @endif
                @if (get_settings('pinterest_link'))
                    <li>
                        <a href="{{ get_settings('pinterest_link') }}">
                            <img src="{{ asset('assets/Pinterest.png') }}" border="0" alt="logo"></a>
                    </li>
                @endif
                @if (get_settings('linkedin_link'))
                    <li>
                        <a href="{{ get_settings('linkedin_link') }}">
                            <img src="{{ asset('assets/linkedin.png') }}" border="0" alt="logo"></a>
                    </li>
                @endif
            </ul>

            {{-- Contact Address --}}
            <div class="phone">
                <a href="tel:{{ get_settings('contact_phone') }}">{{ get_settings('contact_phone') }}</a>
            </div>
            <div class="contact">
                <p class="address">
                    <span>{{ get_settings('contact_email') }}</span> -
                    <span>{{ get_settings('contact_address') }}</span>
                </p>
            </div>
            <hr>
            <div class="unsubscribe">
                <a href="#">Unsubscribe</a>
            </div>
        </div>
    </div>

</body>

</html>
