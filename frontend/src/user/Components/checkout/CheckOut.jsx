import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../userHome/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import './checkOut.css'
import Payment from "../Stripe/Payment";
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { toast, ToastContainer } from 'react-toastify'
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import Swal from 'sweetalert2'
import { Calendar } from 'primereact/calendar';
export default function CheckOut() {
  const { userAuthenticationHandler } = useErrorHandler()

  useEffect(() => {
    userApi.get('/check-license-verifications').then(({data}) => {
      console.log(data);
      if(!data?.success){
       navigate(-1)
      }
   }).catch(err => {
     userAuthenticationHandler(err)
   })
  },[])
  const [datetime12h, setDateTime12h] = useState(null);
  const { vehicleId } = useParams()
  const [vehicle, setVehicle] = useState({})
  const [payment, setPayment] = useState(false)
  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [booking, setBooking] = useState({})
  const [validation, setValidation] = useState({})
  const [submit, setSubmit] = useState(false)
  const [paid, setPaid] = useState(false)
  const [totalPrice, setTotalPrice] = useState(null)
  const [finalPrice, setFinalPrice] = useState(null)
  const [duration, setDuration] = useState('')
  const [coupon, setCoupon] = useState('')
  const [couponDetails, setCouponDetails] = useState({})
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

      if (finalPrice < 1) {
        return toast.error('total price must be greater than 0')
      }
      const data = {
        vehicle: {
          _id: vehicle._id,
          vehicleName: vehicle.product_name,
          image: vehicle.image,
          category: vehicle.category,
          segment: vehicle.segment,
          type: vehicle.type,
          price: vehicle.price,
          description: vehicle.description,
          ownerId: vehicle.ownerId
        },
        deposite: 0,
        coupon: couponDetails?._id,
        userId: '',
        payment: {
          method: '',
          paymentId: ''
        },
        totalAmount: finalPrice,
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
        err.response.status === 500 && toast.error(err.response.data.message)
        userAuthenticationHandler(err)
      })
    }
  }
  const updateFinalPrice = (data, totalPrice) => {
    console.log(totalPrice, ' ', data.disPercent);
    if (data.disPercent) {
      console.log('on update final price', (data.disPercent / 100) * totalPrice)
      setFinalPrice(prev => prev - Math.floor((data.disPercent / 100) * totalPrice))
    } else {
      setFinalPrice(totalPrice)
    }
  }
  useEffect(() => {
    updateFinalPrice(couponDetails, totalPrice)
  }, [totalPrice])
  useEffect(() => {
    if (booking?.pickTime && booking?.dropTime) {
      const pickTime = new Date(booking.pickTime);
      const dropTime = new Date(booking.dropTime);
      // console.log('pick grat drop',pickTime.getTime() > dropTime.getTime());
      // console.log('drop grat pick',pickTime.getTime() < dropTime.getTime());
      // console.log(pickTime.getTime(),pickTime,'pickTime',dropTime.getTime(),dropTime,'dropTime');
      console.log(pickTime.getTime(), 'pick', pickTime);
      console.log(dropTime.getTime(), 'drop', dropTime);
      const duration = Math.abs(dropTime.getTime() - pickTime.getTime())
      console.log('duraion', duration);
      const minutes = Math.ceil(duration / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const totalDays = Math.floor(hours / 24);
      const remainingHours = hours % 24;

      const totalCost = (totalDays + (remainingHours / 24) + (remainingMinutes / 1440)) * vehicle?.price;

      const durationString = `${totalDays} days ${remainingHours} hours ${remainingMinutes} minutes`;
      setDuration(durationString)
      // console.log('Pick Time:', booking.pickTime);
      // console.log('Drop Time:', booking.dropTime);
      // console.log('Duration:', durationString);
      // console.log('Total Cost:', totalCost);
      // console.log('Total Cost:', Math.floor(totalCost));

      setTotalPrice(Math.floor(totalCost))

    }

  }, [booking?.pickTime, booking?.dropTime])

  const handleCouponApply = () => {
    if (coupon) {
      userApi.post('/apply/coupon', { coupon }).then(({ data: { data } }) => {
        setCouponDetails(data)
        updateFinalPrice(data, totalPrice)
      }).catch(err => {
        const { response: { data: { message } } } = err
        toast.error(message)
        userAuthenticationHandler(err)
      })
    }
  }
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
                    <img className="check-out-main-img" src={vehicle?.image[0]?.url} alt="" />
                    {!couponDetails.disPercent && totalPrice && <div className="col-md-12 my-5 row">
                      <div className="col-md-8">
                        <input type="text" placeholder="Coupon code" onChange={(e) => { setCoupon(e.target.value) }} className="border border-radius form-control" />
                      </div>
                      <div className="col-md-3 m-0 p-0">
                        <button className="btn btn-success" onClick={handleCouponApply} >apply</button>
                      </div>

                    </div>}
                  </div>

                  <div className="col-md-5">
                    <div className="">
                      <h5>this vehicle won't available on :</h5>
                      <div className=" booked-timmings">
                      {
                        vehicle.bookings?.length > 0 &&
                        vehicle.bookings.map((x) => {
                          const fromDate = new Date(x.from);
                          const toDate = new Date(x.to);

                          if (toDate < new Date()) {
                            return null; // Skip rendering if x.to is in the past
                          }

                          const formattedFromDate = fromDate.toLocaleString("en-US", {
                            dateStyle: "short",
                            timeStyle: "short",
                          });

                          const formattedToDate = toDate.toLocaleString("en-US", {
                            dateStyle: "short",
                            timeStyle: "short",
                          });

                          return (
                            <div className="row d-flex justify-content-center">
                              <div className="col-md-4 p-0">{formattedFromDate}</div>
                              <div className="col-md-2">to</div>
                              <div className="col-md-4 p-0">{formattedToDate}</div> 
                            </div>
                          );
                        })
                      }
                    </div>
                    </div>
                    <h3>{vehicle?.product_name}</h3>
                    <span className="d-block py-1" >{vehicle?.category}</span>
                    <span className="d-block py-1" >{vehicle?.model}</span>
                    <h5 className="py-1">{vehicle?.price} <span className="small" >/perday</span></h5>
                    {booking.pickTime && booking.dropTime && totalPrice &&
                      (<h4>Total Price : {totalPrice} </h4>)}
                    {
                      couponDetails.disPercent && (
                        <div className="px-2 bg-opacity-50 coupon">
                          <h5>{couponDetails.name}</h5>
                          <p className="m-0">coupon code : {couponDetails.code}</p>
                          <p className="m-0">discount percentage : {couponDetails.disPercent}%</p>
                        </div>
                      )}


                    {totalPrice && couponDetails.disPercent && <h4>final Price : {finalPrice} </h4>}
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

                    <div className="col-md-6 col-sm-6 pb-2">
                      <h5 >Pick Up information</h5>

                      {/* pickTime */}

                      <div>
                        {validation?.pickTime && <span className=" text-danger" >*required</span>}
                        {booking.pickTime && <p className="my-1 m-0">PickTime</p>}
                        <Calendar className="mb-2" placeholder="PickTime" value={booking.pickTime} id="calendar-12h" style={{ width: '100%' }} minDate={new Date()}
                          maxDate={booking.dropTime ? booking.dropTime : null}
                          onChange={(e) => {
                            e.target.value !== '' && setValidation({ ...validation, pickTime: false })
                            setBooking({ ...booking, pickTime: e.value })
                          }} showTime hourFormat="12" />
                      </div>

                      {/* <input name="pickTime" onChange={(e) => {
                         e.target.value !== '' && setValidation({ ...validation, pickTime: false })
                          setBooking({ ...booking, [e.target.name]: e.target.value })
                           }} min={new Date().toISOString().split(".")[0]}  
                            max={ booking?.dropTime && booking?.dropTime}  
                             className="form-control hide-seconds" type="datetime-local" /> */}

                      {/* pickState */}
                      {booking.pickState && <p className="my-1 m-0">State</p>}
                      {validation?.pickState && <span className="ms-1 text-danger" >*select State</span>}
                      <Select name='pickState' className='mb-2' placeholder='Select State'
                        options={aquaticCreatures}
                        onChange={(opt, { name }) => {
                          opt.value !== '' && setValidation({ ...validation, [name]: false })
                          setBooking({ ...booking, [name]: opt.value })
                        }} />

                      {/* pickCity */}
                      {booking.pickCity && <p className="my-1 m-0">City</p>}
                      {validation?.pickCity && <span className="text-danger" >*select City</span>}
                      <Creatable name='pickCity' className='mb-2' placeholder='Select City' options={places_list}
                        onChange={(opt, { name }) => {
                          opt.value !== '' && setValidation({ ...validation, [name]: false })
                          setBooking({ ...booking, [name]: opt.value })
                        }} />

                      {/* pickPlace */}
                      {booking.pickPlace && <p className="my-1 m-0">Place</p>}
                      {validation?.pickPlace && <span className=" text-danger" >*required</span>}
                      <input type="text" name="pickPlace" onChange={(e) => {
                        e.target.value !== '' && setValidation({ ...validation, pickPlace: false })
                        setBooking({ ...booking, [e.target.name]: e.target.value })
                      }} className="mb-1 form-control" placeholder="enter place" />

                    </div>

                    {/* dropOff information */}

                    <div className="col-md-6 col-sm-6 pb-2">
                      <h5>Drop off information</h5>
                      {/* dropTime */}
                      {validation?.dropTime && <span className=" text-danger" >*required</span>}
                      {booking.dropTime && <p className="my-1">DropTime</p>}
                      <div className="">
                        <Calendar
                          className="mb-2"
                          placeholder="DropTime"
                          id="calendar-12h"
                          style={{ width: '100%' }}
                          value={booking.dropTime}
                          minDate={booking.pickTime ? booking.pickTime : new Date()}
                          // minTime={
                          //   booking.dropTime && booking.pickTime && booking.dropTime.toDateString() === booking.pickTime.toDateString()
                          //     ? new Date(booking.pickTime.getFullYear(), booking.pickTime.getMonth(), booking.pickTime.getDate())
                          //     : null
                          // }
                          onChange={(e) => {
                            e.target.value !== '' && setValidation({ ...validation, dropTime: false });
                            setBooking({ ...booking, dropTime: e.value });
                          }}
                          showTime
                          hourFormat="12"
                          dateFormat="mm/dd/yy" // Specify the desired date format
                        />                      </div>
                      {/* <input name="dropTime" onChange={(e) => {
                        e.target.value !== '' && setValidation({ ...validation, dropTime: false })
                        setBooking({ ...booking, [e.target.name]: e.target.value })
                      }} className="form-control hide-seconds" min={booking.pickTime ? booking.pickTime : new Date().toISOString().split(".")[0]} type="datetime-local" /> */}

                      {/* dropState */}
                      {validation?.dropState && <span className=" text-danger" >*select State</span>}
                      {booking.dropState && <p className="my-1 m-0">State</p>}
                      <Select name="dropState" className='mb-2' onChange={(opt, { name }) => {
                        opt.value !== '' && setValidation({ ...validation, [name]: false })
                        setBooking({ ...booking, [name]: opt.value })
                      }} placeholder='Select State' options={aquaticCreatures} />

                      {/* dropCity   */}
                      {booking.dropCity && <p className="my-1 m-0">City</p>}
                      {validation?.dropCity && <span className="ms-1 text-danger" >*select City</span>}
                      <Creatable name="dropCity" className='mb-2' onChange={(opt, { name }) => {
                        opt.value !== '' && setValidation({ ...validation, [name]: false })
                        setBooking({ ...booking, [name]: opt.value })
                      }} placeholder='Select City' options={places_list} />

                      {/* dropPlace */}
                      {booking.dropPlace && <p className="my-1 m-0">Place</p>}
                      {validation?.dropPlace && <span className=" text-danger" >*required</span>}
                      <input type="text" name="dropPlace" onChange={(e) => {
                        e.target.value !== '' && setValidation({ ...validation, dropPlace: false })
                        setBooking({ ...booking, [e.target.name]: e.target.value })
                      }} className="mb-1 form-control" placeholder="enter place" />

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