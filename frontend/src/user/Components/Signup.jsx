import '../Components/signup.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
function Signup(){
   const [user,setUser] = useState({username:'',email:'',password:''})
   const navigate = useNavigate()
   useEffect(()=>{
    const token = localStorage.getItem('user')
    if(token){
        console.log('redirectinggg');
        navigate('/')
    }
   },[])
   const handleSubmit = async (e) =>{
    e.preventDefault()
    const {username,email,password} = user
    if(!username){
        toast.error('username required')
    }else if(!email){
        toast.error('email required !')
    }else if(!password){
        toast.error('password required !')
    }else{
        const response = await axios.post(process.env.REACT_APP_URL+'/signup',{user})
        console.log(response.data.token);
        localStorage.setItem('user',response.data.token)
        navigate('/')
    }
}
 async function googleSuccess (response) {
    console.log('success',response);
 const decoded =  jwt_decode(response.credential)
 console.log(decoded);
 console.log(decoded.email,decoded.name,decoded.sub);
 const user ={
    username:decoded.name,
    email:decoded.email,
    password:decoded.sub
 }
 const respo = await axios.post(process.env.REACT_APP_URL+'/signup',{user})
 console.log('resfpoif',respo);
 localStorage.setItem('user',respo.data.token)
        navigate('/')

}
function googleError (response) {
    console.log('error',response);
}
    return (
    
         <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">chat app</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit} >
                    <input type="text" name='username' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} placeholder='name' />
                    <input type="email" name='email' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} placeholder='email' />
                    <input type="password" name='password' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} placeholder='password' />
                    {/* <input type="file"  id='file' hidden/>
                    <label htmlFor="file">
                        <img src="" alt="" />
                    </label> */}
                    <button>Sign up</button>
                </form>
                <GoogleLogin onSuccess={googleSuccess} onError={googleError}  />
                <p>You do have an account? <span onClick={()=> navigate('/login')}>Login</span></p>
            </div>
            <ToastContainer/>
       </div>
       
    )
}

export default Signup