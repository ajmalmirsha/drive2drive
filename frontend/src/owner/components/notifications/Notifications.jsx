import { useEffect, useState } from "react"
import { ownerApi } from "../../../utils/Apis"
import '../../../user/Components/notifications/userNotifications.css'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    ownerApi.get('/get-owner-notifications').then(({ data: { data } }) => {
      setNotifications(data)
    })
  }, [])
  return (
    <div className="col-md-9 list-notifications my-3">
      {notifications.length > 0 && notifications.map((x) => {
        return (
          <div className="notifications row m-3">
            <div className="col-md-10 pt-1">
              <h4>jxchzxj</h4>
              <p>sdfdsf</p>
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