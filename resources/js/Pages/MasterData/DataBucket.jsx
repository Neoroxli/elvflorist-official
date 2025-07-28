import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from 'react';
import { Button, Image, Modal, Table, Input, message, Spin } from 'antd';
const { Column, ColumnGroup } = Table;
const { Search } = Input;
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import InputError from '@/Components/InputError';
import { Grid } from 'gridjs-react';
import { className, h } from 'gridjs';
import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const modalStyles = {
    footer: {
        display: "none",
    }
};

export default function DataBucket({ buckets }) {

    //untuk membuka modal tambah
    const [modal2Open, setModal2Open] = useState(false);
    // untuk menampilkan tabel gridjs
    const wrapperRef = useRef(null);
    //----//

    const [stateDataFilter, setStateDataFilter] = useState(buckets);
    const [value, setValue] = useState('');

    // var config = {
    //     "modules": {
    //         "toolbar": true
    //         // [
    //         //     'bold', 'italic', 'underline', 'strike',
    //         //     'align', 'list', 'indent',
    //         //     'size', 'header',
    //         //     'link',
    //         //     'color',
    //         //   ]
    //     }
    // };
    // // untuk inputan deskripsi
    // const { quill, quillRef } = useQuill(config);
    // //----//

    // // untuk inputan ubah deskripsi
    // const { editor, editorRef } = useQuill(config);
    //----//

    // untuk mengedit data
    const [editModal2Open, setEditModal2Open] = useState(false);
    const [dataBucket, setDataBucket] = useState({
        id: '',
        name: '',
        harga: '',
        description: '',
        foto: null,
        recomended: '',
    })
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    //----//


    const { data, setData, post, errors, delete: destroy, processing, reset } = useForm({
        name_bucket: '',
        harga: '',
        deskripsi: '',
        recomended: '',
        image: '',
    })


    const submit = (e) => {
        e.preventDefault();

        post(route('master-data.data-bucket.store'), {
            onSuccess: (e) => {
                if (e.props.flash.success) {
                    reset('name_bucket', 'harga', 'deskripsi', 'recomended', 'image')
                    setModal2Open(false)
                    Swal.fire({
                        title: "Good job!",
                        text: e.props.flash.success,
                        icon: "success",
                        // showCancelButton: !0,
                        confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
                        cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })

                    router.get('/master-data/data-bucket');
                } else {
                    Swal.fire({
                        title: "Oops...",
                        text: e.props.flash.error,
                        icon: "error",
                        confirmButtonClass: "btn bg-primary text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })
                }

            }
            // error di matikan karna fungsinya untuk debugging
            // onError: (error) => {
            //     console.log(error);
            // }
        });
    }


    const error = usePage().props.errors;
    // handle edit
    const handleEdit = async (id) => {

        setLoadingEdit(true)
        try {
            const response = await fetch(`/master-data/data-bucket/${id}`);
            const getBucket = await response.json();

            if (getBucket.status == "success") {
                setDataBucket({
                    id: getBucket.data.id,
                    name: getBucket.data.name,
                    harga: getBucket.data.harga,
                    description: getBucket.data.description,
                    foto: getBucket.data.foto,
                    recomended: getBucket.data.recomended,
                });
                setEditModal2Open(true)
            } else {
                message.info(getBucket.message)
            }
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoadingEdit(false)
        }

    }

    // submit untuk ubah data
    const submitUbah = (e) => {
        e.preventDefault();

        setLoadingUpdate(true)
        router.post(`/master-data/data-bucket/update`, dataBucket, {
            onSuccess: (e) => {
                if (e.props.flash.success) {
                    setEditModal2Open(false)
                    Swal.fire({
                        title: "Good job!",
                        text: e.props.flash.success,
                        icon: "success",
                        // showCancelButton: !0,
                        confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
                        cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })

                    router.get('/master-data/data-bucket');
                } else {
                    Swal.fire({
                        title: "Oops...",
                        text: e.props.flash.error,
                        icon: "error",
                        confirmButtonClass: "btn bg-primary text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })
                }

            },
            // error di matikan karna fungsinya untuk debugging
            // onError: (error) => {
            //     console.log('error', error);
            // }
            onFinish: () => {
                setLoadingUpdate(false)
            }
        });

    }

    // handle delete
    const handleDelete = (id) => {

        Swal.fire({
            title: "Apakah Anda Yakin ?",
            text: "Data tidak akan bisa dikembalikan!",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Tidak, batalkan!",
            confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
            cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !1
        }).then(function (t) {
            t.value && destroy(route('master-data.data-bucket.delete', id), {
                onSuccess: (e) => {
                    if (e.props.flash.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Dihapus!",
                            text: e.props.flash.success,
                            confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
                            cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
                            buttonsStyling: !1,
                            showCloseButton: !1
                        });
                    } else {
                        Swal.fire({
                            title: "Gagal!",
                            text: e.props.flash.error,
                            icon: "error",
                            confirmButtonClass: "btn bg-primary text-white w-xs mt-2",
                            buttonsStyling: !1,
                            showCloseButton: !1
                        });
                    }

                    router.get('/master-data/data-bucket');
                },
                onError: (error) => {
                    console.log(error);
                }
            })
        })
    }

    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    // untuk menampilkan data
    // const grid = new gridjs.Grid({
    //     columns: [
    //         {
    //             name: "Gambar",
    //             width: "150px",
    //             sort: false,
    //         },
    //         {
    //             name: "Nama",
    //             width: "100px",
    //         },
    //         {
    //             name: "Harga",
    //             width: "100px",
    //         },
    //         {
    //             name: "Deskripsi",
    //             width: "300px",
    //         },
    //         {
    //             name: "Rekomendasi Produk",
    //             width: "200px",
    //         },
    //         {
    //             name: "Aksi",
    //             width: "100px",
    //         },
    //     ],
    //     pagination: { limit: 5 },
    //     sort: !0,
    //     search: !0,
    //     data: function () {
    //         return new Promise(function (e) {
    //             setTimeout(function () {
    //                 e(
    //                     buckets.map(bucket =>
    //                         [
    //                             gridjs.html(`<a href="#" class="img-bucket"><Image src='${import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + bucket?.foto}' class=' h-32 w-32 rounded-xl' loading='lazy' alt='Image Description' /></a>`),
    //                             `${bucket.name}`,
    //                             `${formatCurrency(bucket.harga)}`,
    //                             gridjs.html(`${bucket.description ?? '-'}`),
    //                             `${bucket.recomended ?? '-'}`,
    //                             [
    //                                 h('button', {
    //                                     className: 'btn bg-warning/25 text-warning hover:bg-warning hover:text-white mb-4 me-3',
    //                                     onClick: () => handleEdit(bucket.id),
    //                                     children: 'Ubah'
    //                                 }),
    //                                 h('button', {
    //                                     className: 'btn bg-danger/25 text-danger hover:bg-danger hover:text-white mb-4',
    //                                     onClick: () => handleDelete(bucket.id),
    //                                     children: 'Hapus'
    //                                 })
    //                             ]
    //                         ]
    //                     ),
    //                 );
    //             }, 1e3);
    //         });
    //     },
    //     resizable: true,

    // });

    const dataBucketLoop = buckets.map((bucket, i) => (
        {
            key: bucket.id,
            no: i + 1,
            image: <Image src={import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + bucket?.foto} className='rounded-xl' width={100} loading='lazy' alt='Image Description' />,
            produkName: bucket.name,
            price: formatCurrency(bucket.harga),
            description: <div dangerouslySetInnerHTML={{ __html: bucket.description ?? '-' }} />,
            recomended: bucket.recomended ?? '-',
            action: <div>
                <Button className='mb-4 btn bg-warning/25 text-warning hover:bg-warning hover:text-white me-3' onClick={() => handleEdit(bucket.id)}>Ubah</Button>
                {/* <Link href={route('master-data.data-bucket.edit', bucket.id)} className='mb-4 btn bg-warning/25 text-warning hover:bg-warning hover:text-white me-3'>Ubah</Link> */}
                <Button className='mb-4 btn bg-danger/25 text-danger hover:bg-danger hover:text-white' onClick={() => handleDelete(bucket.id)}>Hapus</Button>
            </div>
        }
    ))

    const dataBucketLoopFilter = stateDataFilter.map((bucket, i) => (
        {
            key: bucket.id,
            no: i + 1,
            image: <Image src={import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + bucket?.foto} className='rounded-xl' loading='lazy' alt='Image Description' />,
            produkName: bucket.name,
            price: formatCurrency(bucket.harga),
            description: <div dangerouslySetInnerHTML={{ __html: bucket.description ?? '-' }} />,
            recomended: bucket.recomended ?? '-',
            action: <div>
                <Button className='mb-4 btn bg-warning/25 text-warning hover:bg-warning hover:text-white me-3' onClick={() => handleEdit(bucket.id)}>Ubah</Button>
                {/* <Link href={route('master-data.data-bucket.edit', bucket.id)} className='mb-4 btn bg-warning/25 text-warning hover:bg-warning hover:text-white me-3'>Ubah</Link> */}
                <Button className='mb-4 btn bg-danger/25 text-danger hover:bg-danger hover:text-white' onClick={() => handleDelete(bucket.id)}>Hapus</Button>
            </div>
        }
    ))

    // useEffect(() => {
    //     if (wrapperRef.current) {
    //         wrapperRef.current.innerHTML = ''; // Kosongkan isi container jika sudah ada
    //     }
    //     grid.render(wrapperRef.current);
    // }, []);
    // end untuk menampilkan data


    // untuk preview image
    function previewImages(e) {
        setData('image', e.target.files[0])

        const image = document.querySelector('#image');
        const imgPreview = document.querySelector('.img-preview');

        imgPreview.style.display = 'block';
        imgPreview.style.width = '100px';

        const oFReader = new FileReader();
        oFReader.readAsDataURL(image.files[0]);

        oFReader.onload = function (oFREvent) {
            imgPreview.src = oFREvent.target.result;
        }
    }

    // untuk preview image edit
    function previewImagesEdit(e) {
        setDataBucket({ ...dataBucket, foto: e.target.files[0] })

        const image = document.querySelector('#imageEdit');
        const imgPreview = document.querySelector('.img-preview-edit');

        imgPreview.style.display = 'block';
        imgPreview.style.width = '100px';

        const oFReader = new FileReader();
        oFReader.readAsDataURL(image.files[0]);

        oFReader.onload = function (oFREvent) {
            imgPreview.src = oFREvent.target.result;
        }
    }

    const style = {
        height: "100px",
        width: "100px",
        borderWidth: "2px",
        borderStyle: "dashed",
        borderRadius: "0.375rem",
        position: "relative",

        contentBefore: "tes"
    }
    // end untuk preview image

    return (
        <AuthenticatedLayout>
            <Head title="Data Bucket" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Data Bucket"}
                segment1={"Elv-Florist"}
                segment2={"Master Data"}
                segment3={"Data Bucket"}
                url={"/master-data/data-bucket"}
            >
                <PrimaryButton className="mb-4 btn bg-info/25 text-info hover:bg-info hover:text-white" onClick={() => setModal2Open(true)}>Tambah</PrimaryButton>

                <Spin size="large" spinning={loadingEdit} tip="Sedang memuat data..." fullscreen />
                {/* <div className="grid gap-6 lg:grid-cols-4"> */}
                <div className="flex flex-col gap-6">
                    <div className="card">
                        <div className="p-6">

                            {/* <div id="table-loading-state" ref={wrapperRef}></div> */}

                            <Search className="mb-3"
                                value={value}
                                onChange={e => {
                                    const currValue = e.target.value.toLocaleLowerCase();
                                    setValue(currValue);
                                    const filteredData = buckets.filter(entry =>
                                        entry?.name.toLocaleLowerCase().includes(currValue) || entry.harga.toLocaleLowerCase().includes(currValue)
                                    );

                                    setStateDataFilter(filteredData);
                                }}
                                placeholder="Cari Nama Produk atau Harga"
                                allowClear
                                style={{ width: 300 }}
                            />
                            <Table dataSource={value == '' ? dataBucketLoop : dataBucketLoopFilter} pagination={{ pageSize: 5 }} scroll={{ x: 1000 }} bordered className="rounded table-striped">
                                <Column title="No" dataIndex="no" key="no" />
                                <Column title="Gambar" dataIndex="image" key="image" />
                                <Column title="Nama Produk" dataIndex="produkName" key="produkName" />
                                <Column title="Harga" dataIndex="price" key="price" />
                                <Column title="Deskripsi" dataIndex="description" key="description" />
                                <Column title="Rekomendasi Produk" dataIndex="recomended" key="recomended" />
                                <Column
                                    title="Action"
                                    dataIndex="action"
                                    key="action"
                                />
                            </Table>
                            <span className="">Total : {stateDataFilter.length} Data</span>
                        </div>
                    </div>

                </div>

                {/* modal tambah data */}
                <Modal
                    title={`Tambah Data Bucket`}
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                    styles={modalStyles}
                >
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-3 mt-5">
                            <div>
                                <InputLabel htmlFor="name_bucket" className="block mb-2">Nama Bucket <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="name_bucket" name="name_bucket" className="form-input" value={data.name_bucket} onChange={(e) => setData('name_bucket', e.target.value)} isFocused={true}
                                    placeholder="Masukan Nama Bucket" />

                                <InputError message={errors.name_bucket} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            <div>
                                <InputLabel htmlFor="harga" className="block mb-2">Harga Bucket <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="harga" name="harga" className="form-input"
                                    value={formatCurrency(data.harga)} onChange={(e) => setData('harga', e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="Masukan Harga (contoh: 100000, tanpa tanda titik)" />

                                <InputError message={errors.harga} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            <div>
                                <InputLabel htmlFor="deskripsi" className="block mb-2">Deskripsi Produk <span className="text-gray-400">(optional)</span></InputLabel>
                                {/* <textarea className="form-input" name="" id=""></textarea> */}
                                <div>
                                    {/* <div ref={quillRef} /> */}

                                    <ReactQuill theme="bubble" value={data.deskripsi} onChange={(e) => setData('deskripsi', e)} />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="image" className="block mb-2">Gambar Produk <span className="text-red-500">*</span></InputLabel>
                                <FilePond
                                    files={data?.image ? [data?.image] : []}
                                    onupdatefiles={fileItems => (
                                        setData('image', fileItems.length ? fileItems[0].file : null)
                                    )}
                                    allowMultiple={false}
                                    maxFiles={3}
                                    // server="/api"
                                    name="image"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                    credits
                                />
                                {/* <input type="file" className="form-input" name="image" id="image" accept="image/*" onChange={previewImages} />

                                <div className="mt-2" style={style}>
                                    <img className="img-preview col-sm-2" alt="image preview" />
                                </div> */}
                                <InputError message={errors.image} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>

                            <div>
                                <InputLabel htmlFor="recomended" className="block mb-2">Rekomendasi Produk <span className="text-gray-400">(optional)</span></InputLabel>
                                <TextInput type="text" id="recomended" name="recomended"
                                    className="form-input" placeholder="contoh: Valentine, Yudisium / Wisuda, Anniversary, dll"
                                    value={data.recomended}
                                    onChange={(e) => setData('recomended', e.target.value)}
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
                                onClick={() => setModal2Open(false)}>Tutup</button>
                            <button type="submit" className={"btn bg-primary/25 text-primary hover:bg-primary hover:text-white " + `${processing && 'opacity-25'}`}
                                disabled={processing}>Simpan</button>
                        </div>
                    </form>
                </Modal>

                {/* modal ubah data */}
                <Modal
                    title={`Ubah Data Bucket`}
                    centered
                    open={editModal2Open}
                    onOk={() => setEditModal2Open(false)}
                    onCancel={() => [setEditModal2Open(false), setDataBucket({
                        id: '',
                        name: '',
                        harga: '',
                        description: '',
                        foto: null,
                        recomended: '',
                    })]}
                    styles={modalStyles}
                >
                    <Spin size="large" spinning={loadingUpdate} tip="Sedang menyimpan data..." fullscreen />
                    <form onSubmit={submitUbah}>
                        <div className="flex flex-col gap-3 mt-5">
                            <div>
                                <InputLabel htmlFor="name" className="block mb-2">Nama Bucket <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="name" name="name" className="form-input" value={dataBucket.name}
                                    onChange={(e) => setDataBucket({ ...dataBucket, name: e.target.value })} isFocused={true}
                                    placeholder="Masukan Nama Bucket" />

                                <InputError message={error.name} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            <div>
                                <InputLabel htmlFor="harga" className="block mb-2">Harga Bucket <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="harga" name="harga" className="form-input"
                                    value={formatCurrency(dataBucket.harga)}
                                    onChange={(e) => setDataBucket({ ...dataBucket, harga: e.target.value.replace(/[^0-9]/g, '') })}
                                    placeholder="Masukan Harga (contoh: 100000, tanpa tanda titik)" />

                                <InputError message={error.harga} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" className="block mb-2">Deskripsi Produk <p className="inline text-gray-400">(optional)</p></InputLabel>
                                {/* <textarea className="form-input" name="" id=""></textarea> */}
                                <div>
                                    {/* <div ref={editorRef} /> */}

                                    <ReactQuill theme="bubble" key={dataBucket.id} value={dataBucket.description} onChange={(e) => setDataBucket({ ...dataBucket, description: e })} />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="imageEdit" className="block mb-2">Gambar Produk <span className="text-red-500">*</span></InputLabel>

                                <input type="file" className="form-input" name="imageEdit" id="imageEdit" accept="image/*" onChange={previewImagesEdit} />

                                <div className="my-2" style={style}>
                                    <img src={import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + dataBucket?.foto} className=" img-preview-edit col-sm-2" alt="image preview" loading="lazy" />
                                </div>
                                <InputError message={error.foto} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>

                            <div className="mt-3">
                                <InputLabel htmlFor="recomended" className="block mb-2">Rekomendasi Produk <span className="text-gray-400">(optional)</span></InputLabel>
                                <TextInput type="text" id="recomended" name="recomended"
                                    className="form-input" placeholder="contoh: Valentine, Yudisium / Wisuda, Anniversary, dll"
                                    defaultValue={dataBucket?.recomended}
                                    onChange={(e) => setDataBucket({ ...dataBucket, recomended: e.target.value })}
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
                                onClick={() => [setEditModal2Open(false), setDataBucket({
                                    id: '',
                                    name: '',
                                    harga: '',
                                    description: '',
                                    foto: null,
                                    recomended: '',
                                })]}>Tutup</button>
                            <button type="submit" className={"btn bg-primary/25 text-primary hover:bg-primary hover:text-white " + `${loadingUpdate && 'opacity-25'}`}
                                disabled={loadingUpdate}>Simpan</button>
                        </div>
                    </form>
                </Modal>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
