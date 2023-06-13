
import { useEffect, useState } from 'react'
import './licenseVerify.css'
import axios from 'axios'
import img from '../../../../src/images/default.png'

export default function LicenseVerify () {
    const [verfy, setVerify] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/admin/get-all-verifications`).then(({data:{data}})=>{
            console.log(data);
            setVerify(data)
        })
    },[])

    function handleSubmit (id) {
        
        axios.put(`${process.env.REACT_APP_URL}/admin/verify/license`,{id}).then(({data:{data}})=>{
            setVerify(data)
        })
    }

    return (
       <div className="col-md-10 col-sm-9 mt-5 ">
        { verfy.length > 0 && verfy.map((x)=>{
            return (
            <div className='main-verify my-2' >
                <div className="head-top-license-verify ps-2 pt-2">
                <img  className='user-profile' src={ x?.image?.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   x.image  : x.image ? `${process.env.REACT_APP_URL}/public/images/${x.image}` : img} alt="" />
                <span className="ms-2">{x.username}</span>
                </div>
                <div className="body-license-verify row">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img className='license-verfy-img m-3' src={`${process.env.REACT_APP_URL}/public/images/license/${x.license?.front}`} alt="" />
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img className='license-verfy-img ' src={`${process.env.REACT_APP_URL}/public/images/license/${x.license?.rear}`} alt="" />
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <button className='btn btn-primary' onClick={()=> handleSubmit(x._id)} >verify</button>
                    </div>
                </div>
            </div>
            )
            })
        }
       </div>
    )
}