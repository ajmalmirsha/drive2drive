import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"


export default function AdminLogin () {
    
        const navigate = useNavigate()
        const [ admin, setAdmin] = useState({
            email:'',
            password:''
        })
        useEffect (() => {
            const token = localStorage.getItem('admin')
            if (token){
                navigate('/admin/home')
            }
        },[])
        const handleSubmit = (e) => {
            e.preventDefault()
            const { email, password } = admin
            if (!email) {
                toast.error('enter your email !')
            } else if (!password) {
                toast.error('enter your password')
            } else {
                verifyAdmin(admin)
            }
        }
        const verifyAdmin = async (admin) => {
           try {
            const {data , status} = await axios.post(process.env.REACT_APP_URL + '/admin/login', { admin })
           
            if ( status == 200){
                localStorage.setItem('admin',data.token)
                navigate('/admin/home')
            }
           } catch (err) {
        
            if (err.response.status == 401)  toast.error(err.response.data.message)
           }
        }
        return (
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name='email' onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })} placeholder='email' />
                        <input type="password" name='password' onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })} placeholder='password' />
                        <button>Sign in</button>
                    </form>
                    {/* <GoogleLogin onSuccess={googleSuccess} onError={googleError} /> */}
                </div>
                <ToastContainer />

            </div>
    )
}