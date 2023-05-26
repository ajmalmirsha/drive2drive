


function Banner () {
    return (
       
        <div id="carouselExampleIndicators" className="carousel slide px-5 m-5" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={`${process.env.REACT_APP_URL}/public/images/banner/car-rental-banner.jpg`} alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={`${process.env.REACT_APP_URL}/public/images/banner/download (5).jpeg`} alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={`${process.env.REACT_APP_URL}/public/images/banner/1651808622.png`} alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
       
    )
}

export default Banner