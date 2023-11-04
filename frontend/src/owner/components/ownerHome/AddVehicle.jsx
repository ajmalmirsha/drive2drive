import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux"
import { ownerApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler";
import Select from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import Spinner from '../../../common/spinners/Spinner'
import './addVehicle.css'
function AddVehicle() {
  const owner = useSelector(state => state.owner)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({
    product_name: null,
    category: null,
    type: null,
    segment: null,
    price: '',
    description: null,
    model: null,
    brand: null,
    year: '',
    seats: '',
    mileage: '',
    ownerId: owner.id,
    images: [],
    places: [],
    rc: {
      front: {},
      back: {}
    }
  })

  // const [hub, setHub] = useState(false)


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
        (key === 'brand' && value.trim() === '') ||
        (key === 'places' && value.length === 0) ||
        (key === 'rc' && (!value.front?.name || !value.back?.name))
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
      setLoading(true)
      const formData = new FormData()
      for (let i = 0; i < product.images.length; i++) {
        formData.append('images', product.images[i]);
      }

      formData.append('rc[front]', product.rc.front);
      formData.append('rc[back]', product.rc.back);

      formData.append('product', JSON.stringify(product));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      };
      ownerApi.post("/add-vehicle", formData, config, { data: product }).then(({ data, status }) => {
        setLoading(false)
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
          })
          navigate('/owner/list-vehicle')
        }
      }).catch(err => {
        ownerAuthenticationHandler(err)
      })

    }
  }
  const animatedComponents = makeAnimated();

  // const colourOptions = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  useEffect(() => {
  }, [product.rc.front, product.rc.back])

  const handleSelectChange = (selected) => {
    if (selected?.length > 0) {
      setProduct({
        ...product,
        places: [...selected],
      })
    } else {
      setProduct({
        ...product,
        places: [],
      })
    }
  };

  return (
<>
      {loading ? <div className="col-md-9" ><Spinner /></div>  :
    <div className="col-md-9" >
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">add product</h5>
          </div>
          <div className="card-body custom-scrollbar-white" >
            <form>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form7Example5">Product name</label>
                <input name="product_name" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example5" className="form-control" />
              </div>


              {/* <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example6">Category</label>
              <input name="category" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
            </div> */}
              {/* <label className="form-label" htmlFor="category">Category</label>
            <select onChange={(e)=>{
   setProduct({ ...product, category: e.target.value })
  }} id="category" class="form-select" aria-label="Default select example">
  <option  selected>select a category</option>
  <option value="car">car</option>
  <option value="bike">bike</option>
</select> */}
              <div className="row">
                <label className="form-label mt-3" htmlFor="type">Type</label>

                <div className="col-md-4 mb-3 mt-1" >
                  <select id="type" onChange={(e) => {
                    setProduct({ ...product, type: e.target.value })
                  }} class="form-select" aria-label="Default select example">
                    <option selected>select type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                    <option value="Crossover">Crossover</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3 mt-1" >
                  <select id="type" onChange={(e) => {
                    setProduct({ ...product, segment: e.target.value })
                  }} class="form-select" aria-label="Default select example">
                    <option selected>select segment</option>
                    <option value="vintage">vinatge</option>
                    <option value="premium">premium</option>
                    <option value="normal">normal</option>
                  </select>
                </div>
                <div className="col-md-4 row">
                  <div className="col-lg-6 mb-2 col-md-12 d-flex justify-content-center align-items-center">
                    <button onClick={(e) => {
                      e.preventDefault()
                      setProduct({ ...product, category: 'manual' })
                    }} className={product.category !== 'manual' ? `btn btn-outline-secondary` : 'btn btn-secondary'} >manual</button>
                  </div>
                  <div className="col-lg-6 mb-2 col-md-12 d-flex justify-content-center align-items-center">
                    <button onClick={(e) => {
                      e.preventDefault()
                      setProduct({ ...product, category: 'automatic' })
                    }} className={product.category !== 'automatic' ? `btn btn-outline-secondary` : 'btn btn-secondary'} >automatic</button>
                  </div>
                </div>
              </div>

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
                  <input value={product?.year} name="year" onChange={(e) =>{
                       !isNaN(e.target.value) &&  setProduct({ ...product, [e.target.name]: e.target.value }) 
                  }} type="text" id="form7Example6" className="form-control" />
                </div>

              </div>
              <div className="row">
                <div className="form-outline col-md-4 mb-4">
                  <label className="form-label" htmlFor="form7Example7">Price / perday</label>
                  <input value={product.price} name="price" onChange={(e) => {
                    !isNaN(e.target.value) && setProduct({ ...product, [e.target.name]: e.target.value })

                  }} type="text" id="form7Example7" className="form-control" />
                </div>
                <div className="form-outline col-md-4 mb-4">
                  <label className="form-label" htmlFor="form7Example7">no.of seats</label>
                  <input value={product.seats} name="seats" onChange={(e) => {

                    !isNaN(e.target.value) && setProduct({ ...product, [e.target.name]: e.target.value })

                  }} type="text" id="form7Example7" className="form-control" />
                </div>
                <div className="form-outline col-md-4 mb-4">
                  <label className="form-label" htmlFor="form7Example7">mileage</label>
                  <input value={product.mileage} name="mileage" onChange={(e) => {

                    !isNaN(e.target.value) && setProduct({ ...product, [e.target.name]: e.target.value })

                  }} type="text" id="form7Example7" className="form-control" />
                </div>

              </div>
              <div className="form-outline mb-4">
                {/* <div className="my-1">
                  <input type="checkbox" onChange={(e) => setHub(e.target.checked)} /> i have a hub to collect car
                </div> */}
                {/* {
                  hub ?
                    <input type="text" onChange={(e) => handleSelectChange([])} placeholder="enter your hub location" />
                    :
                    <> */}
                      <label htmlFor="places">add Places</label>
                      <Select
                        id='places'
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // defaultValue={[colourOptions[], colourOptions[5]]}
                        isMulti
                        isCreatable={true}
                        options={product.places}
                        isLoading={false}
                        value={product.places}
                        onChange={handleSelectChange}
                      />
                    {/* </>
                } */}
              </div>


              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form7Example7">Description</label>
                <textarea name="description" onBlur={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} className="form-control" id="form7Example7" rows="4"></textarea>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form7Example7">image</label>
                <input multiple name="images" onChange={(e) =>{
                   const files = e.target.files;
                   if (files && e.target.files?.length !== 0  ) {
                     const imageFiles = Array.from(files).filter(file => file.type.includes('image'));
                     if (imageFiles.length > 0) {
                       setProduct({ ...product, [e.target.name]: Array.from(e.target.files) })
                     }
                   }
                   }} type="file"  accept="image/*"  id="form7Example7" className="form-control" />
              </div>
              <div className="form-outline mb-4 row">
                <label className="form-label" htmlFor="form7Example7">Upload your Rc</label>
                <label htmlFor="rcFront" className="col-md-6 border d-flex justify-content-center align-items-center p-2" style={{ height: '200px' }} >
                  {product.rc.front?.name ? (<img className="w-100 h-100" src={URL.createObjectURL(product.rc.front)} alt="" />) :
                    (<p>Upload front side of your rc book</p>)}
                  <input name="images" hidden onChange={(e) =>
                    setProduct({
                      ...product,
                      rc: { ...product.rc, front: e.target.files[0] }
                    })
                  } type="file" id="rcFront" className="form-control" />
                </label>
                <label htmlFor="rcBack" className="col-md-6 border d-flex justify-content-center align-items-center p-2" style={{ height: '200px' }} >
                  {product.rc.back?.name ? <img className="w-100 h-100" src={URL.createObjectURL(product.rc.back)} alt="" /> :
                    <p>Upload back side of your rc book</p>}
                  <input name="images" hidden  onChange={(e) => setProduct({ ...product, rc: { ...product.rc, back: e.target.files[0] } })} type="file" id="rcBack" className="form-control" />
                </label>
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
      }
</>


  )
}


export default AddVehicle