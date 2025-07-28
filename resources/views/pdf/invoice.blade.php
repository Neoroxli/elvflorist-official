<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ asset('img/logo.jpg') }}" type="image/x-icon">
    <title>Invoice {{ $datas->no_faktur }}</title>

    <style>
        body {
            font-family: Inter, sans-serif;
        }

        @page {
            margin: 50px 90px;
        }

        th,
        td {
            padding: 5px;
        }

        tr:nth-child(even) {
            background-color: #D6EEEE;
        }

        #watermark {
            flow: static(watermarkflow);
        }

        @page {
            @prince-overlay {
                content: flow(watermarkflow)
            }
        }

        #watermark {
            position: fixed;
            flow: static(watermarkflow);
            top: 50%;
            bottom: 50%;
            font-size: 120px;
            opacity: 0.2;
            transform: rotate(-30deg);
            text-align: center;
        }
    </style>

</head>

<body>
    <div id="watermark">Elv-FLorist</div>
    <table border="0" style="width: 100%">
        <tr>
            <center style="margin: 0">
                <div>
                    <img src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('img/logo.jpg'))) }}"
                        alt="logo" width="80" height="80" style="border-radius: 50%" />
                </div>
            </center>
            <td style="">
                <div style="">
                    <b style="margin: 0; text-transform: uppercase;">Toko ELv FLorist Merauke</b>
                    <div style="font-size: 10px; margin-top: 5px; line-height: 1">
                        <p style="margin: 0">Jln Raya mandala no 15 sebelah cafe valentine Merauke Papua Selatan</p>
                        {{-- <p style="margin: 0">Distrik Merauke</p>
                        <p style="margin: 0">Kabupaten Merauke</p>
                        <p style="margin: 0">Provinsi Papua Selatan</p> --}}
                        <p style="margin: 0">TELP. 08114900052</p>
                    </div>
                </div>
            </td>
            <td>
                <div style="text-align: right; font-family: monospace; margin-top: 30">
                    <h1 style="margin: 0">Invoice</h1>
                </div>
            </td>
        </tr>
    </table>
    <hr style="margin: 0">

    <div style="margin-top: 10px; display: flex; flex-direction: row">
        <table border="0" style="width: 100%; font-size: 12px">
            <tr>
                <td>Kepada Yth.</td>
            </tr>
            <tr>
                <td>Nama</td>
                <td>{{ $datas->customer->user->name }}</td>
                <td style="padding-left: 50px; padding-right: 50px">&nbsp;</td>
                <td>Email</td>
                <td>{{ $datas->customer->user->email }}</td>
            </tr>
            <tr>
                <td>No. Telp</td>
                <td>{{ $datas->customer->no_wa }}</td>
                <td>&nbsp;</td>
                <td>No. Invoice</td>
                <td>{{ $datas->no_faktur }}</td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td>{{ $datas->customer->address }}</td>
                <td>&nbsp;</td>
                <td>Tanggal</td>
                <td>{{ date('d F Y', strtotime($datas->transaction->settlement_time)) }}</td>
            </tr>
        </table>

        <div style="margin-top: 50px">
            <table border="0" style="width: 100%; font-size: 14px; text-align: left;">
                <thead>
                    <tr>
                        <th style="text-align: left">Nama Barang</th>
                        <th style="text-align: left">Jumlah</th>
                        <th style="text-align: left">Harga Satuan</th>
                        <th style="text-align: right">Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $datas->bucket->name }}</td>
                        <td>1 </td>
                        <td style="text-align: left">Rp. {{ number_format($datas->price_bucket, 0, ',', '.') }}</td>
                        <td style="text-align: right">Rp. {{ number_format($datas->price_bucket, 0, ',', '.') }}</td>
                    </tr>
                </tbody>
                <tbody>
                    @foreach ($datas->order_items as $orderItem)
                    <tr>
                        <td>{{ $orderItem->item->name }}</td>
                        <td>{{ $orderItem->quantity }}</td>
                        <td style="text-align: left">Rp. {{ number_format($orderItem->item->price, 0, ',', '.') }}</td>
                        <td style="text-align: right">Rp. {{ number_format($orderItem->item->price * $orderItem->quantity, 0, ',', '.') }}</td>
                    </tr>
                    @endforeach
                </tbody>
                <br>
                <br>
                <tfoot>
                    <tr style="text-align: right">
                        <td colspan="3" style="font-weight: bold">Biaya Layanan</td>
                        <td>Rp. {{ number_format(env('VITE_BIAYA_APLIKASI'), 0, ',', '.') }}
                        </td>
                    </tr>
                    <tr style="text-align: right">
                        <td colspan="3" style="font-weight: bold">Total Harga</td>
                        <td>Rp.
                            {{ number_format($datas->price_bucket + env('VITE_BIAYA_APLIKASI') + $totalItem, 0, ',', '.') }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</body>

</html>
