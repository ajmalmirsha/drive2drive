import { useEffect, useState } from "react";
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import "./banner.css";
import img from "../../../images/banners/The Ford Mustang_.jpeg";
function Banner({ vehicles }) {
  const [loading, setLoading] = useState(false);
  const { userAuthenticationHandler } = useErrorHandler();
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    setLoading(true);
    userApi
      .get("/get/all/banners")
      .then(({ data: { data } }) => {
        setLoading(false);
        setBanner(data);
      })
      .catch((err) => {
        userAuthenticationHandler(err);
      });
  }, []);

  return (
    <div className="card">
      {banner.length > 0 && (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={banner[0]?.image?.url} class="d-block w-100" alt="..." />
            </div>
            {banner.length > 1 &&
              banner.map((x) => {
                <div class="carousel-item">
                  <img src={x?.image?.url} class="d-block w-100" alt="..." />
                </div>;
              })}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      )}

      <div className="d-flex justify-content-center ">
        <img className="w-50" src={img} alt="" />
      </div>
    </div>
  );
}

export default Banner;
