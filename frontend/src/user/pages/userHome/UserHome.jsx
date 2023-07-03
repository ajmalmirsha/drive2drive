import { useEffect, useState } from "react";
import AddressInputs from "../../Components/userHome/AddressInputs";
import Banner from "../../Components/userHome/Banner";
import ListProducts from "../../Components/userHome/ListProducts";
import Navbar from "../../Components/userHome/Navbar";
import { userApi } from "../../../utils/Apis";

export default function UserHome (){
    const [vehicle, setVehicles] = useState([])
    const [ search, setSearch] = useState({
        place:'',
        pickDate:'',
        dropDate:''
    })
    const [ filteredVehicle, setFilteredVehicle ] = useState([])
    useEffect(() => {
        (  function () {
              userApi.get('/list-all-vehicle').then(({data:{allVehicle}}) =>{
                console.log('all vehicles ',allVehicle);
               setVehicles(allVehicle)
              })
         })()
 
     }, [])
     const handleSubmit = (place,pickDate,dropDate) => {
         setSearch({
          place: place,
          pickDate,
          dropDate
         })
        const result = vehicle.filter((item) => {
            return item.places.some((p) => p.value === place);
          });
         setFilteredVehicle(result)

      }

      
    return(
        <>
       <Navbar/>
       <AddressInputs handleSubmit={handleSubmit} />
       { filteredVehicle?.length > 0 &&
       <ListProducts vehicle={filteredVehicle} title={`vehicles available on ${search.place}`} />
       }
       <Banner/>
       <ListProducts vehicle={vehicle}/>
        </>
    )
}

