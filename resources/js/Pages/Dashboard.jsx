import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from '@/Layouts/NavigationLayout';
import TopBarLayout from '@/Layouts/TopBarLayout';
import { Head } from '@inertiajs/react';
import { Button, DatePicker, Empty, Modal, Select, Spin } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
// import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
// const { MonthPicker } = DatePicker;

export default function Dashboard({ totalOrder, successOrder, processOrder, captureOrder, totalIncome, financeData, orderData, employee }) {

    const [year, setYear] = useState(dayjs().year().toString())
    const [month, setMonth] = useState(new Date().getMonth() + 1)

    const [showTotalOrder, setShowTotalOrder] = useState({
        totalOrder: totalOrder?.length ?? 0,
        successOrder: successOrder?.length ?? 0,
        processOrder: processOrder?.length ?? 0,
        captureOrder: captureOrder?.length ?? 0,
        totalIncome: totalIncome,
        financeData: financeData,
        orderData: orderData,
        // employee: employee
    })
    const [showEmployee, setShowEmployee] = useState({
        employee: employee
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)
    // console.log(showTotalOrder);

    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    // grafik finance
    const seriesFinance = [{
        name: 'Pendapatan',
        data: showTotalOrder?.financeData.map(item => item.total)
    }];
    const optionsFinance = {
        chart: {
            id: "basic-bar",
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: showTotalOrder?.financeData.map(item => `${monthNames[item.month - 1]}`)
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return formatCurrency(val);
                }
            }
        },
        datalabels: {
            enabled: false,
        },
        fill: {
            colors: ['#fc95c4']
        }
    }
    // -- end grafik finance --

    // grafik order
    const seriesOrder = [{
        name: 'Buket',
        data: showTotalOrder?.orderData.map(item => item.total_order),
    }];
    const optionsOrder = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: showTotalOrder?.orderData.map(item => `${monthNames[item.month - 1]}`)
        },
        plotOptions: {
            bar: {
                distributed: true
            }
        },
        fill: {
            colors: ['#fc95c4', '#ff0020', '#800080', '#ffbc00', '#0acf97', '#3073F1', '#fa5c7c', '#f1b44c', '#e2e2e2', '#e2e2e2', '#e2e2e2', '#e2e2e2']
        },
    }
    // -- end grafik order --

    // grafik employee
    const seriesEmployee = [
        {
            name: 'Total',
            data: showEmployee?.employee.map(item => item.total_order)
        },
        {
            name: 'Pesanan Selesai',
            data: showEmployee?.employee.map(item => item.success_order)
        },
        {
            name: 'Pesanan Sedang Diproses',
            data: showEmployee?.employee.map(item => item.process_order)
        }
    ];
    const optionsEmployee = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: showEmployee?.employee.map(item => item.user)
        },
        fill: {
            colors: ['#fc95c4', '#ff0020', '#800080']
        }
    }
    // -- end grafik employee --

    // grafik employee per bulan
    // const seriesEmployeeMonth = [
    //     {
    //         name: 'Total',
    //         data: showEmployee?.employee.map(item => item.total_order)
    //     },
    //     {
    //         name: 'Pesanan Selesai',
    //         data: showEmployee?.employee.map(item => item.success_order)
    //     },
    //     {
    //         name: 'Pesanan Sedang Diproses',
    //         data: showEmployee?.employee.map(item => item.process_order)
    //     }
    // ];
    // const optionsEmployeeMonth = {
    //     chart: {
    //         id: "basic-bar"
    //     },
    //     xaxis: {
    //         categories: showEmployee?.employee.map(item => item.user)
    //     },
    // }
    // -- end grafik employee per bulan --

    const handleYear = async (dateString) => {
        // console.log(dateString);
        setYear(dateString)

        setIsLoading(true)
        await axios.get(`/dashboard/periode?year=${dateString}&month=${month}`, {
            headers: {
                Accept: 'application/json',
            }
        }).then(result => {
            const { data } = result
            setShowTotalOrder({
                totalOrder: data.totalOrder,
                successOrder: data.successOrder,
                processOrder: data.processOrder,
                captureOrder: data.captureOrder,
                totalIncome: data.totalIncome,
                financeData: data.financeData,
                orderData: data.orderData,
                // employee: data.employee
            })
            setShowEmployee({
                employee: data.employee
            })

        }).catch(error => {
            console.log(error);

        }).finally(() => {
            setIsLoading(false)
        })

    }

    const handleMonth = async (dateString) => {
        // const yearMonth = dateString.split('-')
        // // const year = yearMonth[0]
        // const month = yearMonth[1]

        setMonth(dateString)
        setIsLoadingEmployee(true)
        await axios.get(`/dashboard/employee?year=${year}&month=${dateString}`, {
            headers: {
                Accept: 'application/json',
            }
        }).then(result => {
            const { data } = result

            setShowEmployee({
                employee: data.employee
            })

        }).catch(error => {
            console.log(error);

        }).finally(() => {
            setIsLoadingEmployee(false)
        })

    }

    function getMonthName(monthNumber, locale = 'id-ID') {
        const date = new Date();
        date.setMonth(monthNumber - 1); // Set bulan berdasarkan angka (1-12)
        return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    }

    return (
        <AuthenticatedLayout
        // user={auth.user}
        // header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Dashboard"}
                segment1={"Elv-FLorist"}
                segment2={"Halaman Utama"}
                segment3={"Dashboard"}
                url={"/dashboard"}
            >
                <div className="grid gap-6 mb-6 2xl:grid-cols-4">
                    <div className="2xl:col-span-4">
                        <div className="bg-gray-200 card">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h4 className="card-title">Hasil Pesanan dan Pemasukan</h4>
                                    <h4>Periode <DatePicker defaultValue={dayjs()} allowClear={false} onChange={(date, dateString) => handleYear(dateString)} size="small" picker="year" /></h4>
                                </div>
                                <div className="grid gap-6 mb-6 xl:grid-cols-5 md:grid-cols-2">
                                    <div className="card dark:bg-gray-700" style={{ borderLeftWidth: "6px", borderLeftColor: "blue" }}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="mb-1 text-base text-gray-600 dark:text-gray-400">Total Pesanan</h4>
                                                    <p className="text-2xl font-normal text-gray-400 truncate dark:text-gray-500">{showTotalOrder.totalOrder} Buket</p>
                                                </div>

                                            </div>

                                            {/* <div className="flex items-end">
                                                <div className="flex-grow">
                                                    <p className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold"><i className="mgc_alarm_2_line"></i> 4 Hrs ago</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dark:bg-gray-700" style={{ borderLeftWidth: "6px", borderLeftColor: "green" }}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="mb-1 text-base text-gray-600 dark:text-gray-400">Pesanan Selesai</h4>
                                                    <p className="text-2xl font-normal text-gray-400 truncate dark:text-gray-500">{showTotalOrder.successOrder} Buket</p>
                                                </div>

                                            </div>

                                            {/* <div className="flex items-end">
                                                <div className="flex-grow">
                                                    <p className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold"><i className="mgc_alarm_2_line"></i> 4 Hrs ago</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dark:bg-gray-700" style={{ borderLeftWidth: "6px", borderLeftColor: "#FFC107" }}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="mb-1 text-base text-gray-600 dark:text-gray-400">Pesanan Diproses</h4>
                                                    <p className="text-2xl font-normal text-gray-400 truncate dark:text-gray-500">{showTotalOrder.processOrder} Buket</p>
                                                </div>

                                            </div>

                                            {/* <div className="flex items-end">
                                                <div className="flex-grow">
                                                    <p className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold"><i className="mgc_alarm_2_line"></i> 4 Hrs ago</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dark:bg-gray-700" style={{ borderLeftWidth: "6px", borderLeftColor: "red" }}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="mb-1 text-base text-gray-600 dark:text-gray-400">Pesanan Belum Diproses</h4>
                                                    <p className="text-2xl font-normal text-gray-400 truncate dark:text-gray-500">{showTotalOrder.captureOrder} Buket</p>
                                                </div>

                                            </div>

                                            {/* <div className="flex items-end">
                                                <div className="flex-grow">
                                                    <p className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold"><i className="mgc_alarm_2_line"></i> 4 Hrs ago</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dark:bg-gray-700" style={{ borderLeftWidth: "6px", borderLeftColor: "greenyellow" }}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="mb-1 text-base text-gray-600 dark:text-gray-400">Total Pemasukan</h4>
                                                    <p className="text-2xl font-normal text-gray-400 truncate dark:text-gray-500">{formatCurrency(showTotalOrder.totalIncome)}</p>
                                                </div>
                                                <Button type="text" icon={<span className="p-0 mgc_information_fill" />} onClick={() => Modal.info({
                                                    title: "Informasi Total Pemasukan",
                                                    content: <>
                                                        <p>Total Pemasukan terdiri dari :</p>
                                                        <b>harga bucket + biaya layanan (Rp. 1000/Transaksi) + Total harga tambahan item (optional)</b>
                                                        <div className="mt-3">
                                                            <small>Catatan :</small>
                                                            <p>Total harga tambahan item bersifat optional artinya bisa terdapat penambahan item atau bisa tidak ada penambahan item</p>
                                                        </div>
                                                    </>
                                                })} />
                                            </div>

                                            {/* <div className="flex items-end">
                                                <div className="flex-grow">
                                                    <p className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold"><i className="mgc_alarm_2_line"></i> Periode {moment().format('YYYY')}</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* <div class="col-span-1">
                        <div class="card mb-6">
                            <div class="px-6 py-5 flex justify-between items-center">
                                <h4 class="header-title">Pesanan Pelanggan</h4>
                            </div>

                            <div class="p-6 space-y-3">
                                <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded px-3 py-2">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="w-12 h-12 flex justify-center items-center rounded-full text-primary bg-primary/25">
                                            <i class="mgc_group_line text-xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-grow">
                                        <h5 class="font-semibold mb-1">Project Discssion</h5>
                                        <p class="text-gray-400">6 Person</p>
                                    </div>
                                    <div>
                                        <button class="text-gray-400" data-fc-type="tooltip" data-fc-placement="top">
                                            <i class="mgc_information_line text-xl"></i>
                                        </button>
                                        <div class="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                            Info <div class="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]" data-fc-arrow=""></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded px-3 py-2">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="w-12 h-12 flex justify-center items-center rounded-full text-warning bg-warning/25">
                                            <i class="mgc_compass_line text-xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-grow">
                                        <h5 class="fw-semibold my-0">In Progress</h5>
                                        <p>16 Projects</p>
                                    </div>
                                    <div>
                                        <button class="text-gray-400" data-fc-type="tooltip" data-fc-placement="top">
                                            <i class="mgc_information_line text-xl"></i>
                                        </button>
                                        <div class="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                            Info <div class="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]" data-fc-arrow=""></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded px-3 py-2">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="w-12 h-12 flex justify-center items-center rounded-full text-danger bg-danger/25">
                                            <i class="mgc_check_circle_line text-xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-grow">
                                        <h5 class="fw-semibold my-0">Completed Projects</h5>
                                        <p>24</p>
                                    </div>
                                    <div>
                                        <button class="text-gray-400" data-fc-type="tooltip" data-fc-placement="top">
                                            <i class="mgc_information_line text-xl"></i>
                                        </button>
                                        <div class="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                            Info <div class="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]" data-fc-arrow=""></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded px-3 py-2">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="w-12 h-12 flex justify-center items-center rounded-full text-success bg-success/25">
                                            <i class="mgc_send_line text-xl"></i>
                                        </div>
                                    </div>
                                    <div class="flex-grow">
                                        <h5 class="fw-semibold my-0">Delivery Projects</h5>
                                        <p>20</p>
                                    </div>
                                    <div>
                                        <button class="text-gray-400" data-fc-type="tooltip" data-fc-placement="top">
                                            <i class="mgc_information_line text-xl"></i>
                                        </button>
                                        <div class="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                            Info <div class="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]" data-fc-arrow=""></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card p-6">
                            <h4 class="text-gray-600 dark:text-gray-300 mb-2.5">On Time Completed Rate <span class="px-2 py-0.5 rounded bg-success/25 text-success ms-2"><i class="mgc_arrow_up_line text-sm align-baseline me-1"></i>59%</span></h4>
                            <div class="flex justify-between items-center mb-2">
                                <h5 class="text-base font-semibold">Completed Projects</h5>
                                <h5 class="text-gray-600 dark:text-gray-300">65%</h5>
                            </div>
                            <div class="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ">
                                <div class="flex flex-col justify-center overflow-hidden bg-primary w-1/4" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                    <div className="lg:col-span-1">
                        <div className="card">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="card-title">Grafik Pendapatan Bulanan Tahun {year}</h4>
                                </div>
                                {
                                    isLoading ?
                                        <Spin size="large" tip="Loading...">
                                            <Chart
                                                options={optionsFinance}
                                                series={seriesFinance}
                                                type="area"
                                                // width="100%"
                                                className="mt-3"
                                            />
                                        </Spin>
                                        :
                                        showTotalOrder?.financeData?.length ?
                                            <Chart
                                                options={optionsFinance}
                                                series={seriesFinance}
                                                type="area"
                                                // width="100%"
                                                className="mt-3"
                                            />
                                            :
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="card">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="card-title">Grafik Pesanan Bulanan Tahun {year}</h4>
                                </div>
                                {
                                    isLoading ?
                                        <Spin size="large" tip="Loading...">
                                            <Chart
                                                options={optionsOrder}
                                                series={seriesOrder}
                                                type="bar"
                                                // width="100%"
                                                className="mt-3"
                                            />
                                        </Spin>
                                        :
                                        showTotalOrder?.orderData?.length ?
                                            <Chart
                                                options={optionsOrder}
                                                series={seriesOrder}
                                                type="bar"
                                                // width="100%"
                                                className="mt-3"
                                            />
                                            :
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="card">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="card-title">Grafik Pekerja Tahun {year}</h4>
                                    {/* <h4>Bulan <DatePicker defaultValue={dayjs()} format={'MM'} allowClear={false} onChange={(date, dateString) => handleMonth(dateString)} size="small" picker="month" /></h4> */}
                                    {/* <MonthPicker defaultValue={dayjs()} allowClear={false} onChange={(date, dateString) => handleMonth(dateString)} size="small" picker="month" /> */}
                                    <h4>Bulan <Select
                                        defaultValue={getMonthName(new Date().getMonth() + 1)}
                                        // placeholder={monthNames[new Date().getMonth()]}
                                        // placeholder={getMonthName(new Date().getMonth() + 1)}
                                        style={{ width: 120 }}
                                        onChange={handleMonth}
                                        options={[
                                            { value: '01', label: 'Januari' },
                                            { value: '02', label: 'Februari' },
                                            { value: '03', label: 'Maret' },
                                            { value: '04', label: 'April' },
                                            { value: '05', label: 'Mei' },
                                            { value: '06', label: 'Juni' },
                                            { value: '07', label: 'Juli' },
                                            { value: '08', label: 'Agustus' },
                                            { value: '09', label: 'September' },
                                            { value: '10', label: 'Oktober' },
                                            { value: '11', label: 'November' },
                                            { value: '12', label: 'Desember' },
                                        ]}
                                    /></h4>
                                </div>
                                {
                                    isLoading || isLoadingEmployee ?
                                        <Spin size="large" tip="Loading...">
                                            <Chart
                                                options={optionsEmployee}
                                                series={seriesEmployee}
                                                type="bar"
                                                // width="100%"
                                                className="mt-3"
                                            />
                                        </Spin>
                                        :
                                        showEmployee?.employee?.length ?
                                            <Chart
                                                options={optionsEmployee}
                                                series={seriesEmployee}
                                                type="bar"
                                                // width="100%"
                                                className="mt-3"
                                            />
                                            :
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </TopBarLayout>
        </AuthenticatedLayout>
    );
}
