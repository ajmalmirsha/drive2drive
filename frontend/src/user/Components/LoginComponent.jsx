import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

import {useDispatch} from 'react-redux'
import { setUserDetails } from '../../redux/userSlice'
import Spinner from '../../common/spinners/Spinner'
function LoginComponent() {

    const navigate = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => { 
        const token = localStorage.getItem('user')
        if (token) {
            navigate('/')
        }
    }, [])

   

    const verifyUser = async (users) => {
        setLoading(true)
        const respo = await axios.post(process.env.REACT_APP_URL + '/login', { users })
        const { success, message, token ,user} = respo.data
        setLoading(false)
        if (!success) {
            toast.error(message)
        } else {
            localStorage.setItem('user', token)
            dispatch(
                setUserDetails({
                    id: user._id,
                    username:user.username,
                    email: user.email,
                    phone: user?.phone,
                    image: user?.image,
                    dob:user?.dob,
                    license:{
                        front : user.license?.front,
                        back  : user.license?.rear,
                        verification: user?.license?.verification 
                    }
                })
            )
            navigate('/')
        }
    }
    async function googleSuccess(response) { 

        const decoded = jwt_decode(response.credential)
        const user = {
            username: decoded.name,
            email: decoded.email,
            password: decoded.sub
        }

        verifyUser(user)

    }
    function googleError(response) {
        toast.error(response)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = user
        if (!email) {
            toast.error('enter your email !')
        } else if (!password) {
            toast.error('enter your password')
        } else {
            verifyUser(user)
        }
    }
    return (
      
          <div className="formContainer">
            { loading ? <Spinner/>  : (
            <div className="formWrapper">
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name='email' onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder='email' />
                    <input type="password" name='password' onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder='password' />
                    <button>Sign in</button>
                </form>
                <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
                <p>You do have an account? <span onClick={() => navigate('/signup')}>Signup</span></p>
            </div>
    ) }
            <ToastContainer />
            </div>
    )
}

export default LoginComponent