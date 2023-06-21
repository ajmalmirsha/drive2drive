import { useCallback, useEffect, useRef, useState } from "react"
import UserNotifications from "../../Components/notifications/UserNotifications"
import Navbar from "../../Components/userHome/Navbar"
import { useParams } from "react-router-dom"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"


function UserNotificationPage () {
   const [ notifications, setNotifications] = useState([])
   const socket = useRef()
   const { role } = useParams()
   const authenticationHandler = useErrorHandler()
   const user = useSelector(state => state.user)
   useEffect(()=>{
      socket.current = io(process.env.REACT_APP_URL)
      socket.current.emit("add-user",user.id)
      console.log('user added to socket');
      userApi.get(`/get-all-notifications/${role}`).then(({data:{notifications}}) => {
         setNotifications(notifications)
      }).catch( err =>{
         console.log(err);
         authenticationHandler(err)
      })
   },[])
   const handleNotificationReceive = useCallback((data) => {
      console.log(notifications, 'got new notification', data.data);
      setNotifications(prevNotifications => [data.data, ...prevNotifications]);
    }, [notifications]);
    
    useEffect(() => {
      console.log(notifications, 'first notification');
    
      socket.current.on("notification-recieve-user", handleNotificationReceive);
    
      return () => {
        // Clean up the event listener when the component unmounts
        socket.current.off("notification-recieve-user", handleNotificationReceive);
      };
    }, [handleNotificationReceive]);
   return (
      <>
      <Navbar/>
      <UserNotifications props={notifications} />
      </>
   )
}

  
  export default UserNotificationPage