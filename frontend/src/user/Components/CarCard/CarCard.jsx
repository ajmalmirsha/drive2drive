import style from "./carCard.module.css";
import Ferrari from "../../../assets/Ferrari.svg";
import { useNavigate } from "react-router-dom";

export default function CarCard({
  x,
  img,
  reviews,
  name,
  price,
  category,
  seats,
  year,
}) {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <img src={img} alt="" />
      <div className={style.details}>
        <h5 className={style.productName}>{name}</h5>
        {/* <p className={style.rating}>
          {reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length || 0}{" "}
          <span>({reviews.length} reviews)</span>
        </p> */}

        <div className={style.pc}>
          <p>{seats} Passengers</p>
        </div>

        <div className={style.ac}>
          <p>Ac</p>
        </div>

        <div className={style.at}>
          <p>{category}</p>
        </div>

        <div className={style.dr}>
          <p>{year}</p>
        </div>

        <hr className={style.divider} />

        <h5 className={style.priceTag}>Price</h5>
        <h5 className={style.amount}>
          ₹{price} <span>/day</span>
        </h5>

        <button
          onClick={() => {
            navigate(`/veiw-detail/${x._id}`);
          }}
          className={style.rentButton}
        >
          Rent Now
        </button>
      </div>
    </div>
  );
}
