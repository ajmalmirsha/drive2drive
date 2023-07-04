
import { useNavigate } from 'react-router-dom'
import './sidebar.css'
import OwnerListContacts from '../chat/OwnerListContacts';
import OwnerChatPage from '../../pages/owner-chat/OwnerChatPage';

function SideBar({ props }) {
    console.log(props, 7676);
    const navigate = useNavigate()
    return (
        <div className="side-bar ms-4  px-0  py-2 col-md-2 col-sm-4 ">
            <div onClick={() => { navigate('/owner/home') }} className="menu-items pt-1 text-center text-white">
                Home
            </div>
            <div onClick={() => { navigate('/owner/sales-report')}} className="menu-items pt-1 text-center text-white">
                Sales Report
            </div>
            {props != 'list-vehicle' || props == 'add-vehicle' ? <div onClick={() => navigate('/owner/list-vehicle')} className="menu-items pt-1 text-center text-white">
                Vehicles
            </div> : <div onClick={() => navigate('/owner/add-vehicle')} className='menu-items-active  pt-1 text-center text-dark fw-bold'>add vehicle</div>
            }
            <div onClick={() => navigate('/owner/notifications')} className="menu-items pt-1 text-center text-white">
                Notifications
            </div>
            <div onClick={() => navigate('/owner/bookings')} className="menu-items pt-1 text-center text-white">
                bookings
            </div>
            <div data-bs-toggle="modal" data-bs-target="#GFG" className="menu-items pt-1 text-center text-white">
                messages
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade chat-container" id="GFG" >
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">

                    <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
                        <div className="modal-body bg-white m-0 p-0 chat-owner-side" >
                            <OwnerChatPage />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar