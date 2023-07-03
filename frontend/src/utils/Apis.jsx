
import axios from "axios";


export const userApi = axios.create({
    baseURL:`http://localhost:4000`
    // baseURL:`https://drive2drive.site`
})

export const ownerApi=axios.create({
    baseURL:`http://localhost:4000/owner`
    // baseURL:`https://drive2drive.site/owner`
})

export const adminApi=axios.create({
    baseURL:`http://localhost:4000/admin`
    // baseURL:`https://drive2drive.site/admin`
})


userApi.interceptors.request.use((req) => {
    console.log('inside inteseptor');
    if (localStorage.getItem('user')){
        console.log('user token is there');
        req.headers.Authentication =  localStorage.getItem("user");
    }
        return req; 
    
})
ownerApi.interceptors.request.use((req) => {
    console.log('inside admin inteseptor');
    if (localStorage.getItem('owner')){
        console.log('user token is there');
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