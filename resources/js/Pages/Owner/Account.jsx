import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { message, Modal } from 'antd';
import { useState } from 'react';

const modalStyles = {
    footer: {
        display: "none",
    }
};

export default function Account({ accounts, totalAdmin, totalEmployee }) {
    //untuk membuka modal tambah
    const [modal2Open, setModal2Open] = useState(false);

    // untuk membuka modal edit
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [errorEdit, setErrorEdit] = useState(null);
    console.log(accounts);

    const [dataEdit, setDataEdit] = useState({
        id: '',
        name: '',
        email: '',
    });

    const { data, setData, post, errors, delete: destroy, processing, reset } = useForm({
        name: '',
        email: '',
        role: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('account.store'), {
            onSuccess: (e) => {
                if (e.props.flash.success) {
                    reset('name', 'email', 'role')
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

                    router.get('/account');
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
        })

    }

    const handleEdit = async (id) => {
        setErrorEdit(null)
        setModalEditOpen(true)

        const response = await fetch(`/account/${id}`);
        const result = await response.json();

        setDataEdit({
            id: result.data?.id,
            name: result.data?.name,
            email: result.data?.email
        })
    }

    const submitUbah = (e) => {
        e.preventDefault()

        router.post('/account/update', dataEdit, {
            onSuccess: (e) => {
                if (e.props.flash.success) {
                    setModalEditOpen(false)
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

                    router.get('/account');
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
            onError: (error) => {
                setErrorEdit(error)
            }
        })
    }

    // Ubah status akun
    const statusAccount = (status, id) => {

        const data = {
            id: id,
            status: status
        }

        let title = status == "aktif" ? "Apakah Anda ingin menon-Aktifkan akun ini ?" : "Apakah Anda ingin meng-Aktifkan akun ini ?"

        Swal.fire({
            title: title,
            // text: "Data tidak akan bisa dikembalikan!",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Ya!",
            cancelButtonText: "Tidak!",
            confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
            cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !1
        }).then(function (t) {
            t.value && router.post('/account/change-status', data, {
                onSuccess: (e) => {
                    if (e.props.flash.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
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

                    router.get('/account');
                }
            })
        })
    }

    const resetPassword = (id) => {
        Swal.fire({
            title: "Apakah anda ingin mereset password akun ini ?",
            text: "Password yang sudah direset, harap untuk login menggunakan password default!",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Ya!",
            cancelButtonText: "Tidak!",
            confirmButtonClass: "btn bg-primary text-white w-xs me-2 mt-2",
            cancelButtonClass: "btn bg-danger text-white w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !1
        }).then(function (t) {
            t.value && router.post('/account/reset-password', { data: id }, {
                onSuccess: (e) => {
                    if (e.props.flash.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
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

                    router.get('/account');
                }
            })
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Account" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Data Akun"}
                segment1={"Elv-FLorist"}
                segment2={"Kelola Akun"}
                segment3={"Akun"}
                url={"/account"}
            >

                <PrimaryButton className="btn bg-info/25 text-info hover:bg-info hover:text-white mb-4" onClick={() => setModal2Open(true)}>Tambah Akun</PrimaryButton>

                <div className="grid xl:grid-cols-5 md:grid-cols-2 gap-6 mb-6">
                    <div className="card" style={{ borderLeftWidth: "6px", borderLeftColor: "blue" }}>
                        <div className="p-6">
                            <div className="flex">
                                <h4>Total Pegawai : {totalAdmin + totalEmployee}</h4>
                            </div>
                            <div className="flex flex-col">
                                <h4>Admin : {totalAdmin}</h4>
                                <h4>Pembuat Buket : {totalEmployee}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                        {
                            accounts.map(account => (
                                <div className="card" key={account.id}>
                                    <div className="p-5">
                                        <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                            <div className="flex items-start relative gap-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-14 w-14">
                                                        <span className="flex h-full w-full items-center justify-center">
                                                            <img src="/img/default.jpg" className="rounded-full" alt="image" loading="lazy" />
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-base">{account.name}</p>
                                                        <p className="text-xs">Email : {account.email}</p>
                                                        <p className="text-xs">Password Default : 12345678</p>
                                                        <p className="text-xs">
                                                            Status Akun : <b className={account.status_akun == "aktif" ? "text-green-500" : "text-red-500"}>{account.status_akun == "aktif" ? "Aktif" : "Tidak Aktif"}</b>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center absolute top-0 end-0">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <button data-fc-type="dropdown" data-fc-placement="bottom-end" className="inline-flex text-slate-700 hover:bg-slate-100 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full p-2 fc-dropdown open">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical w-4 h-4"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                            </button>
                                                        </Dropdown.Trigger>

                                                        <Dropdown.Content width="48">
                                                            <div className="fc-dropdown fc-dropdown-open:opacity-100 opacity-0 w-40 z-50 mt-2 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2 absolute open">
                                                                <button onClick={() => handleEdit(account.id)} className="w-full flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3 w-4 h-4 me-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                                    Edit
                                                                </button>
                                                                {/* <a className="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-link w-4 h-4 me-3"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                                                    Copy Link
                                                                </a> */}
                                                            </div>
                                                        </Dropdown.Content>
                                                    </Dropdown>

                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm">Level</p>
                                                <span className="p-0.5 bg-gray-600 rounded-full"></span>
                                                <p className="text-sm font-bold">{account.role_id == 1 ? "Administrator" : "Pembuat Bucket"}</p>

                                                <div className="ms-auto flex items-center">
                                                    <button className="text-sm" title="Reset Password" onClick={() => resetPassword(account.id)}>
                                                        <i className="mgc_key_2_fill text-lg me-2"></i>
                                                    </button>

                                                    {
                                                        account.status_akun == "aktif" ?
                                                            <button className="text-sm text-green-500" title="Ubah Status Akun" onClick={() => statusAccount('aktif', account.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-check inline"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                                            </button>
                                                            :
                                                            <button className="text-sm text-red-500" title="Ubah Status Akun" onClick={() => statusAccount('non_aktif', account.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-x inline"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </TopBarLayout>

            {/* modal tambah data */}
            <Modal
                title={`Tambah Akun`}
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                styles={modalStyles}
            >
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-3 mt-5">
                        <div>
                            <InputLabel htmlFor="name" className="mb-2 block">Nama <span className="text-red-500">*</span></InputLabel>
                            <TextInput type="text" id="name" name="name" className="form-input" value={data.name} onChange={(e) => setData('name', e.target.value)} isFocused={true}
                                placeholder="Masukan Nama Pengguna" />

                            <InputError message={errors.name} className="mt-1" style={{ fontSize: "12px" }} />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" className="mb-2 block">Email <span className="text-red-500">*</span></InputLabel>
                            <TextInput type="text" id="email" name="email" className="form-input"
                                value={data.email} onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukan Alamat Email" />

                            <InputError message={errors.email} className="mt-1" style={{ fontSize: "12px" }} />
                        </div>
                        <div>
                            <InputLabel htmlFor="role" className="mb-2 block">Level Pengguna <span className="text-red-500">*</span></InputLabel>
                            <div className="flex gap-5">
                                <div>
                                    <input className="form-radio rounded text-primary" type="radio" name="role" id="admin" value="admin" checked={data.role == "admin" && true} onChange={(e) => setData('role', e.target.value)} />
                                    <label className="ms-1.5" htmlFor="admin">Administrator</label>
                                </div>
                                <div>
                                    <input className="form-radio rounded text-primary" type="radio" name="role" id="pekerja" value="pekerja" checked={data.role == "pekerja" && true} onChange={(e) => setData('role', e.target.value)} />
                                    <label className="ms-1.5" htmlFor="pekerja">Pembuat Bucket</label>
                                </div>
                            </div>
                            <InputError message={errors.role} className="mt-1" style={{ fontSize: "12px" }} />
                        </div>

                    </div>

                    <div className="flex justify-end mt-9 gap-3">
                        {/* {
                                resetPassword &&
                                <div className="bg-success/25 text-success text-sm rounded-md p-2" role="alert">{resetPassword}</div>
                            } */}
                        <span className="text-red-500" style={{ position: "absolute", left: "20px" }}>*) Wajib diisi</span>
                        <button type="button" className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white"
                            onClick={() => setModal2Open(false)}>Tutup</button>
                        <button type="submit" className={"btn bg-primary/25 text-primary hover:bg-primary hover:text-white " + `${(!data.name || !data.email || !data.role || processing) && 'opacity-25 '}`}
                            disabled={!data.name || !data.email || !data.role || processing}>Simpan</button>
                    </div>
                </form>
            </Modal>

            {/* modal edit data */}
            <Modal
                title={`Ubah Akun`}
                centered
                open={modalEditOpen}
                onOk={() => setModalEditOpen(false)}
                onCancel={() => setModalEditOpen(false)}
                styles={modalStyles}
            >
                <form onSubmit={submitUbah}>
                    <div className="flex flex-col gap-3 mt-5">
                        <div>
                            <InputLabel htmlFor="name" className="mb-2 block">Nama <span className="text-red-500">*</span></InputLabel>
                            <TextInput type="text" id="name" name="name" className="form-input" value={dataEdit.name} onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })} isFocused={true}
                                placeholder="Masukan Nama Pengguna" />

                            <InputError message={errorEdit?.name} className="mt-1" style={{ fontSize: "12px" }} />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" className="mb-2 block">Email <span className="text-red-500">*</span></InputLabel>
                            <TextInput type="text" id="email" name="email" className="form-input"
                                value={dataEdit.email} onChange={(e) => setDataEdit({ ...dataEdit, email: e.target.value })}
                                placeholder="Masukan Alamat Email" />

                            <InputError message={errorEdit?.email} className="mt-1" style={{ fontSize: "12px" }} />
                        </div>
                        {/* <div>
                            <InputLabel htmlFor="role" className="mb-2 block">Level Pengguna <span className="text-red-500">*</span></InputLabel>
                            <div className="flex gap-5">
                                <div>
                                    <input className="form-radio rounded text-primary" type="radio" name="role" id="admin" value="admin" checked={data.role == "admin" && true} onChange={(e) => setData('role', e.target.value)} />
                                    <label className="ms-1.5" htmlFor="admin">Administrator</label>
                                </div>
                                <div>
                                    <input className="form-radio rounded text-primary" type="radio" name="role" id="pekerja" value="pekerja" checked={data.role == "pekerja" && true} onChange={(e) => setData('role', e.target.value)} />
                                    <label className="ms-1.5" htmlFor="pekerja">Pembuat Bucket</label>
                                </div>
                            </div>
                            <InputError message={errors.role} className="mt-1" style={{ fontSize: "12px" }} />
                        </div> */}

                    </div>

                    <div className="flex justify-end mt-9 gap-3">
                        {/* {
                                resetPassword &&
                                <div className="bg-success/25 text-success text-sm rounded-md p-2" role="alert">{resetPassword}</div>
                            } */}
                        <span className="text-red-500" style={{ position: "absolute", left: "20px" }}>*) Wajib diisi</span>
                        <button type="button" className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white"
                            onClick={() => setModalEditOpen(false)}>Tutup</button>
                        <button type="submit" className={"btn bg-primary/25 text-primary hover:bg-primary hover:text-white " + `${(!dataEdit.name || !dataEdit.email || processing) && 'opacity-25 '}`}
                            disabled={!dataEdit.name || !dataEdit.email || processing}>Simpan</button>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    )
}
