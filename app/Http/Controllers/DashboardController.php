<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): Response
    {

        DB::statement("SET SQL_MODE=''");

        $totals = Order::with('transaction')->get();

        foreach ($totals as $order) {
            if ($order->transaction->transaction_status == "settlement" && date('Y', strtotime($order->created_at)) == date('Y')) {
                if ($order->order_status == "success") {
                    $dataSuccess[] = $order;
                } elseif ($order->order_status == "process") {
                    $dataProcess[] = $order;
                } else {
                    $dataCapture[] = $order;
                }

                $data[] = $order;
            }
        }

        $totalIncome = collect(DB::select('SELECT SUM(total_price) as total FROM orders as a
            JOIN transactions as b ON a.id = b.order_id WHERE b.transaction_status = "settlement"
            AND DATE_FORMAT(a.created_at, "%Y") = "' . date('Y') . '" '))->first();

        $financeData = DB::table('orders')->selectRaw('MONTH(orders.created_at) as month, SUM(orders.total_price) as total')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->whereYear('orders.created_at', date('Y'))
            ->groupBy(DB::raw('MONTH(orders.created_at)'))
            ->orderBy('month')
            ->get();

        $orderData = DB::table('orders')->selectRaw('MONTH(orders.created_at) as month, COUNT(*) as total_order')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->whereYear('orders.created_at', date('Y'))
            ->groupBy(DB::raw('MONTH(orders.created_at)'))
            ->orderBy('month')
            ->get();

        $employee = DB::table('orders')->selectRaw('users.name as user, COUNT(*) as total_order,
            COUNT(CASE WHEN orders.order_status = "success" THEN 1 ELSE NULL END) as success_order,
            COUNT(CASE WHEN orders.order_status = "process" THEN 1 ELSE NULL END) as process_order')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->whereYear('orders.created_at', date('Y'))
            ->whereMonth('orders.created_at', date('m'))
            ->groupBy(DB::raw('orders.user_id'))
            ->orderBy('user')
            ->get();

        // dd($employee);

        return Inertia::render('Dashboard', [
            'totalOrder' => $data ?? 0,
            'successOrder' => $dataSuccess ?? 0,
            'processOrder' => $dataProcess ?? 0,
            'captureOrder' => $dataCapture ?? 0,
            'totalIncome' => $totalIncome->total,
            'financeData' => $financeData,
            'orderData' => $orderData,
            'employee' => $employee
        ]);
    }

    public function show(Request $request)
    {
        sleep(1);
        DB::statement("SET SQL_MODE=''");
        $dataReport = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_progress')->get();

        foreach ($dataReport as $report) {
            if ($report->transaction->transaction_status == "settlement" && date('Y', strtotime($report->created_at)) == $request->year) {
                if ($report->order_status == "success") {
                    $dataSuccess[] = $report;
                } elseif ($report->order_status == "process") {
                    $dataProcess[] = $report;
                } else {
                    $dataCapture[] = $report;
                }

                $data[] = $report;
            } else {
                $dataFailed = [];
            }
        }

        $totalIncome = collect(DB::select('SELECT SUM(price_bucket) as total FROM orders as a
            JOIN transactions as b ON a.id = b.order_id WHERE b.transaction_status = "settlement"
            AND DATE_FORMAT(a.created_at, "%Y") = "' . $request->year . '" '))->first();

        $financeData = DB::table('orders')->selectRaw('MONTH(orders.created_at) as month, SUM(orders.price_bucket) as total')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->whereYear('orders.created_at', $request->year)
            ->groupBy(DB::raw('MONTH(orders.created_at)'))
            ->orderBy('month')
            ->get();

        $orderData = DB::table('orders')->selectRaw('MONTH(orders.created_at) as month, COUNT(*) as total_order')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->whereYear('orders.created_at', $request->year)
            ->groupBy(DB::raw('MONTH(orders.created_at)'))
            ->orderBy('month')
            ->get();

        $employee = DB::table('orders')->selectRaw('users.name as user, COUNT(*) as total_order,
            COUNT(CASE WHEN orders.order_status = "success" THEN 1 ELSE NULL END) as success_order,
            COUNT(CASE WHEN orders.order_status = "process" THEN 1 ELSE NULL END) as process_order')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->whereYear('orders.created_at', $request->year)
            // ->whereMonth('orders.created_at', date('m'))
            ->whereMonth('orders.created_at', $request->month)
            ->groupBy(DB::raw('orders.user_id'))
            ->orderBy('user')
            ->get();

        // dd($employee);

        return response()->json([
            'totalOrder' => count($data ?? $dataFailed),
            'successOrder' => count($dataSuccess ?? $dataFailed),
            'processOrder' => count($dataProcess ?? $dataFailed),
            'captureOrder' => count($dataCapture ?? $dataFailed),
            'totalIncome' => $totalIncome->total,
            'financeData' => $financeData,
            'orderData' => $orderData,
            'employee' => $employee
        ]);
    }

    public function show_employee(Request $request)
    {
        sleep(1);

        DB::statement("SET SQL_MODE=''");

        $employee = DB::table('orders')->selectRaw('users.name as user, COUNT(*) as total_order,
            COUNT(CASE WHEN orders.order_status = "success" THEN 1 ELSE NULL END) as success_order,
            COUNT(CASE WHEN orders.order_status = "process" THEN 1 ELSE NULL END) as process_order')
            ->join('transactions', 'orders.id', '=', 'transactions.order_id')->where('transactions.transaction_status', 'settlement')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->whereYear('orders.created_at', $request->year)
            ->whereMonth('orders.created_at', $request->month)
            ->groupBy(DB::raw('orders.user_id'))
            ->orderBy('user')
            ->get();

        return response()->json([
            'employee' => $employee
        ]);
    }
}
