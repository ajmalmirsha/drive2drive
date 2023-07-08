

import './userNotifications.css'
export default function UserNotifications({ props }) {

  return (
    <div className="list-notifications mx-3" style={{height:'80vh'}} >
      { props.length > 0 ? props.map((x) => {
        return (
          <div className="notifications row m-3">
            <div className="col-md-10 pt-1">
              <h4>{x.title}</h4>
              <p>{x.message}</p>
            </div>
            <div className="col-md-2 d-flex align-items-center">
              {x.image?.url &&
                <img className='notification-img my-2' src={x.image?.url} alt="" />
              }
            </div>
          </div>
        )
      }):
    <p className='text-center mt-4' >you don't have any notification</p>
    } 
    
    </div>
  )
}