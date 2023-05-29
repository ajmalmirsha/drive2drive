
import { useEffect, useState } from 'react'
import axios from 'axios'
import './listproduct.css'
import {useNavigate} from 'react-router-dom'

function ListProducts () {
    const [ vehicle, setVehicles] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      async function getVehicles  () {
       const {data} = await axios.get(process.env.REACT_APP_URL + '/list-all-vehicle')
       setVehicles(data.allVehicle)
       }
       getVehicles()
       
    },[])
    console.log(vehicle ,909);
    return (
       <div className='row justify-content-center mx-0 py-5 gap-2' >
            {  vehicle.map((x)=>(
                <div onClick={()=>{
                    navigate(`/veiw-detail/${x._id}`)
                }} className="card " style={{ width: "18rem" }}>
                    <img style={{ height: '12rem'}} src={`${process.env.REACT_APP_URL}/public/images/${x.image}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{x.product_name}</h5>
                        <p className="card-text">{x.description}</p>
                      
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="price fw-bold pt-3">
                                {x.price}
                            </p>
                            <a href="#" className="btn btn-primary">Book now</a>
                        </div>
                    </div>
                </div>
           )) }
       </div>
    )
}

export default ListProducts