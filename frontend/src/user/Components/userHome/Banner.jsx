


function Banner () {
    return (
      
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/car-rental-banner.jpg`} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/download (5).jpeg`} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={`${process.env.REACT_APP_URL}/public/images/banner/1651808622.png`} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    )
}

export default Banner