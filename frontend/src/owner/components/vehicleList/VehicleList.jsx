import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './vehiclelist.css'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ownerApi } from "../../../utils/Apis";
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


function VehicleList () {
  
  const { id } = useSelector(state => state.owner)
  const navigate = useNavigate()
  const [ users, setUsers] = useState([])
  const { ownerAuthenticationHandler } = useErrorHandler()
  useEffect(()=>{
    (function () {
      ownerApi.get(`/get-all-vehicles/${id}`).then( ({ data, status }) => {
      if(status == 200) {
      setUsers(data.allVehicle)
      }}) .catch ( err => {
         ownerAuthenticationHandler(err)
      })
    })()
  },[])

  const [ currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 8
const lastIndex = currentPage * recordsPerPage
const firstIndex = lastIndex - recordsPerPage
const records = users.slice( firstIndex, lastIndex)
const npage = Math.ceil( users.length / recordsPerPage )
const numbers = [...Array( npage + 1 ).keys()].slice(1)

    return (
        <div className="col-md-9 mt-3">
        <Table className="custom-table" >
  <Thead>
    <Tr>
      <Th>#</Th>
      <Th>Images</Th>
      <Th>Product Name</Th>
      <Th>Category</Th>
      <Th>Description</Th>
      <Th>Price</Th>
      <Th>Action </Th>
    </Tr>
  </Thead>
  <Tbody>
    { records.map((x,i)=>(
    <Tr >
      <Td>{i+1}</Td>
      <Td><img className="vehicle-image" src={`${process.env.REACT_APP_URL}/public/images/${x.image[0]}`} alt="" /></Td>
      <Td>{x.product_name}</Td>
      <Td>{x.category}</Td>
      <Td>{x.description}</Td>
      <Td>{x.price}</Td>
      <Td onClick={()=>{ navigate(`/owner/edit-vehicle/${x._id}`) }} className='d-flex justify-content-center align-items-center' ><FontAwesomeIcon icon={faPenToSquare} /></Td>
    </Tr>
    ))
  }
  </Tbody>
</Table>
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
</div>
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

export default VehicleList