import { NavLink, useNavigate } from 'react-router-dom'
import '../userHome/navbar.css'
import img from '../../../images/default.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../../redux/userSlice'
export default  function Navbar(){
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menuOpen,setMenu] = useState(false)
    return(
       <div className="nav row">
        <div className="categories col-md-10">
        <span className='me-2' onClick={()=>{
            navigate('/')
        }}>Home</span>

  <NavLink className="nav-item me-3" to="/list-all/car">
    Cars
  </NavLink>
  <NavLink className='nav-item'  to="/list-all/bike">
    Bikes
  </NavLink>
</div>

<div onClick={()=> navigate('/notifications/user')} className="col-md-1 d-flex justify-content-center align-items-center">

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
</svg>
</div>
<div className="col-md-1">



        <img src={ user?.image?.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   user.image  : user.image ? `${process.env.REACT_APP_URL}/public/images/${user.image}` : img} onClick={()=>{ menuOpen ? setMenu(false) : setMenu(true)}}  alt="" className='profile-img' />
                {menuOpen &&  <ul className='listed-menu p-0 '>
            <div className="menu">
                    <li onClick={()=> navigate('/profile')}>Profile</li>
                    <li>settings</li>
                    <li>
            <button onClick={()=>{ 
                localStorage.removeItem('user') 
                navigate('/login')
                dispatch(
                    setUserDetails(
                        {id:'',license:{
                            front:''
                        }}
                        )
                )
            }} type="button" class="btn btn-primary logout-btn">LogOut</button>
            </li>
            </div>
                </ul> }
                </div>
            </div>
               
      
    )
}