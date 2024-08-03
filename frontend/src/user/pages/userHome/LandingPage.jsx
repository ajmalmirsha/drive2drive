import style from "./userHome.module.css";
import l2 from "../../../assets/LandingPageFrame2.svg";
import l1 from "../../../assets/LandingPageFrame1.svg";
import lCar1 from "../../../assets/LandingCar1.svg";
import Navbar from "../../Components/userHome/Navbar";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <img className={style.l2} src={l2} alt="" />
      <img className={style.l1} src={l1} alt="" />
      <img className={style.lCar1} src={lCar1} alt="" />
      <div className={style.content}>
        <h1>Drive the Experience: Your Journey, Your Car, Your Way!</h1>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
}
