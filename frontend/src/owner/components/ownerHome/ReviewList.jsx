import { useEffect, useState } from "react"
import axios from 'axios'
import { useSelector } from "react-redux"
import './reviewList.css'
import img from '../../../images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
export default function ReviewList() {
  const { id } = useSelector(state => state.owner)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem('owner')) {
      axios.get(`${process.env.REACT_APP_URL}/owner/get-reviews/${id}`).then(({ data: { data } }) => {
        console.log(data, 666);
        const filteredData = data.filter((item) => item.reviews.length > 0);

        setUsers(filteredData)
      })
    }

  }, [])

  return (
    <div className="col-md-5  ms-3 mt-3 review-list">
      <h3>Reviews</h3>
      <hr />

      <div className="main">
        <div className="heads">
          {
            users.map((y) => {
              return (
                <div className="">
                  <div
                    onClick={() => {
                      setSelectedUser(y);
                    }}
                    className="row vehicles-review-list"
                  >
                    <p className="col-md-8">{y.product_name}
                      {/* {selectedUser == y &&<p onClick={()=>{
            console.log('clicked');
            
          }} className="float-end"><FontAwesomeIcon  icon={faCircleXmark} /></p>} */}
                    </p>
                    <div className="col-md-4">
                      <img className="vehicle-image " src={`${process.env.REACT_APP_URL}/public/images/${y.image[0]}`} alt="" />
                    </div>
                  </div>

                  {selectedUser === y &&
                    y.reviews.length ?
                    y.reviews.map((x) => {
                      return (
                        <div className="review-content my-2 p-2 bg-white">
                          <img className="user-profile" src={x.userimage.slice(0, 33) == 'https://lh3.googleusercontent.com' ? x.userimage : x.userimage ? `${process.env.REACT_APP_URL}/public/images/${x.userimage}` : img} alt="" />
                          <span className="ms-2 fw-900">
                            {x.username}
                            <div className="d-inline">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                  key={value}
                                  style={{ fontSize: '24px' }}
                                  className={`star-icon ${value <= x.rating ? 'filled' : ''
                                    }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </span>
                          <div className="my-1">{x.review}</div>
                          {x.image && <div className="col-md-3">
                            <img className='review-image' src={`${process.env.REACT_APP_URL}/public/images/reviewImages/${x.image}`} alt="LOADING" />
                          </div>}              </div>
                      );
                    }) : null}
                </div>
              );
            })
          }
        </div>
      </div>

    </div>
  )
}