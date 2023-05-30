import { useEffect, useState } from "react";



export default function ListVehicleComponent ({props}) {
    console.log(props,897);
    const [vehicles,setVehicles] = useState([])
    // useEffect(()=>{
    //     setVehicles(props)
    // },[])
    const [searchInput, setSearchInput] = useState("");

    
  useEffect(() => {
    setVehicles(props);
  }, [props]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter vehicles based on search input
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.product_name.toLowerCase().includes(searchInput.toLowerCase())
  );


    return (
       
        <section style={{backgroundColor: "#ffff"}}>
    
    <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
                <div className="mb-4 w-100 container d-flex justify-content-end ">
            <input
                type="text"
                className="form-control w-25"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
            />
        </div>
    </div>
           { filteredVehicles.map((x)=>{
                return (
    <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={`${process.env.REACT_APP_URL}/public/images/${x?.image}`}
                    class="w-100" />
                  <a href="#!">
                    <div class="hover-overlay">
                      <div class="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-6">
                <h5>{x.product_name}</h5>
                <div class="d-flex flex-row">
                  <div class="text-danger mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <span>310</span>
                </div>
                <div class="mt-1 mb-0 text-muted small">
                  <span>100% cotton</span>
                  <span class="text-primary"> • </span>
                  <span>Light weight</span>
                  <span class="text-primary"> • </span>
                  <span>Best finish<br /></span>
                </div>
                <div class="mb-2 text-muted small">
                  <span>Unique design</span>
                  <span class="text-primary"> • </span>
                  <span>For men</span>
                  <span class="text-primary"> • </span>
                  <span>Casual<br /></span>
                </div>
                <p class="text-truncate mb-4 mb-md-0">
                 {x.description}
                </p>
              </div>
              <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div class="d-flex flex-row align-items-center mb-1">
                  <h4 class="mb-1 me-1">₹{x.price}</h4>
                  <span class="text-danger"><s>$20.99</s></span>
                </div>
                <h6 class="text-success">Free shipping</h6>
                <div class="d-flex flex-column mt-4">
                  <button class="btn btn-primary btn-sm" type="button">Details</button>
                  <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                    Add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

       )
})
}
  </div>
  </section>

    )
}