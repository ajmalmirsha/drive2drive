import './profiledetails.css'
import img from '../../../images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";

import { handleSubmit, uploadLicense, uploadProfileImage, validPhone, verifyEmial } from './ProfilePageOperations';
import Spinner from '../../../common/spinners/Spinner';

export default function ProfileDetails() {
  const reduxUser = useSelector(state => state.user)
  const { userAuthenticationHandler } = useErrorHandler()
  const [image, setImage] = useState(null)
  const [inputType, setInputType] = useState('text');
  let [emailVerified, setEmailVerification] = useState(true)
  let [phoneValid, setPhoneValidation] = useState(true)
  const [loading, setLoading] = useState(false)
  const [license, setLicense] = useState({
    front: reduxUser?.license?.front,
    back: reduxUser?.license?.back
  })
  const [licenseUploaded, setLicenseUploaded] = useState(false)
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    id: reduxUser.id,
    username: reduxUser?.username,
    email: reduxUser?.email,
    phone: reduxUser?.phone,
    dob: reduxUser?.dob,
  })

  return (
    <>
      {loading ? <div className='col-md-12 col-lg-9 pt-1  main-wrapper '><Spinner /></div> :
        <div className='col-md-12 col-lg-9 pt-1  main-wrapper '>
          <h1>My Profile</h1>
          <h3 className='my-3'>Account Information</h3>
          <input type="file" name='image' hidden
            onChange={(e) => { setImage(e.target.files[0]) }}
            id='profile-upload'
          />

          <div className="row">
            {image ?
              <label className='plus'
                onClick={() => uploadProfileImage(reduxUser, image, setImage, dispatch, userAuthenticationHandler)} >
                <FontAwesomeIcon color='green' icon={faCheckCircle} />
              </label>
              : <label className='plus' htmlFor="profile-upload">
                <FontAwesomeIcon icon={faCirclePlus} />
              </label>}

            {/* profile image */}
            <img className='img col-md-2 col-sm-3 col-12'
              src={reduxUser.image?.url ?? img} alt="" />

            <div className="col-md-9 col-sm-8">

              {/* updation saving button */}
              {emailVerified && user.username && (
                <button onClick={() => handleSubmit(user, dispatch, userAuthenticationHandler)} className='save-btn my-2'>Save</button>
              )}

              {/* display details */}
              <label className='profile-tag' htmlFor="name">Name</label>
              <input name='username' value={user?.username} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} className='profile-input' type="text" id='name' />

              <label className='profile-tag' htmlFor="email">Email {!emailVerified && <span className='text-danger'>* it should be email</span>}</label>
              <input name='email' onBlur={() => verifyEmial(user?.email, setEmailVerification)} value={user?.email} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} className={emailVerified ? 'profile-input' : 'profile-input-error'} type="email" id='email' />
              {/* <label className='profile-tag' htmlFor="phone">Phone number  {!phoneValid && <span className='text-danger'>* it should be 10 numbers</span>}</label>
            <input name='phone' onBlur={() => validPhone(user?.phone,setPhoneValidation)} value={user?.phone} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} className={phoneValid ? 'profile-input' : 'profile-input-error'} type="number" id='phone' /> */}

              <label className='profile-tag' htmlFor="dob">Date of birth</label>
              <input
                name='dob'
                value={user.dob}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
                onFocus={() => setInputType('date')}
                onBlur={() => setInputType('text')}
                className='profile-input'
                type={user.dob ? inputType : 'date'}
                id='dob'
              />

            </div>
          </div>
          {/* license display / upload  */}
          <div className="licence mt-5">
            <input type="file" hidden />

            <span className='profile-heading py-5'>Driving lisence</span>
            {/* { reduxUser.license?.front && reduxUser.license?.back &&  <span className='d-block'>license verification : {reduxUser.license?.verification }</span>} */}
            <div className="row mt-3">
              <div className='col-md-5 col-sm-10 col-10 mx-3 my-3'>
                <div className='col-md-5 p-0'>Front side</div>
                <label htmlFor='front-side-image' className="front mt-3">
                  {license?.front?.name ? <img src={URL.createObjectURL(license?.front)} alt="" /> : reduxUser.license?.front?.url ? <img src={reduxUser.license?.front?.url} alt="" /> : 'Click here to upload the front side of your driving license.'}
                  {/* {license?.front?.url ? <img src={ reduxUser.license?.front?.url } alt="" /> :( license?.front?.name  ? URL.createObjectURL(license?.front) : 'Click here to upload the front side of your driving license.')} */}
                  <input type="file" onChange={(e) => {
                    const files = e.target.files;
                    if (files && e.target.files?.length !== 0) {
                      const imageFiles = Array.from(files).filter(file => file.type.includes('image'));
                      if (imageFiles.length > 0) {
                        setLicenseUploaded(true)
                        setLicense({ ...license, front: e.target.files[0] })
                      }
                    }
                  }
                  } id='front-side-image' accept="image/*" hidden />
                </label >
              </div>
              <div className='col-md-5 col-sm-10 col-10 mx-3 my-3'>
                <div className='col-md-5 p-0'>Back side</div>
                <label htmlFor="back-side-image" className="back mt-3">
                  {license?.back?.name ? <img src={URL.createObjectURL(license?.back)} alt="" /> : reduxUser.license?.back?.url ? <img src={reduxUser.license?.back?.url} alt="" /> : 'Click here to upload the front side of your driving license.'}
                  {/* {license?.back ? <img src={reduxUser.license?.back?.url ? reduxUser.license?.back?.url : license?.back?.filename &&  URL.createObjectURL(license?.back)} alt="" /> : 'Click here to upload the front side of your driving license.'} */}
                  <input onChange={(e) => {
                    const files = e.target.files;
                    if (files && e.target.files?.length !== 0  ) {
                      const imageFiles = Array.from(files).filter(file => file.type.includes('image'));
                      if (imageFiles.length > 0) {
                        setLicenseUploaded(true)
                        setLicense({ ...license, back: e.target.files[0] })
                      }
                    }
                  }
                  } type="file" accept="image/*" id='back-side-image' hidden />
                </label>
              </div>
            </div>
            {licenseUploaded && <button className='profile-submit-btn' onClick={() => uploadLicense(license, reduxUser, dispatch, setLicenseUploaded, userAuthenticationHandler, setLoading)}>save and continue</button>}
          </div>
          <ToastContainer />
        </div>
      }
    </>
  )
}