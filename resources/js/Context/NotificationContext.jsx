import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const NotificationContext = createContext()

export default function NotificationProvider({ children }) {

    const [notification, setNotification] = useState([])

    // console.log(notification);


    const getNotif = async () => {
        await axios.get('/notification', {
            headers: {
                Accept: "application/json"
            }
        }).then(result => {
            setNotification(result?.data?.notifications)
        }).catch(error => {
            console.log(error);

        })
    }

    useEffect(() => {
        getNotif()
    }, [])

    return (
        <NotificationContext.Provider value={{ notification, setNotification, getNotif }}>
            {children}
        </NotificationContext.Provider>
    )
}
