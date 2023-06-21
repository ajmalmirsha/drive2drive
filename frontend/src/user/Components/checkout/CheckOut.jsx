import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../userHome/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import './checkOut.css'
import Payment from "../Stripe/Payment";
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import kms from '../../../images/kms.png'
import refund from '../../../images/refund.png'
import { toast, ToastContainer } from 'react-toastify'
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import Swal from 'sweetalert2'

export default function CheckOut() {
  const { vehicleId } = useParams()
  const [vehicle, setVehicle] = useState({})
  const [payment, setPayment] = useState(false)
  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [booking, setBooking] = useState({})
  const [validation, setValidation] = useState({})
  const [submit, setSubmit] = useState(false)
  const { userAuthenticationHandler } = useErrorHandler()
  const [paid, setPaid] = useState(false)
  const [toatalPrice, setTotalPrice] = useState(null)
  const [duration, setDuration] = useState('')
  const aquaticCreatures = states.map(label => ({
    label,
    value: label
  }));
  const places_list = places.map(label => ({
    label,
    value: label
  }));
  const navigate = useNavigate()
  useEffect(() => {
    userApi.get(`/vehicle/data/${vehicleId}`).then(({ data: { data } }) => {
      setVehicle(data)
    }).catch(err => {
      userAuthenticationHandler(err)
    })




    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries/IN/states/MH/cities',
      headers: {
        'X-CSCAPI-KEY': process.env.REACT_APP_X_CSCAPI_KEY
      }
    };

    axios(config)
      .then(function ({ data }) {
        const placeNames = data.map(state => state.name);
        setPlaces(placeNames)
      })
      .catch(function (error) {
        console.log(error);
      });

    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.REACT_APP_X_CSCAPI_KEY);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
      .then(response => response.text())
      .then(result => {
        const stateNames = JSON.parse(result).map(state => state.name);
        setStates(stateNames);
      })
      .catch(error => console.log('error', error));
    console.log(states, 98);
    console.log(places, 9843);
  }, [])

  function handleSubmit() {
    if (!booking.pickTime) {
      setValidation({ ...validation, pickTime: true })
    } else if (!booking.dropTime) {
      setValidation({ ...validation, dropTime: true })
    } else if (!booking.pickState) {
      setValidation({ ...validation, pickState: true })
    } else if (!booking.dropState) {
      setValidation({ ...validation, dropState: true })
    } else if (!booking.pickCity) {
      setValidation({ ...validation, pickCity: true })
    } else if (!booking.dropCity) {
      setValidation({ ...validation, dropCity: true })
    } else if (!booking.pickPlace) {
      setValidation({ ...validation, pickPlace: true })
    } else if (!booking.dropPlace) {
      setValidation({ ...validation, dropPlace: true })
    } else {
      const data = {
        vehicle: {
          _id: vehicle._id,
          vehicleName: vehicle.product_name,
          image: vehicle.image,
          category: vehicle.category,
          model: vehicle.model,
          year: vehicle.year,
          brand: vehicle.brand,
          price: vehicle.price,
          description: vehicle.description,
          ownerId: vehicle.ownerId
        },
        deposite: 0,
        userId: '',
        payment: {
          method: '',
          paymentId: ''
        },
        totalAmount: toatalPrice,
        duration,
        address: {
          pickUp: {
            pickTime: booking.pickTime,
            pickState: booking.pickState,
            pickCity: booking.pickCity,
            pickPlace: booking.pickPlace
          },
          dropOff: {
            dropTime: booking.dropTime,
            dropState: booking.dropState,
            dropCity: booking.dropCity,
            dropPlace: booking.dropPlace
          }
        }
      }

      userApi.post(`${process.env.REACT_APP_URL}/add-booking`, { data }).then(({ data: data }) => {
        Swal.fire({
          title: 'Your Booking Sent succeeded!',
          allowOutsideClick: false,
          html:
            'wait for owner approvel for your booking, check the approvels on ' +
            '<a href="/bookings">Bookings</a> ' +
            'page',
          confirmButtonText: 'Go To Home',
          didClose: () => {
            navigate('/')
          }
        })
      }).catch(err => {
        userAuthenticationHandler(err)
      })
    }
  }
  console.log(booking, 76);
  useEffect(() => {
    if (booking?.pickTime && booking?.dropTime) {
      const pickTime = new Date(booking.pickTime);
      const dropTime = new Date(booking.dropTime);
      const duration = dropTime.getTime() - pickTime.getTime();
      const minutes = Math.ceil(duration / (1000 * 60)); 
      const hours = Math.floor(minutes / 60); 
      const remainingMinutes = minutes % 60; 
      const totalDays = Math.floor(hours / 24); 
      const remainingHours = hours % 24; 

      const totalCost = (totalDays + (remainingHours / 24) + (remainingMinutes / 1440)) * vehicle?.price;

      const durationString = `${totalDays} days ${remainingHours} hours ${remainingMinutes} minutes`;
      setDuration(durationString)
      console.log('Pick Time:', booking.pickTime);
      console.log('Drop Time:', booking.dropTime);
      console.log('Duration:', durationString);
      console.log('Total Cost:', totalCost);
      console.log('Total Cost:', Math.floor(totalCost));
      setTotalPrice(Math.floor(totalCost))
    }

  }, [booking?.pickTime, booking?.dropTime])
  return (
    <div className="">
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <div className={`col-lg-${payment && vehicle?.price ? 8 : 12}`} >
            <div className="card">
              <div className="card-body row">
                <div className="col-md-6 row">
                  <div className="col-md-7">
                    <img className="check-out-main-img" src={`${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[0]}`} alt="" />
                  </div>
                  <div className="col-md-5">
                    <h3>{vehicle?.product_name}</h3>
                    <span className="d-block py-1" >{vehicle?.category}</span>
                    <span className="d-block py-1" >{vehicle?.model}</span>
                    <h5 className="py-1">{vehicle?.price} <span className="small" >/perday</span></h5>
                    {booking.pickTime && booking.dropTime && toatalPrice &&
                      (<h4>Toatal Price : {toatalPrice} </h4>)}
                  </div>
                  {/* <div className="row">
                  <div className="col-md-6">
                  <img className="kms" src={kms} alt="" />
                  <span className="ms-2 fw-bold">150 kms</span>
                  </div>
                  <div className="col-md-6">
                  <img className="kms" src={refund} alt="" />
                  <span className="ms-2 fw-bold">₹ 1000</span>
                  </div>
                  </div> */}
                </div>

                <div className="col-md-6  ">
                  <div className="row gap-y-1">

                    {/* pickup informations */}

                    <div className="col-md-6 col-sm-6">
                      <h5 >Pick Up information</h5>

                      {/* pickTime */}
                       {validation?.pickTime && <span className=" text-danger" >*required</span>}
                        <input name="pickTime" onChange={(e) => {
                         e.target.value !== '' && setValidation({ ...validation, pickTime: false })
                          setBooking({ ...booking, [e.target.name]: e.target.value })
                           }} min={new Date().toISOString().split(".")[0]}  
                            max={ booking?.dropTime && booking?.dropTime}  
                             className="form-control hide-seconds" type="datetime-local" />

                      {/* pickState */}
                      <p className="p-0 d-inline m-0">State</p>
                      {validation?.pickState && <span className="ms-1 text-danger" >*select State</span>}
                      <Select name='pickState' placeholder='Select State'
                       className='my-2' options={aquaticCreatures}
                        onChange={(opt, { name }) => {
                         opt.value !== '' && setValidation({ ...validation, [name]: false })
                          setBooking({ ...booking, [name]: opt.value })
                        }} />

                      {/* pickCity */}
                      <p className="p-0 m-0">City</p>
                      {validation?.pickCity && <span className=" text-danger" >*select City</span>}
                      <Creatable name='pickCity' placeholder='Select City' options={places_list}
                        onChange={(opt, { name }) => {
                          opt.value !== '' && setValidation({ ...validation, [name]: false })
                          setBooking({ ...booking, [name]: opt.value })
                        }} />

                        {/* pickPlace */}
                      {validation?.pickPlace && <span className=" text-danger" >*required</span>}
                      <input type="text" name="pickPlace" onChange={(e) => {
                        e.target.value !== '' && setValidation({ ...validation, pickPlace: false })
                         setBooking({ ...booking, [e.target.name]: e.target.value })
                      }}  className="my-2 form-control" placeholder="enter place" />

                    </div>

                    {/* dropOff information */}

                    <div className="col-md-6 col-sm-6">
                      <h5>Drop off information</h5>
                      {/* dropTime */}
                      {validation?.dropTime && <span className=" text-danger" >*required</span>}
                      <input name="dropTime" onChange={(e) => {
                        e.target.value !== '' && setValidation({ ...validation, dropTime: false })
                        setBooking({ ...booking, [e.target.name]: e.target.value })
                      }} className="form-control hide-seconds" min={booking.pickTime ? booking.pickTime : new Date().toISOString().split(".")[0]} type="datetime-local" />

                      {/* dropState */}
                      {validation?.dropState && <span className=" text-danger" >*select State</span>}
                      <p className="p-0 m-0">State</p>
                      <Select name="dropState" onChange={(opt, { name }) => {
                        opt.value !== '' && setValidation({ ...validation, [name]: false })
                        setBooking({ ...booking, [name]: opt.value })
                      }} placeholder='Select State' className='my-2' options={aquaticCreatures} />

                      {/* dropCity   */}
                      <p className="p-0 m-0 d-inline">City</p>
                      {validation?.dropCity && <span className="ms-1 text-danger" >*select City</span>}
                      <Creatable name="dropCity" onChange={(opt, { name }) => {
                        opt.value !== '' && setValidation({ ...validation, [name]: false })
                        setBooking({ ...booking, [name]: opt.value })
                      }} placeholder='Select City' options={places_list} />

                      {/* dropPlace */}
                      {validation?.dropPlace && <span className=" text-danger" >*required</span>}
                      <input type="text" name="dropPlace" onChange={(e) => {
                        e.target.value !== '' && setValidation({ ...validation, dropPlace: false })
                        setBooking({ ...booking, [e.target.name]: e.target.value })
                      }} className="my-2 form-control" placeholder="enter place" />

                    </div>
                    {/* <div className="mb-3 ms-1" >
                    <input onChange={(e) => {
                      console.log(e.target.checked);
                      setPayment(e.target.checked)
                    }} className="me-1" type="checkbox" />
                    <span className="pb-2">Are you paying now ?</span>
            
                  </div> */}
                    {submit ?
                      <button className="btn btn-primary" disabled >submit</button>
                      :
                      <button className="btn btn-primary" onClick={() => {
                        handleSubmit()
                      }} >submit</button>}
                  </div>
                  <div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          {payment && vehicle?.price &&
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <Payment props={vehicle?.price} />
                </div>
              </div>
            </div>
          }
        </div>

      </div>

      <ToastContainer />
    </div>

  )
}