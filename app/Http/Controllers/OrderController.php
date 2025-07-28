<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\OrderProgress;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with('transaction', 'bucket', 'customer.user', 'user')->orderBy("id", "desc")->get();

        foreach ($orders as $order) {
            if ($order->transaction->transaction_status == "settlement") {
                $data[] = $order;
            }
        }

        return Inertia::render('Orders/Order', [
            'orders' => $data ?? null
        ]);
    }

    public function getDataProgress(Request $request)
    {
        sleep(1);
        try {
            $dataProgress = OrderProgress::where('order_id', $request->orderID)->get();
            return response()->json([
                'status' => 'success',
                'data' => $dataProgress
            ]);
        } catch (\Throwable $e) {
            Log::error('message: ' . $e->getMessage());

            return response()->json(['status' => 'failed', 'message' => 'Something went wrong', 'error' => $e->getMessage()]);
        }
    }

    public function invoice(Request $request)
    {
        // public function invoice($order_id) {

        // $orders = Order::with('transaction', 'bucket', 'customer.user', 'user')->where('id', $order_id)->first();
        $orders = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_items.item')->where('id', $request->jenis_invoice)->first();

        // foreach ($orders as $order) {
        if ($orders->transaction->transaction_status == "settlement") {
            $data = $orders;
            $totalItem = $orders->order_items->sum(fn($orderItem) => $orderItem->item->price * $orderItem->quantity);
        }
        // }


        $pdf = Pdf::loadView('pdf.invoice', ['datas' => $data, 'totalItem' => $totalItem]);

        // $pdf->output();

        // $domPdf = $pdf->getDomPDF();

        // $canvas = $domPdf->get_canvas();

        // $canvas->page_text(285, 810, "Hal {PAGE_NUM}", null, 10, [0, 0, 0]);
        return $pdf->stream();

        // return [
        //     'message' => $data
        // ];
    }

    public function getDataCustomer(): Response
    {

        // cek apakah pembeli sudah melakukan order
        $dataCustomer = User::with('customer', 'customer.orders')->where('role_id', 3)->get();

        foreach ($dataCustomer as $customer) {
            if ($customer->customer->orders->count() > 0) {
                $data[] = $customer;
            }
        }

        return Inertia::render('Orders/Customer', [
            'customers' => $data
        ]);
    }

    public function getDataCustomerTransaction(Request $request, $id) : Response {
        $orders = Order::with('transaction', 'bucket', 'user')->where('customer_id', $id)->get();

        return Inertia::render('Orders/CustomerTransaction', [
            'orders' => $orders,
            'name_customer' => $request->name
        ]);
    }

    public function download_customer() {

        $dataCustomer = User::with('customer', 'customer.orders')->where('role_id', 3)->get();

        foreach ($dataCustomer as $customer) {
            if ($customer->customer->orders->count() > 0) {
                $data[] = $customer;
            }
        }

        $pdf = Pdf::loadView('pdf.dataCustomer', ['dataCustomer' => $data ]);

        $pdf->output();

        $domPdf = $pdf->getDomPDF();

        $canvas = $domPdf->get_canvas();

        $canvas->page_text(285, 810, "Hal {PAGE_NUM}", null, 10, [0, 0, 0]);
        // return $pdf->stream();
        return $pdf->download('Data Pelanggan.pdf');
    }
}
