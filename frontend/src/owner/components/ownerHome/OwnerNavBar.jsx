import "./ownernav.css";
import img from "../../../images/default.png";
import { useDispatch } from "react-redux";
import { setOwnerDetails } from "../../../redux/ownerSlice";
import { useNavigate } from "react-router-dom";
function OwnerNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="nav-bar-owner mt-3  mx-4">
      <button
        className="btn btn-outline-danger "
        onClick={() => {
          localStorage.removeItem("owner");
          dispatch(setOwnerDetails({}));
          navigate("/owner-login");
        }}
      >
        lOGOUT
      </button>
      <img className="profile-img-nav mx-3" src={img} alt="" />
    </div>
  );
}

export default OwnerNavBar;
