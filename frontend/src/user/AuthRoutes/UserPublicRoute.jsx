import { Navigate } from "react-router-dom"

export default function UserPublicRoute ({children}) {
   
        if(localStorage.getItem('user')){
            return <Navigate to={'/'} />
        }else{
            return children
        }

   
}