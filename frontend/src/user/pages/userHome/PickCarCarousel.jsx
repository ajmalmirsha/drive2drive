import style from "./carCarousel.module.css";
import Ferrari from "../../../assets/Ferrari.svg";
import Benz from "../../../assets/Benz.svg";
import BMW from "../../../assets/BMW.svg";
import { useNavigate } from "react-router-dom";

export default function PickCarCarousel() {
  const navigate = useNavigate()
  return (
    <div className={style.carouselWrapper}>
      <div className={style.carousel}>
        <div className={style.greenBg}></div>
        <div className={style.orangeBg}></div>

        <div className={style.headerWrapper}>
          <div className={style.header}>
            <h1>Pick Your Car</h1>
            <p>2021 FERRARI 488 PISTA SPIDER</p>
          </div>
        </div>

        <div className={style.carWrapper}>
          <img src={Benz} alt="" />
          <img src={Ferrari} alt="" />
          <img src={BMW} alt="" />
        </div>

        <button onClick={()=> navigate("/list-all/vehicles")}>Browse</button>
      </div>
    </div>
  );
}
