
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OwnerNavBar from "../ownerHome/OwnerNavBar";
import SideBar from "../ownerHome/SideBar";
import './bookingVerification.css'
import { faCircleCheck, faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";


export default function BookingVerifications () {
     const [verification, setVerification] = useState([])
    useEffect(()=>{
       ( async function (){
        const {data:{data}} = await axios.get(`${process.env.REACT_APP_URL}/owner/get-all-booking-verifications`) 
        console.log(data);    
        setVerification(data)
        })()
    },[])
    
    function ConfirmVerification (id,verify) {
        axios.put(`${process.env.REACT_APP_URL}/owner/verify/booking`,{id,verify}).then(({data:{data}})=>{
         setVerification(data)
        })
    }
    return (
        <div>
        <OwnerNavBar/>
    <div className="row my-4 mx-2 gap-2">
    <SideBar />
        <div className="col-md-9 col-sm-7 booking-verification" >
{       verification.length > 0 && verification.map((x)=>{
         return(
            <>
           <div className="bookings row m-3" >
            <div className="col-md-2 d-flex justify-content-center align-items-center">
                 <img className="booking-verify-vehicle-img" src={`${process.env.REACT_APP_URL}/public/images/${x.vehicle.image[0]}`} alt="" />
            </div>
            <div className="col-md-7 vehicle-details row">
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
            <div className="col-md-3 d-flex justify-content-center align-items-center gap-3 ">
                <FontAwesomeIcon onClick={()=> {ConfirmVerification(x._id,'declined')}} icon={faCircleXmark} size="2xl" style={{color: "#b42727",}} />
                <FontAwesomeIcon icon={faEye} size="2xl" />
                <FontAwesomeIcon onClick={()=> {ConfirmVerification(x._id,'approved')}} icon={faCircleCheck} size="2xl" style={{color: "#345a1b",}} />
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