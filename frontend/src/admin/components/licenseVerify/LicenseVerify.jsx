
import { useEffect, useState } from 'react'
import './licenseVerify.css'
import axios from 'axios'
import img from '../../../../src/images/default.png'
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
import { adminApi } from '../../../utils/Apis'
import Swal from 'sweetalert2'
import Spinner from "../../../common/spinners/Spinner"

export default function LicenseVerify() {
  const [verfy, setVerify] = useState([])
  const { adminAuthenticationHandler } = useErrorHandler()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    adminApi.get(`/get-all-verifications`).then(({ data: { data } }) => {
      setLoading(false)
      setVerify(data)
    }).catch(err => {
      adminAuthenticationHandler(err)
    })
  }, [])

  function handleSubmit(id, status) {
    setLoading(true)
    adminApi.put(`/verify/license`, { id, status }).then(({ data: { data } }) => {
      setLoading(false)
      setVerify(data)
    }).catch(err => {
      adminAuthenticationHandler(err)
    })
  }

  return (
    <div className={`col-md-10 col-sm-9 mt-5 ${verfy.length <= 0 && 'd-flex justify-content-center align-items-center'}`}>
      { loading ? <Spinner/> : verfy.length > 0 ? verfy.map((x) => {
        return (
          <div className='main-verify my-2' >
            <div className="head-top-license-verify ps-2 pt-2">
              <img className='user-profile' src={x.image?.url ?? img} alt="" />
              <span className="ms-2">{x.username}</span>
            </div>
            <div className="body-license-verify row">
              <div
                className="col-md-4 d-flex  justify-content-center align-items-center">
                <img className='license-verfy-img m-3' src={x.license?.front?.url} alt="" />
              </div>
              <div
                className="col-md-4 d-flex justify-content-center align-items-center">
                <img className='license-verfy-img' src={x.license?.rear?.url} alt="" />
              </div>



              <div className="col-md-4 d-flex justify-content-center align-items-center gap-3">
                <button className='btn btn-danger decline-btn' onClick={() => {
                  Swal.fire({
                    title: 'Do you want to decline the license verification ?',
                    showDenyButton: true,
                    confirmButtonText: 'yes',
                    denyButtonText: `cancel`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSubmit(x._id, 'declined')
                    }
                  })
                }} >decline</button>
                <button className='btn btn-primary' onClick={() => {
                  Swal.fire({
                    title: 'are you sure to verify the license ?',
                    showDenyButton: true,
                    confirmButtonText: 'yes',
                    denyButtonText: `cancel`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSubmit(x._id, 'verified')
                    }
                  })
                }} >verify</button>
              </div>
            </div>

          </div>
        )
      }) :
        <p>you don't have any verification to do</p>
      }

    </div>

  )
}


