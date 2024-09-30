import { NavLink, useNavigate } from "react-router-dom";
import style from "../userHome/navbar.module.css";
import img from "../../../images/default.png";
import logo from "../../../images/logo/logo-bg-removed.png";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.getItem("token");
  const handleLogOut = () => {
    {
      localStorage.removeItem("token");
      dispatch(
        setUserDetails({
          id: "",
          username: "",
          email: "",
          phone: null,
          image: "",
          dob: null,
          license: {
            front: "",
            back: "",
          },
        })
      );
      navigate("/login");
    }
  };

  const handleLoginClick = () => navigate("/login");

  const handleRegisterClick = () => navigate("/login?t=r");

  const handleBookingClick = () => navigate("/bookings");

  const handleRentClick = () => navigate("/list-all/vehicles");

  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <h3>Drive2Drive</h3>
      </div>

      <div className={style.items}>
        <h5>Home</h5>
        <h5 onClick={handleRentClick}>Rent</h5>
        <h5 onClick={handleBookingClick}>Bookings</h5>
        <h5>About Us</h5>
      </div>

      {user ? (
        <button onClick={handleLogOut} className={style.logout}>
          logout
        </button>
      ) : (
        <div className={style.buttonWrapper}>
          <button onClick={handleLoginClick} className={style.login}>
            login
          </button>
          <button onClick={handleRegisterClick} className={style.register}>
            register
          </button>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="nav row">
  //     <div className="col-md-1 col-sm-2 col-2">
  //       <img onClick={() => navigate("/")} className="w-100 h-100" src={logo} alt="" />
  //     </div>
  //     <div data-bs-toggle="tooltip" data-bs-placement="top" title="" className="categories col-md-9 col-sm-7 col-7">
  //       <NavLink
  //         data-bs-toggle="tooltip"
  //         data-bs-placement="top"
  //         title="Home"
  //         className="nav-item pb-1 mx-3 hide-on-col"
  //         to="/"
  //       >
  //         <FontAwesomeIcon size="lg" icon={faHouseChimney} />
  //       </NavLink>
  //       <NavLink
  //         data-bs-toggle="tooltip"
  //         data-bs-placement="top"
  //         title="Cars"
  //         className="nav-item pb-1 mx-3"
  //         to="/list-all/vehicles"
  //       >
  //         <FontAwesomeIcon size="lg" icon={faCar} />
  //       </NavLink>
  //       <NavLink className="nav-item mx-2" to="/bookings">
  //         Bookings
  //       </NavLink>
  //     </div>

  //     <div className="col-1 d-flex justify-content-center align-items-center">
  //       <FontAwesomeIcon onClick={handleNotificationClick} icon={faBell} />
  //     </div>
  //     <div className="col-md-1 col-sm-2 col-2">
  //       <Menu model={items} popup ref={menuLeft} id="popup_menu_right" popupAlignment="right" />
  //       <img
  //         src={user.image?.url ?? img}
  //         onClick={(event) => menuLeft.current.toggle(event)}
  //         alt=""
  //         className="profile-img p-0"
  //       />
  //     </div>
  //   </div>
  // );
}
