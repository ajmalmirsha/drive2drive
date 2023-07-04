

import { useEffect, useState } from 'react'
import {userApi} from '../../../utils/Apis'
import { useErrorHandler } from '../../ErrorHandlers/ErrorHandler'
import './banner.css'
import { Skeleton } from 'primereact/skeleton'
function Banner () {
    const [ banner, setBanners ] = useState([])
    const [ loading, setLoading ]  = useState(false)
    const { userAuthenticationHandler } = useErrorHandler()
  useEffect(()=>{
    setLoading(true)
    userApi.get('/get/all/banners').then(({data:{data}}) => {
      setLoading(false)
       setBanners(data)
    }).catch( err => {
       userAuthenticationHandler(err)
    })
  },[])
    return (
      <>
      {/* { loading ? <Skeleton width='100%' /> : */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/${banner[0]?.image}`} className="d-block banner-img" alt="..." />
    </div>
    {  banner?.length > 0 && banner.map((x) => {
      return(
    <div className="carousel-item">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/${x.image}`} className="d-block banner-img" alt="..." />
    </div>
       )
     })
    }
    {/* <div className="carousel-item">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/1651808622.png`} className="d-block banner-img" alt="..." />
    </div> */}
  </div>
  <button className="carousel-control-prev carosel-btns" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next carosel-btns" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
{/* } */}
</>
    )
}

export default Banner