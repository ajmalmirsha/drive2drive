import { NavLink, useNavigate } from 'react-router-dom'
import '../userHome/navbar.css'
import img from '../../../images/default.png'
import logo from '../../../images/logo/logo-bg-removed.png'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../../redux/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCar, faHouseChimney, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
export default function Navbar() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [menuOpen, setMenu] = useState(false)
  const menuLeft = useRef(null);
  const menuRight = useRef(null); 
  const toast = useRef(null);
  const handleLogOut = () => {
    {
      localStorage.removeItem('user')
      navigate('/login')
      dispatch(
        setUserDetails({
          id: "",
    username: "",
    email: "",
    phone: null,
    image: "",
    dob: null,
    license: {
        front: '',
        back: '',
    }
        }
        )
      )
    }
  }
  const items = [
      {
          label: 'Profile',
          command: ()=> { navigate('/profile') }
      },
      {
          label: 'LogOut',
          command: handleLogOut,
      }
  ];

  const handleNotificationClick = () => {
    navigate('/notifications/user')
  }
 
  return (
    <div className="nav row">
      <div className="col-md-1 col-sm-2 col-2">
        <img onClick={() => navigate('/')} className='w-100 h-100' src={logo} alt="" />
      </div>
      <div data-bs-toggle="tooltip" data-bs-placement="top" title="" className="categories col-md-9 col-sm-7 col-7">
       <NavLink data-bs-toggle="tooltip" data-bs-placement="top" title="Home" className="nav-item pb-1 mx-3 hide-on-col" to="/">
       <FontAwesomeIcon size='lg' icon={faHouseChimney} />
       </NavLink>
       <NavLink  data-bs-toggle="tooltip" data-bs-placement="top" title="Cars" className="nav-item pb-1 mx-3" to="/list-all/vehicles">
       <FontAwesomeIcon size='lg' icon={faCar} />
       </NavLink>
        <NavLink className='nav-item mx-2' to="/bookings">
          Bookings
        </NavLink>

      </div>

      <div className="col-1 d-flex justify-content-center align-items-center">
      <FontAwesomeIcon onClick={handleNotificationClick} icon={faBell} />
    </div>
      <div className="col-md-1 col-sm-2 col-2">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_right" popupAlignment="right" />
        <img  src={user.image?.url ?? img} onClick={(event) => menuLeft.current.toggle(event)} alt="" className='profile-img p-0' />
      </div>
    </div>


  )
}