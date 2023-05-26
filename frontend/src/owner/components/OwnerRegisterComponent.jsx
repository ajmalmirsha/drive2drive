import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {GoogleLogin} from '@react-oauth/google'
import './ownerRegisterCombo.css'
import { useEffect, useState } from 'react'
function OwnerRegisterComponent () {
    const [ owner, setOwner] = useState({username:'',email:'',password:''})
    const navigate = useNavigate()
    useEffect (() => {
        const token = localStorage.getItem('owner')
        if (token){
            navigate('/owner-Home')
        }
    },[])
    function googleSuccess (response) {
        console.log('success',response);
    }
    function googleError (response) {
        console.log('error',response);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {username,email,password} = owner
        if(!username){
            toast.error('username required')
        }else if(!email){
            toast.error('email required !')
        }else if(!password){
            toast.error('password required !')
        }else{
          try {
            console.log('axios going');
            const { data, status, message} = await  axios.post( process.env.REACT_APP_URL+'/owner/owner-register' , {owner})
            if( status == 200) {
            localStorage.setItem('owner',data.token)
            navigate('/owner-Home')
          }
          } catch (error) {
            const { status, data } = error.response
            if( status == 401 ) {
                toast.error(data.message)
            }
          }
          
           
        }
    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Seller</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit} >
                    <input type="text" name='username' onChange={(e)=>  setOwner({...owner,[e.target.name]:e.target.value})} placeholder='name' />
                    <input type="email" name='email' onChange={(e)=> setOwner({...owner,[e.target.name]:e.target.value})} placeholder='email' />
                    <input type="password" name='password' onChange={(e)=> setOwner({...owner,[e.target.name]:e.target.value})} placeholder='password' />
                    
                    <button>Register</button>
                </form>
                {/* <GoogleLogin onSuccess={googleSuccess} onError={googleError}  /> */}
                <p>You do have an account? <span onClick={()=> navigate('/owner-login')}>Login</span></p>
            </div>
            <ToastContainer/>
       </div>
    )
}

export default OwnerRegisterComponent