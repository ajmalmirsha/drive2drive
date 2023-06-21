import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux"
import { ownerApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler";


function AddVehicle() {
  const owner = useSelector(state => state.owner)
  const [product, setProduct] = useState({
    product_name: null,
    category: null,
    price: null,
    description: null,
    model:null,
    brand:null,
    year:null,
    ownerId:owner.id,
    images: []
  })
 
  const navigate = useNavigate()
  const { ownerAuthenticationHandler } = useErrorHandler()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const nullProperties = Object.entries(product)
    .filter(([key, value]) => 
      value === null ||
      (key === 'description' && value.trim() === '') ||
      (key === 'images' && value.length === 0) ||
      (key === 'model' && value.trim() === '') ||
      (key === 'year' && value.trim() === '') ||
      (key === 'brand' && value.trim() === '')
    )
    .map(([key]) => key);

    if (nullProperties.length > 0) {
      toast.error(nullProperties[0] + ' feild required !', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const formData = new FormData() 
      console.log(product.images,89889);
      for (let i = 0; i < product.images.length; i++) {
        formData.append('images', product.images[i]);
      }
      
      formData.append('product', JSON.stringify(product));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      };
      ownerApi.post("/add-vehicle", formData, config, { data: product }).then(({ data, status }) => {

      if (status == 200) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            navigate('/owner/list-vehicle')
          }
        })
      }
      }) .catch ( err => {
        ownerAuthenticationHandler(err)
      })

    }
  }

  return (

    <div className="col-md-9 my-3">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">add product</h5>
        </div>
        <div className="card-body">
          <form>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example5">Product name</label>
              <input name="product_name" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example5" className="form-control" />
            </div>


            {/* <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example6">Category</label>
              <input name="category" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
            </div> */}
          <label className="form-label" htmlFor="category">Category</label>
            <select onChange={(e)=>{
   setProduct({ ...product, category: e.target.value })
  }} id="category" class="form-select" aria-label="Default select example">
  <option  selected>select a category</option>
  <option value="car">car</option>
  <option value="bike">bike</option>
</select>
          { product.category == 'car' && (
            <div className=" my-3" >
          <label className="form-label" htmlFor="type">Type</label>
          <select id="type" onChange={(e)=>{
   setProduct({ ...product, category: e.target.value })
  }} class="form-select" aria-label="Default select example">
  <option  selected>select car type</option>
  <option value="Sedan">Sedan</option>
  <option value="Hatchback">Hatchback</option>
  <option value="SUV">SUV</option>
  <option value="Crossover">Crossover</option>
  <option value="Coupe">Coupe</option>
  <option value="Convertible">Convertible</option>
</select> 
</div>
)}

<input name="carType" type="radio" />
<input name="carType" type="radio" />
            <div className="row">
  <div className="col-md-4 form-outline mb-4">
    <label className="form-label" htmlFor="form7Example6">Model</label>
    <input name="model" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
  </div>

  <div className="col-md-4 form-outline mb-4">
    <label className="form-label" htmlFor="form7Example6">Brand</label>
    <input name="brand" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
  </div>

  <div className="col-md-4 form-outline mb-4">
    <label className="form-label" htmlFor="form7Example6">Year</label>
    <input name="year" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
  </div>

</div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example7">Price</label>
              <input value={product.price} name="price" onChange={(e) =>{ 

                !isNaN(e.target.value) &&  setProduct({ ...product, [e.target.name]: e.target.value })

                }} type="text" id="form7Example7" className="form-control" />
            </div>


            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example7">Description</label>
              <textarea name="description" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} className="form-control" id="form7Example7" rows="4"></textarea>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example7">image</label>
              <input multiple name="images" onBlur={(e) => setProduct({ ...product, [e.target.name]: Array.from(e.target.files) })} type="file" id="form7Example7" className="form-control" />
            </div>


            <div className="form-check d-flex justify-content-center mb-2">
              <button onClick={handleSubmit} className="btn btn-outline-dark">submit</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>



  )
}


export default AddVehicle