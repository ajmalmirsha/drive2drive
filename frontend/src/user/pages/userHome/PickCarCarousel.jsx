import style from "./carCarousel.module.css";
import Ferrari from "../../../assets/Ferrari.svg";
import Benz from "../../../assets/Benz.svg";
import BMW from "../../../assets/BMW.svg";

export default function PickCarCarousel() {
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
      </div>
    </div>
  );
}
