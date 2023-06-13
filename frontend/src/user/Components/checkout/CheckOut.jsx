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

export default function CheckOut() {
  const { vehicleId } = useParams()
  const [vehicle, setVehicle] = useState({})
  const [payment, setPayment] = useState(false)
  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [ booking, setBooking] = useState({})
  const [validation , setValidation] = useState({})
  const [submit,setSubmit] = useState(false)
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
    axios.get(`${process.env.REACT_APP_URL}/vehicle/data/${vehicleId}`).then(({ data: { data } }) => {
      setVehicle(data)
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
        console.log('data', data);
        const placeNames = data.map(state => state.name);
        console.log('placeNames', placeNames);
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

  function handleSubmit () {
    if(!booking.pickTime){
         setValidation({...validation,pickTime:true})
    } else if(!booking.dropTime){
      console.log('on not drop');
         setValidation({...validation,dropTime:true})
    } else if(!booking.pickDistrict){
         setValidation({...validation,pickDistrict:true})
    } else if(!booking.dropDistrict){
         setValidation({...validation,dropDistrict:true})
    } else if(!booking.pickCity){
         setValidation({...validation,pickCity:true})
    } else if(!booking.dropCity){
         setValidation({...validation,dropCity:true})
    } else if(!booking.pickPlace){
         setValidation({...validation,pickPlace:true})
    } else if(!booking.dropPlace){
         setValidation({...validation,dropPlace:true})
    } else {
    const data  = {
      vehicle : {
        _id : vehicle._id,
        vehicleName : vehicle.product_name,
        image : vehicle.image,
        category: vehicle.category,
        model: vehicle.model,
        year: vehicle.year,
        brand: vehicle.brand,
        price: vehicle.price,
        description: vehicle.description,
        ownerId: vehicle.ownerId
      },
      deposite : 0,
      userId: '',
      payment: '',
      totalAmount: vehicle.price,
      address : {
        pickUp : {
          pickTime:booking.pickTime,
          pickDistrict: booking.pickDistrict,
          pickCity:booking.pickCity,
          pickPlace: booking.pickPlace
        },
        dropOff : {
          dropTime : booking.dropTime,
          dropDistrict : booking.dropDistrict,
          dropCity : booking.dropCity,
          dropPlace : booking.dropPlace
        }
      }
    }


    console.log(data);

    axios.post(`${process.env.REACT_APP_URL}/add-booking`,{data}).then(({data:data})=> {
        toast.success(data.message)
        setSubmit(true)
        setTimeout(()=>{
          setSubmit(false)
          navigate('/')
        },1000)
    })
  }
  }
  console.log(booking,76);

  return (
    <div className="">
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body row">
                <div className="col-md-6">
                  <img className="check-out-main-img" src={`${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[0]}`} alt="" />
                  <h3>{vehicle?.product_name}</h3>
                  <span>{vehicle?.category}</span>
                  <br />
                  <span>{vehicle?.model}</span>
                  <br />
                  <span>{vehicle?.price}</span>
                  <br />
                  <div className="row">
                  <div className="col-md-6">
                  <img className="kms" src={kms} alt="" />
                  <span className="ms-2 fw-bold">150 kms</span>
                  </div>
                  <div className="col-md-6">
                  <img className="kms" src={refund} alt="" />
                  <span className="ms-2 fw-bold">₹ 1000</span>
                  </div>
                  </div>
                </div>

                <div className="col-md-6  ">
                  <div className="row gap-y-1">
                    <div className="col-md-6 col-sm-6">
                      <h5 >Pick Up information</h5>
                      { validation?.pickTime && <span className="d-block text-danger" >*required</span>}
                      <input name="pickTime" onChange={(e)=> { console.log(typeof e.target.value)
                        e.target.value !== '' && setValidation({...validation,pickTime:false})
                         setBooking({...booking,[e.target.name]:e.target.value}) }} className="form-control" type="datetime-local" />
                          { validation?.pickDistrict && <span className="d-block text-danger" >*select District</span>}
                      <Select name='pickDistrict' placeholder='Select District' className='my-2' options={aquaticCreatures}
                       onChange={(opt, {name}) =>{
                        opt.value !== '' && setValidation({...validation,[name]:false})
                         setBooking({...booking,[name]:opt.value})
                         }} />
                          { validation?.pickCity && <span className="d-block text-danger" >*select City</span>}
                      <Creatable name='pickCity' placeholder='Select City' options={places_list}
                        onChange={(opt, {name}) =>{ 
                        opt.value !== '' && setValidation({...validation,[name]:false})
                          setBooking({...booking,[name]:opt.value})
                        }} />
                          { validation?.pickPlace && <span className="d-block text-danger" >*required</span>}
                      <input type="text" name="pickPlace" onChange={(e) => {
                        e.target.value !== '' && setValidation({...validation,pickPlace:false})
                         setBooking({...booking,[e.target.name]: e.target.value})
                         }} className="my-2 form-control" placeholder="enter place" />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <h5>Drop off information</h5>
                      { validation?.dropTime && <span className="d-block text-danger" >*required</span>}
                      <input name="dropTime" onChange={(e)=>{
                        e.target.value !== '' && setValidation({...validation,dropTime:false})
                           setBooking({...booking,[e.target.name]:e.target.value})
                        }} className="form-control" type="datetime-local" />
                      { validation?.dropDistrict && <span className="d-block text-danger" >*select District</span>}
                      <Select name="dropDistrict" onChange={(opt, {name}) => {
                        opt.value !== '' && setValidation({...validation,[name]:false})
                        setBooking({...booking,[name]:opt.value})
                        }} placeholder='Select District' className='my-2' options={aquaticCreatures}/>
                      { validation?.dropCity && <span className="d-block text-danger" >*select City</span>}
                      <Creatable name="dropCity" onChange={(opt, {name}) => {
                        opt.value !== '' && setValidation({...validation,[name]:false})
                        setBooking({...booking,[name]:opt.value})
                        }} placeholder='Select City' options={places_list}/>
                          { validation?.dropPlace && <span className="d-block text-danger" >*required</span>}
                      <input type="text" name="dropPlace" onChange={(e) => {
                         e.target.value !== '' && setValidation({...validation,dropPlace:false})
                        setBooking({...booking,[e.target.name]: e.target.value})
                        }} className="my-2 form-control" placeholder="enter place" />
                      
                    </div>
                   { submit ? 
                    <button className="btn btn-primary" disabled >submit</button>
                       :
                    <button className="btn btn-primary" onClick={()=> {
                     handleSubmit()
                    }} >submit</button>}
                  </div>
                  <div>
                  </div>
                  {/* <div className="" >
                    <span className="d-block pb-2">Payment</span>
                    <input onChange={(e) => {
                      console.log(e.target.checked);
                      setPayment(e.target.checked)
                    }} className="me-1" type="checkbox" />
                    <span>Card</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
           {  !payment && <button onClick={()=>{
                setPayment(true)
              }} >Proceed To Checkout</button>}
          { payment && vehicle?.price &&   <Payment  props={vehicle?.price} />}
            </div>
          </div>
        </div> */}
        </div>

      </div>

     <ToastContainer/>
    </div>

  )
}