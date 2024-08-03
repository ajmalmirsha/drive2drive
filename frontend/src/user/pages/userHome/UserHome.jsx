import { useEffect, useState } from "react";
import AddressInputs from "../../Components/userHome/AddressInputs";
import Banner from "../../Components/userHome/Banner";
import ListProducts from "../../Components/userHome/ListProducts";
import Navbar from "../../Components/userHome/Navbar";
import { userApi } from "../../../utils/Apis";
import Spinner from "../../../common/spinners/Spinner";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import CarDisplay from "../../3dRender/CarDispaly";
import LandingPage from "./LandingPage";
import Search from "./Search";
import PickCarCarousel from "./PickCarCarousel";

export default function UserHome() {
  const [vehicle, setVehicles] = useState([]);
  const [search, setSearch] = useState({
    place: "",
    pickDate: "",
    dropDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [filteredVehicle, setFilteredVehicle] = useState([]);
  const { userAuthenticationHandler } = useErrorHandler();
  useEffect(() => {
    (function () {
      setLoading(true);
      userApi
        .get("/list-all-vehicle")
        .then(({ data: { allVehicle } }) => {
          setLoading(false);
          setVehicles(allVehicle);
        })
        .catch((err) => {
          userAuthenticationHandler(err);
        });
    })();
  }, []);
  const handleSubmit = (place, pickDate, dropDate) => {
    setSearch({
      place: place,
      pickDate,
      dropDate,
    });
    const result = vehicle.filter((item) => {
      return item.places.some((p) => p.value === place);
    });
    setFilteredVehicle(result);
  };

  return (
    <div>
      <LandingPage />
      <Search />
      <PickCarCarousel />
    </div>
  );
}
