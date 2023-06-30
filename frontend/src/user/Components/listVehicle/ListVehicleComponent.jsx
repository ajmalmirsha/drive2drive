import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './listVehicle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faSquare } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import img from '../../../images/default.png'
import { Chip } from 'primereact/chip';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';  


export default function ListVehicleComponent({ props }) {

  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [ uniquePlaces, setUniquePlaces ] = useState([])
  const [sortOption, setSortOption] = useState("");





  useEffect(() => {
    setVehicles(props);
    const data = [...new Set(props.flatMap(item => item.places.map(place => place.value)))]
  .map(value => ({ label: value }));
console.log(data,7575);
    setUniquePlaces(data)
  }, [props]);
  

   
  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter vehicles based on search input
  const filteredVehicles = vehicles.filter((vehicle) =>
  vehicle.places.some((place) =>
    place.value.toLowerCase().includes(searchInput.toLowerCase())
  ) || vehicle.price.toString().toLowerCase().includes(searchInput.toLowerCase())
);

 // Function to sort vehicles in ascending order based on price
  const sortByLowToHigh = () => {
    let sortedVehicles = [...filteredVehicles];
    sortedVehicles.sort((a, b) => a.price - b.price);
    setVehicles(sortedVehicles);
    setSortOption("lowToHigh");
  };

  // Function to sort vehicles in descending order based on price
  const sortByHighToLow = () => {
    let sortedVehicles = [...filteredVehicles];
    sortedVehicles.sort((a, b) => b.price - a.price);
    setVehicles(sortedVehicles);
    setSortOption("highToLow");
  };
  // pagination

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = filteredVehicles.slice(firstIndex, lastIndex)
  const npage = Math.ceil(filteredVehicles.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setSearchInput(searchInput + transcript)
  },[transcript])
  
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  navigator.mediaDevices.getUserMedia({ audio: true })
  .catch(function(error) {
    
  });
  const handleDropdownChange = (event) => {
    console.log(event.target.value,444)
    setSearchInput(event.target.value)
//    const result = vehicles.filter((vehicle) =>
//   vehicle.places.some((place) =>
//     place.value.toLowerCase().includes(event.target.value.toLowerCase())
//   )
// );

  };


   const items = [
    {
        label: 'Sort',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {
                label: 'Low To High',
                icon: 'pi pi-fw pi-align-left',
                command: () => sortByLowToHigh()
              },
              {
                label: 'High To Low',
                icon: 'pi pi-fw pi-align-right',
                command: () => sortByHighToLow()
            }

        ]
    },
    {
        label: 'Filter',
        icon: 'pi pi-fw pi-calendar',
        items: [
            {
              label: 'Places',
              icon: 'pi pi-fw pi-pencil',
              items: uniquePlaces.map(place => ({
                label: place.label,
                icon: 'pi pi-fw pi-home',
                command: () => handleDropdownChange({ target: { value: place.label } })
              })),

            },
        ]
    }
];

const end = <div className="">
           
<InputText value={searchInput}  onChange={handleSearchInputChange} placeholder="Search" type="text" className="w-full" />
        {/* <input value={searchInput} 
        onChange={handleSearchInputChange}
        type="text" class="form-control form-input w-25" placeholder="Search..." /> */}
        <span class="px-2">{ listening ? <FontAwesomeIcon onClick={SpeechRecognition.stopListening} icon={faSquare} style={{color: "#b00c0c",}} /> : <FontAwesomeIcon  onClick={SpeechRecognition.startListening} icon={faMicrophone} />}</span>
</div>

  return (

    <section style={{ backgroundColor: "#ffff" }}>
      <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
        <div className="card">
            <Menubar model={items}  end={end} />
        </div>
          
        </div>
        {records.length > 0 ? records.map((x) => {
          return (
            <div class="row justify-content-center mb-3" >
              <div class="col-md-12 col-xl-10">
                <div class="card shadow-0 border rounded-3">
                  <div class="card-body"  onClick={() => {
              navigate(`/veiw-detail/${x._id}`)
            }}>
                    <div class="row">
                      <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                          <img src={`${process.env.REACT_APP_URL}/public/images/${x?.image[0]}`}
                            class="w-100" />
                          <a href="#!">
                            <div class="hover-overlay">
                              <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
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
                        <div className="mb-1">
                          <img data-bs-toggle="modal" id="owner-img" data-bs-target="#exampleModal" onClick={(e) =>  e.stopPropagation()}  className="owner-img" src={x.ownerId.image?.slice(0, 33) == 'https://lh3.googleusercontent.com' ? 
           x.ownerId.image : x.ownerId.image ? `${process.env.REACT_APP_URL}/public/images/${x.ownerId.image}`
            : img} alt="" />
            {/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => e.stopPropagation()}></button>
      </div>
      <div class="modal-body m-0 row">
        <div className="col-md-5">
        <img data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) =>  e.stopPropagation()}  className="owner-full-img w-100" src={x.ownerId.image?.slice(0, 33) == 'https://lh3.googleusercontent.com' ? 
           x.ownerId.image : x.ownerId.image ? `${process.env.REACT_APP_URL}/public/images/${x.ownerId.image}`
            : img} alt="" />
            </div>
            <div className="col-md-7">
              <h5>{x.ownerId.username}</h5>
              <p>{x.ownerId.email}</p>

            </div>
      </div>
    </div>
  </div>
</div>
                        <p class="text-truncate d-inline mx-2 mb-4 mb-md-0">
                         <label htmlFor="owner-img">{x.ownerId.username}</label> 
                        </p>
                        </div>
                        <div className="">
                          { x.places.length > 0 && x.places.map((y) => {
                            return(
                        <Chip className="mx-1" label={y.label}  style={{
                              fontSize: '12px',
                              height: '20px',
                              padding: '8px',
                        }} />
                        )
                          })
                      }
                        </div>
                        <p class="text-truncate mb-4 mb-md-0">
                          {x.description}
                        </p>
                      </div>
                      <div class="col-md-6 col-lg-3 col-xl-3 align-items-center border-sm-start-none border-start d-flex flex-column justify-content-center align-items-center">
                        <div class="d-flex flex-row justify-content-center align-items-center mb-1">
                          <h4 class="mb-1">₹{x.price} <small className="text-secondary fs-6" >/perday</small></h4>
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
            <a className="page-link" onClick={prevPage} >Prev</a>
          </li>
          {
            numbers.map((n, i) => {
              return (<li className={`page-item ${currentPage === n && 'active'}`} key={i}>
                <a className="page-link" onClick={() => { changeCPage(n) }}  >{n}</a>
              </li>)
            })
          }
          <li className="page-item">
            <a className="page-link" onClick={nextPage} >Next</a>
          </li>
        </ul>
      </nav>



    </section>

  )


  function prevPage() {
    currentPage !== 1 && setCurrentPage(currentPage - 1)
  }

  function nextPage() {
    currentPage !== npage && setCurrentPage(currentPage + 1)
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }
}