import './profiledetails.css'
import img from '../../../images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function ProfileDetails(){
    return(
        <>
        <div className='container col-md-9  main-wrapper'>
            <h1>My Profile</h1>
            <h3 className='my-3'>Account Information</h3>
            <input type="file" hidden    id='profile-upload' />
           
            <label  htmlFor="profile-upload"><FontAwesomeIcon icon={faCirclePlus} spin spinReverse  />
             <img src={img} alt="" />
            </label>
        </div>
        </>
    )
}