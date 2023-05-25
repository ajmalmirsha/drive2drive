import ProfileDetails from "../../Components/profile/ProfileDetails";
import SideBar from "../../Components/profile/SideBar";
import Navbar from "../../Components/userHome/Navbar";

export default function ProfilePage(){
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
