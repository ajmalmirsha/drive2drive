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
       <div className="nav">
        <h3 onClick={()=>{
            navigate('/')
        }}>Home</h3>
    <div className="ms-3 categories">
  <NavLink className="nav-item me-3" to="/list-all/car">
    Cars
  </NavLink>
  <NavLink className='nav-item'  to="/list-all/bike">
    Bikes
  </NavLink>
</div>



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
    )
}