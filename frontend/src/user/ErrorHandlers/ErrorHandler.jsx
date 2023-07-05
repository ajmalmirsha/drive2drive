import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../redux/userSlice";
import { setOwnerDetails } from "../../redux/ownerSlice";

export function useErrorHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function userAuthenticationHandler(props) {
    const { response: { status, data } } = props
    if (status === 401 && data.Auth === false) {
      localStorage.removeItem("user");
      navigate("/login");
      dispatch(
        setUserDetails({
          id: "", username: "", email: "", phone: null,
          image: "", dob: null, license: {
                                           front: '',
                                           back: '',
                                         }
        })
      )
    } else if (status === 500) {
      navigate('/SERVER-ERROR-500')
    }
  }
  function ownerAuthenticationHandler(props) {
    const { response: { status, data } } = props
    if (status === 401 && data.Auth === false) {
      localStorage.removeItem("owner");
      navigate("/owner-login");
      dispatch(
        setOwnerDetails({
          id: ''
        })
      )
    } else if (status === 500) {
      navigate('/SERVER-ERROR-500')
    }

  }
  function adminAuthenticationHandler(props) {
    const { response: { status, data } } = props
    if (status === 401 && data.Auth === false) {
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } else if (status === 500) {
      navigate('/SERVER-ERROR-500')
    }

  }

  return { userAuthenticationHandler, ownerAuthenticationHandler, adminAuthenticationHandler }
}


