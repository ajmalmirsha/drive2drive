
import axios from "axios";


export const userApi = axios.create({
    baseURL:`http://localhost:4000`
    // baseURL:`https://drive2drive.site`
    // baseURL:`https://drive2drive.onrender.com`
})

export const ownerApi=axios.create({
    baseURL:`http://localhost:4000/owner`
    // baseURL:`https://drive2drive.site/owner`
    // baseURL:`https://drive2drive.onrender.com/owner`
})

export const adminApi=axios.create({
    baseURL:`http://localhost:4000/admin`
    // baseURL:`https://drive2drive.site/admin`
    // baseURL:`https://drive2drive.onrender.com/admin`
})


userApi.interceptors.request.use((req) => {
    if (localStorage.getItem('user')){
        req.headers.Authentication =  localStorage.getItem("user");
    }
        return req; 
    
})
ownerApi.interceptors.request.use((req) => {
    if (localStorage.getItem('owner')){
        req.headers.Authentication =  localStorage.getItem("owner");
    }
        return req; 
    
})

adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem('admin')){
        req.headers.Authentication =  localStorage.getItem("admin");
    }
        return req; 
    
})