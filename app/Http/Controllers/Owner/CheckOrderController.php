<?php

namespace App\Http\Controllers\Owner;

use App\Events\NotificationProgress;
use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use GuzzleHttp\Client;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\OrderProgress;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Notifications\FinishOrderEmailNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification as FacadesNotification;
use Pusher\PushNotifications\PushNotifications;

class CheckOrderController extends Controller
{
    public function index(): Response
    {
        // $orders = Order::with('transaction', 'order_progress', 'user')->get();
        $orders = Order::with('transaction', 'bucket', 'customer.user', 'user', 'order_progress', 'notifications')->orderBy('id', 'desc')->get();

        foreach ($orders as $order) {
            if ($order->transaction->transaction_status == "settlement") {
                $data[] = $order;
            }
        }

        // dd($data);

        return Inertia::render('Owner/CheckOrder/Page', [
            'orders' => $data
        ]);
    }

    public function showProgress(Request $request)
    {
        sleep(1);
        try {
            // Notification::where('order_id', $request->orderID)->where('type', 'message')->where('read_at', null)->update(['read_at' => now()]);
            // $order = Order::where('id', $request->orderID)->first('custome_order');
            $order = Order::with('order_items.item')->where('id', $request->orderID)->first();
            $dataProgress = OrderProgress::where('order_id', $request->orderID)->get();
            return response()->json([
                'status' => 'success',
                'order' => $order,
                'data' => $dataProgress
            ]);
        } catch (\Throwable $e) {
            Log::error('message: ' . $e->getMessage());

            return response()->json(['status' => 'failed', 'message' => 'Something went wrong', 'error' => $e->getMessage()]);
        }
    }

