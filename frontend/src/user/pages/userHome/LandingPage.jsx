import style from "./userHome.module.css";
import l2 from "../../../assets/LandingPageFrame2.svg";
import l1 from "../../../assets/LandingPageFrame1.svg";
import lCar1 from "../../../assets/LandingCar1.svg";
import Navbar from "../../Components/userHome/Navbar";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useRef } from "react";

export default function LandingPage() {
  const carRef = useRef();
  const navigate = useNavigate();

  const handleCarAnimate = () => {
    console.log("loaded");
    
    gsap.to(carRef.current, {
      duration: 2.5,
      x: 0,
      ease: "power2"
    });
  };
  return (
    <div className={style.container}>
      <img className={style.l2} src={l2} alt="" />
      <img className={style.l1} src={l1} alt="" />
      <img
        ref={carRef}
        onLoad={handleCarAnimate}
        className={style.lCar1}
        src={lCar1}
        alt=""
      />
      <div className={style.content}>
        <h1>Drive the Experience: Your Journey, Your Car, Your Way!</h1>
        <br />
        <button
          onClick={() => navigate("/list-all/vehicles")}
          className={style.browseBtn}
        >
          Rent a car
        </button>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
}
