import './profiledetails.css'
import img from '../../../images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import { setUserDetails } from '../../../redux/userSlice';
// import '../../../../../backend/public/images/'
export default function ProfileDetails(){
    const reduxUser = useSelector(state => state.user )
    const [ image, setImage ] = useState(null)
    const [inputType, setInputType] = useState('text');
    let [emailVerified,setEmailVerification] = useState(true)
    let [phoneValid,setPhoneValidation] = useState(true)
    let [userUpdated,setUserUpdation] = useState(false)
    const [license,setLicense] = useState({
      front:null,
      back:null
    })
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        id:reduxUser.id,
        username:reduxUser?.username,
        email:reduxUser?.email,
        phone:reduxUser?.phone,
        dob:reduxUser?.dob,
    })

    useEffect(()=>{
        console.log('redux',reduxUser);
        setUserUpdation(true)
        // toast.success('click on the save button')
    },[user,reduxUser])

    

    // uploading or updating profile pictures 

    const uploadProfileImage = () => {

        const formData = new  FormData()
        formData.append('license[front]', license.front);
        formData.append('license[back]', license.back);

        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              userId: reduxUser.id
            },
            withCredentials: true,
          };

    if(image){
      
    axios.post( process.env.REACT_APP_URL + '/upload-profile-image', formData, config).then((response)=>{
   
      setImage('')
   
        dispatch(
            setUserDetails({
                id:response.data.user._id,
                username:response.data.user?.username,
                email:response.data.user?.email,
                phone:response.data.user?.phone,
                image:response.data.user?.image,
                dob:response.data.user?.dob,
                license:{
                    front : response.data.user.license?.front,
                    back  : response.data.user.license?.back,
                }
            })
        )
        toast.success(response.data.message)
    })

    }
    }

    async function handleSubmit  (){
    console.log(user,737);
       const {data,status} = await  axios.post(process.env.REACT_APP_URL + '/update-user',{user})
       if(status === 200){
      
        const { userData } = data
const {setUserDetails} = await import('../../../redux/userSlice')

        dispatch(
            setUserDetails({
                id: userData._id,
                username:userData.username,
                email: userData.email,
                phone: userData?.phone,
                image: userData?.image,
                dob:userData?.dob,
                license:{
                    front : userData.license?.front,
                    back  : userData.license?.back,
                }
            })
        )
        toast.success(data.message)
       }else{
        toast.error(data.message)
       }
    }
    const validPhone = (phoneNumber) => {
        const phoneRegex = /^(\+?91|0)?[6789]\d{9}$/;

  if (phoneRegex.test(phoneNumber)) {
    console.log("Valid phone number");
    setPhoneValidation(true)
  } else {
    console.log("Invalid phone number");
    setPhoneValidation(false)
  }
    }
  const verifyEmial = (email) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (emailRegex.test(email)) {
    setEmailVerification(true)
  console.log("Valid email format");
} else {
    setEmailVerification(false)
  console.log("Invalid email format");
}

  }
       
  function uploadLicense () {
    const formData = new FormData()
    formData.append('image',license)
    axios.post(process.env.REACT_APP_URL + '/add-license',{license,userid:reduxUser._id})
  }
   
    return(
        <>
        <div className='container-fluid my-3 col-md-9  main-wrapper'>
            <h1>My Profile</h1>
            <h3 className='my-3'>Account Information</h3>
            <input type="file" name='image' hidden onChange={(e)=>{
                setImage(e.target.files[0])
              }}  id='profile-upload' />
           
           <div className="row">
          { image ? <label className='plus' onClick={()=> uploadProfileImage()} ><FontAwesomeIcon color='green' icon={faCheckCircle} /> </label> :  <label className='plus' htmlFor="profile-upload"> <FontAwesomeIcon  icon={faCirclePlus} />  </label>}
        

             <img className='img col-md-2' src={ reduxUser.image.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   reduxUser.image  :   reduxUser.image ? `${process.env.REACT_APP_URL}/public/images/${reduxUser.image}` : img} alt="" />
            <div  className="col-md-9">

            {userUpdated && emailVerified && (
  <button onClick={handleSubmit} className='save-btn my-2'>Save</button> 
)}

            

                <label className='profile-tag' htmlFor="name">Name</label>
                <input name='username' value={user?.username} onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className='profile-input' type="text" id='name'  />
           
                <label className='profile-tag' htmlFor="email">Email {!emailVerified && <span className='text-danger'>* it should be email</span>}</label>
                <input name='email' onBlur={()=> verifyEmial(user?.email)} value={user?.email} onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className={ emailVerified ? 'profile-input' : 'profile-input-error'} type="email" id='email'  />
                <label className='profile-tag' htmlFor="phone">Phone number  {!phoneValid && <span className='text-danger'>* it should be 10 numbers</span>}</label>
                <input name='phone' onBlur={()=> validPhone(user?.phone)} value={user?.phone} onChange={(e)=> setUser({...user,[e.target.name]:e.target.value})} className={ phoneValid ? 'profile-input' : 'profile-input-error'}  type="number" id='phone'  />
           
                <label className='profile-tag' htmlFor="dob">Date of birth</label>
                <input
      name='dob'
      
     value={user.dob} 
      onChange={(e) =>
        setUser({ ...user, [e.target.name]: e.target.value })
      }
      onFocus={()=> setInputType('date')}
      onBlur={() => setInputType('text')}
      className='profile-input'
      type={user.dob ? inputType : 'date'}
      id='dob'
    />
           
            </div>
           </div>
           <div className="licence mt-5">
            <input type="file" hidden />
           <span className='profile-heading py-5'>Driving lisence</span>
         <div className="row mt-3">
           
            <div className='col-md-5 mx-3 my-3'>
         <div className='col-md-5 p-0'>Front side</div>
            <label htmlFor='front-side-image' className="front mt-3">
           {license.front ? <img src={license.front} alt="" /> : 'Click here to upload the front side of your driving license.'}
            <input type="file" onChange={(e)=> setLicense({...license,front:URL.createObjectURL(e.target.files[0])})} id='front-side-image' hidden />
            </label >
            </div>
            <div className='col-md-5 mx-3 my-3'>
  <div className='col-md-5 p-0'>Back side</div>
  <label  htmlFor="back-side-image" className="back mt-3">
  {license.back ? <img src={license.back} alt="" /> : 'Click here to upload the front side of your driving license.'}
    <input onChange={(e)=> setLicense({...license,back:URL.createObjectURL(e.target.files[0])})} type="file" id='back-side-image' hidden />
  </label>
</div>     
     </div>
         <button className='profile-submit-btn' onClick={uploadLicense}>save and continue</button>
           </div>
        </div>
        <ToastContainer/>
        </>
    )
}