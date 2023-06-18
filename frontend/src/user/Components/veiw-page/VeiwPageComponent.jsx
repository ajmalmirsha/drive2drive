import React, { useEffect, useState } from 'react';
import './viewPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import ReactImageMagnify from 'react-image-magnify'
import img from '../../../../src/images/default.png'
import { userApi } from '../../../utils/Apis';
import {  useErrorHandler } from '../../ErrorHandlers/ErrorHandler';
import ChatPage from '../../pages/chat/ChatPage';

const ViewPageComponent = () => {
      const {userAuthenticationHandler} =  useErrorHandler()
      const user = useSelector(state => state.user)
      const [vehicle, setVehicle] = useState({});
      const [reviews,setReviews] = useState([])
      const { id } = useParams();
      const [avgRating,setAvgRating] = useState(0)
      const [mainImage,setMainImage] = useState(0)
      const [ownerId,setOwnerId] = useState('')

  useEffect(() => {
    ( 
    function () {
      userApi.get(`/vehicle/data/${id}`).then(({data:{data}}) => {
       setVehicle(data);
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
                           userImage:user.image,
                           username:user.username
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
        setReviews(data.reviews.reverse())
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

  return (
    <div className="product-details-container">
      <div className="row w-100">
        <div className="col-lg-6 " >
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
                    />
       <div className="gap-5 row">{
      vehicle?.image?.length &&  vehicle?.image.map((x,i)=>{
      
         return(   i !== mainImage  && <img key={i} src={`${process.env.REACT_APP_URL}/public/images/${x}`} alt="loading" onClick={()=>{ setMainImage(i) }} className="col-md-3 my-5 mx-1  sub-images" /> )

        })
       }</div>
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
  <div className="col-md-6"><button onClick={()=> { navigate(`/checkout/${vehicle._id}`) }} className='btn btn-primary'>Book Now</button>
</div>
  <div className="col-md-6">
    <button type="button" onClick={()=> setOwnerId(vehicle?.ownerId) } class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
chat with owner
</button>
</div>
            {/* <button onClick={()=> navigate(`/chat/${vehicle?.ownerId}`)} >chat with owner</button> */}
            {/* <!-- Button trigger modal --> */}

</div>
{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
     
      
      <div class="modal-body m-0 p-0"  style={{height:'80vh'}} >
        { ownerId && <ChatPage ownerId={ownerId} />}
      </div>
      
    </div>
  </div>
</div>
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

            <ul className="reviews-list h-25 my-4 ">
              { reviews.length ? reviews.map((review) => (
                <li className="review-item row">
                <div className="col-md-9">
                  <div className="review-rating">
                  <img className='me-2'  src={ review?.userimage?.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   review.userimage  : review.userimage ? `${process.env.REACT_APP_URL}/public/images/${review.userimage}` : img} alt="" />
                    <span className="review-rating-label">{review.username}</span>
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
    </div>
  );
};

export default ViewPageComponent;
