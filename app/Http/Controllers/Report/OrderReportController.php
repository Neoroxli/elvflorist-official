<?php

namespace App\Http\Controllers\Report;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;

class OrderReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Report/OrderReport');
    }

    public function showReport(Request $request)
    {
        sleep(1);
        if ($request->orderStatus == "all") {
            $dataReport = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_progress')->get();

            foreach ($dataReport as $report) {
                if ($report->transaction->transaction_status == "settlement" && date('Y', strtotime($report->created_at)) == $request->year) {
                    $data[] = $report;
                }
            }
        } else {
            $dataReport = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_progress')->where('order_status', $request->orderStatus)->get();

            foreach ($dataReport as $report) {
                if ($report->transaction->transaction_status == "settlement" && date('Y', strtotime($report->created_at)) == $request->year) {
                    $data[] = $report;
                }
            }
        }

        return [
            'data' => $data ?? null,
        ];
    }

    public function cetak()
    {
        $pdf = Pdf::loadView('pdf.invoice', [""]);
        return $pdf->download('invoice.pdf');

        // $pdf = App::make('dompdf.wrapper');
        // $pdf->loadHTML('<h1>Test saja</h1>');
        // return $pdf->stream();
    }

    public function download(Request $request)
    {
        // dd($request->all());
        // $pdf = App::make('dompdf.wrapper');
        // $pdf->loadHTML('<h1>Test saja</h1>');
        // return $pdf->stream();

        if ($request->orderStatus == "all") {
            $dataReport = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_progress')->get();

            foreach ($dataReport as $report) {
                if ($report->transaction->transaction_status == "settlement" && date('Y', strtotime($report->created_at)) == $request->year) {
                    $data[] = $report;
                    // $total = Order::select(DB::raw('SUM(price_bucket) as total'))->first();
                } else {
                    $dataFailed = [];
                }
            }

            $total = collect(DB::select('SELECT SUM(total_price) as total FROM orders as a
            JOIN transactions as b ON a.id = b.order_id WHERE b.transaction_status = "settlement"
            AND DATE_FORMAT(a.created_at, "%Y") = "' . $request->year . '" '))->first();
        } else {
            $dataReport = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_progress')->where('order_status', $request->orderStatus)->get();

            foreach ($dataReport as $report) {
                if ($report->transaction->transaction_status == "settlement" && date('Y', strtotime($report->created_at)) == $request->year) {
                    $data[] = $report;
                    // $total = Order::select(DB::raw('SUM(price_bucket) as total'))->join('transactions', 'orders.transaction_id', '=', 'transactions.id')->first();
                } else {
                    $dataFailed = [];
                }
            }

            $total = collect(DB::select('SELECT SUM(total_price) as total FROM orders as a
            JOIN transactions as b ON a.id = b.order_id WHERE b.transaction_status = "settlement"
            AND a.order_status = "' . $request->orderStatus . '" AND DATE_FORMAT(a.created_at, "%Y") = "' . $request->year . '" '))->first();
        }

        $pdf = Pdf::loadView('pdf.orderReport', ['dataReports' => $data ?? $dataFailed, 'year' => $request->year, 'total' => $total->total]);

        $pdf->output();

        $domPdf = $pdf->getDomPDF();

        $canvas = $domPdf->get_canvas();

        $canvas->page_text(30, 810, "*) Sudah termasuk biaya layanan dan harga item tambahan (optional)", null, 10, [0, 0, 0]);
        $canvas->page_text(530, 810, "Hal {PAGE_NUM}", null, 10, [0, 0, 0]);
        // return $pdf->stream();
        return $pdf->download('Laporan Pemesanan Buket Periode ' . $request->year . '.pdf');
    }
}
