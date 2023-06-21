import { Route, Routes } from "react-router-dom";
import Coupon from "./components/coupon/Coupon";
import AdminPrivateRoute from "./middlewares/AdminPrivateRoutes";
import AdminHome from "./pages/admin-home/AdminHome";
import AdminPublicRoute from "./middlewares/AdminPublicRoutes";
import AdminLogin from "./pages/admin-login/AdminLogin";
import AdminSideBar from "./components/AdminSideBar";



export default function AdminRoutes () {
    return (
        <>
        <Routes>
        <Route exact path='/login' element={<AdminPublicRoute><AdminLogin/></AdminPublicRoute> } />
        <Route path="/coupon" element={<AdminHome props={'coupon'}  />} />
        <Route exact path='/home' element={<AdminPrivateRoute><AdminHome props={''} /></AdminPrivateRoute> } />
        <Route exact path='/banner-list' element={<AdminPrivateRoute><AdminHome props={'banner-list'} /></AdminPrivateRoute> } />
        <Route exact path='/notifications' element={<AdminPrivateRoute><AdminHome props={'notifications'} /></AdminPrivateRoute> } />
        <Route exact path='/license/verify' element={<AdminPrivateRoute><AdminHome props={'license-verify'} /></AdminPrivateRoute> } />
        <Route exact path='/list/users' element={<AdminPrivateRoute><AdminHome props={'list-users'} /></AdminPrivateRoute> } />
        <Route exact path='/list/owners' element={<AdminPrivateRoute><AdminHome props={'list-owners'} /></AdminPrivateRoute> } />
        </Routes>
        </>
    )
}