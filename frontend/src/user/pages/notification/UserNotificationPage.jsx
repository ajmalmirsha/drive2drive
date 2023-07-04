import { useCallback, useEffect, useRef, useState } from "react"
import UserNotifications from "../../Components/notifications/UserNotifications"
import Navbar from "../../Components/userHome/Navbar"
import { useParams } from "react-router-dom"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import Spinner from "../../../common/spinners/Spinner"


function UserNotificationPage() {
   const [notifications, setNotifications] = useState([])
   const socket = useRef()
   const { role } = useParams()
   const authenticationHandler = useErrorHandler()
   const user = useSelector(state => state.user)
   const [loading, setLoading] = useState(false)
   useEffect(() => {
      socket.current = io(process.env.REACT_APP_URL)
      socket.current.emit("add-user", user.id)
      setLoading(true)
      userApi.get(`/get-all-notifications/${role}`).then(({ data: { notifications } }) => {
         setLoading(false)
         setNotifications(notifications)
      }).catch(err => {
         authenticationHandler(err)
      })
   }, [])
   const handleNotificationReceive = useCallback((data) => {
      setNotifications(prevNotifications => [data.data, ...prevNotifications]);
   }, [notifications]);

   useEffect(() => {
      socket.current.on("notification-recieve-user", handleNotificationReceive);
      return () => {
         socket.current.off("notification-recieve-user", handleNotificationReceive);
      };
   }, [handleNotificationReceive]);
   return (
      <>
         <Navbar />
         {loading ? <Spinner /> :
            <UserNotifications props={notifications} />
         }
      </>
   )
}


export default UserNotificationPage