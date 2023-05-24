import './profiledetails.css'
import img from '../../../images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function ProfileDetails(){
    const [user,setUser] = useState({
        name:'',
        email:'',
        phone:'',
        dob:''
    })

    function handleSubmit (){
        console.log('user',user);
    }
    return(
        <>
        <div className='container-fluid my-3 col-md-9  main-wrapper'>
            <h1>My Profile</h1>
            <h3 className='my-3'>Account Information</h3>
            <input type="file" hidden    id='profile-upload' />
           
           <div className="row">
           <label className='plus' htmlFor="profile-upload"><FontAwesomeIcon icon={faCirclePlus} spin spinReverse  />
            </label>
             <img className='col-md-2' src={img} alt="" />
            <div  className="col-md-9">
            <button onClick={handleSubmit} className='save-btn my-2'>save</button>

                <label className='profile-tag' htmlFor="name">Name</label>
                <input name='name' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className='profile-input' type="text" id='name'  />
           
                <label className='profile-tag' htmlFor="email">Email</label>
                <input name='email' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className='profile-input' type="email" id='email'  />
           
                <label className='profile-tag' htmlFor="phone">Phone number</label>
                <input name='phone' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className='profile-input' type="number" id='phone'  />
           
                <label className='profile-tag' htmlFor="dob">Date of birth</label>
                <input name='dob' onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className='profile-input' type="date" id='dob'  />
           
            </div>
           </div>
           <div className="licence mt-5">
            <input type="file" hidden />
           <span className='profile-heading py-5'>Driving lisence</span>
         <div className="row mt-3">
           
            <div className='col-md-5 mx-3 my-3'>
         <div className='col-md-5 p-0'>Front side</div>
            <label htmlFor='front-side-image' className="front mt-3">
            Click here to upload the front side of your driving license.
            <input type="file" id='front-side-image' hidden />
            </label >
            </div>
            <div className='col-md-5 mx-3 my-3'>
  <div className='col-md-5 p-0'>Back side</div>
  <label  htmlFor="back-side-image" className="back mt-3">
    Click here to upload the back side of your driving license.
    <input type="file" id='back-side-image' hidden />
  </label>
</div>     
     </div>
         <button className='profile-submit-btn '>save and continue</button>
           </div>
        </div>
        </>
    )
}