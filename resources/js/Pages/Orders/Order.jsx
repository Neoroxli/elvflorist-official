import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, Link } from "@inertiajs/react";
import { Alert, Button, Drawer, Empty, Image, message, Modal, Space, Table, Timeline, Input, Select, Flex } from 'antd';
const { Column, ColumnGroup } = Table;
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import { useState } from 'react';
import axios from 'axios';
const { Search } = Input;

export default function Order({ orders }) {
    // console.log(orders);

    const [isLoading, setIsLoading] = useState(false)

    const [open, setOpen] = useState(false);

    const [stateDataFilter, setStateDataFilter] = useState(orders);
    const [value, setValue] = useState('');

    const [filter, setFilter] = useState(10)

    const [resultProgress, setResultProgress] = useState([])
    const showDrawer = (order_id) => {
        setOpen(true);
        setIsLoading(true)
        axios.get(`/order/progress?orderID=${order_id}`)
            .then(result => {
                const { data } = result?.data
                setResultProgress(data)
            }).catch(error => {
                console.log(error);
                Modal.error({
                    title: 'Error',
                    content: error?.response?.data?.message
                })
            }).finally(() => {
                setIsLoading(false)
            })
    };
    const onClose = () => {
        setOpen(false);
        setResultProgress([])
    };

    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    };


    const data = orders?.map(order =>
    ({
        key: order?.id,
        no_faktur: order?.no_faktur,
        orderDate: moment(order?.transaction?.transaction_time).format('lll') + " WIT",
        buyDate: moment(order?.transaction?.settlement_time).format('lll') + " WIT",
        customerName: <b>{order?.customer?.user?.name}</b>,
        productName: order?.bucket?.name,
        // amount: formatCurrency(order?.total_price),
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
        action: <div className="flex flex-col gap-2 text-center">
            {/* <Button type="primary" style={{ backgroundColor: "#1677ff" }}>Aktivitas</Button> */}
            <Button type="default" className="" onClick={(e) => {
                e.stopPropagation();
                handleInvoice(order?.id)
            }}>Invoice</Button>
        </div>
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
        // amount: formatCurrency(order?.total_price),
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
        action: <div className="flex flex-col gap-2 text-center">
            {/* <Button type="primary" style={{ backgroundColor: "#1677ff" }}>Aktivitas</Button> */}
            <Button type="default" className="" onClick={(e) => {
                e.stopPropagation();
                handleInvoice(order?.id)
            }}>Invoice</Button>
        </div>
    })
    )

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
                            <b className="text-warning ms-1">Status : validation</b>
                        </div>
                        :
                        progress?.status == 'rejected' ?
                            <div className="cursor-pointer">
                                <span className="fa fa-check-circle text-danger"></span>
                                <b className="text-danger ms-1">Status : Rejected</b>
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
            {/* <div className="bg-red-400 text-left">
                <p>{progress?.message ?? "sdn"}</p>
            </div> */}
        </div>
    }))

    const handleInvoice = async (order_id) => {
        // e.stopPropagation();

        // window.open(`/order/invoice/${order_id}`, '_blank');
        window.open(`/order/invoice?jenis_invoice=${order_id}`, '_blank', 'width=800,height=600');

        // try {
        //     const response = await axios.post('/order/invoice', {order_id}, {
        //         responseType: 'blob'
        //     })

        //     const blob = new Blob([response.data], { type: 'application/pdf' });
        //     const link = document.createElement('a');
        //     link.href = URL.createObjectURL(blob);
        //     link.download = 'invoice.pdf';
        //     link.click();

        // } catch (error) {
        //     console.log(error);

        // }

    }

    return (
        <AuthenticatedLayout>
            <Head title="Data Pesanan" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Data Pesanan"}
                segment1={"Elv-FLorist"}
                segment2={"Pesanan"}
                segment3={"Data Pesanan"}
                url={"/order"}
            >

                <div className="card">
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
                        </Flex>

                        <Table dataSource={value == '' ? data : dataFilter} pagination={{ pageSize: filter }} scroll={{ x: 1000 }} bordered onRow={(record, rowIndex) => {
                            return {
                                onClick: (e) => {
                                    record.payStatus.props.children == "settlement" ?
                                        showDrawer(record.key)
                                        :
                                        message.error("Pembayaran belum dilakukan")
                                }
                            }
                        }}
                        >
                            <Column title="No Faktur" dataIndex="no_faktur" key="no_faktur" />
                            <ColumnGroup title="Informasi Pesanan">
                                <Column title="Tanggal Pesan" dataIndex="orderDate" key="orderDate" />
                                <Column title="Tanggal Bayar" dataIndex="buyDate" key="buyDate" />
                                <Column title="Nama Pelanggan" dataIndex="customerName" key="customerName" />
                                <Column title="Nama Barang" dataIndex="productName" key="productName" />
                                {/* <Column title={
                                    <div className="flex flex-col items-center">
                                        <p>Total Harga</p>
                                        <small className="italic">(harga produk + biaya layanan {formatCurrency(import.meta.env.VITE_BIAYA_APLIKASI)})</small>
                                    </div>
                                } dataIndex="amount" key="amount" sorter={(a, b) => a.amount.length - b.amount.length} /> */}
                                <Column title="Status Pembayaran" dataIndex="payStatus" key="payStatus" />
                            </ColumnGroup>
                            <Column title="Status Pesanan" dataIndex="orderStatus" key="orderStatus" />
                            <Column title="Pekerja" dataIndex="employee" key="employee" />
                            <Column
                                title="Action"
                                dataIndex="action"
                                key="action"
                            // render={(_, record) => (
                            //     <Space size="middle">
                            //         <Button type="primary" style={{ backgroundColor: "#1677ff" }}>Aktivitas {record.lastName}</Button>
                            //         <Button type="default">Invoice</Button>
                            //     </Space>
                            // )}
                            />
                        </Table>
                        <span className="">Total : {orders?.length} Data</span>
                    </div>
                </div>

                <Drawer title="Progress pembuatan buket" onClose={onClose} open={open} loading={isLoading} width="500px">
                    <Alert message={<b>Informasi</b>} description={
                        <>
                            <p>Progress pembuatan buket dilakukan proses <b>Check and Balance</b> oleh pihak pemilik dan pembuat buket.</p>
                            <b>Admin hanya diberikan akses untuk melihat saja</b>
                        </>
                    } type="info" banner />
                    {
                        resultProgress.length ?
                            <Timeline
                                mode="alternate"
                                items={dataProgress}
                                className="mt-5"
                            />
                            :
                            <Empty className="mt-5" />
                    }
                </Drawer>
            </TopBarLayout>

        </AuthenticatedLayout>
    )
}
