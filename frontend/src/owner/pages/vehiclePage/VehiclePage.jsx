import SideBar from "../../components/ownerHome/SideBar";
import EditVehicle from "../../components/editVehicle/EditVehicle";
import AddVehicle from "../../components/ownerHome/AddVehicle";
import VehicleList from "../../components/vehicleList/VehicleList";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import Notifications from "../../components/notifications/Notifications";

export default function VehiclePage({ props }) {
  return (
    <div>
      <OwnerNavBar />
      <div className="row my-4 mx-2 gap-2">
        <SideBar props={props} />

        {props == "list-vehicle" && <VehicleList />}

        {props == "add-vehicle" && <AddVehicle />}

        {props == "edit-vehicle" && <EditVehicle />}

        {props == "notifications" && <Notifications />}
      </div>
    </div>
  );
}
