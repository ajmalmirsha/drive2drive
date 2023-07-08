import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './vehiclelist.css'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ownerApi } from "../../../utils/Apis";
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../common/spinners/Spinner'

function VehicleList() {

  const { id } = useSelector(state => state.owner)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const { ownerAuthenticationHandler } = useErrorHandler()
  useEffect(() => {
    (function () {
      setLoading(true)
      ownerApi.get(`/get-all-vehicles/${id}`).then(({ data, status }) => {
        setLoading(false)
        if (status == 200) {
          setUsers(data.allVehicle)
        }
      }).catch(err => {
        ownerAuthenticationHandler(err)
      })
    })()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 8
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = users.slice(firstIndex, lastIndex)
  const npage = Math.ceil(users.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  return (
    <div className="col-md-9 custom-scrollbar-white" style={{height:'80vh',overflowY:'auto'}} >
      {loading ? <Spinner /> : records.length < 1 ?
        (<div className='text-center h-100 d-flex align-items-center justify-content-center' >add your first vehicle <button onClick={() => navigate('/owner/add-vehicle')} className='btn btn-primary m-3' >Add vehicle</button> </div>) :
        (
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
            <Tbody  >
              {records.map((x, i) => (
                <Tr >
                  <Td>{i + 1}</Td>
                  <Td><img className="vehicle-image" src={x?.image[0]?.url} alt="" /></Td>
                  <Td>{x.product_name}</Td>
                  <Td>{x.category}</Td>
                  <Td>
                    <div className="vehicle-description-container m-2">
                      {x.description}
                    </div>
                  </Td>

                  <Td className='text-center'  >{x.price}</Td>
                  <Td onClick={() => { navigate(`/owner/edit-vehicle/${x._id}`) }} className='text-center' ><FontAwesomeIcon icon={faPenToSquare} /></Td>
                </Tr>
              ))
              }
            </Tbody>
          </Table>
        )}
      { users.length > recordsPerPage && 
      <nav className='d-flex  justify-content-center my-3'>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={prevPage} >Prev</a>
          </li>
          {
            numbers.map((n, i) => {
              return (<li className={`page-item ${currentPage === n && 'active'}`} key={i}>
                <a className="page-link" onClick={() => { changeCPage(n) }}  >{n}</a>
              </li>)
            })
          }
          <li className="page-item">
            <a className="page-link" onClick={nextPage} >Next</a>
          </li>
        </ul>
      </nav>
      }  
    </div>
  )

  function prevPage() {
    currentPage !== 1 && setCurrentPage(currentPage - 1)
  }

  function nextPage() {
    currentPage !== npage && setCurrentPage(currentPage + 1)
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }
}

export default VehicleList