import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavigationLayout from "@/Layouts/NavigationLayout";
import TopBarLayout from "@/Layouts/TopBarLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Input, Result } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import Conversation from './Conversation';
const { TextArea } = Input;

export default function Chat({ children }) {

    const location = usePage()

    const [chatName, setChatName] = useState([])

    useEffect(() => {
        getChatForAdmin()
    }, [])

    const getChatForAdmin = async () => {
        axios.get(`${import.meta.env.VITE_IP_FILE_STORAGE}/api/chat-admin`, {
            headers: {
                Accept: "application/json"
            }
        }).then(res => {
            setChatName(res?.data?.chatName)
        }).catch(error => {
            console.log(error);

        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Chat App" />

            <NavigationLayout />
            <TopBarLayout
                nameTitle={"Chat"}
                segment1={"Elv-FLorist"}
                segment2={"Pesanan"}
                segment3={"Chat"}
                url={"/chat"}
            >
                <div className="container mx-auto px-2 min-h-[calc(100vh-138px)] relative pb-14" style={{ minHeight: "calc(100vh - 138px)" }}>
                    <div className="grid gap-4 lg:grid-cols-12" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
                        <div class="col-span-12 lg:col-span-3 mb-4">
                            <div class="card h-full">
                                <div class="card-header p-0 border-0">
                                    <b>Chat</b>
                                </div>
                                <div class="card-body p-0">
                                    <div id="ChatBox" class="h-[675px]" data-simplebar>
                                        <div class="" id="Chat" role="tabpanel" aria-labelledby="Chat-tab">
                                            <ul class="list-group">
                                                {
                                                    chatName.map(chat => (
                                                        <Link href={"/chat?chat-conversation=" + chat.chat_id} key={chat.chat_id}>
                                                            <li class={
                                                                location.url === `/chat?chat-conversation=${chat.chat_id}` ?
                                                                    "list-group-item items-center flex border-b border-dashed border-slate-200 dark:border-slate-700 p-4 unread bg-slate-100 dark:bg-slate-700"
                                                                    :
                                                                    "list-group-item items-center flex border-b border-dashed border-slate-200 dark:border-slate-700 p-4 unread bg-slate-50 dark:bg-slate-100"
                                                            }
                                                            // style={location.url === `/chat?chat-conversation=${chat.chat_id}` ? { backgroundColor: "#1e85ff1a", margin: 10 } : { backgroundColor: "#fff" }}
                                                            >
                                                                {/* <div className="flex p-2 rounded-lg" style={location.url === `/chat?chat-conversation=${chat.chat_id}` ? { backgroundColor: "#1e85ff1a" } : { backgroundColor: "#fff" }}> */}
                                                                <div class="">
                                                                    <div class="flex items-center">
                                                                        <div class="w-9 h-9 rounded relative">
                                                                            {/* <span class="absolute text-green-500 -left-1 -top-1">
                                                                                <svg width="12" height="12">
                                                                                    <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
                                                                                </svg>
                                                                            </span> */}
                                                                            <img class="w-full h-full overflow-hidden object-cover rounded object-center" src={import.meta.env.VITE_IP_FILE_STORAGE + "/api/file?data=" + chat.foto} alt="logo" />
                                                                        </div>
                                                                        <div class="ms-2">
                                                                            <div class="cursor-pointer hover:text-gray-900 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none">
                                                                                <h5 class=" font-medium text-sm">{chat.user}</h5>
                                                                                <b>{chat.bucket}</b>
                                                                            </div>
                                                                            <p class="focus:outline-none text-gray-800 dark:text-gray-400 text-xs font-medium flex-wrap truncate w-40">{chat.message}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-auto self-center text-center">
                                                                    {
                                                                        chat.totalUnRead > 0 ?
                                                                            <span class="w-4 h-4 rounded-full bg-green-500 text-white text-xs font-medium text-center inline-block">{chat.totalUnRead}</span>
                                                                            : null
                                                                    }
                                                                    <p class="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium">{moment(chat.created_at).format('LT')}</p>
                                                                </div>
                                                                {/* </div> */}
                                                            </li>
                                                        </Link>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 lg:col-span-9" style={{ gridColumn: "span 9 / span 9" }}>
                            <div class="card mb-4">
                                {
                                    location.url === "/chat" ?
                                        <div class="flex-1 p:2 sm:p-6 justify-center flex flex-col h-[725px]" style={{ height: "725px", padding: '1.5rem' }}>
                                            <div class="flex sm:items-center items-center justify-center">
                                                <Result
                                                    status="info"
                                                    title="Silahkan Pilih Chat Terlebih Dahulu"
                                                    subTitle="No Data"
                                                    className="bg-white rounded"
                                                    style={{ fontFamily: "GT Walsheim Pro" }}
                                                />
                                            </div>
                                        </div>
                                        :
                                        <Conversation />
                                }



                            </div>
                        </div>
                    </div>
                </div>
            </TopBarLayout>
        </AuthenticatedLayout>
    )
}
