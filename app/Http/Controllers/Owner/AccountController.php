<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Owner/Account', [
            'accounts' => User::where('role_id', "1")->orWhere('role_id', "4")->orderBy('id', 'asc')->get(),
            'totalAdmin' => User::where('role_id', "1")->count(),
            'totalEmployee' => User::where('role_id', "4")->count()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|lowercase|email|unique:' . User::class,
            'role' => 'required',
        ], [
            'required' => 'Kolom tidak boleh kosong !',
            'role.required' => 'Level pengguna harus dipilih !',
            'email.unique' => 'Email ini sudah terdaftar !',
            'lowercase' => 'Email harus huruf kecil !',
            'email' => 'Kolom ini harus bertipe email !'
        ]);

        $simpan = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('12345678'),
            'role_id' => $request->role == "admin" ? 1 : 4,
            'status_akun' => "aktif"
        ])->assignRole($request->role == 'admin' ? 'admin' : 'pekerja');

        if (!$simpan) {
            return back()->with('error', 'Data gagal ditambahkan');
        }

        return back()->with('success', 'Data akun berhasil dibuat');
    }

    public function edit($id)
    {
        $data = User::where('id', $id)->first(['id', 'name', 'email']);

        return [
            'data' => $data,
            'message' => 'success',
        ];
    }

    public function update(Request $request): RedirectResponse
    {
        $user = User::where('id', $request->id)->first('email');

        $rules = [
            'name' => 'required|string',
        ];

        if ($user->email != $request->email) {
            $rules['email'] = 'required|string|email|lowercase|unique:users,email';
        }

        $message = [
            'required' => 'Kolom tidak boleh kosong !',
            'email.unique' => 'Email ini sudah terdaftar !',
            'lowercase' => 'Email harus huruf kecil !',
            'email' => 'Kolom ini harus bertipe email !'
        ];

        $validate = $request->validate($rules, $message);

        $update = User::where('id', $request->id)->update($validate);

        if (!$update) {
            return back()->with('error', 'Data gagal diubah');
        }

        return back()->with('success', 'Data berhasil diubah');
    }

    public function changeStatus(Request $request): RedirectResponse
    {
        $ubahStatus = User::where('id', $request->id)->update([
            'status_akun' => $request->status == "aktif" ? "non_aktif" : "aktif"
        ]);

        if (!$ubahStatus) {
            return back()->with('error', 'Status akun gagal diubah !');
        }

        return back()->with('success', 'Status akun berhasil diubah !');
    }

    public function resetPassword(Request $request): RedirectResponse
    {
        $reset = User::where('id', $request->data)->update([
            'password' => Hash::make('12345678'),
        ]);

        if (!$reset) {
            return back()->with('error', 'Reset Password gagal dilakukan');
        }

        return back()->with('success', 'Password berhasil direset');
    }
}
