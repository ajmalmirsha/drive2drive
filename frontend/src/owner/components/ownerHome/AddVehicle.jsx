import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";



function AddVehicle () {
    const [ product, setProduct ] = useState ({
        product_name:null,
        category:null,
        price:null,
        description:null,
        image:{

        }
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(product,87654);
        const nullProperties = Object.entries(product)
        .filter(([key, value]) => value === null || (key === 'image' && Object.keys(value).length === 0 && value.constructor === Object))
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
        formData.append('image',product.image)
        formData.append('product', JSON.stringify(product));
        const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
          };
     const { data, status} = await  axios.post( process.env.REACT_APP_URL + "/owner/add-vehicle",formData, config, {data:product})
     
     if(status == 200) {
        toast.success(data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose:()=>{
                navigate('/owner/list-vehicle')
            }
            })
     }
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
                  <input name="product_name" onBlur={(e)=> setProduct({...product,[e.target.name]:e.target.value})}  type="text" id="form7Example5" className="form-control" />
                </div>
      
                
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form7Example6">Category</label>
                  <input name="category" onBlur={(e)=> setProduct({...product,[e.target.name]:e.target.value})} type="text" id="form7Example6" className="form-control" />
                </div>


                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form7Example7">Price</label>
                  <input name="price" onBlur={(e)=> setProduct({...product,[e.target.name]:e.target.value})} type="number" id="form7Example7" className="form-control" />
                </div>
      
               
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form7Example7">Description</label>
                  <textarea name="description" onBlur={(e)=> setProduct({...product,[e.target.name]:e.target.value})} className="form-control" id="form7Example7" rows="4"></textarea>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form7Example7">image</label>
                  <input name="image" onBlur={(e)=> setProduct({...product,[e.target.name]:e.target.files[0]})} type="file" id="form7Example7" className="form-control" />
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