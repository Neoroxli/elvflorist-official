<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MasterData\DataBucketController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Owner\AccountController;
use App\Http\Controllers\Owner\CheckOrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Report\OrderReportController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Pusher\PushNotifications\PushNotifications;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);


    return redirect('/login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard/periode', [DashboardController::class, 'show'])->middleware(['auth', 'verified'])->name('dashboard.periode');
Route::get('/dashboard/employee', [DashboardController::class, 'show_employee'])->middleware(['auth', 'verified'])->name('dashboard.employee');

Route::middleware('auth')->group(function () {

    Route::get('/order-report', [OrderReportController::class, 'index'])->name('order-report.index');
    Route::get('/show-report', [OrderReportController::class, 'showReport'])->name('order-report.show');

    Route::get('/cetak_pdf', [OrderReportController::class, 'cetak'])->name('order-report.cetak');
    Route::get('/download-report', [OrderReportController::class, 'download'])->name('order-report.download');

    Route::middleware(['role:admin'])->group(function () {

        Route::get('/master-data/data-bucket', [DataBucketController::class, 'index'])->name('master-data.data-bucket');
        Route::post('/master-data/data-bucket', [DataBucketController::class, 'store'])->name('master-data.data-bucket.store');
        Route::get('/master-data/data-bucket/{id}', [DataBucketController::class, 'edit'])->name('master-data.data-bucket.edit');
        // Route::get('/master-data/data-bucket/edit/{id}', [DataBucketController::class, 'edit'])->name('master-data.data-bucket.edit');
        Route::post('/master-data/data-bucket/update', [DataBucketController::class, 'update'])->name('master-data.data-bucket.update');
        Route::delete('/master-data/data-bucket/{id}', [DataBucketController::class, 'delete'])->name('master-data.data-bucket.delete');

        // data item
        Route::get('/master-data/data-item', [DataBucketController::class, 'getDataItem'])->name('master-data.data-item');
        Route::post('/master-data/data-item/store', [DataBucketController::class, 'storeDataItem'])->name('master-data.data-item.store');
        Route::get('/master-data/data-item/{id}', [DataBucketController::class, 'editDataItem'])->name('master-data.data-item.edit');
        Route::post('/master-data/data-item/update', [DataBucketController::class, 'updateDataItem'])->name('master-data.data-item.update');
        Route::delete('/master-data/data-item/{id}', [DataBucketController::class, 'deleteDataItem'])->name('master-data.data-item.delete');

        // data pembeli
        Route::get('/order/customer', [OrderController::class, 'getDataCustomer'])->name('order.customer');
        Route::get('/order/customer/{customer_id}', [OrderController::class, 'getDataCustomerTransaction'])->name('order.customer.transaction');
        Route::get('/download-data-customer', [OrderController::class, 'download_customer'])->name('order.customer.download');

        // data pesanan
        Route::get('/order', [OrderController::class, 'index'])->name('order.index');
        Route::get('/order/progress', [OrderController::class, 'getDataProgress'])->name('order.progress');

        Route::get('/chat', [MessageController::class, 'index'])->name('chat.index');

        // Route::get('/order/invoice/{order_id}', [OrderController::class, 'invoice'])->name('order.invoice');
        Route::get('/order/invoice', [OrderController::class, 'invoice'])->name('order.invoice');

        // Route::get('/order-report', [OrderReportController::class, 'index'])->name('order-report.index');
        // Route::get('/show-report', [OrderReportController::class, 'showReport'])->name('order-report.show');

        // Route::get('/cetak_pdf', [OrderReportController::class, 'cetak'])->name('order-report.cetak');
        // Route::get('/download-report', [OrderReportController::class, 'download'])->name('order-report.download');
    });

    Route::middleware(['role:pemilik'])->group(function () {
        // Route::get('/master-data/data-bucket', [DataBucketController::class, 'index'])->name('master-data.data-bucket');
        // Route::post('/master-data/data-bucket', [DataBucketController::class, 'store'])->name('master-data.data-bucket.store');
        // Route::get('/master-data/data-bucket/{id}', [DataBucketController::class, 'edit'])->name('master-data.data-bucket.edit');
        // Route::post('/master-data/data-bucket/update', [DataBucketController::class, 'update'])->name('master-data.data-bucket.update');
        // Route::delete('/master-data/data-bucket/{id}', [DataBucketController::class, 'delete'])->name('master-data.data-bucket.delete');

        // pusher beams publishToUser
        Route::get('/pusher/beams-auth', [CheckOrderController::class, 'publishToUser'])->name('pusher.beams-auth');

        // pesanan
        Route::get('/order-check', [CheckOrderController::class, 'index'])->name('checkOrder.index');
        Route::get('/order-check/show-progress', [CheckOrderController::class, 'showProgress'])->name('checkOrder.show-progress');
        Route::post('/order-check/update-progress', [CheckOrderController::class, 'updateProgress'])->name('checkOrder.update-progress');

        Route::get('/account', [AccountController::class, 'index'])->name('account.index');
        Route::post('/account', [AccountController::class, 'store'])->name('account.store');
        Route::get('/account/{id}', [AccountController::class, 'edit'])->name('account.edit');
        Route::post('/account/update', [AccountController::class, 'update'])->name('account.update');
        Route::post('/account/change-status', [AccountController::class, 'changeStatus'])->name('account.change-status');
        Route::post('/account/reset-password', [AccountController::class, 'resetPassword'])->name('account.reset-password');

        // notifikasi
        Route::get('/notification', [NotificationController::class, 'index'])->name('notification');
        Route::post('/notification/read', [NotificationController::class, 'notifRead'])->name('notification.read');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
