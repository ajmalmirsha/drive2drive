import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faSquare } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { adminApi } from "../../../utils/Apis";
import img from '../../../images/default.png'
import './listUsers.css'
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler";
import Spinner from "../../../common/spinners/Spinner"

export default function ListUsers() {

  const { adminAuthenticationHandler } = useErrorHandler()
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    adminApi.get('/get-all-user-details').then(({ data: { data } }) => {
      setLoading(false)
      setUsers(data)
    }).catch(err => {
      adminAuthenticationHandler(err)
    })
  }, [])



  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  // pagination

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = filteredUsers.slice(firstIndex, lastIndex)
  const npage = Math.ceil(filteredUsers.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setSearchInput(searchInput + transcript)
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  navigator.mediaDevices.getUserMedia({ audio: true })
    .catch(function (error) {

    });

  const updateField = (id, field, value) => {
    setUsers(prevState => {
      return prevState.map(obj => {
        if (obj._id === id) {
          return { ...obj, [field]: value };
        }
        return obj;
      });
    });
  };


  function handleBlockUser(status, userId) {
    adminApi.put('/user/block/un-block', { status, userId }).then(({ data: { data } }) => {
      updateField(data._id, 'block', data.block);
    }).catch(err => {
      adminAuthenticationHandler(err)
    })
  }


  return (

    <section className="col-md-10 col-sm-9 mt-2" style={{ backgroundColor: "#ffff", height: '100vh' }}>
      <div class="row justify-content-center overflow-auto mb-3 " style={{ height: '90vh' }} >
        <div class="col-md-12 col-xl-10">
          <div className="search mb-4 w-100 container d-flex justify-content-end">


            <input value={searchInput}
              onChange={handleSearchInputChange}
              type="text" class="form-control form-input w-25" placeholder="Search..." />
            <span class="px-2">{listening ? <FontAwesomeIcon onClick={SpeechRecognition.stopListening} icon={faSquare} style={{ color: "#b00c0c", }} /> : <FontAwesomeIcon onClick={SpeechRecognition.startListening} icon={faMicrophone} />}</span>
          </div>
        </div>
        { loading ? <Spinner/> : records.length > 0 ? records.map((x) => {
          return (
            <div class="row justify-content-center  p-0 m-0" >
              <div class="col-md-12 col-xl-11 ">
                <div class="card shadow-0 border rounded-3">
                  <div class="card-body" >
                    <div class="row">
                      <div class="col-md-12 col-lg-2  d-flex justify-content-center align-items-center col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                          <img src={x.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ?
                            x.image : x.image ? `${process.env.REACT_APP_URL}/public/images/${x.image}`
                              : img}
                            class="user-image" />
                          <a href="#!">
                            <div class="hover-overlay">
                              <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-6 col-xl-6">
                        <h5>{x.username}</h5>
                        <div class="d-flex flex-row">
                          <div class="text-danger mb-1 me-2">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                          </div>
                        </div>
                        <p class="text-truncate mb-4 mb-md-0">
                          {x.email}
                        </p>
                        <p class="text-truncate mb-4 mb-md-0">
                          {x?.phone}
                        </p>
                        <p class="text-truncate mb-4 mb-md-0">
                          {x?.dob}
                        </p>
                        <p class="text-truncate mb-4 mb-md-0">
                          license verification : {x?.license.verification}
                        </p>
                      </div>
                      <div class="col-md-6 col-lg-3 col-xl-3 align-items-center border-sm-start-none border-start d-flex flex-column justify-content-center align-items-center">

                        <div class="d-flex flex-column mt-4">
                          {
                            x.block ?
                              <button onClick={(e) => handleBlockUser('unblock', x._id)} class="btn btn-outline-success btn-sm" type="button">un block</button> :
                              <button onClick={(e) => handleBlockUser('block', x._id)} class="btn btn-outline-danger btn-sm" type="button">block</button>
                          }
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