import axios from "axios";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './vehiclelist.css'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
function VehicleList () {
  const { id } = useSelector(state => state.owner)
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
      <Td>{x.product_name}</Td>
      <Td>{x.category}</Td>
      <Td>{x.description}</Td>
      <Td>{x.price}</Td>
      <Td></Td>
    </Tr>
    ))
  }
  </Tbody>
</Table>
</div>
    )
}

export default VehicleList