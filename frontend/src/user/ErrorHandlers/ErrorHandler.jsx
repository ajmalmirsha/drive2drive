import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../redux/userSlice";
import { setOwnerDetails } from "../../redux/ownerSlice";

export function useErrorHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
   function userAuthenticationHandler({ response: { status, data } }) {
    if (status === 401 && data.Auth === false) {
      localStorage.removeItem("user");
      navigate("/login");
      dispatch(
        setUserDetails({
          id: "",
    username: "",
    email: "",
    phone: null,
    image: "",
    dob: null,
    license: {
        front: '',
        back: '',
    }
        })
      )
    }
  }
  function ownerAuthenticationHandler({ response: { status, data } }){
    if (status === 401 && data.Auth === false) {
      localStorage.removeItem("owner");
      navigate("/owner-login");
      dispatch(
        setOwnerDetails({
          id:''
        })
      )
    }
  }
  function adminAuthenticationHandler({ response: { status, data } }){
    if (status === 401 && data.Auth === false) {
      localStorage.removeItem("admin");
      navigate("/admin/login");
    }
  }

  return {userAuthenticationHandler, ownerAuthenticationHandler, adminAuthenticationHandler}
}


