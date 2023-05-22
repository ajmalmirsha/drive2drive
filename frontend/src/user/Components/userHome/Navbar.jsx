import { useNavigate } from 'react-router-dom'
import '../userHome/navbar.css'
import pro from '../../../images/default.png'
import { useState } from 'react'
export default  function Navbar(){
    const navigate = useNavigate()
    const [menuOpen,setMenu] = useState(false)
    return(
       <div className="nav">
        navbar
        <img src={pro} onClick={()=>{ menuOpen ? setMenu(false) : setMenu(true)}}  alt="" className='profile-img' />
       
                {menuOpen &&  <ul className='listed-menu'>
            <div className="menu">
                    <li>Profile</li>
                    <li>settings</li>
                    <li>
            <button onClick={()=>{ 
            localStorage.removeItem('user') 
            navigate('/login')
            }} type="button" class="btn btn-outline-danger">Danger</button>
            </li>
            </div>
                </ul> }
               
       </div>
    )
}