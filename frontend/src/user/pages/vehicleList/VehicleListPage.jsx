import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ListVehicleComponent from "../../Components/listVehicle/ListVehicleComponent"
import Navbar from "../../Components/userHome/Navbar"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler"
import Spinner from '../../../common/spinners/Spinner'


export default function VehicleListPage(){
    const [state,setState] = useState([])
    const [ loading, setLoading ] = useState(false)
    const {vehicle} = useParams()
    const {userAuthenticationHandler} = useErrorHandler()
    useEffect(()=>{
        setLoading(true)
        console.log('axios gone');
        userApi.get(`/list-all-vehicle`).then(({data:{allVehicle}})=>{
            setLoading(false)
            setState(allVehicle)
        }).catch( err => {
            console.log(err,897);
            userAuthenticationHandler(err)
        })
    },[])
    return(
        <>
        <Navbar/>
        
    { loading ?  <Spinner/>  :  state.length ? <ListVehicleComponent props={state}/> : <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F9326781-No-Results-Found-Illustration&psig=AOvVaw3PXp7QV__qulNz1PNyZaVu&ust=1685956451759000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCEuK6jqf8CFQAAAAAdAAAAABAN" alt="" /> }
        </>
    )
}