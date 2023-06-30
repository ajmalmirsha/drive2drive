import React, { useEffect, useRef, useState } from 'react';
import './viewPage.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import ReactImageMagnify from 'react-image-magnify'
import img from '../../../../src/images/default.png'
import { userApi } from '../../../utils/Apis';
import {  useErrorHandler } from '../../ErrorHandlers/ErrorHandler';
import ChatPage from '../../pages/chat/ChatPage';
import { ToastContainer, toast } from 'react-toastify';
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ViewPageComponent = () => {
  const [ loading, setLoading ] = useState(true)
      const {userAuthenticationHandler} =  useErrorHandler()
      const user = useSelector(state => state.user)
      const [vehicle, setVehicle] = useState({});
      const [reviews,setReviews] = useState([])
      const { id } = useParams();
      const [avgRating,setAvgRating] = useState(0)
      const [mainImage,setMainImage] = useState(0)
      const [ownerId,setOwnerId] = useState('')
      const [ report , setReport ]  = useState('')
      const [visible, setVisible] = useState(false);
  useEffect(() => {
    ( 
    function () {
      userApi.get(`/vehicle/data/${id}`).then(({data:{data}}) => {
       setVehicle(data);
       setLoading(false)
        setReviews(data.reviews.reverse())

         }).catch((err) => {
          userAuthenticationHandler(err)
         })
    }
    )()

  }, []);
  
  useEffect(()=>{
    const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0)
    const avgRating = ratingsSum / reviews.length;
    const roundedAvgRating = avgRating.toFixed()
    setAvgRating(roundedAvgRating)
    console.log(vehicle,987);
  },[reviews])
 
const navigate = useNavigate()
  
  // State for rating
  const [rating, setRating] = useState(0);

  // State for review
  const [review, setReview] = useState('');

  // State for selected images
  const [ selectedImages, setSelectedImages] = useState({});

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Handle review change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    setSelectedImages(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const reviewData = {
                           rating,
                           review,
                           vehicleId:vehicle._id,
                           userId:user.id,
                         }
      const formData = new FormData()
            formData.append('image',selectedImages)
            formData.append('reviewData',JSON.stringify(reviewData))
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      };
     
      userApi.post( '/vehicle/review/add',formData, config).then(({data:{data}})=>{
        setReviews(data.reverse())
      }).catch((err) => {
        userAuthenticationHandler(err)
      })
      setRating(0);
      setReview('');
      setSelectedImages('');

    } catch (error) {
      userAuthenticationHandler(error)
    }
   
  };

  const handleReportSubmit = (e) => {
    e.preventDefault()
     console.log(report);
     userApi.post('/add-report',{report,proId:vehicle._id}).then( ({data:{message}}) => {
       toast.success(message)
       setReport('')
     }).catch( err => {
      userAuthenticationHandler(err)
     })
  }

  return (
    <div className="product-details-container">
      <div className="row w-100">
        <div className="col-lg-6 " >
          {  !loading ?
          <ReactImageMagnify className='zoom-image'
                        {...{
                            smallImage: {
                                alt: 'loading',
                                isFluidWidth: true,
                                src: `${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[mainImage]}`,
                            },
                            largeImage: {
                                src: `${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[mainImage]}`,
                                width: 1250,
                                height: 1200,
                            },
                            enlargedImageContainerDimensions: {
                                width: '100%',
                                height: '100%',
                            },
                        }}
                    />  :
                    <Skeleton width="100%" height="100%"></Skeleton>
                    }
       <div className="gap-5 row">{
      vehicle?.image?.length &&  vehicle?.image.map((x,i)=>{
      
         return(   i !== mainImage  && ( loading ? <Skeleton width="100%" height="100%"></Skeleton> : <img key={i} src={`${process.env.REACT_APP_URL}/public/images/${x}`} alt="loading" onClick={()=>{ setMainImage(i) }} className="col-md-3 my-5 mx-1  sub-images" /> ) )

        })
       }</div>
     <div class="">
  <button type="button" class="btn btn-danger" onClick={() => setVisible(true)}  >
    Report spam
  </button>
  <Dialog  header='Report spam' visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
  <form  onSubmit={handleReportSubmit} >
        <textarea value={report} onChange={(e) => setReport(e.target.value)} className='d-block w-100' name="" id="" cols="30" rows="10"></textarea>
        <div className="d-flex pt-2 justify-content-center">
        <button className='d-block btn btn-danger' type='submit'>Report</button>
        </div>
      </form>
            </Dialog>
  {/* <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">
    <form onSubmit={handleReportSubmit} >
      <h4 className='text-danger'>Report spam</h4>
        <textarea value={report} onChange={(e) => setReport(e.target.value)} className='d-block' name="" id="" cols="30" rows="10"></textarea>
        <div className="d-flex pt-2 justify-content-center">
        <button className='d-block btn btn-danger' type='submit'>Report</button>
        </div>
      </form>
      </a></li>
  </ul> */}
</div>
        </div>
        <div className="col-lg-6 ">
          <div className="product-info">
            <h2 className="product-name">{vehicle?.product_name}</h2>
              {/* total average stars */}
              <div className="total-review-stars">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          style={{fontSize: '24px'}}
                          className={`star-icon ${value <= avgRating ? 'filled' : ''}`}
                        >
                          ★
                        </span>

                      ))}
                    </div>
            <div className="product-brand">Brand: {vehicle?.brand}</div>
            <div className="product-model">Model: {vehicle?.model}</div>
            <div className="product-year">Year: {vehicle?.year}</div>
            <div className="product-price">{vehicle?.price}</div>
            <div className="product-description">{vehicle?.description}</div>
