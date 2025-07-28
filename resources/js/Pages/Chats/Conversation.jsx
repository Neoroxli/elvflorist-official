import { usePage } from '@inertiajs/react';
import { Input, Popover, Result, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

export default function Conversation() {

    const location = usePage()
    const url_chat_id = location.url.split("=")[1]

    const [headerConversation, setHeaderConversation] = useState([])
    const [messageConversation, setMessageConversation] = useState([])

    const [sendMessage, setSendMessage] = useState({
        message: ''
    })
    const [loadingButtonSend, setLoadingButtonSend] = useState(false)

    const [openPopover, setOpenPopover] = useState(false);


    useEffect(() => {
        getChatForAdminByChatID()
    }, [])

    const getChatForAdminByChatID = async () => {
        await axios.get(`${import.meta.env.VITE_IP_FILE_STORAGE}/api/conversation-admin?chat=${url_chat_id}`, {
            headers: {
                Accept: "application/json"
            }
        }).then(res => {
            // console.log('tes', res?.data);
            setHeaderConversation(res?.data?.data?.header)
            setMessageConversation(res?.data?.data?.conversation)
        }).catch(error => {
            console.log(error);

        })
    }

    async function handleSendMessage(e) {
        setLoadingButtonSend(true)
        await axios.post(`${import.meta.env.VITE_IP_FILE_STORAGE}/api/send-message-admin`, {
            chat_id: headerConversation.id,
            message: sendMessage.message,
            status: 'admin'
        }, {
            headers: {
                Accept: "application/json"
            }
        }).then(result => {
            getChatForAdminByChatID()
        }).catch(error => {
            console.log(error);

        }).finally(() => {
            setSendMessage({ message: '' })
            setLoadingButtonSend(false)
        })
    }

    const handleOpenChange = newOpen => {
        setOpenPopover(newOpen);
    };

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[725px]" style={{ height: "725px", padding: '1.5rem' }}>
            <div className="flex justify-between pb-4 border-b border-gray-200 border-dashed sm:items-center dark:border-slate-700">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <span className="absolute bottom-0 right-0 text-green-500">
                            <svg width="14" height="14">
                                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                            </svg>
                        </span>
                        <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${headerConversation?.id}`} alt="" className="w-10 h-10 rounded-full sm:w-16 sm:h-16" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center mt-1 text-xl font-medium">
                            <span className="mr-3 text-gray-700 dark:text-slate-200">{headerConversation.user?.name} - {headerConversation.bucket?.name}</span>
                        </div>
                        {/* <span className="text-sm text-gray-500">online</span> */}
                    </div>
                </div>
            </div>
            <div id="messages" className="flex flex-col p-3 space-y-4 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                {
                    messageConversation?.map(conversation => (
                        conversation.status === "user" ?
                            <div className="chat-message">
                                <div className="flex items-end">
                                    <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-sm font-medium">
                                        <div>
                                            <span className="inline-block px-4 py-2 text-gray-600 border border-gray-100 rounded-bl-none bg-gray-50 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-400" style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                                <div className="flex items-end gap-3">
                                                    <p>{conversation.message}</p>

                                                    <small className="">{moment(conversation.created_at).format('LT')}</small>
                                                </div>
                                            </span>
                                        </div>
                                        <small>{moment(conversation.created_at).format('ll')}</small>
                                    </div>
                                    {/* <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${conversation?.chat_id}`} alt="My profile" className="order-1 w-8 h-8 rounded-full" /> */}
                                </div>
                            </div>
                            :
                            <div className="chat-message">
                                <div className="flex items-end justify-end">
                                    <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-sm font-medium">
                                        <div>
                                            <span className="inline-block px-4 py-2 text-white rounded-br-none " style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: "#fc95c4" }}>
                                                <div className="flex items-end gap-3">
                                                    <p>{conversation.message}</p>

                                                    <div className="flex gap-1">
                                                        <small>{moment(conversation.created_at).format('LT')}</small>
                                                        <Popover
                                                            content={
                                                                <div className="flex flex-col" style={{ gap: 10 }}>
                                                                    <div className="flex justify-between">
                                                                        <div className="flex" style={{ gap: 3 }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="15px" width="15px" fill="gray"><path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" /></svg>
                                                                            <b>Delivered</b>
                                                                        </div>
                                                                        <span >{moment(conversation?.created_at).format('LT')}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <div className="flex" style={{ gap: 3 }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="15px" width="15px" fill="#4096ff"><path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" /></svg>
                                                                            <b>Read</b>
                                                                        </div>
                                                                        <span >{conversation?.read_at ? moment(conversation?.read_at).format('LT') : "null"}</span>
                                                                    </div>
                                                                </div>
                                                            }
                                                            title="Waktu Chat"
                                                            trigger="click"
                                                            open={openPopover}
                                                            onOpenChange={() => handleOpenChange()}
                                                            placement="topRight"
                                                        >
                                                            <span className="cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="15px" width="15px" fill={conversation.read_at ? "#4096ff" : "white"}>
                                                                    <path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3
                                                            0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3
                                                            0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" />
                                                                </svg>
                                                            </span>
                                                        </Popover>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <small>{moment(conversation.created_at).format('ll')}</small>
                                    </div>
                                    {/* <img src="assets/images/users/avatar-5.jpg" alt="My profile" className="order-2 w-8 h-8 rounded-full" /> */}
                                </div>
                            </div>
                    ))
                }
            </div>
            <div className="pt-4 mb-2 border-t border-gray-200 border-dashed sm:mb-0 dark:border-slate-700" style={{ borderStyle: "dashed", paddingTop: "1rem" }}>
                <div className="relative flex gap-2">
                    {/* <input type="text" placeholder="Write your message!" className="w-full py-2 pl-12 text-gray-600 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400 bg-gray-50 dark:bg-slate-700 dark:border-slate-800" /> */}
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} name="message"
                        className="w-full py-2 pl-12 text-gray-600 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400 bg-gray-50 dark:bg-slate-700 dark:border-slate-800"
                        placeholder="Tulis Pesan...."
                        value={sendMessage.message}
                        onChange={(e) => setSendMessage({ ...sendMessage, message: e.target.value })}
                    />
                    <div className="inset-y-0 right-0 items-center hidden sm:flex">
                        <button type="button"
                            className={
                                sendMessage.message ?
                                    "inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out rounded-md bg-info hover:bg-blue-400 focus:outline-none"
                                    :
                                    "inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out rounded-md bg-gray-300 hover:bg-blue-400 focus:outline-none"
                            }
                            onClick={() => handleSendMessage()}
                            disabled={sendMessage.message == "" || loadingButtonSend ? true : false}
                        >
                            {
                                loadingButtonSend ?
                                    <div class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    :
                                    <i className="mgc_send_fill"></i>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
