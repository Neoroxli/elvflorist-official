import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Flex, Table, Input, Select, Button, Modal, message } from 'antd';
import moment from 'moment/moment';
import { useState } from 'react';
const { Column, ColumnGroup } = Table;
const { Search } = Input;

const modalStyles = {
    footer: {
        display: "none",
    }
};

export default function DataItem({ items }) {
    console.log(items);

    const error = usePage().props.errors;

    const [stateDataFilter, setStateDataFilter] = useState(items);
    const [value, setValue] = useState('');
    const [filter, setFilter] = useState(10)

    const { data, setData, post, errors, delete: destroy, processing, reset } = useForm({
        name_item: '',
        price: '',
    })

    const [getDataItem, setGetDataItem] = useState({
        id: '',
        name_edit: '',
        price_edit: '',
    })

    //untuk membuka modal tambah
    const [modal2Open, setModal2Open] = useState(false);
    // untuk membuka modal edit
    const [modal2OpenEdit, setModal2OpenEdit] = useState(false);

    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    const dataItem = items?.map((item, i) => ({
        key: item.id,
        no: i + 1,
        item_name: item.name,
        price: formatCurrency(item.price),
        created_at: moment(item.created_at).format('LLL'),
        updated_at: moment(item.updated_at).format('LLL'),
        action: <>
            <Button className="btn bg-warning/25 text-warning hover:bg-warning hover:text-white me-3" onClick={() => handleEdit(item.id)}>Edit</Button>
            <Button className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white" onClick={() => handleDelete(item.id)}>Hapus</Button>
        </>
    }))

    const dataItemFilter = stateDataFilter?.map((item, i) => ({
        key: item.id,
        no: i + 1,
        item_name: item.name,
        price: formatCurrency(item.price),
        created_at: moment(item.created_at).format('LLL'),
        updated_at: moment(item.updated_at).format('LLL'),
        action: <>
            <Button className="btn bg-warning/25 text-warning hover:bg-warning hover:text-white me-3" onClick={() => handleEdit(item.id)}>Edit</Button>
            <Button className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white" onClick={() => handleDelete(item.id)}>Hapus</Button>
        </>
    }))

    const handleSubmit = (e) => {
        e.preventDefault()

        post(route(`master-data.data-item.store`), {
            onSuccess: (result) => {
                console.log(result);

                if (result.props.flash.success) {
                    reset('name_item', 'price')
                    setModal2Open(false)
                    Swal.fire({
                        title: "Good job!",
                        text: result.props.flash.success,
                        icon: "success",
                        // showCancelButton: !0,
                        confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
                        cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })

                    router.get('/master-data/data-item');
                } else {
                    Swal.fire({
                        title: "Oops...",
                        text: result.props.flash.error,
                        icon: "error",
                        confirmButtonClass: "btn bg-primary text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })
                }
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    const handleEdit = async (id) => {
        const response = await fetch(`/master-data/data-item/${id}`);
        const getItem = await response.json();

        if (getItem.status == "success") {
            setGetDataItem({
                id: getItem?.data?.id,
                name_edit: getItem?.data?.name,
                price_edit: getItem?.data?.price
            });
            setModal2OpenEdit(true)
        } else {
            message.info(getItem.message)
        }
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        console.log(getDataItem);


        router.post(`/master-data/data-item/update`, getDataItem, {
            onSuccess: (result) => {
                if (result.props.flash.success) {
                    setGetDataItem({id: '', name_edit: '', price_edit: ''})
                    setModal2OpenEdit(false)
                    Swal.fire({
                        title: "Good job!",
                        text: result.props.flash.success,
                        icon: "success",
                        // showCancelButton: !0,
                        confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
                        cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })

                    router.get('/master-data/data-item');
                } else {
                    Swal.fire({
                        title: "Oops...",
                        text: result.props.flash.error,
                        icon: "error",
                        confirmButtonClass: "btn bg-primary text-white w-xs mt-2",
                        buttonsStyling: !1,
                        showCloseButton: !1
                    })
                }
            },
            onError: (error) => {
                console.log(error);
                message.error(error)
            }
        })
    }


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
            t.value && destroy(route('master-data.data-item.delete', id), {
                onSuccess: (e) => {
                    if (e.props.flash.success) {
                        // Swal.fire({
                        //     icon: "success",
                        //     title: "Dihapus!",
                        //     text: e.props.flash.success,
                        //     confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
                        //     cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
                        //     buttonsStyling: !1,
                        //     showCloseButton: !1
                        // });
                        message.success(e.props.flash.success)
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

                    router.get('/master-data/data-item');
                },
                onError: (error) => {
                    console.log(error);
                }
            })
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Data Pembeli" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Data Item"}
                segment1={"Elv-FLorist"}
                segment2={"Master Data"}
                segment3={"Data Item"}
                url={"/master-data/data-item"}
            >
                <PrimaryButton className="mb-4 btn bg-info/25 text-info hover:bg-info hover:text-white" onClick={() => setModal2Open(true)}>Tambah</PrimaryButton>
                <div className="card">
                    <div className="p-6">
                        <Flex gap={10}>
                            <Search className="mb-3"
                                value={value}
                                onChange={e => {
                                    const currValue = e.target.value.toLocaleLowerCase();
                                    setValue(currValue);
                                    const filteredData = items.filter(entry =>
                                        entry?.name.toLocaleLowerCase().includes(currValue)
                                    );

                                    setStateDataFilter(filteredData);
                                }}
                                placeholder="Cari Nama"
                                allowClear
                                style={{ width: 300 }}
                            />

                            <Select
                                placeholder="--- Filter ---"
                                onChange={(value) => setFilter(value)}
                                // allowClear
                                // showSearch
                                // autoFocus={true}
                                // size='large'
                                style={{ width: 120 }}
                                options={[
                                    // { value: '', label: '--- Pilih Status Pesanan ---' },
                                    { value: 5, label: 5 },
                                    { value: 10, label: 10 },
                                    { value: 20, label: 20 },
                                    { value: 50, label: 50 },
                                    { value: 100, label: 100 },
                                ]}
                            />
                        </Flex>

                        <Table dataSource={value == '' ? dataItem : dataItemFilter} pagination={{ pageSize: filter }} scroll={{ x: 1000 }} bordered>
                            <Column title="No" dataIndex="no" key="no" />
                            <Column title="Nama Item" dataIndex="item_name" key="item_name" />
                            <Column title="Harga" dataIndex="price" key="price" />
                            <Column title="Tanggal Dibuat" dataIndex="created_at" key="created_at" />
                            <Column title="Tanggal Diubah" dataIndex="updated_at" key="updated_at" />
                            <Column title="Aksi" dataIndex="action" key="action" />
                        </Table>
                        <span className="">Total : {stateDataFilter.length} Data</span>
                    </div>
                </div>

                {/* modal tambah data */}
                <Modal
                    title={`Tambah Data Item`}
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => [setModal2Open(false), reset('name_item', 'price')]}
                    styles={modalStyles}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3 mt-5">
                            <div>
                                <InputLabel htmlFor="name_item" className="block mb-2">Nama Item <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="name_item" name="name_item" className="form-input" value={data.name_item} onChange={(e) => setData('name_item', e.target.value)} isFocused={true}
                                    placeholder="Masukan Nama Item, cth: bengbeng, top, dll" />

                                <InputError message={errors.name_item} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" className="block mb-2">Harga <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="price" name="price" className="form-input"
                                    value={formatCurrency(data.price)} onChange={(e) => setData('price', e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="Masukan Harga (contoh: 100000, tanpa tanda titik)" />

                                <InputError message={errors.price} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            {/* <div>
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
                                <InputError message={errors.image} className="mt-1" style={{ fontSize: "12px" }} />
                            </div> */}

                        </div>

                        <div className="flex justify-end gap-3 mt-9">
                            <span className="text-red-500" style={{ position: "absolute", left: "20px" }}>*) Wajib diisi</span>
                            <button type="button" className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white"
                                onClick={() => [setModal2Open(false), reset('name_item', 'price')]}>Tutup</button>
                            <button type="submit"
                                className={"btn bg-primary/25 text-primary hover:bg-primary hover:text-white " + `${processing && 'opacity-25'}`}
                                disabled={processing}>Simpan</button>
                        </div>
                    </form>
                </Modal>

                {/* modal ubah data */}
                <Modal
                    title={`Ubah Data Item`}
                    centered
                    open={modal2OpenEdit}
                    onOk={() => setModal2OpenEdit(false)}
                    onCancel={() => [setModal2OpenEdit(false), setGetDataItem({ id: '', name_edit: '', price_edit: '' })]}
                    styles={modalStyles}
                >
                    <form onSubmit={handleSubmitUpdate}>
                        <div className="flex flex-col gap-3 mt-5">
                            <div>
                                <InputLabel htmlFor="name_item_edit" className="block mb-2">Nama Item <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="name_item_edit" name="name_item_edit" className="form-input" value={getDataItem.name_edit} onChange={(e) => setGetDataItem({ ...getDataItem, name_edit: e.target.value })} isFocused={true}
                                    placeholder="Masukan Nama Item, cth: bengbeng, top, dll" />

                                <InputError message={error.name_edit} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            <div>
                                <InputLabel htmlFor="price_edit" className="block mb-2">Harga <span className="text-red-500">*</span></InputLabel>
                                <TextInput type="text" id="price_edit" name="price_edit" className="form-input"
                                    value={formatCurrency(getDataItem.price_edit)} onChange={(e) => setGetDataItem({ ...getDataItem, price_edit: e.target.value.replace(/[^0-9]/g, '') })}
                                    placeholder="Masukan Harga (contoh: 100000, tanpa tanda titik)" />

                                <InputError message={error.price_edit} className="mt-1" style={{ fontSize: "12px" }} />
                            </div>
                            {/* <div>
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
                                <InputError message={errors.image} className="mt-1" style={{ fontSize: "12px" }} />
                            </div> */}

                        </div>

                        <div className="flex justify-end gap-3 mt-9">
                            <span className="text-red-500" style={{ position: "absolute", left: "20px" }}>*) Wajib diisi</span>
                            <button type="button" className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white"
                                onClick={() => [setModal2OpenEdit(false), setGetDataItem({ id: '', name_edit: '', price_edit: '' })]}>Tutup</button>
                            <button type="submit"
                                className={"btn bg-primary/25 text-primary hover:bg-primary hover:text-white " + `${processing && 'opacity-25'}`}
                                disabled={processing}>Simpan</button>
                        </div>
                    </form>
                </Modal>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
