import { Navigate } from "react-router-dom"


export default function UserPrivateRoute (props) {
    if(localStorage.getItem('user')){
        return props.children
    }else{
        return <Navigate to={'/login'} />
    }
}