<div className="row">
  <div className="col-md-6"><button onClick={()=> {
    console.log(user);
    user?.license?.verification === 'verified' ?  navigate(`/checkout/${vehicle._id}`) :
     toast.error(`your license verification ${user?.license?.verification}`)
     }
     } className='btn btn-primary'>Book Now</button>
</div>
  <div className="col-md-6">
    <button type="button" onClick={()=> setOwnerId(vehicle?.ownerId) } class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
chat with owner
</button>

</div>
           

</div>
{  vehicle?.bookedUsers?.length > 0 && vehicle?.bookedUsers?.includes(user.id) &&
       (
            <form onSubmit={handleSubmit}>
              <div className="rating-container">
                <span className="rating-label">Rate this product:</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={`star-icon ${value <= rating ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(value)}
                    >
                      ★
                    </span>
                  ))}
              
                </div>
              </div>

              <div className="review-container">
                <span className="review-label">Write a review:  <label htmlFor="image-upload"><FontAwesomeIcon icon={faImage} /></label></span>
                <textarea
                  className="review-textarea form-control"
                  rows={4}
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Enter your review here..."
                />
              </div>

              {/* <div className="selected-images-container">
                {selectedImages &&
                  <img
                    className="selected-image img-fluid"
                    src={selectedImages}
                    alt={`Selected Image`}
                  />
                }
              </div> */}

              <div className="mb-3">
                <input
                hidden
                  className="image-input form-control"
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
              </div>

              <button className="submit-button btn btn-primary" type="submit">Submit {reviews?.userimage}</button>
            </form> 
           ) }

            <ul className="reviews-list h-25 my-4 ">
              { reviews.length ? reviews.map((review) => (
                <li className="review-item row">
                <div className="col-md-9">
                  <div className="review-rating">
                  <img className='me-2'  src={ review?.userId?.image?.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   review?.userId?.image  : review?.userId?.image ? `${process.env.REACT_APP_URL}/public/images/${review?.userId?.image}` : img} alt="" />
                    <span className="review-rating-label">{review?.userId?.username}</span>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          className={`star-icon ${value <= review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>

                      ))}
                    </div>
                  </div>   
                  <p className="review-text">{review.review}</p>
                  </div>
               { review.image &&   <div className="col-md-3">
                  <img className='review-image' src={`${process.env.REACT_APP_URL}/public/images/reviewImages/${review.image}`} alt="" />
                  </div> }
                </li>
              )) : "add your first review"}
            </ul>
          </div>
        </div>
      </div>
{/* <!-- Modal --> */}

      <div  class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
     
      
      <div class="modal-body m-0 p-0"  style={{height:'80vh'}} >
        { ownerId && <ChatPage ownerId={ownerId} />}
      </div>
      
    </div>
  </div>
</div>
<ToastContainer/>
    </div>
  );
};

export default ViewPageComponent;
