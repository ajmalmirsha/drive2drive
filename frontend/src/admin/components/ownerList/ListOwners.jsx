import { useEffect, useState } from 'react';
import { adminApi } from '../../../utils/Apis';
import {  useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
export default function ListOwners() {
  const { adminAuthenticationHandler } = useErrorHandler()
    const [ owner, setOwner ] = useState([])
  useEffect( () => {
     adminApi.get('/get/all/owners').then(({data:{data}}) => {
        console.log(data);
         setOwner(data)
     }).catch( err => {
      adminAuthenticationHandler(err)
     })

  }, [])

  return (
      <div className="accordion list-owners col-md-10 col-sm-9 pt-5 px-3 accordion-flush vh-100 overflow-auto" id="accordionFlushExample">
        { owner.length > 0 && owner.map((x,i) => {
        return(
        <div className="accordion-item">
          <h2 className="accordion-header" id={`flush-heading${i}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse${i}`}
              aria-expanded="false"
              aria-controls={`flush-collapse${i}`}
            >
                <div className="">
              <h4 >{x.username}</h4>
              <span className='d-block'>{x.email}</span>
              <span className='d-block py-1'>{x?.vehicle?.length} vehicles</span>
              </div>
            </button>
          </h2>
          <div
            id={`flush-collapse${i}`}
            className="accordion-collapse collapse"
            aria-labelledby={`flush-heading${i}`}
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body gap-5 row">
            
                { x.vehicle.length < 1 ?
               
               <div className="">he didn't have vehicles</div> :               
                
                x.vehicle.map( y => {
                    return (
               <div className="border col-md-6 p-0 row">
                 <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <img className='w-100' src={`${process.env.REACT_APP_URL}/public/images/${y.image[0]}`} alt="" />
                 </div>
                 <div className="col-md-5 mx-2">
                <h5 className='m-0' >{y.product_name}</h5>
                <span>{y.category} {y.brand} {y.model}</span>
                <span className='d-block'> {y.reviews?.length} reviews</span>
                <span className='d-block'> {y.bookedUsers?.length} bookings</span>
                </div>
               </div>
                )
                })
                }
            
            </div>
          </div>
        </div>
      )}) }
      </div>
  );
}
