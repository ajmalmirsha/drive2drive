import ProfileDetails from "../../Components/profile/ProfileDetails";
import SideBar from "../../Components/profile/SideBar";
import Navbar from "../../Components/userHome/Navbar";

export default function ProfilePage(){
    return(
        <>
        <Navbar/>
        <div className="container-fluid">
            <div className="row ">
                    <SideBar />
                    <ProfileDetails />
            </div>
        </div>
        </>
    )
}
