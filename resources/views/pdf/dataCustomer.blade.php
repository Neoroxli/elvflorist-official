<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Pelanggan</title>

    <style>
        @media print {
            .new-page {
                page-break-after: always;
            }
        }

        /* @page {
            margin: 90px 35px;
        } */

        .show {
            font-size: 11px;
        }

        body {
            font-family: Inter, sans-serif;
        }

        th,
        td {
            padding: 5px;
        }

        tr:nth-child(even) {
            background-color: #D6EEEE;
        }
    </style>
</head>

<body>
    <table border="0" style="width: 100%">
        <tr>
            <td style="">
                <center>
                    <img src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('img/logo.jpg'))) }}"
                        alt="logo" width="80" height="80" />
                </center>
            </td>
            <td style="">
                <center style="">
                    <h1 style="margin: 0; text-transform: uppercase;">Toko ELv FLorist Merauke</h1>
                    <div style="font-size: 10px; margin-top: 5px; line-height: 1">
                        <p style="margin: 0">Jln Raya mandala no 15 sebelah cafe valentine Merauke Papua Selatan</p>
                        {{-- <p style="margin: 0">Distrik Merauke</p>
                        <p style="margin: 0">Kabupaten Merauke</p>
                        <p style="margin: 0">Provinsi Papua Selatan</p> --}}
                        <p style="margin: 0">TELP. 08114900052</p>
                    </div>
                </center>
            </td>
        </tr>
    </table>
    <hr>
    <p style="text-align: right; margin-top: 0; font-size: 12px">Merauke, {{ date('d F Y') }}</p>

    <h2 style="text-align: center">Data Pelanggan</h2>

    <table border="0" style="width: 100%; margin-bottom: 10px; border-collapse: collapse">
        <tr>
            <span>Total Pelanggan : {{ count($dataCustomer) }} Orang</span>
        </tr>
    </table>

    <table border="1" style="width: 100%; border-collapse: collapse" class="table table-bordered show">
        <thead>
            <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Email</th>
                <th>No. Telp</th>
                <th>Alamat</th>
                <th>Jumlah Transaksi</th>
            </tr>
        </thead>
        <tbody>
            @if (count($dataCustomer) != null)
                @foreach ($dataCustomer as $customer)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $customer->name }}</td>
                        <td>{{ $customer->email }}</td>
                        <td>{{ $customer->customer->no_wa }}</td>
                        <td><b>{{ $customer->customer->address }}</b></td>
                        <td>{{ $customer->customer->orders->count() }} Transaksi</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="9" style="text-align: center">Tidak ada data</td>
                </tr>
            @endif
        </tbody>
    </table>
</body>

</html>
