import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminSideBar from "../../components/AdminSideBar"
import Dashboard from "../../components/Dashbord"
import Coupon from "../../components/coupon/Coupon"
import Banner from "../../components/banner/Banner"
import Notifications from "../../components/notification/Notifications"
import LicenseVerify from "../../components/licenseVerify/LicenseVerify"
import ListUsers from "../../components/userList/ListUsers"
import ListOwners from "../../components/ownerList/ListOwners"


export default function AdminHome({props}) {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('admin')
        if (!token) {
            navigate('/admin/login')
        }
    }, [])
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
      
        {/* admin home page !!
            <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem('admin')
                navigate('/admin/login')
            }}>Logout</button> */}
        </div>
    )
}