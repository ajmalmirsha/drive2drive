import { useCallback, useEffect, useRef, useState } from "react"
import { ownerApi } from "../../../utils/Apis"
import '../../../user/Components/notifications/userNotifications.css'
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
import Spinner from "../../../common/spinners/Spinner"

export default function Notifications() {
  const socket = useRef()
  const [notifications, setNotifications] = useState([])
  const { ownerAuthenticationHandler } = useErrorHandler()
  const owner = useSelector(state => state.owner)
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    setLoading(true)
    socket.current = io(process.env.REACT_APP_URL)
    socket.current.emit("add-user", owner.id)
    ownerApi.get('/get-owner-notifications').then(({ data: { data } }) => {
      setLoading(false)
      setNotifications(data)
    }).catch(err => {
      ownerAuthenticationHandler(err)
    })
  }, [])

  const handleNotificationReceive = useCallback((data) => {
    setNotifications(prevNotifications => [data.data, ...prevNotifications]);
  }, [notifications]);

  useEffect(() => {
    socket.current.on("notification-recieve-owner", handleNotificationReceive);
    return () => {
      socket.current.off("notification-recieve-owner", handleNotificationReceive);
    };
  }, [handleNotificationReceive]);

  return (
    <div className="col-md-9 list-notifications" style={{height:'80vh'}} >
      <h3 className="my-2" >Notifications</h3>
      <hr />
      <div className="custom-scrollbar-white" style={{overflowY:'auto',height:'65vh'}} >
      { loading ? <Spinner/> : notifications.length > 0 ? notifications.map((x) => {
        return (
          <div className="notifications row m-3"  >
            <div className="col-md-10 pt-1">
              <h4>{x.title}</h4>
              <p>{x.message}</p>
            </div>
              {x.image?.url &&
            <div className="col-md-2 d-flex align-items-center">
                <img className='notification-img my-2 img-fluid' src={x.image?.url} alt="" />
            </div>
              }

          </div>
        )
      }) :
      <p className="text-center" >you don't have any notifications.</p>
      }
      </div>
    </div>
  )
}