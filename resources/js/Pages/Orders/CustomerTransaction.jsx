import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, Link } from '@inertiajs/react';
import { Flex, Table, Input, Select, Button } from 'antd';
import moment from 'moment/moment';
import { useState } from 'react';
const { Column, ColumnGroup } = Table;
const { Search } = Input;

export default function CustomerTransaction({ orders, name_customer }) {

    const [stateDataFilter, setStateDataFilter] = useState(orders);
    const [value, setValue] = useState('');

    const [filter, setFilter] = useState(10)

    const data = orders?.map((order, i) =>
    ({
        key: order?.id,
        no: i + 1,
        no_faktur: order?.no_faktur,
        orderDate: moment(order?.transaction?.transaction_time).format('lll') + " WIT",
        buyDate: moment(order?.transaction?.settlement_time).format('lll') + " WIT",
        productName: order?.bucket?.name,
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
    })
    )

    // untuk fitur search pada tabel
        const dataFilter = stateDataFilter?.map((order, i) =>
        ({
            key: order?.id,
            no: i + 1,
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
        })
        )

    return (
        <AuthenticatedLayout>
            <Head title="Data Pembeli" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Data Transaksi"}
                segment1={"Elv-FLorist"}
                segment2={"Pesanan"}
                segment3={"Data Pembeli"}
                url={"/order/customer"}
            >

                <div className="card">
                    <div className="p-6">
                        <Flex className="mb-3">
                            <b>Nama : {name_customer}</b>
                        </Flex>
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
                        <Table dataSource={value == '' ? data : dataFilter} pagination={{ pageSize: filter }} scroll={{ x: 1000 }} bordered>
                            <Column title="No" dataIndex="no" key="no" />
                            <Column title="No Faktur" dataIndex="no_faktur" key="no_faktur" />
                            <ColumnGroup title="Informasi Pesanan">
                                <Column title="Tanggal Pesan" dataIndex="orderDate" key="orderDate" />
                                <Column title="Tanggal Bayar" dataIndex="buyDate" key="buyDate" />
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
                        </Table>
                        <span className="">Total : {stateDataFilter.length} Data</span>
                    </div>
                </div>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
