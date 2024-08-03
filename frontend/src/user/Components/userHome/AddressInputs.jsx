import Tesla from "../../../assets/carLogos/Tesla.svg";
import Nissan from "../../../assets/carLogos/nissan.svg";
import BMW from "../../../assets/carLogos/BMW.svg";
import chevrolet from "../../../assets/carLogos/Chevrolet.svg";
import Lamborghini from "../../../assets/carLogos/lamborghini.svg";
import Ford from "../../../assets/carLogos/Ford.svg";
import MercedesBenz from "../../../assets/carLogos/Mercedes-Benz.svg";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import style from "./addressInput.module.css";

import { useEffect, useRef, useState } from "react";
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function AddressInputs({ handleSubmit }) {
  const [pickDate, setPickDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [pickDatePlaceHolder, setpickDatePlaceHolder] = useState(null);
  const [dropDatePlaceHolder, setdropDatePlaceHolder] = useState(null);
  const [placeOptions, setPlaceOption] = useState([]);
  const [place, setPlace] = useState({});
  const { userAuthenticationHandler } = useErrorHandler();
  useEffect(() => {
    userApi
      .get("/available-places")
      .then(({ data: { data } }) => {
        setPlaceOption(data);
      })
      .catch((err) => {
        userAuthenticationHandler(err);
      });
  }, []);

  function handleStartDateChange(dateStr) {
    const date = new Date(dateStr);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTime = date.toLocaleString("en-US", options);

    setpickDatePlaceHolder(formattedDateTime);
    setPickDate(dateStr);
  }
  function handleDropDateChange(dateStr) {
    const date = new Date(dateStr);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTime = date.toLocaleString("en-US", options);

    setdropDatePlaceHolder(formattedDateTime);
    setDropDate(dateStr);
  }
  const CustomPlaceholder = (props) => (
    <div className="text-secondary container m-0 p-0 choose-location text-ellipsis">
      <span className="">Choose a location</span>
    </div>
  );
  // handle place change
  const handlePlaceChange = (data) => {
    setPlace(data);
  };

  const headRef = useRef(null);
  const logoRef = useRef(null);
  const inputRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(headRef.current, {
      y: 0,
      duration: 1,
      scrollTrigger: headRef.current,
    });
    gsap.to(logoRef.current, {
      y: 0,
      duration: 1,
      scrollTrigger: logoRef.current,
    });
    gsap.to(inputRef.current, {
      y: 10,
      duration: 1,
      scrollTrigger: inputRef.current,
    });
  });

  return (
    <div className={style.container} >
      <div style={{height:"5vh"}} ></div>
      <h3 ref={headRef} className={style.header}>Trusted by more than 50+ brands</h3>

      <div ref={logoRef} className={style.imageWrapper}>
        <img src={Tesla} alt="Tesla" />
        <img src={Nissan} alt="Nissan" />
        <img src={BMW} alt="BMW" />
        <img src={chevrolet} alt="chevrolet" />
        <img src={Lamborghini} alt="Lamborghini" />
        <img src={Ford} alt="Ford" />
        <img src={MercedesBenz} alt="MercedesBenz" />
      </div>

      <div  className={style.searchContainer}>
        <div ref={inputRef} className={style.searchWrapper}>
          <Select
            className={style.placeSelect}
            isClearable={true}
            isSearchable={true}
            onChange={handlePlaceChange}
            name="place"
            components={{ Placeholder: CustomPlaceholder }}
            options={placeOptions}
          />
          <DatePicker
            onChange={handleStartDateChange}
            showTimeSelect
            shouldCloseOnSelect
            minDate={new Date()}
            maxDate={dropDate && dropDate}
            minTime={new Date()}
            maxTime={dropDate ? dropDate : new Date().setHours(18, 0)}
            placeholderText={
              pickDatePlaceHolder ? pickDatePlaceHolder : "Pick-up date"
            }
            calendarClassName="bg-white shadow-lg rounded-lg py-4 px-2 "
            className="form-control  text-xl bg-slate-200 h-100 d-block text-ellipsis"
          />
          <DatePicker
            onChange={handleDropDateChange}
            showTimeSelect
            shouldCloseOnSelect
            minDate={pickDate ? pickDate : new Date()}
            minTime={pickDate ? pickDate : new Date()}
            maxTime={
              pickDate
                ? new Date(pickDate).setHours(18, 0)
                : new Date().setHours(18, 0)
            }
            disabled={pickDate ? false : true}
            placeholderText={
              dropDatePlaceHolder ? dropDatePlaceHolder : "Drop-off date"
            }
            calendarClassName="bg-white shadow-lg rounded-lg py-4 px-2 "
            className="form-control w-100  text-xl bg-slate-200 h-100 d-block text-ellipsis"
          />
          <button
            onClick={() => {
              handleSubmit(place.value, pickDate, dropDate);
            }}
            className={style.SearchBtn}
          >
            Search
          </button>
        </div>
      </div>

      {/* <div className={style.searchContainer}>
        <div className={style.searchWrapper}>
          <div className={style.placeSelect}>
            <Select
              className="basic-single w-100"
              isClearable={true}
              isSearchable={true}
              onChange={handlePlaceChange}
              name="place"
              Select
              components={{ Placeholder: CustomPlaceholder }}
              options={placeOptions}
            />
          </div>
          <div className="">
            <DatePicker
              onChange={handleStartDateChange}
              showTimeSelect
              shouldCloseOnSelect
              minDate={new Date()}
              maxDate={dropDate && dropDate}
              minTime={new Date()}
              maxTime={dropDate ? dropDate : new Date().setHours(18, 0)}
              placeholderText={
                pickDatePlaceHolder ? pickDatePlaceHolder : "Pick-up date"
              }
              calendarClassName="bg-white shadow-lg rounded-lg py-4 px-2 "
              className="form-control  text-xl bg-slate-200 h-100 d-block text-ellipsis"
              popperClassName="custom-datepicker"
            />
          </div>
          <div className="">
            <DatePicker
              onChange={handleDropDateChange}
              showTimeSelect
              shouldCloseOnSelect
              minDate={pickDate ? pickDate : new Date()}
              minTime={pickDate ? pickDate : new Date()}
              maxTime={
                pickDate
                  ? new Date(pickDate).setHours(18, 0)
                  : new Date().setHours(18, 0)
              }
              disabled={pickDate ? false : true}
              placeholderText={
                dropDatePlaceHolder ? dropDatePlaceHolder : "Drop-off date"
              }
              calendarClassName="bg-white shadow-lg rounded-lg py-4 px-2 "
              className="form-control w-100  text-xl bg-slate-200 h-100 d-block text-ellipsis"
              popperClassName="custom-datepicker"
            />
          </div>
          <div className="">
            <button
              onClick={() => {
                handleSubmit(place.value, pickDate, dropDate);
              }}
              className=""
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
