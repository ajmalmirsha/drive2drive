import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ListVehicleComponent from "../../Components/listVehicle/ListVehicleComponent"
import Navbar from "../../Components/userHome/Navbar"


export default function VehicleListPage(){
    
     const [state,setState] = useState([])
    const {vehicle} = useParams()
    useEffect(()=>{
        console.log('use Effect of vehicle list page' + vehicle);
        axios.get(`${process.env.REACT_APP_URL}/list-all/${vehicle}`).then(({data:{data}})=>{
            console.log(data,45);
            setState(data)
        })
    },[vehicle])
    return(
        <>
        <Navbar/>
    {state.length ? <ListVehicleComponent props={state}/> : <p>no vehicles</p> }
        </>
    )
}