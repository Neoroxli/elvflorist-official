import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from '@/Layouts/NavigationLayout';
import TopBarLayout from '@/Layouts/TopBarLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Alert, Button, Drawer, Empty, Image, message, Modal, Table, Timeline, Input, Select, Flex } from 'antd';
import moment from 'moment/moment';
const { Column, ColumnGroup } = Table;
import "moment/locale/id";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
moment.locale("id");
const { Search } = Input;

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { NotificationContext } from '@/Context/NotificationContext';

const modalStyles = {
    footer: {
        display: "none",
    }
};

export default function Page({ orders }) {
    // console.log('order : ', orders);

    const user = usePage().props.auth.user;

    const { getNotif } = useContext(NotificationContext)

    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [resultProgress, setResultProgress] = useState([])
    const [customeOrder, setCustomeOrder] = useState("")
    const [itemsAdd, setItemsAdd] = useState([])

    const [filter, setFilter] = useState(10)

    // State untuk mengontrol apakah konten lebih panjang ditampilkan atau tidak
    const [isExpanded, setIsExpanded] = useState(false);

    const [modalProgressReject, setModalProgressReject] = useState({
        progress_id: '',
        order_id: '',
        statusOpen: false,
        statusProgress: ''
    })
    // console.log(modalProgressReject);

    const [modalProgressAccept, setModalProgressAccept] = useState({
        progress_id: '',
        order_id: '',
        statusOpen: false,
        statusProgress: ''
    })


    // pesan untuk reject gambar
    const [data, setData] = useState({
        message: ''
    })

    // state untuk checklist end proses
    const [endProcess, setEndProcess] = useState({
        status: false
    })
    // console.log(endProcess);


    const [uploading, setUploading] = useState(false);

    // console.log(modalProgress);

    const [stateDataFilter, setStateDataFilter] = useState(orders);
    const [value, setValue] = useState('');


    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    const dataOrder = orders?.map(order =>
    ({
        key: order?.id,
        message: order?.order_status == "success" ? <span className="mgc_check_2_fill text-success"></span> : order?.notifications.map(notification => (notification?.type == "message" && notification?.read_at == null && notification?.recipient_id == user?.id) ? <span className="mgc_bell_ringing_fill text-warning" key={notification?.id}></span> : null),
        no_faktur: order?.no_faktur,
        orderDate: moment(order?.transaction?.transaction_time).format('lll') + " WIT",
        buyDate: moment(order?.transaction?.settlement_time).format('lll') + " WIT",
        customerName: <b>{order?.customer?.user?.name}</b>,
        productName: order?.bucket?.name,
        amount: formatCurrency(order?.total_price),
        payStatus: <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-green-100 text-green-800">{order?.transaction?.transaction_status}</span>,
        orderStatus:
            <span className={
                `inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium
                ${order?.order_status == "success" ? "bg-green-100 text-green-800" : order?.order_status == "process" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`
            }>
                {order?.order_status == "capture" ? "Belum diproses" : order?.order_status == "process" ? "Sedang dikerjakan" : "Selesai"}
            </span>
        ,
        employee: <span className="badge rounded-pill bg-label-warning">{order?.user?.name ?? "-"}</span>,
        // action: <div className="flex flex-col gap-2 text-center">
        //     <Button type="primary" style={{ backgroundColor: "#1677ff" }}>Koreksi</Button>
        //     <Button type="default" className="">Invoice</Button>
        // </div>
    })
    )

    // untuk fitur search pada tabel
    const dataFilter = stateDataFilter?.map(order =>
    ({
        key: order?.id,
        no_faktur: order?.no_faktur,
        orderDate: moment(order?.transaction?.transaction_time).format('lll') + " WIT",
        buyDate: moment(order?.transaction?.settlement_time).format('lll') + " WIT",
        customerName: <b>{order?.customer?.user?.name}</b>,
        productName: order?.bucket?.name,
        amount: formatCurrency(order?.total_price),
        payStatus: <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium
                ${order?.transaction?.transaction_status == "settlement" ? "bg-green-100 text-green-800"
                : order?.transaction?.transaction_status == "pending" ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"}`}>
            {order?.transaction?.transaction_status}
        </span>,
        orderStatus:
            <span className={
                `inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium ${order?.order_status == "success" ?
                    "bg-green-100 text-green-800" : order?.order_status == "process" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`
            }>
                {order?.order_status == "capture" ? "Belum diproses" : order?.order_status == "process" ? "Sedang dikerjakan" : "Selesai"}
            </span>
        ,
        employee: <span className="badge rounded-pill bg-label-warning">{order?.user?.name ?? "-"}</span>,
        // action: <div className="flex flex-col gap-2 text-center">
        //     <Button type="primary" style={{ backgroundColor: "#1677ff" }}>Aktivitas</Button>
        //     <Button type="default" className="">Invoice</Button>
        // </div>
    })
    )

    const showTimeLineProgress = (order_id) => {
        setOpen(true)
        setIsLoading(true)

        axios.get(`/order-check/show-progress?orderID=${order_id}`)
            .then(result => {
                const { data, order } = result?.data
                setResultProgress(data)
                setCustomeOrder(order.custome_order)
                setItemsAdd(order.order_items)
                getNotif()
            }).catch(error => {
                console.log(error);
                Modal.error({
                    title: 'Error',
                    content: error?.response?.data?.message
                })
            }).finally(() => {
                setIsLoading(false)
            })
    }

    // untuk melihat progress melalui drawer
    const dataProgress = resultProgress?.map(progress => ({
        key: progress?.id,
        label:
            <div>
                {moment(progress?.created_at).format('LLL') + " WIT"}
                {
                    progress?.status == null ?
                        <div className="cursor-pointer" onClick={() => {
                            Modal.info({
                                title: "Informasi Status Validasi",
                                content: <p>Status buket yang dikerjakan sedang divalidasi oleh pihak <b className="uppercase">pemilik</b> untuk memastikan kesesuaian buket yang telah dibuat</p>
                            })
                        }}>
                            <span className="fa fa-info-circle text-warning"></span>
                            <b className="text-warning ms-1">Status : Validation</b>
                        </div>
                        :
                        progress?.status == 'rejected' ?
                            <div className="cursor-pointer">
                                <span className="fa fa-check-circle text-danger"></span>
                                <b className="text-danger">Status : Rejected</b>
                                <b className="block text-danger">Message : <Button type="dashed" onClick={() => {
                                    Modal.info({
                                        title: "Pesan Reject",
                                        content: <div dangerouslySetInnerHTML={{ __html: progress?.message }} />
                                    })
                                }}><span className="bg-red-800"><i className="mgc_message_4_fill"></i></span></Button></b>
                            </div>
                            :
                            <div className="cursor-pointer">
                                <span className="fa fa-check-circle text-success"></span>
                                <b className="text-success ms-1">Status : Accepted</b>
                            </div>
                }
            </div>,
        children: <div className="" >
            <Image src={import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + progress?.foto} alt="image" loading="lazy" width="100%" className="rounded-full" />
            {
                progress?.status == null ?
                    <div className="flex justify-center mt-3">
                        <Button type="link" className="p-0 font-bold text-danger" onClick={() => setModalProgressReject({
                            progress_id: progress?.id,
                            order_id: progress?.order_id,
                            statusOpen: true,
                            statusProgress: "reject"
                        })}>Reject<i className="mgc_thumb_down_2_fill"></i></Button>
                        {/* <Button type="link" className="p-0 font-bold text-success ms-4" onClick={() => setModalProgress({
                            progress_id: progress?.id,
                            statusOpen: true,
                            statusProgress: "accept"
                        })}>Accept <span className="mgc_thumb_up_2_fill"></span></Button> */}
                        <Button type="link" className="p-0 font-bold text-success ms-4" onClick={() => {
                            setModalProgressAccept({
                                progress_id: progress?.id,
                                order_id: progress?.order_id,
                                statusOpen: true,
                                statusProgress: "accept"
                            })
                            // Modal.confirm({
                            //     title: "Apakah anda yakin?",
                            //     content:
                            //         <div className="p-2 bg-gray-100 rounded-md">
                            //             <p>Silahkan <b>Checklist</b> jika gambar ini merupakan gambar terakhir dan <b>100%</b> sudah selesai dalam proses tahapan pembuatan buket.</p>
                            //             <p className="my-3">Dengan mengakhiri proses pembuatan buket, maka buket sudah dipastikan selesai dan pembuat buket tidak akan bisa mengirim gambar lagi.</p>
                            //             <small className="text-danger">*) Jangan di Checklist jika proses tahapan belum 100% selesai</small>
                            //             <div className="mt-3 form-check">
                            //                 <input className="rounded form-checkbox text-success" type="checkbox" name="endProcess" id="endProcess" onChange={(e) => setEndProcess({ ...endProcess, status: e.target.checked })} />
                            //                 <label className="form-check-label ms-1.5" htmlFor="endProcess">Akhiri Proses Pembuatan Buket</label>
                            //             </div>
                            //         </div>,
                            //     centered: true,
                            //     cancelText: "Cancel",
                            //     okText: "Ya",
                            //     width: 600,
                            //     onOk: () => {
                            //         handleUpdateStatusProgress(progress?.id, progress?.order_id, 'accept')
                            //     },
                            //     footer: (_, { OkBtn, CancelBtn }) => (
                            //         <>
                            //             <CancelBtn />
                            //             <OkBtn />
                            //         </>
                            //     ),
                            // })
                        }
                        }>Accept <span className="mgc_thumb_up_2_fill"></span></Button>
                    </div>
                    : null
            }
            {/* <div className="text-left bg-red-400">
                <p>{progress?.message ?? "sdn"}</p>
            </div> */}
        </div>
    }))

    const handleUpdateStatusProgress = async (progress_id_accept, order_id, statusProgressaccept) => {
        // e.preventDefault()

        const dataUpdate = {
            progress_id: modalProgressReject.statusProgress == 'reject' ? modalProgressReject.progress_id : progress_id_accept,
            message: modalProgressReject.statusProgress == 'reject' ? data.message : null,
            statusProgress: modalProgressReject.statusProgress == 'reject' ? modalProgressReject.statusProgress : statusProgressaccept,
            order_id: modalProgressReject.statusProgress == 'reject' ? modalProgressReject.order_id : order_id,
            statusEndProcess: endProcess.status
        }

        setUploading(true)
        await axios.post('/order-check/update-progress', dataUpdate, {
            headers: {
                Accept: 'application/json',
            }
        }).then(result => {
            if (result.data.status == "success") {
                message.success(result?.data?.message)
                modalProgressReject.statusProgress == 'reject' ?
                    showTimeLineProgress(modalProgressReject.order_id)
                    :
                    showTimeLineProgress(order_id)
            } else {
                message.error(result?.data?.message)
            }
        }).catch(error => {
            console.log("error progress :", error);

            if (error.status == 422) {
                message.error(error?.response?.data?.message)
            }
        }).finally(() => {
            setUploading(false)
            setEndProcess({ status: false })
            setModalProgressReject({
                progress_id: '',
                order_id: '',
                statusOpen: false,
                statusProgress: ''
            })
            setModalProgressAccept({
                progress_id: '',
                order_id: '',
                statusOpen: false,
                statusProgress: ''
            })
        })

    }

    useEffect(() => {

        Echo.channel(`notification_progress.` + user.id)
            .listen('.progress-notification', (e) => {
                console.log('Berhasil listen');
                console.log('checkOrder :', e);
                getNotif()
                // router.reload();
                // messages.push(
                //     {body: e.messageTeknisi.body}
                // )

            });

        // const channel = Echo.channel(`notification_progress.${user?.id}`);

        // channel.listen('.progress-notification', (event) => {
        //     // setNotificationPusher((prev) => [...prev, event.message]);
        //     // notifications.push(event.message);
        //     console.log(event);

        //     router.reload();
        // });

        // return () => {
        //     channel.stopListening('.progress-notification');
        // };
    }, [])

    // fungsi untuk ketika notif sudah dibuka
    const notifRead = async (order_id) => {
        await axios.post('/notification/read', { order_id }, {
            headers: {
                Accept: 'application/json'
            }
        }).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Koreksi Pembuatan Buket" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Koreksi Pembuatan Buket"}
                segment1={"Elv-FLorist"}
                segment2={"Pesanan"}
                segment3={"Koreksi Pesanan"}
                url={"/order-check"}
            >
                {/* <Alert message={<b>Informasi terkait koreksi pembuatan Buket</b>} closable className="rounded-md" description={<p>Progress pembuatan buket dilakukan proses <b>Check and Balance</b> oleh pihak pemilik dan pembuat buket</p>} type="info" banner /> */}
                <div className="mt-5 card">
                    <div className="p-6">
                        <Flex gap={10}>
                            <Search className="mb-3"
                                value={value}
                                onChange={e => {
                                    const currValue = e.target.value.toLocaleLowerCase();
                                    setValue(currValue);
                                    const filteredData = orders.filter(entry =>
                                        entry.bucket?.name.toLocaleLowerCase().includes(currValue) || entry.no_faktur.toLocaleLowerCase().includes(currValue)
                                    );

                                    setStateDataFilter(filteredData);
                                }}
                                placeholder="Cari Nama Pesanan atau No. Faktur"
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

                            <Button type="primary" className="mgc_refresh_4_line" onClick={() => [router.reload(), getNotif()]} >Refresh</Button>
                        </Flex>

                        <Table
                            dataSource={value == '' ? dataOrder : dataFilter}
                            pagination={{ pageSize: filter }}
                            bordered
                            scroll={{ x: 1000 }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (e) => {
                                        showTimeLineProgress(record.key),
                                            notifRead(record.key)
                                    }
                                }
                            }}
                        // expandable={{
                        //     expandedRowRender: record => <p style={{ margin: 0 }}>
                        //         <ul>
                        //             <li><b>Biaya Layanan</b> : {formatCurrency(import.meta.env.VITE_BIAYA_APLIKASI)}</li>
                        //             <li><b>Biaya Layanan</b> : {formatCurrency(import.meta.env.VITE_BIAYA_APLIKASI)}</li>
                        //         </ul>
                        //     </p>,
                        //     rowExpandable: record => record.name !== 'Not Expandable',
                        //   }}
                        >
                            <Column title="" dataIndex="message" key="message" />
                            <Column title="No Faktur" dataIndex="no_faktur" key="no_faktur" />
                            <ColumnGroup title="Informasi Pesanan">
                                <Column title="Tanggal Pesan" dataIndex="orderDate" key="orderDate" />
                                <Column title="Tanggal Bayar" dataIndex="buyDate" key="buyDate" />
                                <Column title="Nama Pelanggan" dataIndex="customerName" key="customerName" />
                                <Column title="Nama Barang" dataIndex="productName" key="productName" />
                                <Column title={
                                    <div className="flex flex-col items-center">
                                        <p>Total Harga</p>
                                        <small className="italic">(harga produk + biaya layanan {formatCurrency(import.meta.env.VITE_BIAYA_APLIKASI)})</small>
                                    </div>
                                } dataIndex="amount" key="amount" />
                                <Column title="Status Pembayaran" dataIndex="payStatus" key="payStatus" />
                            </ColumnGroup>
                            <Column title="Status Pesanan" dataIndex="orderStatus" key="orderStatus" />
                            <Column title="Pembuat Buket" dataIndex="employee" key="employee" />
                            {/* <Column title="Action" dataIndex="action" key="action" /> */}
                        </Table>
                        <span className="">Total : {orders?.length} Data</span>
                    </div>
                </div>

                <Drawer title="Progress pembuatan buket" onClose={() => [setOpen(false), router.reload()]} open={open} loading={isLoading} width="500px">
                    <Alert message={<b>Informasi</b>} description={<p>Progress pembuatan buket dilakukan proses <b>Check and Balance</b> oleh pihak pemilik dan pembuat buket</p>} type="info" banner />

                    {
                        itemsAdd?.length > 0 ?
                            <div className="mt-3">
                                <b>Tambahan Item</b>
                                <div className="w-48">
                                    <div className="flex justify-between p-1 rounded" style={{ backgroundColor: "#d1d5db" }}>
                                        <div className="col-sm-6">
                                            <span className="font-bold">Nama</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <span className="font-bold">Jumlah</span>
                                        </div>
                                    </div>
                                    {itemsAdd?.map(item => (
                                        <div className="flex justify-between p-1" key={item?.id}>
                                            <div className="col-6">
                                                <span>{item?.item?.name}</span>
                                            </div>
                                            <div className="col-6">
                                                <span>{item?.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            : null
                    }

                    <div className="mt-3">
                        <b>Pesan Kustomisasi dari Pelanggan</b>
                        <div className="p-2 bg-gray-300 rounded-md">
                            {
                                customeOrder ?
                                    <>
                                        <div dangerouslySetInnerHTML={{ __html: customeOrder?.substring(0, isExpanded ? customeOrder?.length : 55) }} />
                                        {
                                            customeOrder?.length >= 55 ?
                                                <>
                                                    {!isExpanded ? '.... ' : null}
                                                    <Button type="link" className="p-0 font-bold" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Lihat Sedikit" : "Lihat Selengkapnya"}</Button>
                                                </>
                                                : null
                                        }
                                    </>
                                    :
                                    "Tidak Ada Permintaan Kustomisasi"
                            }
                        </div>
                    </div>

                    {
                        resultProgress?.length ?
                            <Timeline
                                mode="alternate"
                                items={dataProgress}
                                className="mt-5"
                            />
                            :
                            <Empty className="mt-5" />
                    }
                </Drawer>

                {/* modal reject */}
                <Modal
                    title={`Mengisi Pesan Rejected / DITOLAK`}
                    centered
                    open={modalProgressReject.statusOpen}
                    // onOk={() => setModalReject(false)}
                    onCancel={() => [
                        setModalProgressReject({
                            progress_id: '',
                            order_id: '',
                            statusOpen: false,
                            statusProgress: ''
                        }),
                        setData({ message: '' })
                    ]}
                    styles={modalStyles}
                >
                    <div>
                        <ReactQuill theme="bubble" value={data.message} onChange={(e) => setData({ ...data, message: e })} />
                    </div>

                    <div className="mt-5">
                        <small>Note : Pesan ini hanya bisa dilihat oleh pembuat Buket dan Pemilik</small>
                    </div>

                    <div className="flex justify-end gap-3 mt-9">
                        <Button className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white" onClick={() => [
                            setModalProgressReject({
                                progress_id: '',
                                order_id: '',
                                statusOpen: false,
                                statusProgress: ''
                            }),
                            setData({ message: '' })
                        ]}>Tutup</Button>
                        <Button
                            // type="primary"
                            className="btn bg-info/25 text-info"
                            onClick={() => handleUpdateStatusProgress()}
                            disabled={!data.message || data.message == "<p><br></p>"}
                            loading={uploading}
                        >
                            Simpan
                        </Button>
                    </div>
                </Modal>

                {/* modal accept */}
                <Modal
                    title="Apakah anda yakin?"
                    centered
                    open={modalProgressAccept.statusOpen}
                    onCancel={() => [
                        setModalProgressAccept({
                            progress_id: '',
                            order_id: '',
                            statusOpen: false,
                            statusProgress: ''
                        }),
                        setEndProcess({ status: false })
                    ]}
                    styles={modalStyles}
                >
                    <div className="p-2 bg-gray-100 rounded-md">
                        <p>Silahkan <b>Checklist</b> jika gambar ini merupakan gambar terakhir dan <b>100%</b> sudah selesai dalam proses tahapan pembuatan buket.</p>
                        <p className="my-3">Dengan mengakhiri proses pembuatan buket, maka buket sudah dipastikan selesai dan pembuat buket tidak akan bisa mengirim gambar lagi.</p>
                        <small className="text-danger">*) Jangan di Checklist jika proses tahapan belum 100% selesai</small>
                        <div className="mt-3 form-check">
                            <input className="rounded form-checkbox text-success" type="checkbox" name="endProcess" id="endProcess" checked={endProcess.status} onChange={(e) => setEndProcess({ ...endProcess, status: e.target.checked })} />
                            <label className="form-check-label ms-1.5" htmlFor="endProcess">Akhiri Proses Pembuatan Buket</label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-9">
                        <Button type="default" onClick={() => [
                            setModalProgressAccept({
                                progress_id: '',
                                order_id: '',
                                statusOpen: false,
                                statusProgress: ''
                            }),
                            setEndProcess({ status: false })
                        ]}>Cancel</Button>
                        <Button
                            type="primary"

                            onClick={() => handleUpdateStatusProgress(modalProgressAccept.progress_id, modalProgressAccept.order_id, modalProgressAccept.statusProgress)}
                            loading={uploading}
                        >
                            Ya
                        </Button>
                    </div>
                </Modal>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
