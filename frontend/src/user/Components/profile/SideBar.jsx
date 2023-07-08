import './sideBar.css'
import img from '../../../images/default.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className="col-md-3 m-0  sidebar">
            <div className="side-bar-top w-100">
                <div className="wrapper">

                    <img src={ user.image?.url ?? img} alt="" />
                    <span>7907883318</span>
                </div>
            </div>
            <div className="side-bar-items w-100">
                <div className='menuItemsactive'><p>My Profile</p></div>
                <div className='menuItems' onClick={() => navigate('/bookings')} ><p>Bookings</p></div>
                <div className='menuItems'><p>Terms & Conditions</p></div>
                {/* <div className='menuItems'><p>Logout</p></div> */}
            </div>
        </div>
    )
}