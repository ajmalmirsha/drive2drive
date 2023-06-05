



import { Navigate } from "react-router-dom"

export default function AdminPublicRoute (props) {
   
        if(localStorage.getItem('admin')){
            return <Navigate to={'/admin/home'} />
        }else{
            return props.children
        }

   
}