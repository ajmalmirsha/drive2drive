import { Navigate } from "react-router-dom"


export default function OwnerPrivateRoute (props) {
    if(localStorage.getItem('owner')){
        return props.children
    }else{
        return <Navigate to={'/owner-login'} />
    }
}