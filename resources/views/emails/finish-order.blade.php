<x-mail::message>

<div style="text-align: center;">
    <img src="{{ $message->embed('img/logo_elv_florist.png') }}"
                        alt="logo" width="80" height="80">
</div>

<h3 style="text-align: center; font-size: 20px;">Pembuatan Buket Telah Berhasil</h3>

<p style="text-align: center;">
    Terima kasih telah berbelanja di toko kami.<br>
    Silahkan klik tombol di bawah ini untuk melihat detail pesanan Anda.<br>
</p>

{{-- <x-mail::panel>
Berikut detail pesanan Anda: <br>
<b>Nomor Faktur : {{ $customer->no_faktur }}</b>
</x-mail::panel> --}}

{{-- <x-mail::table>
| Produk | Quantity | Harga |
|--------|----------:|------:|
| Widget A | 2 | Rp50.000 |
</x-mail::table> --}}

<x-mail::button :url="$url" color="success">
Lihat Detail Pesanan
</x-mail::button>

<p style="text-align: center;">
    E-mail ini dibuat otomatis, mohon tidak membalas.<br>
</p>

</x-mail::message>

