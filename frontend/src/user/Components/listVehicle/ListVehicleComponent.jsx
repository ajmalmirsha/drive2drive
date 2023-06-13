import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function ListVehicleComponent ({props}) {

  const navigate = useNavigate()
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

  // pagination

const [ currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 4
const lastIndex = currentPage * recordsPerPage
const firstIndex = lastIndex - recordsPerPage
const records = filteredVehicles.slice( firstIndex, lastIndex)
const npage = Math.ceil( filteredVehicles.length / recordsPerPage )
const numbers = [...Array( npage + 1 ).keys()].slice(1)

    

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
           { records.length > 0 ? records.map((x)=>{
                return (
    <div class="row justify-content-center mb-3" onClick={()=>{
      navigate(`/veiw-detail/${x._id}`)
    }} >
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={`${process.env.REACT_APP_URL}/public/images/${x?.image[0]}`}
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
                </div>
             
                <p class="text-truncate mb-4 mb-md-0">
                 {x.description}
                </p>
              </div>
              <div class="col-md-6 col-lg-3 col-xl-3 align-items-center border-sm-start-none border-start d-flex flex-column justify-content-center align-items-center">
  <div class="d-flex flex-row justify-content-center align-items-center mb-1">
    <h4 class="mb-1">₹{x.price}</h4>
  </div>
  <div class="d-flex flex-column mt-4">
    <button class="btn btn-primary btn-sm" type="button">Book now</button>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
     
    </div>

       )
}) :

<img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300&vertical=top" alt="" />

}
  </div>
  <nav className='d-flex  justify-content-center'>
                <ul className="pagination">
                    <li className="page-item">
                        <a  className="page-link" onClick={prevPage} >Prev</a>
                    </li>
                    {
                        numbers.map(( n, i)=>{
                           return( <li className={`page-item ${currentPage === n && 'active'}`} key={i}>
                                <a  className="page-link" onClick={()=>{changeCPage(n)}}  >{n}</a>
                            </li> )
                        })
                    }
                    <li className="page-item">
                        <a  className="page-link" onClick={nextPage} >Next</a>
                    </li>
                </ul>
            </nav>
  </section>

    )

    
    function prevPage () {
      currentPage !== 1 && setCurrentPage(currentPage - 1)
      }
      
      function nextPage () {
      currentPage !== npage && setCurrentPage(currentPage + 1)
      }
      
      function changeCPage (id) {
      setCurrentPage(id)
      }
}