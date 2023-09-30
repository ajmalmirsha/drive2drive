import toast from "react-hot-toast";

const useAuthHook = () => {
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



    return {
      handleSignUp,
    };
  } catch (error) {
    console.log(error);
  }
};

export default useAuthHook;
