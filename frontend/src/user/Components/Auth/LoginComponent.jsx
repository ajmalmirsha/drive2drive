import { useEffect, useRef, useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "../Auth/login.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/userSlice";
import img from "../../../images/login/login.png";
import img2 from "../../../images/login/signup.png";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import useAuthHook from "../../Hooks/Auth/useAuth";


function LoginComponent() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const SignUpNameRef = useRef(null)
  const SignUpEmailRef = useRef(null)
  const SignUpPasswordRef = useRef(null)
  const SignUpConfirmPassword = useRef(null)
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("signin");
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { handleSignUp } = useAuthHook()

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSignUpSubmit = () => {
    handleSignUp(SignUpNameRef?.current?.value,SignUpEmailRef?.current?.value,SignUpPasswordRef?.current?.value,SignUpConfirmPassword?.current?.value)
  }

  const verifyUser = async (users) => {
    setLoading(true);
    const respo = await axios.post(process.env.REACT_APP_URL + "/login", {
      users,
    });
    const { success, message, token, user } = respo?.data;
    setLoading(false);
    if (!success) {
      toast.error(message);
    } else {
      localStorage.setItem("user", token);
      console.log(user, 54);
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
  async function googleSuccess(response) {
    const decoded = jwt_decode(response.credential);
    const user = {
      username: decoded.name,
      email: decoded.email,
      password: decoded.sub,
    };
    verifyUser(user);
  }
  function googleError(response) {
    toast.error(response);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef?.current?.value) {
      return toast.error("enter your email !");
    } else if (!passwordRef?.current?.value) {
      return toast.error("enter your password");
    } else {
      verifyUser({ email: emailRef.current.value, password: passwordRef.current.value });
    }
  };

 

  return (
    // <div className="formContainer">
    //   {loading ? (
    //     <Spinner />
    //   ) : (
    //     <div className="formWrapper">
    //       <span className="title">Login</span>
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="email"
    //           name="email"
    //           onChange={(e) =>
    //             setUser({ ...user, [e.target.name]: e.target.value })
    //           }
    //           placeholder="email"
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           onChange={(e) =>
    //             setUser({ ...user, [e.target.name]: e.target.value })
    //           }
    //           placeholder="password"
    //         />
    //         <button>Sign in</button>
    //       </form>
    //       <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
    //       <p>
    //         You do have an account?
    //         <span onClick={() => navigate("/signup")}>Signup</span>
    //       </p>
    //     </div>
    //   )}
    //   <ToastContainer />
    // </div>

    // <!----------------------- Main Container -------------------------->
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      {/* <!----------------------- Login Container --------------------------> */}
      <div class="row border rounded-5 p-3 bg-white shadow box-area">
        {/* <!--------------------------- Left Box -----------------------------> */}
        <div
          class={`col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box ${
            role === "signup" && "swap swap-left"
          } ${role === "signin" && "swap swap-r"}`}
          style={{ background: "#2a9d8f" }}
        >
          <div class="featured-image mb-3">
            {role === "signin" && <img src={img2} class="img-fluid side-img" style={{ width: "300px" }} />}
            {role === "signup" && <img src={img} class="img-fluid side-img" style={{ width: "300px" }} />}
          </div>
          <p class="text-white fs-2" style={{ fontFamily: "Courier New", fontWeight: "600" }}>
            Be Verified
          </p>
          <small class="text-white text-wrap text-center" style={{ width: "17rem", fontFamily: "Courier New" }}>
            Join experienced Designers on this platform.
          </small>
        </div>
        {/* <!-------------------- ------ Right Box ----------------------------> */}

        <div
          class={`col-md-6 right-box ${role === "signup" && "swap swap-right"} ${role === "signin" && "swap swap-l"}`}
        >
          <div class="row align-items-center">
            {role === "signin" && (
              <div class="header-text mb-4">
                <h2 className="head1">Hello,Again</h2>
                <p>We are happy to have you back.</p>
              </div>
            )}

            {role === "signin" && (
              <form onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <input
                    ref={emailRef}
                    type="text"
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                  />
                </div>
                <div class="input-group mb-1">
                  <input
                    ref={passwordRef}
                    type="password"
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                  />
                </div>
                <div class="input-group my-3 ">
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      class="btn btn-lg btn-primary w-100 fs-6"
                      style={{ backgroundColor: "#2a9d8f", border: "none", cursor: "wait" }}
                    >
                      <ClipLoader color="#36d7b7" size={19} />
                    </button>
                  ) : (
                    <button
                      class="btn btn-lg btn-primary w-100 fs-6"
                      style={{ backgroundColor: "#2a9d8f", border: "none" }}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </form>
            )}
            {role === "signup" && (
              <form ref={formRef} onSubmit={handleSignUpSubmit}>
                <div class="input-group mb-3">
                  <input ref={SignUpNameRef} type="text" class="form-control form-control-lg bg-light fs-6" placeholder="Name" />
                </div>
                <div class="input-group mb-3">
                  <input  ref={SignUpEmailRef} type="text" class="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
                </div>
                <div class="input-group mb-3">
                  <input  ref={SignUpPasswordRef} type="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password" />
                </div>
                <div class="input-group mb-1">
                  <input
                    ref={SignUpConfirmPassword}
                    type="password"
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Confirm Password"
                  />
                  {/* <Password class="form-control form-control-lg bg-light fs-6 w-100" placeholder="Confirm Password" toggleMask /> */}
                </div>
                <div class="input-group my-3 ">
                  <button
                    class="btn btn-lg btn-primary w-100 fs-6"
                    style={{ backgroundColor: "#2a9d8f", border: "none" }}
                  >
                    {loading ? "loading" : "Sign Up"}
                  </button>
                </div>
              </form>
            )}
            <div class="input-group mb-3 d-flex justify-content-center">
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
              {/* <button class="btn btn-lg btn-light w-100 fs-6"><img src="images/google.png" style={{width:'20px'}} class="me-2"/><small>Sign In with Google</small></button> */}
            </div>
            <div class="row">
              {role == "signup" ? (
                <small className="signup">
                  Already have an account?{" "}
                  <a href="#" className="signup" onClick={() => setRole("signin")}>
                    Sign In
                  </a>
                </small>
              ) : (
                <small className="signup">
                  Don't have account?{" "}
                  <a href="#" className="signup" onClick={() => setRole("signup")}>
                    Sign Up
                  </a>
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
