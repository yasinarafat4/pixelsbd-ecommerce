<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Document</title>
    <style>
        @font-face {
            font-family: 'Hind Siliguri';
            font-style: normal;
            font-weight: 400;
            src: url('{{ storage_path('fonts/HindSiliguri-Regular.ttf') }}') format('truetype');
        }

        body {
            font-size: 10px;
            font-family: 'Hind Siliguri';
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table tr td {
            padding: 0;
        }

        table tr td:last-child {
            text-align: right;
        }

        .bold {
            font-weight: bold;
        }

        .right {
            text-align: right;
        }

        .large {
            font-size: 14px;
        }



        .invoice-info-container {
            font-size: 14px;
            padding-top: 10px;
        }

        .invoice-info-container td {
            padding: 0;
        }

        .client-name {
            font-size: 18px;
            font-weight: 600;
        }

        .line-items-container {
            margin: 20px 0;
            font-size: 14px;
        }

        .line-items-container th {
            text-align: left;
            color: #5a5858;
            border-bottom: 1px solid #999;
            padding: 5px 10px;
            font-size: 0.75em;
            text-transform: uppercase;
        }

        .line-items-container th:last-child {
            text-align: right;
        }

        .line-items-container td {
            padding: 5px 10px;
            border: 1px solid #999;
        }

        /* .line-items-container tbody tr:first-child td {
            padding-top: 4px;
        }

        .line-items-container.has-bottom-border tbody tr:last-child td {
            padding-bottom: 4px;
            border-bottom: 2px solid #999;
        } */



        .line-items-container th.heading-product {
            width: 160px;
        }

        .line-items-container th.heading-quantity {
            width: 30px;
        }

        .line-items-container th.heading-delivery-type {
            width: 30px;
        }

        .line-items-container th.heading-variation {
            width: 30px;
        }

        .line-items-container th.heading-price {
            text-align: right;
            width: 10px;
        }

        .line-items-container th.heading-subtotal {
            width: 30px;
        }

        .payment-info {
            width: 30%;
            font-size: 14px;
            line-height: 1;
            border: 1px solid #999;
            padding: 5px 10px;
        }

        .discount {
            padding-bottom: 5px;
        }

        .total {
            font-size: 16px;
            border-top: 1px solid #999;
            padding: 5px 10px;
        }

        .info-container {
            text-align: start;
        }

        .footer {
            margin-top: 100px;
        }

        .footer-thanks {
            font-size: 1.125em;
        }

        .footer-thanks img {
            display: inline-block;
            position: relative;
            top: 1px;
            width: 16px;
            margin-right: 4px;
        }

        .footer-info {
            float: right;
            margin-top: 5px;
            font-size: 0.75em;
            color: #ccc;
        }

        .footer-info span {
            padding: 0 5px;
            color: black;
        }

        .footer-info span:last-child {
            padding-right: 0;
        }

        .page-container {
            display: none;
        }

        .order_span {
            font-weight: 800;
            font-size: 14px;
            padding-right: 8px;
        }

        .bottom_span {
            font-weight: 600;
            font-size: 16px;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td>
                {{-- QR Code --}}
                @if (!file_exists(public_path('/qrcodes/' . $order['code'] . '.svg')))
                    @php QrCode::size(100)->generate($order['code'],public_path('/qrcodes/'.$order['code'].'.svg')) @endphp
                @endif
                <img height="60px" width="60px" src="{{ public_path('/qrcodes/' . $order['code'] . '.svg') }}"
                    alt="{{ $order['code'] }}">
            </td>
            <td>
                <img height="60px" src={{ public_path(get_settings('site_logo')) }}
                    alt="{{ get_settings('website_name') }}">
            </td>
        </tr>
    </table>

    <table class="invoice-info-container">
        <tr>
            <td class="client-name">
                {{ $order['shipping_address']['name'] }}
            </td>
            <td>
                <span class="order_span">Order:</span> {{ $order['code'] }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $order['shipping_address']['email'] }}
            </td>
            <td>
                <span class="order_span">Order Status:</span>
                {{ Str::replace('_', ' ', Str::title($order['delivery_status'])) }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $order['shipping_address']['phone'] }}
            </td>
            <td>
                <span class="order_span"> Order Date:</span>
                {{ \Carbon\Carbon::parse($order['date'])->format('Y-m-d , h:m:s a') }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $order['shipping_address']['address'] . ', ' . $order['shipping_address']['city'] . ', ' . $order['shipping_address']['state'] . '-' . $order['shipping_address']['zip_code'] . ', ' . $order['shipping_address']['country'] }}

            </td>
            <td>
                <span class="order_span"> Order Total:</span> {{ $order['grand_total'] }}
            </td>
        </tr>
        <tr>
            <td>
                <span class="order_span"> Additional Info: </span> {{ $order['additional_info'] }}
            </td>
            <td>
                <span class="order_span"> Payment Method: </span>
                {{ Str::replace('_', ' ', Str::title($order['payment_type'])) }}
            </td>
        </tr>
    </table>



    <table class="line-items-container">
        <thead>
            <tr>
                <th class="heading-quantity">#</th>
                <th class="heading-product">Product</th>
                <th class="heading-variation">Variation</th>
                <th class="heading-quantity">Qty</th>
                <th class="heading-delivery-type">Delivery Type</th>
                <th class="heading-price">Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($order['order_details'] as $key => $details)
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ $details['product']['name'] }}</td>
                    <td>{{ $details['variation'] }}</td>
                    <td>{{ $details['quantity'] }}</td>
                    <td>
                        {{ Str::replace('_', ' ', Str::title($details['shipping_type'])) }}
                    </td>
                    <td>{{ $details['price'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>


    <table>
        <tbody>
            <tr>
                <td>
                </td>
                <td></td>
                <td class="payment-info">
                    <div>
                        Subtotal: {{ $order['subtotal'] }}
                    </div>
                    <div>
                        Shipping: {{ $order['shipping_cost'] }}
                    </div>
                    <div>
                        (+) Tax: {{ $order['tax'] }}
                    </div>
                    <div class="discount">
                        (-) Discount: {{ $order['coupon_discount'] }}
                    </div>
                    <div class="total">
                        Total: {{ $order['grand_total'] }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <div class="footer-info">
            <span class="bottom_span">{{ get_settings('website_name') }}</span>
        </div>
        <div class="footer-thanks">
            <span class="bottom_span">Thank you!</span>
        </div>
    </div>
</body>

</html>
