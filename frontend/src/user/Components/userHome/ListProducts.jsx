
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './listproduct.css'
import {useNavigate} from 'react-router-dom'
// import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

function ListProducts () {
    const [ vehicle, setVehicles] = useState([])
    const inputRef = useRef()
    const navigate = useNavigate()

// pagination

const [ currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 4
const lastIndex = currentPage * recordsPerPage
const firstIndex = lastIndex - recordsPerPage
const records = vehicle.slice( firstIndex, lastIndex)
const npage = Math.ceil( vehicle.length / recordsPerPage )
const numbers = [...Array( npage + 1 ).keys()].slice(1)


    useEffect(()=>{
      async function getVehicles  () {
       const {data} = await axios.get(process.env.REACT_APP_URL + '/list-all-vehicle')
       setVehicles(data.allVehicle)
       }
       getVehicles()
       
    },[])
    function handlePlacechanged () {
        const [place] = inputRef.current.getPlaces()
        if (place){
            console.log(place.formatted_address);
        }
    }
    console.log(vehicle ,909); 
    return (
        <>
        

{/* <LoadScript
      googleMapsApiKey="AIzaSyCX18gyddDFiinajAC7AXHGIRx6FNuTIas"
      libraries={['places']}
    >
      <StandaloneSearchBox
      onLoad={ref => (inputRef.current = ref )}
      onPlacesChanged={handlePlacechanged}
      >
        <input type="text" placeholder='Enter location' />
      </StandaloneSearchBox>
    </LoadScript> */}
       <div className='row justify-content-center mx-0 py-5 gap-2' >


            {  records.map((x)=>(
                <div onClick={()=>{
                    navigate(`/veiw-detail/${x._id}`)
                }} className="card " style={{ width: "18rem" }}>
                    <img style={{ height: '12rem'}} src={`${process.env.REACT_APP_URL}/public/images/${x.image[0]}`} className="card-img-top" alt="..." />
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

            <nav className='d-flex  justify-content-center'>
                <ul className="pagination">
                    <li className="page-item">
                        <a  className="page-link" onClick={prevPage} >Prev</a>
                    </li>
                    {
                        numbers.map(( n, i)=>{
                           return( <li className={`page-item ${currentPage === n && 'active'}`} key={i}>
                                <a  className="page-link" onClick={()=>{changeCPage(n)}}  >{n}</a>
                            </li> )
                        })
                    }
                    <li className="page-item">
                        <a  className="page-link" onClick={nextPage} >Next</a>
                    </li>
                </ul>
            </nav>
       
       </>
    )


    
    
    function prevPage () {
    currentPage !== 1 && setCurrentPage(currentPage - 1)
    }
    
    function nextPage () {
    currentPage !== npage && setCurrentPage(currentPage + 1)
    }
    
    function changeCPage (id) {
    setCurrentPage(id)
    }
}


export default ListProducts