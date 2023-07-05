import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import './editVehicle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter, faFileUpload, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ownerApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler"
import Select from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import Spinner from "../../../common/spinners/Spinner"

export default function EditVehicle() {
  const { id } = useParams()
  const [product, setProduct] = useState({
    id: null,
    product_name: null,
    category: null,
    type: null,
    segment: null,
    price: null,
    description: null,
    model: null,
    brand: null,
    year: null,
    seats: null,
    mileage: null,
    images: [],
    places: [],
  })
  const [loading, setLoading] = useState(false)
  const [droppedImage, setDroppedImage] = useState([])
  const { ownerAuthenticationHandler } = useErrorHandler()
  useEffect(() => {
    setLoading(true)
    ownerApi.get(`/edit-product-details/${id}`).then(({ data: { data } }) => {
      setLoading(false)
      setProduct({
        id: data._id,
        product_name: data.product_name,
        category: data.category,
        type: data.type,
        segment: data.segment,
        price: data.price,
        description: data.description,
        model: data.model,
        brand: data.brand,
        year: data.year,
        seats: data.seats,
        mileage: data.mileage,
        images: data.image,
        places: data.places,
      });
    }).catch(err => {
      ownerAuthenticationHandler(err)
    })
  }, [])





  const DropArea = ({ onDrop }) => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const fullImageUrl = event.dataTransfer.getData('text/plain');
      const filename = fullImageUrl.substring(fullImageUrl.lastIndexOf('/') + 1);
      onDrop(filename);
    };

    return (
      <div
        className="drop-area col-md-2 m-auto d-flex justify-content-center align-items-center border p-3"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    );
  };

  const navigate = useNavigate()

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
        (key === 'places' && value.length === 0)
      )
      .map(([key]) => key);

    if (nullProperties?.length > 0) {
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
    }
    else {
      setLoading(true)
      ownerApi.post("/edit-vehicle", { data: product }).then(({ data: { message }, status }) => {
        setLoading(false)
        if (status == 200) {
          toast.success(message, {
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
      }).catch(err => {
        ownerAuthenticationHandler(err)
      })


    }
  }


  const handleDropImage = (imageId) => {
    setLoading(true)
    ownerApi.post(`/delete/vehicle/image/${imageId}/${product.id}`).then(({ data: { data } }) => {
      setLoading(false)
      setProduct({
        id: data._id,
        product_name: data.product_name,
        category: data.category,
        type: data.type,
        segment: data.segment,
        price: data.price,
        description: data.description,
        model: data.model,
        brand: data.brand,
        year: data.year,
        seats: data.seats,
        mileage: data.mileage,
        images: [...data.image],
        places: data.places,
      });
    }).catch(err => {
      err.response.status == 400 && toast.error(err.response.data.message)
      ownerAuthenticationHandler(err)
    })

  };


  function onImageDrop(file) {

    file.length > 0 ? setDroppedImage([...droppedImage, ...file]) : setDroppedImage([...droppedImage, file]);

  }

  function uploadImages() {
    setLoading(true)
    if (droppedImage.length + product.images.length > 4) {
      return toast.error('maximum 4 images you can upload !')
    }
    const formData = new FormData()
    for (let i = 0; i < droppedImage.length; i++) {
      formData.append('images', droppedImage[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        vehcleId: product.id
      },

      withCredentials: true,
    };

    ownerApi.post('/upload-vehicle-images', formData, config).then(({ data: { data } }) => {
      setProduct({
        id: data._id,
        product_name: data.product_name,
        category: data.category,
        type: data.type,
        segment: data.segment,
        price: data.price,
        description: data.description,
        model: data.model,
        brand: data.brand,
        year: data.year,
        seats: data.seats,
        mileage: data.mileage,
        images: data.image,
        places: data.places,
      });
      setDroppedImage([])
      setLoading(false)

    }).catch(err => {
      ownerAuthenticationHandler(err)
    })
  }

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        const arr = imageDataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const convertedFile = new File([u8arr], file.name, { type: mime });
        onImageDrop(convertedFile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const animatedComponents = makeAnimated();

  const colourOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  // const placeOptions = product.places.map((place) => ({
  //   value: place,
  //   label: place
  // }));

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

    <div className="col-md-9 my-3">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">Edit product</h5>
        </div>
        { loading ? <Spinner/> :
        <div className="card-body">

          <div className="row">
            <div className="image-list-edit col-md-8 ">
              {
                product?.images.map((x) => {
                  return (
                    <img src={`${process.env.REACT_APP_URL}/public/images/${x}`} alt="" />
                  )
                })
              }
            </div>


            <DropArea onDrop={handleDropImage} />
          </div>
          <form>



            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example5">Product name</label>
              <input name="product_name" value={product.product_name} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example5" className="form-control" />
            </div>
            {/* <select onChange={(e)=>{
   setProduct({ ...product, category: e.target.value })
  }} class="form-select" aria-label="Default select example">
  <option  selected>{product.category}</option>
  <option value="car">car</option>
  <option value="bike">bike</option>
</select>
     */}

            <div className="row">
              <label className="form-label mt-3" htmlFor="type">Type</label>

              <div className="col-md-4 mb-3 mt-1" >
                <select id="type" onChange={(e) => {
                  setProduct({ ...product, type: e.target.value })
                }} value={product.type} class="form-select" aria-label="Default select example">
                  {/* <option selected>{product.type}</option> */}
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
                }} value={product?.segment} class="form-select" aria-label="Default select example">
                  <option value="vintage">vinatge</option>
                  <option value="premium">premium</option>
                  <option value="normal">normal</option>
                </select>
              </div>
              <div className="col-md-4 row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <button onClick={(e) => {
                    e.preventDefault()
                    setProduct({ ...product, category: 'manual' })
                  }} className={product.category !== 'manual' ? `btn btn-outline-secondary` : 'btn btn-secondary'} >manual</button>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
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
                <input name="model" value={product.model} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
              </div>

              <div className="col-md-4 form-outline mb-4">
                <label className="form-label" htmlFor="form7Example6">Brand</label>
                <input name="brand" value={product.brand} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
              </div>

              <div className="col-md-4 form-outline mb-4">
                <label className="form-label" htmlFor="form7Example6">Year</label>
                <input name="year" value={product.year} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} type="text" id="form7Example6" className="form-control" />
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

                }} type="number" id="form7Example7" className="form-control" />
              </div>
              <div className="form-outline col-md-4 mb-4">
                <label className="form-label" htmlFor="form7Example7">mileage</label>
                <input value={product.mileage} name="mileage" onChange={(e) => {

                  !isNaN(e.target.value) && setProduct({ ...product, [e.target.name]: e.target.value })

                }} type="text" id="form7Example7" className="form-control" />
              </div>

            </div>
            <div className="form-outline mb-4">
              <label htmlFor="places">add Places</label>
              <Select
                id='places'
                closeMenuOnSelect={false}
                components={animatedComponents}
                // defaultValue={placeOptions}
                isMulti
                isCreatable={true}
                options={colourOptions}
                isLoading={false}
                value={product.places}
                onChange={handleSelectChange}
              />
            </div>



            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example7">Description</label>
              <textarea name="description" value={product.description} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} className="form-control" id="form7Example7" rows="4"></textarea>
            </div>



            <div className="form-check d-flex justify-content-center mb-2">
              <button onClick={handleSubmit} className="btn btn-outline-dark">submit</button>
            </div>



            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form7Example7">image</label>
              <input multiple name="images" hidden onChange={(e) => onImageDrop(e.target.files)} type="file" id="image-upload" className="form-control" />

            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="image-upload"
                    className="add-drop-image text-center d-flex align-items-center justify-content-center"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ width: '300px', height: '200px', border: '2px dashed black' }}
                  >
                    Drop or Upload Image Here
                  </label>
                </div>
                <div className="col-md-6">
                  <div className="dropped-add-image">
                    {droppedImage &&

                      droppedImage.map((x) => {
                        return <img src={URL.createObjectURL(x)} alt="" />;
                      })}
                  </div>
                  {droppedImage && droppedImage.length > 0 && <button onClick={(e) => {
                    e.preventDefault()
                    setDroppedImage([])
                  }} className="float-md-end btn btn-danger my-2"> <FontAwesomeIcon icon={faTrash} /> clear</button>}
                  {droppedImage && droppedImage.length > 0 && (
                    <div className="d-flex justify-content-center mt-3">

                      <button onClick={(e) => {
                        e.preventDefault()
                        uploadImages()
                      }} className="btn btn-primary"><FontAwesomeIcon icon={faFileUpload} /> Upload Image</button>
                    </div>
                  )}
                </div>


              </div>
            </div>


          </form>
        </div>
        }
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