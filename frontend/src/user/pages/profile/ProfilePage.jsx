import { useEffect } from "react";
import ProfileDetails from "../../Components/profile/ProfileDetails";
import SideBar from "../../Components/profile/SideBar";
import Navbar from "../../Components/userHome/Navbar";
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";

export default function ProfilePage(){
    const {userAuthenticationHandler} = useErrorHandler()
    useEffect(()=>{
            userApi.get().catch(err=>{
                userAuthenticationHandler(err)
            }) 
    })
    return(
        <>
        <Navbar/>
        <div className="container-fluid">
            <div className="row mr-0">
                    <SideBar />
                    <ProfileDetails />
            </div>
        </div>
        </>
    )
}
