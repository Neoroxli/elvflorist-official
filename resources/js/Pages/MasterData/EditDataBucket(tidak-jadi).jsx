import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, useForm } from "@inertiajs/react";
import { Card, Form, Input } from 'antd';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';

import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useState } from 'react';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function EditDataBucket({ getDataBucket }) {

    // const [image, setImage] = useState(getDataBucket.foto);

    const[data, setData]  = useState({
        name: getDataBucket?.name,
        harga: getDataBucket?.harga,
        description: getDataBucket?.description,
        foto: getDataBucket?.foto,
        recomended: getDataBucket?.recomended,
    })

    console.log(data);


    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ubah Data Bucket" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Ubah Data Bucket"}
                segment1={"Elv-Florist"}
                segment2={"Master Data"}
                segment3={"Ubah Data Bucket"}
                url={"/master-data/data-bucket"}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <Card
                        title="Form Ubah Data Bucket"
                        style={{ fontFamily: "GT Walsheim Pro" }}
                    >
                        <div className="flex flex-col gap-3">
                            <div>
                                <InputLabel htmlFor="name_bucket" className="block mb-2">Nama Bucket <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="name_bucket" name="name_bucket" className="form-input" value={data.name} isFocused={true}
                                    placeholder="Masukan Nama Bucket" onChange={(e) => setData({...data, name: e.target.value})} />

                                {/* <InputError message={errors.name_bucket} className="mt-1" style={{ fontSize: "12px" }} /> */}
                            </div>
                            <div>
                                <InputLabel htmlFor="harga" className="block mb-2">Harga Bucket <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="harga" name="harga" className="form-input"
                                    value={formatCurrency(data.harga)} onChange={(e) => setData({...data, harga: e.target.value.replace(/[^0-9]/g, '')})}
                                    placeholder="Masukan Harga (contoh: 100000, tanpa tanda titik)" />

                                {/* <InputError message={errors.harga} className="mt-1" style={{ fontSize: "12px" }} /> */}
                            </div>
                            <div>
                                <InputLabel htmlFor="deskripsi" className="block mb-2">Deskripsi Produk <span className="text-gray-400">(optional)</span></InputLabel>
                                {/* <textarea className="form-input" name="" id=""></textarea> */}
                                <div>
                                    {/* <div ref={quillRef} /> */}

                                    <ReactQuill theme="bubble" value={data.description} onChange={(value) => setData({...data, description: value})} />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="image" className="block mb-2">Gambar Produk <span className="text-red-500">*</span></InputLabel>
                                <FilePond
                                    files={data.foto ? [import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + data.foto] : []}
                                    onupdatefiles={fileItems => (
                                        setData({...data, foto: fileItems.length ? fileItems[0].file : null})
                                    )}
                                    // onupdatefiles={setImage}
                                    allowMultiple={false}
                                    maxFiles={3}
                                    // server="/api"
                                    // maxFileSize="1MB"
                                    name="image"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                    credits
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="recomended" className="block mb-2">Rekomendasi Produk <span className="text-gray-400">(optional)</span></InputLabel>
                                <TextInput type="text" id="recomended" name="recomended"
                                    className="form-input" placeholder="contoh: Valentine, Yudisium / Wisuda, Anniversary, dll"
                                    value={data.recomended}
                                    onChange={(e) => setData({...data, recomended: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-9">
                            {/* {
                                resetPassword &&
                                <div className="p-2 text-sm rounded-md bg-success/25 text-success" role="alert">{resetPassword}</div>
                            } */}
                            <span className="text-red-500" style={{ position: "absolute", left: "20px" }}>*) Wajib diisi</span>
                            <button type="button" className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white"
                            // onClick={() => [setEditModal2Open(false), setDataBucket({
                            //     id: '',
                            //     name: '',
                            //     harga: '',
                            //     description: '',
                            //     foto: null,
                            //     recomended: '',
                            // })]}
                            >Tutup</button>
                            <button type="submit" className="btn bg-primary/25 text-primary hover:bg-primary hover:text-white">Simpan</button>
                        </div>
                    </Card>
                </div>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
