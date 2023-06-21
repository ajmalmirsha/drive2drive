import { useCallback, useEffect, useRef, useState } from "react"
import { ownerApi } from "../../../utils/Apis"
import '../../../user/Components/notifications/userNotifications.css'
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
export default function Notifications() {
  const socket = useRef()
  const [notifications, setNotifications] = useState([])
  const { ownerAuthenticationHandler } = useErrorHandler()
  const owner = useSelector(state => state.owner)
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_URL)
    socket.current.emit("add-user",owner.id)
    console.log('admin added to socket');
    ownerApi.get('/get-owner-notifications').then(({ data: { data } }) => {
      console.log(data,7887);
      setNotifications(data)
    }).catch( err => {
      console.log(err,56);
       ownerAuthenticationHandler(err)
    })
  }, [])

  const handleNotificationReceive = useCallback((data) => {
    console.log(notifications, 'got new notification', data.data);
    setNotifications(prevNotifications => [data.data, ...prevNotifications]);
  }, [notifications]);
  
  useEffect(() => {
    console.log(notifications, 'first notification');
  
    socket.current.on("notification-recieve-owner", handleNotificationReceive);
  
    return () => {
      // Clean up the event listener when the component unmounts
      socket.current.off("notification-recieve-owner", handleNotificationReceive);
    };
  }, [handleNotificationReceive]);
  
  return (
    <div className="col-md-9 list-notifications my-3">
      {notifications.length > 0 && notifications.map((x) => {
        return (
          <div className="notifications row m-3">
            <div className="col-md-10 pt-1">
              <h4>{x.title}</h4>
              <p>{x.message}</p>
            </div>
            <div className="col-md-2 d-flex align-items-center">
              {x.image &&
                <img className='notification-img my-2 img-fluid' src={process.env.REACT_APP_URL + '/public/images/notification/' + x.image} alt="" />
              }
            </div>

          </div>
        )
      })}
    </div>
  )
}