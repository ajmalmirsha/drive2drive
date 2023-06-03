import axios from "axios";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './vehiclelist.css'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function VehicleList () {
  const { id } = useSelector(state => state.owner)
  const navigate = useNavigate()
  const [ users, setUsers] = useState([])
  useEffect(()=>{
    async function getUsers  () {
      const { data, status } = await axios.get(`${process.env.REACT_APP_URL}/owner/get-all-vehicles/${id}`)
    if(status == 200) {
      setUsers(data.allVehicle)
    }
    }
    getUsers()
  },[])
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
    { users.map((x,i)=>(
    <Tr >
      <Td>{i+1}</Td>
      <Td><img className="vehicle-image" src={`${process.env.REACT_APP_URL}/public/images/${x.image[0]}`} alt="" /></Td>
      <Td>{x.product_name}</Td>
      <Td>{x.category}</Td>
      <Td>{x.description}</Td>
      <Td>{x.price}</Td>
      <Td><button onClick={()=>{ navigate(`/owner/edit-vehicle/${x._id}`) }}>Edit</button></Td>
    </Tr>
    ))
  }
  </Tbody>
</Table>
</div>
    )
}

export default VehicleList