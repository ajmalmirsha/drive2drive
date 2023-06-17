import { useEffect, useState } from "react"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler"
import Navbar from "../userHome/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import Payment from "../Stripe/Payment"


export default function UserBookings () {
    const [bookings,setBookings] = useState([])
    const {userAuthenticationHandler} = useErrorHandler()
    useEffect(()=>{
      userApi.get('/get-all-approved-bookings').then( ({data:{data}}) => {
        console.log(data);   
        setBookings(data)
      }).catch( err => {
          userAuthenticationHandler(err)
      })
    },[])
   
    return (
         <div>
       <Navbar/>
    <div className="row my-4 mx-2 gap-2">
  
        <div className="col-md-12 booking-verification" >
{       bookings.length > 0 && bookings.map((x)=>{
         return(
            <>
           <div className="bookings row m-3" >
            <div className="col-md-2 d-flex justify-content-center align-items-center">
                 <img className="booking-verify-vehicle-img" src={`${process.env.REACT_APP_URL}/public/images/${x.vehicle.image[0]}`} alt="" />
            </div>
            <div className="col-md-6 vehicle-details row">
              <div className="row">
              <h5 className="col-md-6" >{x.vehicle.vehicleName}</h5>
              <span className="col-md-6 ps-4">₹ {x.totalAmount}</span>
              </div>
                <div className="col-md-6 pickUp">
                    <span className="d-block fw-bold" >Pick information</span>
                    <span className="d-block" >
                        Time : {x.address?.pickUp?.pickTime}
                    </span>
                    <span className="d-block">
                        place : {x.address?.pickUp?.pickPlace}  <br /> {x.address?.pickUp?.pickCity}, {x.address?.pickUp?.pickDistrict}
                    </span>
                </div>
                <div className="col-md-6 dropOff">
                <span className="d-block fw-bold" >Drop information</span>
                    <span className="d-block" >
                        Time : {x.address?.dropOff?.dropTime}
                    </span>
                    <span className="d-block">
                    place : {x.address?.dropOff?.dropPlace}  <br /> {x.address?.dropOff?.dropCity}, {x.address?.dropOff?.dropDistrict}
                    </span>
                </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center gap-3 ">
              { 
              x.approvel.approved && !x.approvel.declined  &&
              <div className="bg-success text-white rounded-pill px-2 py-1">
                Approved
               </div> }
               {
                x.approvel.declined && !x.approvel.approved && 
               <div className="bg-danger text-white rounded-pill px-2 py-1">
                Declined
               </div>}
               {
                !x.approvel.declined && !x.approvel.approved && 
               <div className="bg-info text-white rounded-pill px-2 py-1">
                Pending
               </div>
                }
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center gap-3 ">
            { 
              x.approvel.approved && !x.approvel.declined && !x.paid  &&(
                <button type="button" class="btn btn-dark px-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <b>Pay</b> <FontAwesomeIcon icon={faCreditCard} />
              </button>
              
              )}

              {
                x.paid && 
                <div className="bg-dark text-white rounded-1 p-2">
                    paid <FontAwesomeIcon icon={faCreditCard} />
                </div>
              }
                 {/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <Payment props={x.totalAmount} setBookings={setBookings} bookingId={x._id} />
      </div>
     
    </div>
  </div>
</div>
            </div>
           </div>
           <hr />
           </>
           )})
           }
        </div>
    </div>
 
    </div>
    )
}