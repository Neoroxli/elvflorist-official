<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Models\Bucket;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class DataBucketController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('MasterData/DataBucket', [
            'buckets' => Bucket::all()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name_bucket' => 'required|unique:buckets,name',
            'harga' => 'required|numeric',
            'image' => 'required|mimes:png,jpg,jpeg|max:1024'
        ], [
            'required' => 'Kolom tidak boleh kosong !',
            'image.required' => 'Gambar tidak boleh kosong !',
            'numeric' => 'Harus berupa angka !',
            'max' => 'Ukuran Maks 1 Mb !',
            'mimes' => 'Format gambar harus png, jpg, jpeg !',
            'unique' => 'Nama bucket sudah terdaftar'
        ]);

        if ($request->file('image')) {
            $image = Http::attach('attachment', file_get_contents($request->file('image')), $request->file('image')->getClientOriginalName())
                ->post(env('VITE_IP_FILE_STORAGE') . '/api/file-upload', [
                    'folder' => Str::snake(env('APP_NAME'), '-')
                ]);

            $data_image = $image->object();

            $simpan = Bucket::create([
                'slug' => Str::of($request->name_bucket)->slug('-'),
                'name' => $request->name_bucket,
                'harga' => $request->harga,
                'description' => ($request->deskripsi == null || $request->deskripsi == '<p><br></p>') ? null : $request->deskripsi,
                'recomended' => $request->recomended,
                'foto' => $data_image->data->name_encryp
            ]);
        }

        if (!$simpan) {
            return back()->with('error', 'Data gagal ditambahkan');
        }

        return back()->with('success', 'Data berhasil ditambahkan');
    }

    // untuk modal
    public function edit($id)
    {
        try {
            $data = Bucket::where('id', $id)->first();

            return response()->json([
                'data' => $data,
                'status' => 'success'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'data' => null,
                'status' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }
    }
    // untuk modal

    // public function edit($id)
    // {
    //     $data = Bucket::where('id', $id)->first();
    //     return Inertia::render('MasterData/EditDataBucket', [
    //         'getDataBucket' => $data
    //     ]);
    // }

    public function update(Request $request)
    {
        $rules = [
            // 'name' => 'required',
            'harga' => 'required|numeric',
            // 'foto' => 'required|max:1024'
        ];

        $message = [
            'required' => 'Kolom tidak boleh kosong !',
            'foto.required' => 'Gambar tidak boleh kosong !',
            'numeric' => 'Harus berupa angka !',
            'max' => 'Ukuran Maks 1 Mb !',
            'mimes' => 'Format gambar harus png, jpg, jpeg !',
            'unique' => 'Nama bucket sudah terdaftar'
        ];

        if ($request->file('foto')) {
            $rules['foto'] = 'required|mimes:png,jpg,jpeg|max:1024';
        }

        $data = Bucket::where('id', $request->id)->first();

        if ($request->name != $data->name) {
            $rules['name'] = 'required|unique:buckets,name';
        }

        $validate = $request->validate($rules, $message);

        if ($request->file('foto')) {
            $image = Http::attach('attachment', file_get_contents($request->file('foto')), $request->file('foto')->getClientOriginalName())
                ->post(env('VITE_IP_FILE_STORAGE') . '/api/file-upload/update', [
                    'name' => $data->foto
                ]);
            $data_image = $image->object();
            $foto = $data_image->data->name_encryp;

            $update = Bucket::where('id', $request->id)->update([
                'slug' => Str::of($request->name)->slug('-'),
                'name' => $request->name,
                'harga' => $request->harga,
                'description' => ($request->description == null || $request->description == '<p><br></p>') ? null : $request->description,
                'recomended' => $request->recomended,
                'foto' => $foto
            ]);
        } else {
            $update = Bucket::where('id', $request->id)->update([
                'slug' => Str::of($request->name)->slug('-'),
                'name' => $request->name,
                'harga' => $request->harga,
                'description' => ($request->description == null || $request->description == '<p><br></p>') ? null : $request->description,
                'recomended' => $request->recomended,
            ]);
        }

        if (!$update) {
            return back()->with('error', 'Data gagal diubah');
        }
        return back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id): RedirectResponse
    {
        $data = Bucket::where('id', $id)->first();
        $delete = Bucket::where('id', $id)->delete();

        //untuk menghapus file gambar yang ada di folder4
        if ($data->trashed()) {
            Http::post(env('VITE_IP_FILE_STORAGE') . '/api/file-upload/delete', [
                'name' => $data->foto
            ]);
        }

        if (!$delete) {
            return back()->with('error', 'Data gagal dihapus');
        }

        return back()->with('success', 'Data berhasil dihapus');
    }

    // data item
    public function getDataItem(): Response
    {
        $dataItem = Item::all();

        return Inertia::render('MasterData/DataItem', [
            'items' => $dataItem,
        ]);
    }

    public function storeDataItem(Request $request): RedirectResponse
    {
        $request->validate([
            'name_item' => 'required|string',
            'price' => 'required|numeric'
        ], [
            'required' => 'Kolom wajib diisi',
            'numeric' => 'Kolom wajib angka'
        ]);

        try {
            $simpan = Item::create([
                'name' => $request->name_item,
                'price' => $request->price,
            ]);

            if (!$simpan) {
                return back()->with('error', 'Data gagal ditambahkan');
            }

            return back()->with('success', 'Data berhasil ditambahkan');
        } catch (\Throwable $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function editDataItem($id)
    {
        try {
            $getItem = Item::where('id', $id)->first();

            return response()->json([
                'data' => $getItem,
                'status' => 'success',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'data' => null,
                'status' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function updateDataItem(Request $request): RedirectResponse
    {
        $request->validate([
            'name_edit' => 'required|string',
            'price_edit' => 'required|numeric',
        ], [
            'required' => 'Kolom wajib diisi',
            'numeric' => 'Kolom wajib angka'
        ]);

        $update = Item::where('id', $request->id)->update([
            'name' => $request->name_edit,
            'price' => $request->price_edit,
        ]);

        if (!$update) {
            return back()->with('error', 'Data gagal diubah');
        }

        return back()->with('success', 'Data berhasil diubah');
    }

    public function deleteDataItem($id): RedirectResponse
    {
        $delete = Item::where('id', $id)->delete();

        if (!$delete) {
            return back()->with('error', 'Data gagal dihapus');
        }

        return back()->with('success', 'Data berhasil dihapus');
    }
}
