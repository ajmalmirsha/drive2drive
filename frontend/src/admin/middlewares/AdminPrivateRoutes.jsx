

import { Navigate } from "react-router-dom"


export default function AdminPrivateRoute (props) {
    
    if(localStorage.getItem('admin')){
        return props.children
    }else{
        return <Navigate to={'/admin/login'} />
    }
}