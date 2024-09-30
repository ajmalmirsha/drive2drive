import { Outlet, useNavigate } from "react-router-dom";

export default function UserPrivateRoute({ children }) {
  const navigate = useNavigate();

  // if (!localStorage.getItem("user")) {
  //   return navigate("/login");
  // }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
}
