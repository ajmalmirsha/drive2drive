import { useEffect, useState } from "react"
import UserNotifications from "../../Components/notifications/UserNotifications"
import Navbar from "../../Components/userHome/Navbar"
import axios from "axios"
import { useParams } from "react-router-dom"


function UserNotificationPage () {
   const [ notifications, setNotifications] = useState([])
   const { role } = useParams()
   useEffect(()=>{
      axios.get(`${process.env.REACT_APP_URL}/get-all-notifications/${role}`).then(({data:{notifications}}) => {
         setNotifications(notifications)
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