    public function updateProgress(Request $request)
    {
        $employee = Order::with('customer.user', 'transaction', 'bucket')->where('id', $request->order_id)->first();
        // dd($employee);
        if ($request->statusProgress == "reject") {
            $request->validate([
                'message' => 'required'
            ], [
                'required' => 'Pesan rejected tidak boleh kosong'
            ]);

            $update = OrderProgress::where('id', $request->progress_id)->update([
                'message' => $request->message,
                'status' => "rejected"
            ]);

            if (!$update) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Status gagal diupdate'
                ]);
            }

            $notification = Notification::create([
                'type' => 'message',
                'order_id' => $request->order_id,
                'sender_id' => Auth::user()->id,
                'recipient_id' => $employee->user_id,
                'data' => "Progress Pembuatan " . $employee->bucket->name . " Ditolak, silahkan perbaiki dan kirim ulang progress Anda",
            ]);

            NotificationProgress::dispatch($employee->user_id, [
                'message' => 'Progress Pembuatan ' . $employee->bucket->name . ' (' . $employee->no_faktur . ') Ditolak, silahkan perbaiki dan kirim ulang progress Anda',
            ]);

            // untuk sisi development
            $userIds = array_map('strval', [$employee->user_id]);
            $client = new Client();
            $response = $client->post('https://' . env('VITE_BEAMS_INSTANCE_ID') . '.pushnotifications.pusher.com/publish_api/v1/instances/' . env('VITE_BEAMS_INSTANCE_ID') . '/publishes/users', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('VITE_BEAMS_SECRET_KEY'),
                ],
                'json' =>
                [
                    'users' => $userIds,
                    'web' => [
                        'notification' => [
                            'title' => 'Permintaan Anda Ditolak',
                            'body' => 'Progress Pembuatan ' . $employee->bucket->name . ' Ditolak, silahkan perbaiki dan kirim ulang progress Anda',
                            'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                            'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER') . '?transaction-id=' . $employee->transaction->transaction_id . '&name=' . $employee->bucket->name,
                            // 'hide_notification_if_site_has_focus' => true
                        ],
                    ],
                ],
                'verify' => env('VITE_VERIFY_PUSHER_BEAMS')
            ]);

            $publishResponse = $response->getBody()->getContents();
            // -- untuk sisi development --

            // untuk sisi production
            // $beams = new PushNotifications([
            //     'instanceId' => env('VITE_BEAMS_INSTANCE_ID'),
            //     'secretKey' => env('VITE_BEAMS_SECRET_KEY'),
            // ]);

            // $publishResponse = $beams->publishToUsers(
            //     [$userIds],
            //     [
            //         'web' => [
            //             'notification' => [
            //                 'title' => 'Permintaan Anda Ditolak',
            // 'body' => 'Progress Pembuatan ' . $employee->bucket->name . ' Ditolak, silahkan perbaiki dan kirim ulang progress Anda',
            // 'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
            // 'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER') . '?transaction-id='. $employee->transaction->transaction_id . '&name='. $employee->bucket->name,
            // 'hide_notification_if_site_has_focus' => true
            //             ],
            //         ],
            //     ]
            // );
            Log::info('progress pesanan ditolak' . $publishResponse);

            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil di Reject'
            ]);
        } else {
            if ($request->statusEndProcess == false) {
                $update = OrderProgress::where('id', $request->progress_id)->update([
                    'status' => "accepted"
                ]);

                if (!$update) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Status gagal diupdate'
                    ]);
                }

                $notification = Notification::create([
                    'type' => 'message',
                    'order_id' => $request->order_id,
                    'sender_id' => Auth::user()->id,
                    'recipient_id' => $employee->user_id,
                    'data' => "Progress Pembuatan " . $employee->bucket->name . " Diterima, silahkan lanjukkan ke tahap selanjutnya",
                ]);

                NotificationProgress::dispatch($employee->user_id, [
                    'message' => 'Progress Pembuatan ' . $employee->bucket->name . ' (' . $employee->no_faktur . ') Diterima, silahkan lanjukkan ke tahap selanjutnya',
                ]);

                // untuk sisi development
                $userIds = array_map('strval', [$employee->user_id]);
                $user_customer = array_map('strval', [$employee->customer->user_id]);

                // dikirim ke employee
                $client = new Client();
                $response = $client->post('https://' . env('VITE_BEAMS_INSTANCE_ID') . '.pushnotifications.pusher.com/publish_api/v1/instances/' . env('VITE_BEAMS_INSTANCE_ID') . '/publishes/users', [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . env('VITE_BEAMS_SECRET_KEY'),
                    ],
                    'json' =>
                    [
                        'users' => $userIds,
                        'web' => [
                            'notification' => [
                                'title' => 'Permintaan Anda Diterima',
                                'body' => 'Progress Pembuatan ' . $employee->bucket->name . ' Diterima, silahkan lanjukkan ke tahap selanjutnya',
                                'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                                'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER') . '?transaction-id=' . $employee->transaction->transaction_id . '&name=' . $employee->bucket->name,
                                // 'hide_notification_if_site_has_focus' => true
                            ],
                        ],
                    ],
                    'verify' => env('VITE_VERIFY_PUSHER_BEAMS')
                ]);

                $publishResponse = $response->getBody()->getContents();
                // -- untuk sisi development --

                // untuk sisi production
                // $beams = new PushNotifications([
                //     'instanceId' => env('VITE_BEAMS_INSTANCE_ID'),
                //     'secretKey' => env('VITE_BEAMS_SECRET_KEY'),
                // ]);

                // $publishResponse = $beams->publishToUsers(
                //     [$userIds],
                //     [
                //         'web' => [
                //             'notification' => [
                //                 'title' => 'Permintaan Anda Diterima',
                // 'body' => 'Progress Pembuatan ' . $employee->bucket->name . ' Diterima, silahkan lanjukkan ke tahap selanjutnya',
                // 'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                // 'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER') . '?transaction-id='. $employee->transaction->transaction_id . '&name='. $employee->bucket->name,
                // 'hide_notification_if_site_has_focus' => true
                //             ],
                //         ],
                //     ]
                // );
                Log::info('progress pesanan diterima ke employee' . $publishResponse);
                // dikirim ke employee

                // dikirim ke customer
                $client = new Client();
                $response = $client->post('https://' . env('VITE_BEAMS_INSTANCE_ID') . '.pushnotifications.pusher.com/publish_api/v1/instances/' . env('VITE_BEAMS_INSTANCE_ID') . '/publishes/users', [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . env('VITE_BEAMS_SECRET_KEY'),
                    ],
                    'json' =>
                    [
                        'users' => $user_customer,
                        'web' => [
                            'notification' => [
                                'title' => $employee->bucket->name . ' Sedang Dibuat',
                                'body' => 'Silahkan cek progress pembuatan ' . $employee->bucket->name . ' disini',
                                'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                                'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER_CUSTOMER') . '?no-order=' . $request->order_id,
                                // 'hide_notification_if_site_has_focus' => true
                            ],
                        ],
                    ],
                    'verify' => env('VITE_VERIFY_PUSHER_BEAMS')
                ]);

                $publishResponse = $response->getBody()->getContents();
                // -- untuk sisi development --

                // untuk sisi production
                // $beams = new PushNotifications([
                //     'instanceId' => env('VITE_BEAMS_INSTANCE_ID'),
                //     'secretKey' => env('VITE_BEAMS_SECRET_KEY'),
                // ]);

                // $publishResponse = $beams->publishToUsers(
                //     [$user_customer],
                //     [
                //         'web' => [
                //             'notification' => [
                //                 'title' => $employee->bucket->name . ' Sedang Dibuat',
                // 'body' => 'Silahkan cek progress pembuatan ' . $employee->bucket->name . ' disini',
                // 'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                // 'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER_CUSTOMER') . '?no-order=' . $request->order_id,
                // 'hide_notification_if_site_has_focus' => true
                //             ],
                //         ],
                //     ]
                // );
                Log::info('progress pesanan diterima ke customer' . $publishResponse);
                // dikirim ke customer

                return response()->json([
                    'status' => 'success',
                    'message' => 'Berhasil di Accept'
                ]);
            } else {
                // fungsi ketika checklist end process di checklist

                // $order = OrderProgress::where('id', $request->progress_id)->first('order_id');
                $update = OrderProgress::where('id', $request->progress_id)->update([
                    'status' => "accepted"
                ]);

                $updateStatusOrder = Order::where('id', $request->order_id)->update([
                    'order_status' => "success"
                ]);

                if (!$update && !$updateStatusOrder) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Status gagal diupdate'
                    ]);
                }

                // push notifikasi ke email pembeli
                $url = env('VITE_REDIRECT_URL_PROGRESS_ORDER_CUSTOMER') . '?no-order=' . $request->order_id;
                $tes = FacadesNotification::route('mail', $employee->customer->user->email)->notify(new FinishOrderEmailNotification($employee, $url));

                // $request->order_id->notify((new FinishOrderEmailNotification()));

                $notification = Notification::create([
                    'type' => 'message',
                    'order_id' => $request->order_id,
                    'sender_id' => Auth::user()->id,
                    'recipient_id' => $employee->user_id,
                    'data' => "Progress Pembuatan " . $employee->bucket->name . " telah selesai",
                ]);

                NotificationProgress::dispatch($employee->user_id, [
                    'message' => 'Progress Pembuatan ' . $employee->bucket->name . ' (' . $employee->no_faktur . ') telah selesai',
                ]);

                // untuk sisi development
                $user_employee = array_map('strval', [$employee->user_id]);
                $user_customer = array_map('strval', [$employee->customer->user_id]);
                // dikirim ke employee
                $client = new Client();
                $response = $client->post('https://' . env('VITE_BEAMS_INSTANCE_ID') . '.pushnotifications.pusher.com/publish_api/v1/instances/' . env('VITE_BEAMS_INSTANCE_ID') . '/publishes/users', [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . env('VITE_BEAMS_SECRET_KEY'),
                    ],
                    'json' =>
                    [
                        'users' => $user_employee,
                        'web' => [
                            'notification' => [
                                'title' => $employee->bucket->name . ' Selesai',
                                'body' => 'Progress Pembuatan ' . $employee->bucket->name . ' telah selesai',
                                'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                                'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER') . '?transaction-id=' . $employee->transaction->transaction_id . '&name=' . $employee->bucket->name,
                                // 'hide_notification_if_site_has_focus' => true
                            ],
                        ],
                    ],
                    'verify' => env('VITE_VERIFY_PUSHER_BEAMS')
                ]);

                $publishResponse = $response->getBody()->getContents();
                // -- untuk sisi development --

                // untuk sisi production
                // $beams = new PushNotifications([
                //     'instanceId' => env('VITE_BEAMS_INSTANCE_ID'),
                //     'secretKey' => env('VITE_BEAMS_SECRET_KEY'),
                // ]);

                // $publishResponse = $beams->publishToUsers(
                //     [$employee->user_id, $employee->customer->user_id],
                //     [
                //         'web' => [
                //             'notification' => [
                //                 'title' => $employee->bucket->name . ' Selesai',
                // 'body' => 'Progress Pembuatan ' . $employee->bucket->name . ' telah selesai',
                // 'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                // 'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER') . '?transaction-id=' . $employee->transaction->transaction_id . '&name=' . $employee->bucket->name,
                // 'hide_notification_if_site_has_focus' => true
                //             ],
                //         ],
                //     ]
                // );
                Log::info('pusher to employee' . $publishResponse);
                // dikirim ke employee

                // dikirim ke customer
                $client = new Client();
                $response = $client->post('https://' . env('VITE_BEAMS_INSTANCE_ID') . '.pushnotifications.pusher.com/publish_api/v1/instances/' . env('VITE_BEAMS_INSTANCE_ID') . '/publishes/users', [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . env('VITE_BEAMS_SECRET_KEY'),
                    ],
                    'json' =>
                    [
                        'users' => $user_customer,
                        'web' => [
                            'notification' => [
                                'title' => $employee->bucket->name . ' Selesai Dibuat',
                                'body' => 'Silahkan cek progress pembuatan ' . $employee->bucket->name . ' disini',
                                'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                                'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER_CUSTOMER') . '?no-order=' . $request->order_id,
                                // 'hide_notification_if_site_has_focus' => true
                            ],
                        ],
                    ],
                    'verify' => env('VITE_VERIFY_PUSHER_BEAMS')
                ]);

                $publishResponse = $response->getBody()->getContents();
                // -- untuk sisi development --

                // untuk sisi production
                // $beams = new PushNotifications([
                //     'instanceId' => env('VITE_BEAMS_INSTANCE_ID'),
                //     'secretKey' => env('VITE_BEAMS_SECRET_KEY'),
                // ]);

                // $publishResponse = $beams->publishToUsers(
                //     [$user_customer],
                //     [
                //         'web' => [
                //             'notification' => [
                //                 'title' => $employee->bucket->name . ' Selesai Dibuat',
                // 'body' => 'Silahkan cek progress pembuatan ' . $employee->bucket->name . ' disini',
                // 'icon' => env('VITE_LOGO_PUSHER_NOTIFICATIONS'),
                // 'deep_link' => env('VITE_REDIRECT_URL_PROGRESS_ORDER_CUSTOMER') . '?no-order=' . $request->order_id,
                // 'hide_notification_if_site_has_focus' => true
                //             ],
                //         ],
                //     ]
                // );
                Log::info('pusher to customer' . $publishResponse);
                // dikirim ke customer

                return response()->json([
                    'status' => 'success',
                    'message' => 'Berhasil di Accept dan Mengakhiri Proses Pembuatan Buket'
                ]);
            }
        }

        // dd($request);
    }

    public function publishToUser(Request $request)
    {
        // $t = array_map('strval', [$request->user_id]);
        // dd($request->userId);
        // dd($request->user_id);
        $userID = $request->user_id;
        $beamsClient = new PushNotifications([
            'instanceId' => env('VITE_BEAMS_INSTANCE_ID'),
            'secretKey' => env('VITE_BEAMS_SECRET_KEY'),
        ]);
        $beamsToken = $beamsClient->generateToken($userID);
        Log::info($beamsToken);
        return response()->json($beamsToken);
    }
}
