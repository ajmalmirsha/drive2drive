import AddressInputs from "../../Components/userHome/AddressInputs";
import LCar2 from "../../../assets/LandingCar2.svg";
import style from "./userHome.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PriceRangeLogo from "../../../assets/PriceRangeLogo.svg";
import TechSupportLogo from "../../../assets/TechSupportLogo.svg";
import H24Logo from "../../../assets/24HLogo.svg";

export default function Search() {
  const carRef = useRef(null);
  const contentHeadRef = useRef(null);
  const priceRangeRef = useRef(null);
  const techRef = useRef(null);
  const hrRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(carRef.current, {
      x: 0,
      duration: 2,
      scrollTrigger: carRef.current,
    });

    gsap.to(contentHeadRef.current, {
      x: 0,
      duration: 1,
      scrollTrigger: contentHeadRef.current,
    });

    gsap.to(priceRangeRef.current, {
      x: 0,
      duration: 1.5,
      scrollTrigger: priceRangeRef.current,
    });

    gsap.to(techRef.current, {
      x: 0,
      duration: 2,
      scrollTrigger: techRef.current,
    });

    gsap.to(hrRef.current, {
      x: 0,
      duration: 2.5,
      scrollTrigger: hrRef.current,
    });
  });
  return (
    <div className={style.searchContainer}>
      <AddressInputs />

      <div className={style.featureWrapper}>
        <img ref={carRef} src={LCar2} className={style.LCar2} alt="" />
        <div className={style.featureContent}>
          <h1 ref={contentHeadRef}>
            Rent a car now in{" "}
            <span>
              your <br /> hand.
            </span>{" "}
            Try it now!
          </h1>

          <div className={style.featureItemsWrapper}>
            <div ref={priceRangeRef} className={style.itemsWrapper}>
              <img src={PriceRangeLogo} alt="" />
              <div className={style.discWrapper}>
                <h5>A lot of price range</h5>
                <p>
                  Don’t need to worry choosing car that match your budget, we
                  serve cars with a lot of price variant
                </p>
              </div>
            </div>

            <div ref={techRef} className={style.itemsWrapper}>
              <img src={TechSupportLogo} alt="" />
              <div className={style.discWrapper}>
                <h5>Technical Support guaranteed</h5>
                <p>
                  Our dedicated technical support team is available, no matter
                  when you encounter an issue
                </p>
              </div>
            </div>
            <div>
              <div ref={hrRef} className={style.itemsWrapper}>
                <img src={H24Logo} alt="" />
                <div className={style.discWrapper}>
                  <h5>24 hours car delivery</h5>
                  <p>
                    Your rent car will be delivered promptly, allowing to
                    proceed without unnecessary delays
                  </p>
                </div>
              </div>
              {/* <div
                style={{ height: "10vh"}}
              ></div> */}
            </div>

            {/* <div className={style.itemsWrapper}>
              <img src={PriceRangeLogo} alt="" />
              <div className={style.discWrapper}>
                <h5>Expert Driver Service</h5>
                <p>
                  Trust in their expertise to navigate through traffic and
                  ensure your safety throughout the journey
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
