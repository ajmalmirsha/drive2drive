

import './userNotifications.css'
export default function UserNotifications({ props }) {

  return (
    <div className="list-notifications mx-3">
      {props.map((x) => {
        return (
          <div className="notifications row m-3">
            <div className="col-md-10 pt-1">
              <h4>{x.title}</h4>
              <p>{x.message}</p>
            </div>
            <div className="col-md-2 d-flex align-items-center">
              {x.image &&
                <img className='notification-img my-2' src={process.env.REACT_APP_URL + '/public/images/notification/' + x.image} alt="" />
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}