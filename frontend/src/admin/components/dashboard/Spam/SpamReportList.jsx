
import { useEffect, useState } from 'react'
import img from '../../../../images/default.png'
import './spam.css'
import { adminApi } from '../../../../utils/Apis'
import { useErrorHandler } from '../../../../user/ErrorHandlers/ErrorHandler'
import Spinner from "../../../../common/spinners/Spinner"

export default function SpamReportList() {
    const { adminAuthenticationHandler } = useErrorHandler()
    const [spam, setSpam] = useState([])
    const [ loading, setLoading ] = useState(false)
    useEffect(() => {
        setLoading(true)
        adminApi.get('/get/all/spam-reports').then(({ data: { data } }) => {
            setLoading(false)
            setSpam(data)
        }).catch(err => {
            adminAuthenticationHandler(err)
        })
    }, [])
    return (
        <div className="spam-list bg-secondary col-md-5 mx-1 my-3 ">
            <div className="bg-light p-2 fw-bold border border-black">
                Spam Reports
            </div>
            <div className='custom-scrollbar' style={{ height: '50vh', overflow: 'auto' }}>
                { loading ? <Spinner/> : spam.length > 0 && spam.map((x) => {
                    return (
                        <div className="row p-2 bg-dark m-0 p-0 text-white">
                            <div className="">
                                <img style={{ height: '30px', width: '30px' }} className='rounded-circle m-1' src={x.reportedBy.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ?
                                    x.reportedBy.image : x.reportedBy.image ? `${process.env.REACT_APP_URL}/public/images/${x.reportedBy.image}`
                                        : img} alt="" />
                                {x.reportedBy?.username}
                            </div>
                            <div className="col-md-8">
                                {x.report}
                            </div>
                            <div className="col-md-4">
                                <img style={{ maxHeight: '100%', minHeight: '100px', height: '60%', objectFit: 'cover' }} className='w-100 ' src={`${process.env.REACT_APP_URL}/public/images/${x?.productId?.image[0]}`} alt="" />
                                <p>{x.productId?.product_name}</p>
                            </div>
                            <hr />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}