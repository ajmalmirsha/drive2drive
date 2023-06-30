

// import { useEffect } from 'react'
// import {userApi} from '../../../utils/Apis'
// import { useErrorHandler } from '../../ErrorHandlers/ErrorHandler'
import './banner.css'
function Banner () {
  //   const { userAuthenticationHandler } = useErrorHandler()
  // useEffect(()=>{
  //   userApi.get('/get/all/banners').then(({data:{data}}) => {

  //   }).catch( err => {
  //      userAuthenticationHandler(err)
  //   })
  // },[])
    return (
      
      <div id="carouselExampleFade" className="carousel slide carousel-fade mx-3" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/car-rental-banner.jpg`} className="d-block banner-img" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/download (5).jpeg`} className="d-block banner-img" alt="..." />
    </div>
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

    )
}

export default Banner