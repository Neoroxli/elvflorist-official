import { Link, usePage } from '@inertiajs/react';
import logo from '../../../public/img/logo.jpg'

const NavigationLayout = () => {

    const user = usePage().props.auth.user;
    // console.log(user);


    const o = document.getElementsByTagName("html")[0];

    const hideBackdrop = () => {
        o.classList.remove("sidenav-enable");
        var e = document.getElementById("backdrop");
        e &&
            (document.body.removeChild(e),
                (document.body.style.overflow = null),
                (document.body.style.paddingRight = null));
    }

    const handleChat = () => {
        o.setAttribute("data-sidenav-view", "sm")
    }

    return (
        // <!-- Sidenav Menu -->
        <div className="app-menu">

            {/* <!-- Sidenav Brand Logo --> */}
            <a href={route('dashboard')} className="logo-box">
                {/* <!-- Light Brand Logo --> */}
                <div className="items-center logo-light">
                    <img src={logo} className="rounded-full logo-lg" alt="Light logo" style={{ height: "3rem" }} />
                    <img src={logo} className="rounded-full logo-sm" alt="Small logo" />
                    <h1 className="text-lg ms-3 logo-lg" style={{ fontWeight: "900" }}>Elv-Florist</h1>
                </div>

                {/* <!-- Dark Brand Logo --> */}
                {/* <div className="logo-dark"> */}
                <div className="items-center logo-dark">
                    <img src={logo} className="rounded-full logo-lg" alt="Dark logo" style={{ height: "3rem" }} />
                    <img src={logo} className="rounded-full logo-sm" alt="Small logo" />
                    <h1 className="text-lg ms-3 logo-lg" style={{ fontWeight: "900" }}>Elv-Florist</h1>
                </div>
            </a>


            <div className="srcollbar" data-simplebar>
                <ul className="menu" data-fc-type="accordion">
                    <li className="menu-title">Halaman Utama</li>

                    <li className="menu-item" onClick={hideBackdrop}>
                        <Link href={route('dashboard')} className={route().current('dashboard') ? "menu-link active" : "menu-link"}>
                            <span className="menu-icon"><i className="mgc_home_3_line"></i></span>
                            <span className="menu-text"> Dashboard </span>
                        </Link>
                    </li>

                    {/* role admin */}
                    {
                        user?.role_id === 1 && (
                            <>
                                <li className="menu-title">Master Data</li>

                                <li className="menu-item">
                                    <Link href={route('master-data.data-bucket')} className={route().current('master-data.data-bucket*') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_flower_2_line"></i></span>
                                        <span className="menu-text"> Data Bucket </span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('master-data.data-item')} className={route().current('master-data.data-item') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_sitemap_line"></i></span>
                                        <span className="menu-text"> Data Item </span>
                                    </Link>
                                </li>

                                <li className="menu-title">Pesanan</li>

                                <li className="menu-item">
                                    <Link href={route('order.customer')} className={route().current('order.customer*') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_user_3_fill"></i></span>
                                        <span className="menu-text"> Data Pembeli </span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('order.index')} className={route().current('order.index') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_shopping_bag_1_fill"></i></span>
                                        <span className="menu-text"> Data Pesanan </span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link href={route('chat.index')} className={route().current('chat.index') ? "menu-link active" : "menu-link"} onClick={handleChat}>
                                        <span className="menu-icon"><i className="mgc_message_4_line"></i></span>
                                        <span className="menu-text"> Chat </span>
                                    </Link>
                                </li>

                                <li className="menu-title">Laporan</li>
                                <li className="menu-item">
                                    <Link href={route('order-report.index')} className={route().current('order-report.index') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_task_2_line"></i></span>
                                        <span className="menu-text"> Laporan Pesanan </span>
                                    </Link>
                                    {/* <Link href={route('profile.edit')} className="menu-link">
                                        <span className="menu-icon"><i className="mgc_task_2_fill"></i></span>
                                        <span className="menu-text"> Laporan Keuangan </span>
                                    </Link> */}
                                </li>
                            </>
                        )
                    }

                    {/* role pemilik */}
                    {
                        user?.role_id === 2 && (
                            <>
                                <li className="menu-title">Pesanan</li>
                                <li className="menu-item">
                                    <Link href={route('checkOrder.index')} className={route().current('checkOrder.index') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_task_2_line"></i></span>
                                        <span className="menu-text"> Koreksi Pesanan </span>
                                    </Link>
                                </li>
                                <li className="menu-title">Laporan</li>
                                <li className="menu-item">
                                    <Link href={route('order-report.index')} className={route().current('order-report.index') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_task_2_line"></i></span>
                                        <span className="menu-text"> Laporan Pesanan </span>
                                    </Link>
                                </li>
                                <hr />
                                <li className="menu-title">Settings</li>
                                <li className="menu-item">
                                    <Link href={route('account.index')} className={route().current('account*') ? "menu-link active" : "menu-link"}>
                                        <span className="menu-icon"><i className="mgc_user_3_fill"></i></span>
                                        <span className="menu-text"> Akun Pegawai </span>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>

                {/* <div className="mx-5 my-10">
                    <div className="p-6 text-center rounded-md help-box bg-black/5">
                        <div className="flex justify-center mb-4">
                            <svg width="30" height="18" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 0c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.141.285 1.957 1.113 2.86 2.03C17.08 7.271 18.782 9 22.5 9c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.141-.285-1.957-1.113-2.86-2.03C20.42 1.728 18.718 0 15 0ZM7.5 9C3.5 9 1 11 0 15c1.5-2 3.25-2.75 5.25-2.25 1.141.285 1.957 1.113 2.86 2.03C9.58 16.271 11.282 18 15 18c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.141-.285-1.957-1.113-2.86-2.03C12.92 10.729 11.218 9 7.5 9Z" fill="#38BDF8"></path>
                            </svg>
                        </div>
                        <h5 className="mb-2">Unlimited Access</h5>
                        <p className="mb-3">Upgrade to plan to get access to unlimited reports</p>
                        <a href="#" className="text-white btn btn-sm bg-secondary">Upgrade</a>
                    </div>
                </div> */}
                {/* <div className="relative"> */}
                    <div className="absolute w-full menu" style={{bottom: 30}} data-fc-type="accordion">
                        <div className="menu-item">
                            <Link
                                className="w-full menu-link"
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                <span className="menu-icon"><i className="mgc_exit_line me-2"></i></span>
                                <span>Log Out</span>
                            </Link>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default NavigationLayout
