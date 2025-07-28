import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, Link } from '@inertiajs/react';
import { Flex, Table, Input, Select, Button } from 'antd';
import { useState } from 'react';
const { Column, ColumnGroup } = Table;
const { Search } = Input;

export default function Customer({ customers }) {

    const [stateDataFilter, setStateDataFilter] = useState(customers);
    const [value, setValue] = useState('');
    const [filter, setFilter] = useState(10)
    const [loading, setLoading] = useState(false)

    const data = customers?.map((customer, i) =>
    ({
        key: customer?.id,
        no: i + 1,
        name: customer?.name,
        email: customer?.email,
        no_telp: <b>{customer?.customer?.no_wa}</b>,
        address: customer?.customer?.address,
        transaction_total: <b>{customer?.customer?.orders?.length + " Transaksi"}</b>,
        action: <div className="flex flex-col w-32 gap-2 text-center">
            {/* <Button type="primary" style={{ backgroundColor: "#1677ff" }} onClick={() => {
                location.href = `/orders/customer/${customer?.id}`
            }}>Lihat Pesanan</Button> */}
            <Link href={`/order/customer/${customer?.customer?.id}?name=${customer?.name}`} className="text-white btn bg-info">Lihat Pesanan</Link>
        </div>
    })
    )

    const dataFilter = stateDataFilter?.map((customer, i) =>
    ({
        key: customer?.id,
        no: i + 1,
        name: customer?.name,
        email: customer?.email,
        no_telp: <b>{customer?.customer?.no_wa}</b>,
        address: customer?.customer?.address,
        action: <div className="flex flex-col gap-2 text-center w-28">
            <Link href={`/order/customer/${customer?.customer?.id}`} className="text-white btn bg-info">Lihat Pesanan</Link>
        </div>
    })
    )

    const handleDownload = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/download-data-customer`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Data Pelanggan`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Data Pembeli" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Data Pembeli"}
                segment1={"Elv-FLorist"}
                segment2={"Pesanan"}
                segment3={"Data Pembeli"}
                url={"/order/customer"}
            >

                <div className="card">
                    <div className="p-6">
                        <Flex justify="space-between">
                            <Flex gap={10}>
                                <Search className="mb-3"
                                    value={value}
                                    onChange={e => {
                                        const currValue = e.target.value.toLocaleLowerCase();
                                        setValue(currValue);
                                        const filteredData = customers.filter(entry =>
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
                            <Button type="primary" loading={loading} onClick={() => handleDownload()}>
                                <span className="mgc_pdf_fill"></span> PDF
                            </Button>
                        </Flex>

                        <Table dataSource={value == '' ? data : dataFilter} pagination={{ pageSize: filter }} scroll={{ x: 1000 }} bordered>
                            <Column title="No." dataIndex="no" key="no" />
                            <Column title="Nama" dataIndex="name" key="name" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="No. Telepon" dataIndex="no_telp" key="no_telp" />
                            <Column title="Alamat" dataIndex="address" key="address" />
                            <Column title="Jumlah Transaksi" dataIndex="transaction_total" key="transaction_total" />
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
                        <span className="">Total : {stateDataFilter?.length} Data</span>
                    </div>
                </div>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
