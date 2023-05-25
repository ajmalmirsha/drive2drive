import '../Components/signup.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { setUserDetails } from '../../redux/userSlice'

function Signup(){
   const [user,setUser] = useState({username:'',email:'',password:''})
   const dispatch = useDispatch()
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
 console.log(decoded,987);
 console.log(decoded.email,decoded.name,decoded.sub);
 const user ={
    username:decoded.name,
    email:decoded.email,
    password:decoded.sub,
    image:decoded.picture
 }
 try {
     const respo = await axios.post(process.env.REACT_APP_URL+'/signup',{user})
     console.log('resfpoif',respo);
    
     const {data} = respo
     dispatch(
        setUserDetails({
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
            phone: data.user?.phone,
            image: data.user?.image,
            dob: data.user?.dob,
            license:{
                front : data.user.license?.front,
                back  : data.user.license?.back,
            }
        })
    )
     localStorage.setItem('user',respo.data.token)
            navigate('/')
 } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    if(error.response.status == 403) {
        console.log('error code is 403');
        return toast.error(error.response.data.message)
     }
 }

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