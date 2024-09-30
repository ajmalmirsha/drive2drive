import { createBrowserRouter } from "react-router-dom";
import Signup from "../user/pages/signup/Signup";
import UserErrorPage from "../Error/error-pages/UserErrorPage";
import SignIn from "../user/pages/signIn/SignIn";
import UserPrivateRoute from "../user/AuthRoutes/UserPrivateRoute";
import VehicleView from "../user/pages/vehicle-detail-page/VehicleView";
import VehicleListPage from "../user/pages/vehicleList/VehicleListPage";
import CheckOut from "../user/Components/checkout/CheckOut";
import UserNotificationPage from "../user/pages/notification/UserNotificationPage";
import UserBookings from "../user/Components/bookings/UserBookings";
import ChatPage from "../user/pages/chat/ChatPage";
import ErrorPage500 from "../Error/500/ErrorPage500";
import TermsAndConditions from "../user/Components/terms-conditions/TermsAndConditions";
import OwnerPrivateRoute from "../owner/middlewares/OwnerPrivateRoute";
import OwnerHome from "../owner/pages/owner-home/OwnerHome";
import OwnerPublicRoute from "../owner/middlewares/OwnerPublicRoute";
import OwnerRegister from "../owner/pages/owner-register/OwnerRegister";
import OwnerLogin from "../owner/pages/owner-login/OwnerLogin";
import VehiclePage from "../owner/pages/vehiclePage/VehiclePage";
import BookingVerifications from "../owner/components/bookings/BookingVerifications";
import OwnerChatPage from "../owner/pages/owner-chat/OwnerChatPage";
import OwnerSalesReport from "../owner/pages/sales-report/OwnerSalesReport";
import AdminLogin from "../admin/pages/admin-login/AdminLogin";
import AdminPrivateRoute from "../admin/middlewares/AdminPrivateRoutes";
import AdminLayout from "../admin/Layout/AdminLayout";
import Coupon from "../admin/components/coupon/Coupon";
import Dashboard from "../admin/components/dashboard/Dashboard";
import Banner from "../admin/components/banner/Banner";
import Notifications from "../admin/components/notification/Notifications";
import LicenseVerify from "../admin/components/licenseVerify/LicenseVerify";
import ListUsers from "../admin/components/userList/ListUsers";
import ListOwners from "../admin/components/ownerList/ListOwners";
import BasicFilterDemo from "../admin/components/bookings/ListBookings";
import SalesReportPage from "../admin/pages/sales-report/SalesReportPage";
import ListVehicle from "../admin/components/vehicles/ListVehicle";
import ProfilePage from "../user/pages/profile/ProfilePage";
import { lazy } from "react";

const UserHome = lazy(() => import("../user/pages/userHome/UserHome"));

const router = createBrowserRouter([
  {
    path: "/signup",
    errorElement: <UserErrorPage />,
    element: <Signup />,
  },
  {
    path: "/login",
    errorElement: <UserErrorPage />,
    element: <SignIn />,
  },
  {
    path: "/",
    errorElement: <UserErrorPage />,
    element: <UserPrivateRoute />,
    children: [
      {
        path: "/",
        element: <UserHome />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/view-detail/:id",
        element: <VehicleView />,
      },
      {
        path: "/list-all/vehicles",
        element: <VehicleListPage />,
      },
      {
        path: "/notifications/:role",
        element: <UserNotificationPage />,
      },
      {
        path: "/bookings",
        element: <UserBookings />,
      },
      {
        path: "/chat/:ownerId",
        element: <ChatPage />,
      },
      {
        path: "/checkout/:vehicleId",
        element: <CheckOut />,
      },
      {
        path: "/SERVER-ERROR-500",
        element: <ErrorPage500 />,
      },
      {
        path: "/terms-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },
  {
    path: "/owner-register",
    element: <OwnerRegister />,
    errorElement: <UserErrorPage />,
  },
  {
    path: "/owner-login",
    element: <OwnerLogin />,
    errorElement: <UserErrorPage />,
  },
  {
    path: "/owner",
    element: <OwnerPrivateRoute />,
    errorElement: <UserErrorPage />,
    children: [
      {
        path: "home",
        element: <OwnerHome props={"home"} />,
      },
      {
        path: "list-vehicle",
        element: <VehiclePage props={"list-vehicle"} />,
      },
      {
        path: "add-vehicle",
        element: <VehiclePage props={"add-vehicle"} />,
      },
      {
        path: "edit-vehicle/:id",
        element: <VehiclePage props={"edit-vehicle"} />,
      },
      {
        path: "notifications",
        element: <VehiclePage props={"notifications"} />,
      },
      {
        path: "bookings",
        element: <BookingVerifications />,
      },
      {
        path: "messages",
        element: <OwnerChatPage props={"home"} />,
      },
      {
        path: "sales-report",
        element: <OwnerSalesReport props={"home"} />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
    errorElement: <UserErrorPage link={"/admin/home"} />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <UserErrorPage link={"/admin/home"} />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "coupon",
        element: <Coupon />,
      },
      {
        path: "banner-list",
        element: <Banner />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "license/verify",
        element: <LicenseVerify />,
      },
      {
        path: "list/users",
        element: <ListUsers />,
      },
      {
        path: "list/owners",
        element: <ListOwners />,
      },
      {
        path: "list/bookings",
        element: <BasicFilterDemo />,
      },
      {
        path: "sales-report",
        element: <SalesReportPage />,
      },
      {
        path: "vehicle/list",
        element: <ListVehicle />,
      },
    ],
  },
]);

export default router;
