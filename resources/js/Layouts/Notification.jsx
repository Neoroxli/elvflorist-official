import Dropdown from "@/Components/Dropdown";
import { Empty } from "antd";
import axios from "axios";
import moment from "moment/moment";
// import Echo from "laravel-echo";
import { useContext, useEffect, useState } from "react";
import "moment/locale/id";
import { Link } from "@inertiajs/react";
import { NotificationContext } from "@/Context/NotificationContext";
moment.locale("id");

export default function Notification({ user }) {
    // console.log('t : ', user);

    const { notification, getNotif } = useContext(NotificationContext)


    useEffect(() => {
        // Echo.channel(`notification_progress.` + user?.user?.id)
        //     .listen('.progress-notification', (e) => {
        //         console.log('Berhasil listen');
        //         console.log('notif : ', e);
        //         getNotif()
        //         // messages.push(
        //         //     {body: e.messageTeknisi.body}
        //         // )

        //     });

        // return () => {
        //     Echo.channel(`notification_progress.${user?.user?.id}`).stopListening('.progress-notification');
        // };

        const channel = Echo.channel(`notification_progress.${user?.id}`);
        // const channel = Echo.private('notification_progress.' + user?.user?.id);

        channel.listen('.progress-notification', (event) => {
            // setNotificationPusher((prev) => [...prev, event.message]);
            // notification.push(event.message);
            // console.log('notif : ', event);

            getNotif()
        });

        return () => {
            channel.stopListening('.progress-notification');
        };
    }, [])

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    data-fc-type="dropdown"
                    data-fc-placement="bottom-end"
                    type="button"
                    className="nav-link p-2 fc-dropdown"
                >
                    <span className="sr-only">View notifications</span>
                    <span className="flex items-center justify-center h-6 w-6">
                        <i className="mgc_notification_line text-2xl"></i>
                        {
                            notification.length ?
                                <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white">{notification.length}</span>
                                : null
                        }
                    </span>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content width="80">
                <div className="fc-dropdown fc-dropdown-open:opacity-100 open opacity-0 w-80 z-50 mt-2 transition-[margin,opacity] duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg absolute" style={{ insetInlineEnd: "-70px" }}>
                    <div className="p-2 border-b border-dashed border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h6 className="text-sm"> Notification</h6>
                            {/* <a href="#" className="text-gray-500 underline">
                                <small>Clear All</small>
                            </a> */}
                        </div>
                    </div>

                    <div className="p-4 h-80" data-simplebar>
                        {
                            notification.length ?
                                notification?.map(notif => (
                                    <div key={notif.id}>
                                        <Link href="/order-check" className="block mb-4">
                                            <div className="card-body">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="flex justify-center items-center h-9 w-9 rounded-full bg text-white bg-primary">
                                                            {/* <i className="mgc_message_3_line text-lg"></i> */}
                                                            <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${notif?.id}`} className="rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow truncate ms-2">
                                                        <h5 className="text-sm font-semibold mb-1">
                                                            {notif?.order?.user?.name}
                                                            <small className="font-normal text-gray-500 ms-1">
                                                                {moment(notif?.created_at).isAfter(moment().subtract(24, 'hours')) ?
                                                                    moment(notif?.created_at).fromNow()
                                                                    : moment(notif?.created_at).format('lll') + " WIT"}
                                                            </small>
                                                        </h5>
                                                        <small className="noti-item-subtitle text-muted">
                                                            {notif?.data}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                                :
                                <Empty style={{ marginTop: "50px" }} />
                        }

                        {/* <a href="#" className="block mb-4">
                            <div className="card-body">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex justify-center items-center h-9 w-9 rounded-full bg-info text-white">
                                            <i className="mgc_user_add_line text-lg"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow truncate ms-2">
                                        <h5 className="text-sm font-semibold mb-1">
                                            Admin{" "}
                                            <small className="font-normal text-gray-500 ms-1">
                                                1 hr ago
                                            </small>
                                        </h5>
                                        <small className="noti-item-subtitle text-muted">
                                            New user registered
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </a> */}
                    </div>

                    {/* <a
                        href="#"
                        className="p-2 border-t border-dashed border-gray-200 dark:border-gray-700 block text-center text-primary underline font-semibold"
                    >
                        View All
                    </a> */}
                </div>
            </Dropdown.Content>
        </Dropdown>
    )
}
