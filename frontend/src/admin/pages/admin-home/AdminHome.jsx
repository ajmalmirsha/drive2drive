import AdminSideBar from "../../components/AdminSideBar"
import Dashboard from "../../components/dashboard/Dashbord"
import Coupon from "../../components/coupon/Coupon"
import Banner from "../../components/banner/Banner"
import Notifications from "../../components/notification/Notifications"
import LicenseVerify from "../../components/licenseVerify/LicenseVerify"
import ListUsers from "../../components/userList/ListUsers"
import ListOwners from "../../components/ownerList/ListOwners"
import ListBookings from "../../components/bookings/ListBookings"
import SalesReportPage from "../sales-report/SalesReportPage"
import ListVehicle from "../../components/vehicles/ListVehicle"


export default function AdminHome({props}) {
    return (
        <div className="row m-0 p-0">
        <AdminSideBar/>
        {
          props == '' &&    <Dashboard/>
        }
        {
          props == 'coupon' &&    <Coupon/>
        }
        {
          props == 'banner-list' &&    <Banner/>
        }
        {
          props == 'notifications' &&    <Notifications/>
        }
      
        {
          props == 'license-verify' &&    <LicenseVerify/>
        }

        {
          props == 'list-users' &&    <ListUsers/>
        }

        {
          props === 'list-owners' &&    <ListOwners/>
        }

        {
          props === 'bookings' &&    <ListBookings/>
        }
        {
          props === 'salesReport' &&    <SalesReportPage/>
        }
        {
          props === 'vehicles-list' &&    <ListVehicle/>
        }
      
        {/* admin home page !!
            <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem('admin')
                navigate('/admin/login')
            }}>Logout</button> */}
        </div>
    )
}