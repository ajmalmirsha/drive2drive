import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../Auth/login.css";
import img from "../../../images/login/login.png";
import img2 from "../../../images/login/signup.png";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import useAuthHook from "../../Hooks/Auth/UseAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

function LoginComponent() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const SignUpNameRef = useRef(null);
  const SignUpEmailRef = useRef(null);
  const SignUpPasswordRef = useRef(null);
  const SignUpConfirmPassword = useRef(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("signin");
  const formRef = useRef(null);
  const [url, setUrl] = useSearchParams();

  const navigate = useNavigate();

  const { handleSignUp, verifyUser, googleSuccess } = useAuthHook();

  const handleSignUpSubmit = async () => {
    setLoading(true);
    await handleSignUp(
      SignUpNameRef?.current?.value,
      SignUpEmailRef?.current?.value,
      SignUpPasswordRef?.current?.value,
      SignUpConfirmPassword?.current?.value
    );
    setLoading(false);
  };

  function googleError(response) {
    console.log("google error", response);
    toast.error(response);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef?.current?.value) {
      return toast.error("enter your email !");
    } else if (!passwordRef?.current?.value) {
      return toast.error("enter your password");
    } else {
      setLoading(true);
      await verifyUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url?.get("t") === "r") {
      setRole("signup");
    }
  }, []);

  return (
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
            {role === "signin" && (
              <img
                src={img2}
                class="img-fluid side-img"
                style={{ width: "300px" }}
              />
            )}
            {role === "signup" && (
              <img
                src={img}
                class="img-fluid side-img"
                style={{ width: "300px" }}
              />
            )}
          </div>
          {role === "signin" ? (
            <>
              <p
                class="text-white fs-2"
                style={{ fontFamily: "cursive", fontWeight: "600" }}
              >
                Unlock Your Ride
              </p>
              <small
                class="text-white text-wrap text-center"
                style={{ width: "17rem", fontFamily: "Courier New" }}
              >
                Join experienced Designers on this platform.
              </small>
            </>
          ) : (
            <>
              <p
                class="text-white fs-2"
                style={{ fontFamily: "cursive", fontWeight: "600" }}
              >
                Start Your Journey
              </p>
              <small
                class="text-white text-wrap text-center"
                style={{ width: "17rem", fontFamily: "Courier New" }}
              >
                Join experienced Designers on this platform.
              </small>
            </>
          )}
        </div>
        {/* <!-------------------- ------ Right Box ----------------------------> */}

        <div
          class={`col-md-6 right-box ${
            role === "signup" && "swap swap-right"
          } ${role === "signin" && "swap swap-l"}`}
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
                      style={{
                        backgroundColor: "#2a9d8f",
                        border: "none",
                        cursor: "crosshair!important",
                      }}
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
                  <input
                    ref={SignUpNameRef}
                    type="text"
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Name"
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    ref={SignUpEmailRef}
                    type="text"
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    ref={SignUpPasswordRef}
                    type="password"
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                  />
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
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      class="btn btn-lg btn-primary w-100 fs-6"
                      style={{
                        backgroundColor: "#2a9d8f",
                        border: "none",
                        cursor: "crosshair!important",
                      }}
                    >
                      <ClipLoader color="#36d7b7" size={19} />
                    </button>
                  ) : (
                    <button
                      class="btn btn-lg btn-primary w-100 fs-6"
                      style={{ backgroundColor: "#2a9d8f", border: "none" }}
                    >
                      Sign Up
                    </button>
                  )}
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
                  <a
                    href="#"
                    className="signup"
                    onClick={() => {
                      navigate("/login?l=l");
                      setRole("signin");
                    }}
                  >
                    Sign In
                  </a>
                </small>
              ) : (
                <small className="signup">
                  Don't have account?{" "}
                  <a
                    href="#"
                    className="signup"
                    onClick={() => {
                      navigate("/login?l=r");
                      setRole("signup");
                    }}
                  >
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
