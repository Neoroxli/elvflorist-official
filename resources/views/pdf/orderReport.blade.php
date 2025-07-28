<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Pemesanan Buket Periode {{ $year }}</title>

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

    <h2 style="text-align: center">Laporan Penjualan Buket Periode {{ $year }}</h2>

    <table border="0" style="width: 100%; margin-bottom: 10px; border-collapse: collapse">
        <tr>
            <span>Total Penjualan : {{ count($dataReports) }} Buket</span>
        </tr>
        <tr>
            <span>Total Pendapatan : Rp. {{ number_format($total, 0, ',', '.') }}</span>
        </tr>

    </table>

    <small style="font-size: 10px; margin-bottom: 10px">Catatan : <b style="font-weight: bold">Total pendapatan</b> merupakan penjumlahan
        dari
        <b style="font-weight: bold">harga bucket + biaya layanan (Rp. 1000) / transaksi + total harga tambahan item
            (optional)</b>
    </small>

    <table border="1" style="width: 100%; border-collapse: collapse" class="table table-bordered show">
        <thead>
            <tr>
                <th rowspan="2">No.</th>
                <th rowspan="2">No. Faktur</th>
                <th colspan="5">Informasi Pesanan</th>
                <th rowspan="2">Status Pesanan</th>
                <th rowspan="2">Pembuat Bucket</th>
            </tr>
            <tr>
                <th>Tanggal Pesan</th>
                <th>Tanggal Bayar</th>
                <th>Nama Pelanggan</th>
                <th>Nama Barang</th>
                <th>Total Harga Pesanan *)</th>
                {{-- <th>Status Pembayaran</th> --}}
            </tr>
        </thead>
        <tbody>
            @if (count($dataReports) != null)
                @foreach ($dataReports as $report)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $report->no_faktur }}</td>
                        <td>{{ date('d F Y, H:i', strtotime($report->transaction->transaction_time)) }} WIB</td>
                        <td>{{ date('d F Y, H:i', strtotime($report->transaction->settlement_time)) }} WIT</td>
                        <td><b>{{ $report->customer->user->name }}</b></td>
                        <td>{{ $report->bucket->name }}</td>
                        <td>Rp. {{ number_format($report->total_price, 0, ',', '.') }}</td>
                        {{-- <td style="text-align: center">{{ $report->transaction->transaction_status }}</td> --}}
                        <td
                            @if ($report->order_status == 'capture') @style('background-color: #FFC0CB; color: #000000')
                        @elseif ($report->order_status == 'process')
                            @style('background-color: #FFD700; color: #000000')
                        @else
                            @style('background-color: #00FF00; color: #000000') @endif>
                            @if ($report->order_status == 'capture')
                                <small>Belum diproses</small>
                            @elseif ($report->order_status == 'process')
                                <small>Sedang dikerjakan</small>
                            @else
                                <small>Selesai</small>
                            @endif
                        </td>
                        <td>
                            {{ $report->user->name ?? '-' }}
                        </td>
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
