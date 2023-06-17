
import { useNavigate } from 'react-router-dom'
import './sidebar.css'
import OwnerListContacts from '../chat/OwnerListContacts';
import OwnerChatPage from '../../pages/owner-chat/OwnerChatPage';

function SideBar ({ props }) {
    console.log(props,7676);
    const navigate = useNavigate()
    return (
        <div className="side-bar ms-4  px-0  py-2 col-md-2 col-sm-4 ">
            <div onClick={()=>{ navigate('/owner-Home') }} className="menu-items pt-1 text-center text-white">
               Home
            </div>
            <div className="menu-items pt-1 text-center text-white">
               Sales Report
            </div>
            { props != 'list-vehicle' || props == 'add-vehicle'  ? <div onClick={()=> navigate('/owner/list-vehicle')} className="menu-items pt-1 text-center text-white">
               Vehicles
            </div> : <div onClick={()=> navigate('/owner/add-vehicle')} className='menu-items-active  pt-1 text-center text-dark fw-bold'>add vehicle</div> 
             }
            <div className="menu-items pt-1 text-center text-white">
               Messages
            </div>
            <div className="menu-items pt-1 text-center text-white">
               Payments
            </div>
            <div className="menu-items pt-1 text-center text-white">
               Notifications
            </div>
            <div onClick={()=> navigate('/owner/bookings')} className="menu-items pt-1 text-center text-white">
               bookings
            </div>
            <div onClick={()=> navigate('/owner/messages')} className="menu-items pt-1 text-center text-white">
               messages
            </div>
            <div  className="menu-items pt-1 text-center text-white">
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" 
                data-bs-toggle="modal" data-bs-target="#GFG">
            Click Me
        </button>
messages
            </div>
            
{/* <!-- Modal --> */}
<div className="modal fade" id="GFG">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                                         
                        {/* <button type="button" className="btn-close" 
                                data-bs-dismiss="modal">
                        </button> */}
                






















                    <div className="modal-body" >
                   
{/* <div class="container">
<div class="row clearfix">
    <div class="col-lg-12"> */}
     <OwnerChatPage/>
    {/* </div>
</div>
</div> */}
                    </div>



















                </div>
            </div>
        </div>
        </div>
    )
}

export default SideBar