import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuthHook = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  try {
    const handleSignUp = (name:string,email:string,password:string,confirmPassword:string) => {
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

        // signUpUser(user)
      } catch (error) {}
    };

    const verifyUser = async (users) => {
      const respo = await axios.post(process.env.REACT_APP_URL + "/login", {
        users,
      });
      const { success, message, token, user } = respo?.data;
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


    return {
      handleSignUp,
      verifyUser
    };
  } catch (error) {
    console.log(error);
  }
};

export default useAuthHook;
