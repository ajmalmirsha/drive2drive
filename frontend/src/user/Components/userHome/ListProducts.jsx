
import { useState } from 'react'
import './listproduct.css'
import { useNavigate } from 'react-router-dom'

function ListProducts({vehicle,title}) {
    const navigate = useNavigate()

    // pagination

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 8
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = vehicle.slice(firstIndex, lastIndex)
    const npage = Math.ceil(vehicle.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)



 
    return (
        <>
          <style>
        @import url('https://fonts.googleapis.com/css2?family=Caprasimo&display=swap');
        </style>

            <div className='row justify-content-center m-0  px-5 py-3 gap-2' >
       <span style={{fontFamily: 'fantasy'}} className="d-block font-weight-bold h4">{title}</span>

                {records.map((x) => (
                    <div onClick={() => {
                        navigate(`/veiw-detail/${x._id}`)
                    }} className="card " style={{ width: "18rem" }}>
                        <img style={{ height: '12rem' }} src={x.image[0]?.url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-ellipsis ">{x.product_name}</h5>
                            <p className="card-text">{x.description}</p>

                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="price fw-bold pt-3">
                                    {x.price} <small>/perday</small> 
                                </h5>
                                <a href="#" className="btn btn-primary">Book now</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

          { 
          vehicle?.length > recordsPerPage && (
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
             )}

        </>
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


export default ListProducts