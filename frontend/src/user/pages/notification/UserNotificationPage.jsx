import { useEffect, useState } from "react"
import UserNotifications from "../../Components/notifications/UserNotifications"
import Navbar from "../../Components/userHome/Navbar"
import { useParams } from "react-router-dom"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler"


function UserNotificationPage () {
   const [ notifications, setNotifications] = useState([])
   const { role } = useParams()
   const authenticationHandler = useErrorHandler()
   useEffect(()=>{
      userApi.get(`/get-all-notifications/${role}`).then(({data:{notifications}}) => {
         setNotifications(notifications)
      }).catch( err =>{
         console.log(err);
         authenticationHandler(err)
      })
   },[])
   return (
      <>
      <Navbar/>
      <UserNotifications props={notifications} />
      </>
   )
}

  
  export default UserNotificationPage