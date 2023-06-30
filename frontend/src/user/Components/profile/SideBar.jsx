import './sideBar.css'
import img from '../../../images/default.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className="col-md-3 sidebar">
            <div className="side-bar-top">
                <div className="wrapper">

                    <img src={user.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ? user.image : user.image ? `${process.env.REACT_APP_URL}/public/images/${user.image}` : img} alt="" />
                    <span>7907883318</span>
                </div>
            </div>
            <div className="side-bar-items">
                <div className='menuItemsactive'><p>My Profile</p></div>
                <div className='menuItems' onClick={() => navigate('/bookings')} ><p>Bookings</p></div>
                <div className='menuItems'><p>Terms & Conditions</p></div>
                {/* <div className='menuItems'><p>Logout</p></div> */}
            </div>
        </div>
    )
}