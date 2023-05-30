import { useEffect } from "react";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/ownerHome/SideBar";
import VehicleList from "../../components/vehicleList/VehicleList";
import AddVehicle from "../../components/ownerHome/AddVehicle";
import ReviewList from "../../components/ownerHome/ReviewList";


function OwnerHome ({props}) {
    console.log(props,898);
    const navigate = useNavigate()
    useEffect ( () => {
        const token = localStorage.getItem('owner')
        if (!token) {
            navigate('/owner-login')
        }
    })
    return (
        <div>
        <OwnerNavBar/>
        <div className="row mx-2">
        <SideBar props={props} />
        { props == 'list-vehicle' &&  <VehicleList/>}

        { props == 'add-vehicle' &&  <AddVehicle/>}
       
        <ReviewList/>
        </div>
        </div>
    )
}

export default  OwnerHome