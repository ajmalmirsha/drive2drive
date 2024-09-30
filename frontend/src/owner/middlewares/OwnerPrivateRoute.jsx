import { Outlet, useNavigate } from "react-router-dom";

export default function OwnerPrivateRoute({children}) {
  const navigate = useNavigate();

  if (!localStorage.getItem("owner")) {
    return navigate("/owner-login");
  }
  return (
    <>
      {children}
      <Outlet />
    </>
  );
}
