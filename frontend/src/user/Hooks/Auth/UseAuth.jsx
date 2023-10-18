import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { loginApi, signUpUser } from "../../../Routes/authApi";
import jwt_decode from 'jwt-decode'

export default function useAuthHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  try {
    const handleSignUp = (name, email, password, confirmPassword) => {
      try {
        if (!name?.trim()) {
          return toast.error("enter your name");
        }

        if (!email?.trim()) {
          return toast.error("enter your email !");
        }

        if (!password?.trim()) {
          return toast.error("enter your password");
        }
        if (confirmPassword?.trim() !== confirmPassword?.trim()) {
          return toast.error("password and confirm password are not match");
        }

        signUpUser({ name, email, password });
      } catch (error) {}
    };

    const verifyUser = async (users) => {
      const {
        data: { success, message, token, user },
      } = await loginApi(users);
      if (!success) {
        toast.error(message);
      } else {
        localStorage.setItem("user", token);
        dispatch(
          setUserDetails({
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user?.phone,
            image: {
              url: user?.image?.url,
              id: user?.image?.id,
            },
            dob: user?.dob,
            license: {
              front: {
                url: user.license?.front?.url,
                id: user.license?.front?.id,
              },
              back: {
                url: user.license?.rear?.url,
                id: user.license?.rear?.id,
              },
              verification: user?.license?.verification,
            },
          })
        );
        navigate("/");
      }
    };

    function googleSuccess(response) {
      const decoded = jwt_decode(response.credential);
      const user = {
        username: decoded.name,
        email: decoded.email,
        password: decoded.sub,
      };
      verifyUser(user);
    }

    return {
      handleSignUp,
      verifyUser,
      googleSuccess,
    };
  } catch (error) {
    console.log(error);
  }
}
