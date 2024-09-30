import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="row m-0 p-0">
      <AdminSideBar />
      {children}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
