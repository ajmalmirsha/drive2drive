import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"



function OwnerLoginComponent () {
    const navigate = useNavigate()
    const [ owner, setOwner] = useState({
        email:'',
        password:''
    })
    useEffect (() => {
        const token = localStorage.getItem('owner')
        if (token){
            navigate('/')
        }
    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = owner
        if (!email) {
            toast.error('enter your email !')
        } else if (!password) {
            toast.error('enter your password')
        } else {
            verifyAdmin(owner)
        }
    }
    const verifyAdmin = async (owner) => {
        const {data} = await axios.post(process.env.REACT_APP_URL + '/owner/login', { owner })
       
        if (data.success){
            localStorage.setItem('owner',data.token)
            navigate('/owner-Home')
        } else {
            toast.error(data.message)
        }
    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name='email' onChange={(e) => setOwner({ ...owner, [e.target.name]: e.target.value })} placeholder='email' />
                    <input type="password" name='password' onChange={(e) => setOwner({ ...owner, [e.target.name]: e.target.value })} placeholder='password' />
                    <button>Sign in</button>
                </form>
                {/* <GoogleLogin onSuccess={googleSuccess} onError={googleError} /> */}
                <p>You do have an account? <span onClick={() => navigate('/owner-register')}>Signup</span></p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default OwnerLoginComponent