import { useEffect } from "react"
import { Navigate } from "react-router-dom"

export default function UserPublicRoute (props) {
   
        if(localStorage.getItem('user')){
            return <Navigate to={'/'} />
        }else{
            return props.children
        }

   
}