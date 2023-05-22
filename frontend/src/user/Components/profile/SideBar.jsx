import './sideBar.css'
import img from '../../../images/default.png'

export default function SideBar(){
    return(
       <div className="col-md-3 sidebar">
        <div className="side-bar-top">
            <div className="wrapper">

            <img src={img} alt="" />
            <span>7907883318</span>
            </div>
        </div>
        <div className="side-bar-items">
            <div className='menuItemsactive'><p>My Profile</p></div>
            <div className='menuItems'><p>Bookings</p></div>
            <div className='menuItems'><p>Terms & Conditions</p></div>
            <div className='menuItems'><p>Logout</p></div>
        </div>
       </div>
    )
}