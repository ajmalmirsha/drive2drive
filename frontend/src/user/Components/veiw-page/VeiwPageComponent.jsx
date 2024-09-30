import React, { useEffect, useState } from "react";
import style from "./viewPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactImageMagnify from "react-image-magnify";
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import ChatPage from "../../pages/chat/ChatPage";
import { Skeleton } from "primereact/skeleton";
import gearIcon from "../../../assets/view-icons/gear.svg";
import distanceIcon from "../../../assets/view-icons/distance.svg";
import doorIcon from "../../../assets/view-icons/door.svg";
import fuelIcon from "../../../assets/view-icons/fuel.svg";
import seatsIcon from "../../../assets/view-icons/seats.svg";

const ViewPageComponent = () => {
  const [loading, setLoading] = useState(false);
  const { userAuthenticationHandler } = useErrorHandler();
  const user = useSelector((state) => state.user);
  const [vehicle, setVehicle] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [avgRating, setAvgRating] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  const [ownerId, setOwnerId] = useState("");
  const [report, setReport] = useState("");
  const [visible, setVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  useEffect(() => {
    (function () {
      setLoading(true);
      userApi
        .get(`/vehicle/data/${id}`)
        .then(({ data: { data } }) => {
          setVehicle(data);
          setLoading(false);
          setReviews(data.reviews.reverse());
        })
        .catch((err) => {
          if (err?.response?.status === 404) {
            return navigate(-1);
          }
          userAuthenticationHandler(err);
        });
    })();
  }, []);

  useEffect(() => {
    const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = ratingsSum / reviews.length;
    const roundedAvgRating = avgRating.toFixed();
    setAvgRating(roundedAvgRating);
  }, [reviews]);

  const navigate = useNavigate();

  // State for rating
  const [rating, setRating] = useState(0);

  // State for review
  const [review, setReview] = useState("");

  // State for selected images
  const [selectedImages, setSelectedImages] = useState({});

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
    const files = e.target.files;
    if (files && e.target.files?.length !== 0) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.includes("image")
      );
      if (imageFiles.length > 0) {
        setSelectedImages(e.target.files[0]);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewData = {
        rating,
        review,
        vehicleId: vehicle._id,
        userId: user.id,
      };
      const formData = new FormData();
      formData.append("image", selectedImages);
      formData.append("reviewData", JSON.stringify(reviewData));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      userApi
        .post("/vehicle/review/add", formData, config)
        .then(({ data: { data } }) => {
          setReviews(data.reverse());
        })
        .catch((err) => {
          userAuthenticationHandler(err);
        });
      setRating(0);
      setReview("");
      setSelectedImages("");
    } catch (error) {
      userAuthenticationHandler(error);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    userApi
      .post("/add-report", { report, proId: vehicle._id })
      .then(({ data: { message } }) => {
        setReport("");
        setVisible(false);
      })
      .catch((err) => {
        userAuthenticationHandler(err);
      });
  };

  const redirectToCheckOut = (e) => {
    userApi
      .get("/check-license-verifications")
      .then(({ data }) => {
        if (data?.success) {
          navigate(`/checkout/${vehicle._id}`);
        } else {
        }
      })
      .catch((err) => {
        userAuthenticationHandler(err);
      });
  };

  return (
    <div className={style.viewContainer}>
      <div className={style.productContainer}>
        <div className={style.productView}>
          <h1 className={style.productTitle}>BMW</h1>
          <h1 className={style.productPrice}>
            ₹25 <span>/day</span>
          </h1>
          {!loading ? (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "loading",
                  isFluidWidth: true,
                  src: vehicle?.image?.length && vehicle?.image[mainImage]?.url,
                },
                largeImage: {
                  src: vehicle?.image?.length && vehicle?.image[mainImage]?.url,
                  width: 1000,
                  height: 800,
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%",
                },
              }}
            />
          ) : (
            <Skeleton width={600} height={400}></Skeleton>
          )}
        </div>

        <div className={style.imageContainer}>
          {vehicle?.image?.length &&
            vehicle?.image.map((x, i) => {
              return (
                i !== mainImage &&
                (loading ? (
                  <Skeleton width="100%" height="100%"></Skeleton>
                ) : (
                  <img
                    key={i}
                    src={x.url}
                    alt="loading"
                    onClick={() => {
                      setMainImage(i);
                    }}
                  />
                ))
              );
            })}
        </div>
      </div>
      <div className={style.detailsContainer}>
        <h1 className={style.heading}>Technical Specification</h1>

        <div className={style.cardContainer}>
          <div className={style.card}>
            <img src={gearIcon} alt="gear" />
            <h4>Gear Box</h4>
            <h5>Automat</h5>
          </div>

          <div className={style.card}>
            <img src={fuelIcon} alt="gear" />
            <h4>Fuel</h4>
            <h5>Petrol</h5>
          </div>

          <div className={style.card}>
            <img src={doorIcon} alt="gear" />
            <h4>Doors</h4>
            <h5>4</h5>
          </div>

          <div className={style.card}>
            <img src={gearIcon} alt="gear" />
            <h4>Air Conditioner</h4>
            <h5>Yes</h5>
          </div>

          <div className={style.card}>
            <img src={seatsIcon} alt="gear" />
            <h4>Seats</h4>
            <h5>5</h5>
          </div>

          <div className={style.card}>
            <img src={distanceIcon} alt="gear" />
            <h4>Distance</h4>
            <h5>500KM</h5>
          </div>
        </div>

        <button
          onClick={() => navigate(`/checkout/${vehicle._id}`)}
          className={style.rentBtn}
        >
          Rent a Car
        </button>
      </div>
    </div>
  );
};

export default ViewPageComponent;
