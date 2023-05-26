import { useEffect } from "react";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import { useNavigate } from "react-router-dom";


function OwnerHome () {
    const navigate = useNavigate()
    useEffect ( () => {
        const token = localStorage.getItem('owner')
        if (!token) {
            navigate('/owner-login')
        }
    })
    return (
        <OwnerNavBar/>
    )
}

export default  OwnerHome