

import { Navigate } from "react-router-dom"

export default function OwnerPublicRoute (props) {
   
        if(localStorage.getItem('owner')){
            return <Navigate to={'/owner/home'} />
        }else{
            return props.children
        }

   
}