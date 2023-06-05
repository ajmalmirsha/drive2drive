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
    {state.length ? <ListVehicleComponent props={state}/> : <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F9326781-No-Results-Found-Illustration&psig=AOvVaw3PXp7QV__qulNz1PNyZaVu&ust=1685956451759000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCEuK6jqf8CFQAAAAAdAAAAABAN" alt="" /> }
        </>
    )
}