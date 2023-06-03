import { useEffect, useState } from "react"
import axios from 'axios'
import { useSelector } from "react-redux"
import './reviewList.css'
import img from '../../../images/default.png'

export default function ReviewList () {
    const {id} = useSelector(state => state.owner)
    const [reviews , setReviws] = useState([])
    useEffect(()=>{
        if(localStorage.getItem('owner')){
            axios.get(`${process.env.REACT_APP_URL}/owner/get-reviews/${id}`).then(({data:{data}})=>{
                console.log(data,666);
                let datas = []
                data.map(element => {
                    console.log(element.reviews,8);
                    datas.push(...element.reviews)
                });
                setReviws(datas)
            })
        }
      
    },[])
    reviews && console.log(reviews,777);
    return (
       <div className="col-md-5  ms-3 mt-3 review-list">
       <h3>Reviews</h3>
        <hr />

        <div className="main">
            <div className="head">
            {
            reviews.map((x)=>{
                return(
                <div className="review-content my-2 p-2 bg-white ">
                <img src={img} alt="" />
                <span className="ms-2 fw-900">jhone Doe   <div className="d-inline">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          style={{fontSize: '24px'}}
                          className={`star-icon ${value <= x.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>

                      ))}
                    </div></span>
                   <div className="my-1">{x.review}</div>
                </div>
                 )
                })
            }
            </div>
        </div>
        {/* {
            reviews.map((x)=>{
                return(
                    <p>{x.review}</p>
                )
            })
        } */}
       </div>
    )
}