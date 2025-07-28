import PrimaryButton from "@/Components/PrimaryButton";
import { Link, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import logoProfile from "../../../public/img/default.jpg";
import Dropdown from "@/Components/Dropdown";
import logo from '../../../public/img/logo.jpg'
import Notification from "./Notification";
import axios from "axios";

const TopBarLayout = ({
    children,
    nameTitle,
    segment1,
    segment2,
    segment3,
    url,
}) => {

    const user = usePage().props.auth.user;

    const [openMobile, setOpenMobile] = useState(false);

    // const [notification, setNotification] = useState([])

    const [totalMessage, setTotalMessage] = useState(null)
    // console.log(totalMessage);


    const o = document.getElementsByTagName("html")[0];

    const handleOpen = () => {

        if (o.getAttribute("data-sidenav-view") == "mobile") {
            setOpenMobile(true);
            let a = (document.querySelector("html").classList = "sidenav-enable");
            document.body.style.overflow = "hidden";

            const e = document.createElement("div"),
                t =
                    ((e.id = "backdrop"),
                        (e.classList =
                            "transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"),
                        document.body.appendChild(e),
                        document.getElementsByTagName("html")[0] &&
                        ((document.body.style.overflow = "hidden"),
                            1140 < window.innerWidth &&
                            (document.body.style.paddingRight = "15px")),
                        this);
            e.addEventListener("click", function () {
                o.classList.remove("sidenav-enable");
                var e = document.getElementById("backdrop");
                e &&
                    (document.body.removeChild(e),
                        (document.body.style.overflow = null),
                        (document.body.style.paddingRight = null));
            });
        }
        else if (o.getAttribute("data-sidenav-view") == "default") {
            o.setAttribute("data-sidenav-view", "sm")
        }
        else {
            o.setAttribute("data-sidenav-view", "default")
        }
    };


    const handleTheme = (e) => {
        "light" === o.getAttribute("data-mode", "light")
            ? changeThemeMode("dark")
            : changeThemeMode("light");
    };

    const changeThemeMode = (e) => {
        (config.theme = e),
            o.setAttribute("data-mode", e),
            setSwitchFromConfig();
    };

    function setSwitchFromConfig() {
        sessionStorage.setItem("__CONFIG__", JSON.stringify(config));
    }

    const s = document.getElementById("light-dark-mode");

    useEffect(() => {
        totalMessageEntry()
    }, [])

    async function totalMessageEntry() {
        await axios.get(`${import.meta.env.VITE_IP_FILE_STORAGE}/api/total-message-entry`, {
            headers: {
                Accept: "application/json"
            }
        }).then(res => {
            const { data } = res
            setTotalMessage(data)
        }).catch(error => {
            console.log(error);

        })
    }

    // console.log(s);

    // s.addEventListener("click", function (e) {
    //     "light" === config.theme
    //         ? changeThemeMode("dark")
    //         : changeThemeMode("light");
    // })

    // console.log(config);

    // useEffect(() => {
    //     getNotif()
    // }, [])

    // const getNotif = async () => {
    //     await axios.get('/notification', {
    //         headers: {
    //             Accept: "application/json"
    //         }
    //     }).then(result => {
    //         setNotification(result?.data?.notifications)
    //     }).catch(error => {
    //         console.log(error);

    //     })
    // }

    return (
        <div className="page-content">
            <header className="flex items-center gap-3 px-4 app-header">
                <button
                    id="button-toggle-menu"
                    // className="p-2 nav-link lg:hidden"
                    className="p-2 nav-link"
                    aria-labelledby="menu toggle"
                    onClick={handleOpen}
                >
                    <span className="sr-only">Menu Toggle Button</span>
                    <span className="flex items-center justify-center w-6 h-6">
                        <i className="text-xl mgc_menu_line"></i>
                    </span>
                </button>

                <a href={route('dashboard')} className="logo-box">
                    <div className="logo-light">
                        <img src={logo} className="h-6 rounded-full logo-lg" alt="Light logo" />
                        <img src={logo} className="rounded-full logo-sm" alt="Small logo" />
                    </div>

                    <div className="logo-dark">
                        <img src={logo} className="h-6 rounded-full logo-lg" alt="Dark logo" />
                        <img src={logo} className="rounded-full logo-sm" alt="Small logo" />
                    </div>
                </a>

                {/* <button
                    type="button"
                    data-fc-type="modal"
                    data-fc-target="topbar-search-modal"
                    className="p-2 nav-link me-auto"
                >
                    <span className="sr-only">Search</span>
                    <span className="flex items-center justify-center w-6 h-6">
                        <i className="text-2xl mgc_search_line"></i>
                    </span>
                </button> */}
                <b className="p-2 nav-link me-auto" style={{ fontSize: 16, fontStyle: "normal" }}>{user?.role_id == 1 ? "Admin" : "Pemilik"} Elv-FLorist</b>

                {/* <div className="hidden md:flex">
                    <button
                        data-toggle="fullscreen"
                        type="button"
                        className="p-2 nav-link"
                    >
                        <span className="sr-only">Fullscreen Mode</span>
                        <span className="flex items-center justify-center w-6 h-6">
                            <i className="text-2xl mgc_fullscreen_line"></i>
                        </span>
                    </button>
                </div> */}

                {
                    user?.role_id === 2 ?
                        <div className="relative md:flex sm:hidden">
                            <Notification user={user} />
                        </div>
                        :
                        <div className="relative flex md:flex sm:hidden">
                            {/* <Notification user={user} /> */}
                            <Link
                                href="/chat"
                                data-fc-type="dropdown"
                                data-fc-placement="bottom-end"
                                className={route().current('chat.index') ? "p-2 nav-link active fc-dropdown" : "p-2 nav-link fc-dropdown"}
                            >
                                <span className="sr-only">View notifications</span>
                                <span className="flex items-center justify-center w-6 h-6">
                                    <i className="text-2xl mgc_message_4_line"></i>
                                    {
                                        totalMessage?.data > 0 ?
                                        <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white">{totalMessage?.data}</span>
                                        : null
                                    }
                                </span>
                            </Link>
                        </div>
                }

                <div className="flex">
                    <button
                        id="light-dark-mode"
                        type="button"
                        className="p-2 nav-link"
                        onClick={handleTheme}
                    >
                        <span className="sr-only">Light/Dark Mode</span>
                        <span className="flex items-center justify-center w-6 h-6">
                            <i className="text-2xl mgc_moon_line"></i>
                        </span>
                    </button>
                </div>

                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                data-fc-type="dropdown"
                                data-fc-placement="bottom-end"
                                type="button"
                                className="nav-link fc-dropdown open"
                            >
                                <img
                                    src={logoProfile}
                                    alt="user-image"
                                    className="h-10 rounded-full"
                                />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content width="50">
                            <div className="fc-dropdown fc-dropdown-open:opacity-100 opacity-0 w-44 z-50 transition-[margin,opacity] duration-300 mt-2 bg-white shadow-lg border rounded-lg p-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 absolute open">
                                {/* <a
                                    className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    href="pages-gallery.html"
                                >
                                    <i className="mgc_pic_2_line me-2"></i>
                                    <span>Gallery</span>
                                </a>
                                <a
                                    className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    href="apps-kanban.html"
                                >
                                    <i className="mgc_task_2_line me-2"></i>
                                    <span>Kanban</span>
                                </a>
                                <a
                                    className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    href="auth-login.html"
                                >
                                    <i className="mgc_lock_line me-2"></i>
                                    <span>Lock Screen</span>
                                </a>
                                <hr className="my-2 -mx-2 border-gray-200 dark:border-gray-700" /> */}
                                <Link
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <i className="mgc_exit_line me-2"></i>
                                    <span>Log Out</span>
                                </Link>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </header>

            {/* untuk memunculkan fitur search */}
            <div>
                <div
                    id="topbar-search-modal"
                    className="fixed top-0 z-50 hidden w-full h-full fc-modal start-0"
                >
                    <div className="m-12 transition-all opacity-0 fc-modal-open:opacity-100 fc-modal-open:duration-500 sm:max-w-lg sm:w-full sm:mx-auto">
                        <div className="max-w-2xl mx-auto overflow-hidden transition-all bg-white shadow-2xl rounded-xl dark:bg-slate-800">
                            <div className="relative">
                                <div className="pointer-events-none absolute top-3.5 start-4 text-gray-900 text-opacity-40 dark:text-gray-200">
                                    <i className="text-xl mgc_search_line"></i>
                                </div>
                                <input
                                    type="search"
                                    className="w-full h-12 text-gray-900 placeholder-gray-500 bg-transparent border-0 ps-11 pe-4 dark:placeholder-gray-300 dark:text-gray-200 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow p-6">
                <div
                    className="p-4 mb-3 text-sm rounded-md bg-danger/25 text-danger sm:hidden"
                    role="alert"
                >
                    Tidak disarankan membuka panel admin di device seluler
                </div>
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-medium text-slate-900 dark:text-slate-200">
                        {nameTitle}
                    </h4>

                    <div className="md:flex hidden items-center gap-2.5 text-sm font-semibold">
                        <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-400">
                                {segment1}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <i className="flex-shrink-0 text-lg mgc_right_line text-slate-400 rtl:rotate-180"></i>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-400">
                                {segment2}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <i className="flex-shrink-0 text-lg mgc_right_line text-slate-400 rtl:rotate-180"></i>
                            <Link
                                href={url}
                                className="text-sm font-medium text-slate-700 dark:text-slate-400"
                                aria-current="page"
                            >
                                {segment3}
                            </Link>
                        </div>
                    </div>
                </div>
                {children}
            </main>

            {/* <!-- Footer Start --> */}
            <footer className="flex items-center h-16 px-6 bg-white shadow footer dark:bg-gray-800">
                <div className="flex justify-center w-full gap-4">
                    <div>
                        {new Date().getFullYear()} © Elv-FLorist -{" "}
                        <a href="https://coderthemes.com/" target="_blank">
                            Version 1.0
                        </a>
                    </div>
                </div>
            </footer>
            {/* <!-- Footer End --> */}
        </div>
    );
};

export default TopBarLayout;
