import { useNavigate } from 'react-router-dom'
import '../userHome/navbar.css'
import pro from '../../../images/default.png'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../../redux/userSlice'
export default  function Navbar(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menuOpen,setMenu] = useState(false)
    return(
       <div className="nav">
        navbar
        <img src={pro} onClick={()=>{ menuOpen ? setMenu(false) : setMenu(true)}}  alt="" className='profile-img' />
       
                {menuOpen &&  <ul className='listed-menu'>
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