<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index() {
        try {
            $notifications = Notification::with('order.bucket', 'order.transaction', 'order.user')->where('recipient_id', Auth::user()->id)->where('read_at', null)->orderBy('id', 'desc')->get();

            $notif = [];

            foreach ($notifications as $notification) {
                if ($notification->order->transaction->transaction_status == 'settlement') {
                    $notif[] = $notification;
                }
            }

            return response()->json([
                'status' => 'success',
                'notifications' => $notif,
            ]);

        } catch (\Throwable $e) {
            Log::error('notifikasi error: ' . $e->getMessage());

            return response()->json(['status' => 'failed', 'message' => 'Something went wrong', 'error' => $e->getMessage()]);
        }
    }

    public function notifRead(Request $request) {
        try {
            Notification::where('order_id', $request->order_id)->where('recipient_id', Auth::user()->id)->where('type', 'message')->where('read_at', null)->update(['read_at' => now()]);

            return response()->json([
                'status' => 'success',
            ]);
        } catch (\Throwable $e) {
            Log::error('notifikasi_read error: ' . $e->getMessage());

            return response()->json(['status' => 'failed', 'message' => 'Something went wrong', 'error' => $e->getMessage()]);
        }
    }
}
