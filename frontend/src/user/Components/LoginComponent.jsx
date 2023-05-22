import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
function LoginComponent (){
    const navigate = useNavigate()
    const [user,setUser] = useState({email:'',password:''})
    useEffect(()=>{
        const token = localStorage.getItem('user')
        if(token){
            console.log('redirectinggg');
            navigate('/')
        }else{
            console.log('elsseee');
        }
    },[])
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
     const respo = await axios.post(process.env.REACT_APP_URL+'/login',{user})
     const {success,message,token} = respo.data
     if(!success){
         toast.error(message)
     }else{
         toast.success(message)
         localStorage.setItem('user',token)
         navigate('/')
     }
    
    }
    function googleError (response) {
        console.log('error',response);
    }
    const handleSubmit = async (e)=>{
    e.preventDefault()
    const {email,password} = user
     if(!email){
        toast.error('enter your email !')
     }else if(!password){
        toast.error('enter your password')
     }else{
        console.log('axosssss');
        const response = await axios.post(process.env.REACT_APP_URL+'/login',{user})

        const {success,message,token} = response.data
        if(!success){
            toast.error(message)
        }else{
            toast.success(message)
            localStorage.setItem('user',token)
            navigate('/')
        }
     }
    }
    return (
        <div className="formContainer">
        <div className="formWrapper">
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" name='email' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} placeholder='email' />
                <input type="password" name='password' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} placeholder='password' />
                <button>Sign in</button>
            </form>
            <GoogleLogin onSuccess={googleSuccess} onError={googleError}  />
            <div>hellooooo</div>
            <p>You do have an account? <span onClick={()=> navigate('/signup')}>Signup</span></p>
        </div>
        <ToastContainer/>
   </div>
    )
}

export default LoginComponent