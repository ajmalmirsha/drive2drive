import { useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"



export default function Banner () {
    const [image,setImage] = useState({})
    return (
        <div className="col-md-10 col-sm-9 mt-5">
            <div className="d-flex mb-2 justify-content-between">
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-primary">Add banner</button>
</div>



<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
            <form>
                <label htmlFor="">Image</label>
                {/* <img src={URL.createObjectURL(image)} alt="" /> */}
                <input onClick={(e)=>{ setImage(e.target.files) }} type="file" />
            </form>
     </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

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
   
    <Tr >
      <Td>2</Td>
      <Td>skhdf</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
    </Tr>
    <Tr >
      <Td>2</Td>
      <Td>skhdf</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
    </Tr>
    <Tr >
      <Td>2</Td>
      <Td>skhdf</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
    </Tr>
    <Tr >
      <Td>2</Td>
      <Td>skhdf</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
      <Td>ijfisjdif</Td>
    </Tr>
    
  
  </Tbody>
</Table>
        </div>
    )
}