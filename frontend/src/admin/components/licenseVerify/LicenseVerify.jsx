
import { useEffect, useState } from 'react'
import './licenseVerify.css'
import axios from 'axios'
import img from '../../../../src/images/default.png'
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
import { adminApi } from '../../../utils/Apis'
import Swal from 'sweetalert2'
export default function LicenseVerify () {
    const [verfy, setVerify] = useState([])
    const { adminAuthenticationHandler } = useErrorHandler()
    useEffect(()=>{
        adminApi.get(`/get-all-verifications`).then(({data:{data}})=>{
            console.log(data);
            setVerify(data)
        }).catch( err => {
            adminAuthenticationHandler( err )
        })
    },[])

    function handleSubmit (id,status) {
        adminApi.put(`/verify/license`,{id,status}).then(({data:{data}})=>{
            setVerify(data)
        }).catch( err => {
            adminAuthenticationHandler( err )
        })
    }

    return (
       <div className={`col-md-10 col-sm-9 mt-5 ${ verfy.length <= 0 && 'd-flex justify-content-center align-items-center'}`}>
        { verfy.length > 0 ? verfy.map((x)=>{
            return (
            <div className='main-verify my-2' >
                <div className="head-top-license-verify ps-2 pt-2">
                <img  className='user-profile' src={ x?.image?.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   x.image  : x.image ? `${process.env.REACT_APP_URL}/public/images/${x.image}` : img} alt="" />
                <span className="ms-2">{x.username}</span>
                </div>
                <div className="body-license-verify row">
                    <div 
                    // data-bs-toggle="modal"  data-bs-target="#front"
                     className="col-md-4 d-flex  justify-content-center align-items-center">
                        <img className='license-verfy-img m-3' src={`${process.env.REACT_APP_URL}/public/images/license/${x.license?.front}`} alt="" />
                    
  {/* // <!-- Modal --> */}
{/* <div className="modal fade" id="front" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
              <img className='view-detail-img' src={`${process.env.REACT_APP_URL}/public/images/license/${x.license?.front}`} alt="" />
      </div>
    </div>
  </div>
</div> */}
                    </div>
                    <div 
                    // data-bs-toggle="modal" data-bs-target="#rear" 
                      className="col-md-4 d-flex justify-content-center align-items-center">
                        <img className='license-verfy-img' src={`${process.env.REACT_APP_URL}/public/images/license/${x.license?.rear}`} alt="" />
                                     
  {/* // <!-- Modal --> */}
{/* <div className="modal fade" id="rear" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <img className='view-detail-img' src={`${process.env.REACT_APP_URL}/public/images/license/${x.license?.rear}`} alt="" />
      </div>
    </div>
  </div>
</div> */}
                    </div>
                  


                    <div  className="col-md-4 d-flex justify-content-center align-items-center gap-3">
                        <button className='btn btn-danger decline-btn' onClick={()=>{
                            Swal.fire({
                                title: 'Do you want to decline the license verification ?',
                                showDenyButton: true,
                                confirmButtonText: 'yes',
                                denyButtonText: `cancel`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    handleSubmit(x._id,'declined')
                                }
                              })
                            }} >decline</button>
                        <button className='btn btn-primary' onClick={()=>{
                             Swal.fire({
                                title: 'are you sure to verify the license ?',
                                showDenyButton: true,
                                confirmButtonText: 'yes',
                                denyButtonText: `cancel`,
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                   handleSubmit(x._id,'verified')
                                }
                                } )
                            }} >verify</button>
                    </div>
                </div>
              
            </div>
            )
            })  :
            <p>you don't have any verification to do</p>
        }
      
       </div>
       
    )
}


  