import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head } from '@inertiajs/react';
import { Button, Empty, Flex, Pagination, Select, Table, Input, Col, Checkbox, DatePicker, message, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { Search } = Input;
import dayjs from 'dayjs';
import axios from 'axios';
import moment from 'moment/moment';
import "moment/locale/id";
moment.locale("id");

export default function OrderReport() {

    const [formSearchReport, setFormSearchReport] = useState({
        orderStatus: '',
        year: dayjs().year().toString()
    })

    const [isLoading, setIsLoading] = useState(false)
    const [dataReport, setDataReport] = useState(null)
    console.log('report', dataReport);



    const onStatusChange = value => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
        }
    };

    const search = async (e) => {
        // e.preventDefault()
        if (formSearchReport.orderStatus == '') {
            message.error("Status Pesanan harus dipilih")
        } else if (formSearchReport.year == '') {
            message.error("Tahun harus dipilih")
        }

        setIsLoading(true)
        await axios.get(`/show-report?orderStatus=${formSearchReport.orderStatus}&year=${formSearchReport.year}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(result => {
            const { data } = result?.data
            console.log(data);
            setDataReport(data)

        }).catch(error => {
            console.log(error);

        }).finally(() => {
            setIsLoading(false)
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

    let i = 1;
    const data = dataReport?.map(report =>
    ({
        key: report?.id,
        no_urut: i++,
        no_faktur: report?.no_faktur,
        orderDate: moment(report?.transaction?.transaction_time).format('lll') + " WIT",
        buyDate: moment(report?.transaction?.settlement_time).format('lll') + " WIT",
        customerName: <b>{report?.customer?.user?.name}</b>,
        productName: report?.bucket?.name,
        amount: formatCurrency(report?.total_price),
        payStatus: <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium
            ${report?.transaction?.transaction_status == "settlement" ? "bg-green-100 text-green-800"
                : report?.transaction?.transaction_status == "pending" ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"}`}>
            {report?.transaction?.transaction_status}
        </span>,
        orderStatus:
            <span className={
                `inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium ${report?.order_status == "success" ?
                    "bg-green-100 text-green-800" : report?.order_status == "process" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`
            }>
                {report?.order_status == "capture" ? "Belum diproses" : report?.order_status == "process" ? "Sedang dikerjakan" : "Selesai"}
            </span>
        ,
        employee: <span className="badge rounded-pill bg-label-warning">{report?.user?.name ?? "-"}</span>,
        // action: <div className="flex flex-col gap-2 text-center">
        //     <Button type="primary" style={{ backgroundColor: "#1677ff" }}>Aktivitas</Button>
        //     <Button type="default" className="">Invoice</Button>
        // </div>
    })
    )

    const handleDownload = async (year, orderStatus) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/download-report?orderStatus=${orderStatus}&year=${year}`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Laporan Pemesanan (${orderStatus == 'all' ? 'Semua' : orderStatus}) Buket Periode ${year}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Laporan Pemesanan" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Laporan Pemesanan"}
                segment1={"Elv-FLorist"}
                segment2={"Laporan"}
                segment3={"Laporan Pemesanan"}
                url={"/order-report"}
            >
                <Flex gap="small" align="center" >
                    <Select
                        placeholder="--- Pilih Status Pesanan ---"
                        onChange={(value) => setFormSearchReport({ ...formSearchReport, orderStatus: value })}
                        allowClear
                        // showSearch
                        autoFocus={true}
                        size='large'
                        style={{ width: 250 }}
                        options={[
                            // { value: '', label: '--- Pilih Status Pesanan ---' },
                            { value: 'all', label: 'Semua' },
                            { value: 'capture', label: 'Belum dibuat' },
                            { value: 'process', label: 'Sedang dibuat' },
                            { value: 'success', label: 'Selesai dibuat' },
                        ]}
                    />
                    <DatePicker defaultValue={dayjs()} onChange={(date, dateString) => setFormSearchReport({ ...formSearchReport, year: dateString })} size="large" picker="year" />
                    <Button type="primary" htmlType="submit" onClick={search} size='large' shape='round' icon={<SearchOutlined />}>
                        Cari
                    </Button>
                </Flex>

                <div className="mt-5 row">
                    {/* <div className="col-sm-2">
                        <div className="card">
                            <div className="p-6">
                                <Search className="mb-5" placeholder="input search text" allowClear onSearch={""} style={{ width: 200 }} />
                                <Table dataSource={[]} pagination={{ pageSize: 5 }} scroll={{ x: "auto" }} bordered
                                // onRow={(record, rowIndex) => {
                                //     return {
                                //         onClick: (e) => {
                                //             record.payStatus.props.children == "settlement" ?
                                //                 showDrawer(record.key)
                                //                 :
                                //                 message.error("Pembayaran belum dilakukan")
                                //         }
                                //     }
                                // }}
                                >
                                    <Column title="Tahun" dataIndex="year" key="year" />
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

                            </div>
                        </div>
                    </div> */}
                    <div className="col-sm-12">
                        <Card variant="borderless" className="card ">
                            <div className="">
                                <Flex justify="start" className="mb-5">
                                    {/* <Search className="mb-5" placeholder="input search text" allowClear onSearch={""} style={{ width: 200 }} /> */}
                                    {/* <Button type="primary" icon={<DownloadOutlined />} size="large" onClick={() => handleDownload(dataReport)}> */}
                                    <Button type="primary" disabled={dataReport == null || isLoading ? true : false} loading={isLoading}
                                        icon={<DownloadOutlined />} size="large" onClick={() => handleDownload(formSearchReport.year, formSearchReport.orderStatus)}>
                                        {/* icon={<DownloadOutlined />} size="large" onClick={() => location.href = `/download-report?year=${formSearchReport.year}&orderStatus=${formSearchReport.orderStatus}`}> */}
                                        Download
                                    </Button>
                                </Flex>
                                <Table dataSource={data} pagination={false} loading={isLoading} bordered scroll={{ x: 1000 }}
                                // onRow={(record, rowIndex) => {
                                //     return {
                                //         onClick: (e) => {
                                //             record.payStatus.props.children == "settlement" ?
                                //                 showDrawer(record.key)
                                //                 :
                                //                 message.error("Pembayaran belum dilakukan")
                                //         }
                                //     }
                                // }}
                                >
                                    <Column title="No" dataIndex="no_urut" key="no_urut" />
                                    <Column title="No Faktur" dataIndex="no_faktur" key="no_faktur" />
                                    <ColumnGroup title="Informasi Pesanan">
                                        <Column title="Tanggal Pesan" dataIndex="orderDate" key="orderDate" />
                                        <Column title="Tanggal Bayar" dataIndex="buyDate" key="buyDate" />
                                        <Column title="Nama Pelanggan" dataIndex="customerName" key="customerName" />
                                        <Column title="Nama Barang" dataIndex="productName" key="productName" />
                                        <Column title={
                                            <div className="flex flex-col items-center">
                                                <p>Total Harga Pesanan</p>
                                                {/* <small className="italic">(harga produk + biaya layanan {formatCurrency(import.meta.env.VITE_BIAYA_APLIKASI)})</small> */}
                                            </div>
                                        } dataIndex="amount" key="amount" />
                                        <Column title="Status Pembayaran" dataIndex="payStatus" key="payStatus" />
                                    </ColumnGroup>
                                    <Column title="Status Pesanan" dataIndex="orderStatus" key="orderStatus" />
                                    <Column title="Pembuat Bucket" dataIndex="employee" key="employee" />
                                </Table>
                                {/* <Flex justify='end' className="mt-5">
                                    <Pagination
                                        total={85}
                                        showSizeChanger={false}
                                        showQuickJumper
                                        showTotal={total => `Total ${total} items`}
                                    />
                                </Flex> */}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* <Flex justify="center" align="center" className="h-full" >
                    <Empty />
                </Flex> */}
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
