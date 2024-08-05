import { useEffect, useState } from "react"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler"
import Navbar from "../userHome/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCreditCard } from "@fortawesome/free-solid-svg-icons"
import Payment from "../Stripe/Payment"
import { TreeSelect } from 'primereact/treeselect';
import { Button } from 'primereact/button';
import Spinner from "../../../common/spinners/Spinner"
import { useNavigate } from "react-router-dom"

export default function UserBookings() {
  const [bookings, setBookings] = useState([])
  const { userAuthenticationHandler } = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    userApi.get('/get-all-approved-bookings').then(({ data: { data } }) => {
      setLoading(false)
      setBookings(data)
    }).catch(err => {
      userAuthenticationHandler(err)
    })
  }, [])

  // Sort by vehicle name (ascending order)
  const sort = (value) => {
    if (value === 'rent asc') {
      const sortedBookings = [...bookings].sort((a, b) => a.vehicle.vehicleName.localeCompare(b.vehicle.vehicleName));
      setBookings(sortedBookings);
    } else if (value === 'rent desc') {
      const sortedBookings = [...bookings].sort((b, a) => a.vehicle.vehicleName.localeCompare(b.vehicle.vehicleName));
      setBookings(sortedBookings);
    } else if (value === 'Date-Pick-Time-asc') {
      const sortedBookings = [...bookings].sort((b, a) => a.address?.pickUp?.pickTime.localeCompare(b.vehicle.vehicleName));
      setBookings(sortedBookings);
    } else if (value === 'Date-Pick-Time-desc') {
      const sortedBookings = [...bookings].sort((a, b) => a.address?.pickUp?.pickTime.localeCompare(b.vehicle.vehicleName));
      setBookings(sortedBookings);
    } else if (value === 'Date-Drop-Time-asc') {
      const sortedBookings = [...bookings].sort((b, a) => a.address?.dropOff?.dropTime.localeCompare(b.vehicle.vehicleName));
      setBookings(sortedBookings);
    } else if (value === 'Date-Drop-Time-desc') {
      const sortedBookings = [...bookings].sort((a, b) => a.address?.dropOff?.dropTime.localeCompare(b.vehicle.vehicleName));
      setBookings(sortedBookings);
    }
  };


  const [nodes, setNodes] = useState([{
    key: '0-0',
    label: 'Rent',
    children: [
      {
        key: 'rent asc',
        label: 'Ascending order',
      },
      {
        key: 'rent desc',
        label: 'Descending order',
      }
    ]
  }, {
    key: '0-1',
    label: 'Date',
    children: [
      {
        key: '1-0',
        label: 'Pick Time',
        children: [
          {
            key: 'Date-Pick-Time-asc',
            label: 'Ascending order',
          },
          {
            key: 'Date-Pick-Time-desc',
            label: 'Descending order',
          }

        ]
      },
      {
        key: '1-1',
        label: 'Drop Time',
        children: [
          {
            key: 'Date-Drop-Time-asc',
            label: 'Ascending order',
          },
          {
            key: 'Date-Drop-Time-desc',
            label: 'Descending order',
          }
        ]
      }
    ]
  },]);
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState({});



  const expandAll = () => {
    let _expandedKeys = {};

    for (let node of nodes) {
      expandNode(node, _expandedKeys);
    }

    setExpandedKeys(_expandedKeys);
  };

  const collapseAll = () => {
    setExpandedKeys({});
  };

  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length) {
      _expandedKeys[node.key] = true;

      for (let child of node.children) {
        expandNode(child, _expandedKeys);
      }
    }
  };

  const headerTemplate = (
    <div className="p-3 pb-0">
      {/* <Button type="button" icon="pi pi-plus" onClick={expandAll} className="w-2rem h-2rem mr-2 p-button-outlined" />
        <Button type="button" icon="pi pi-minus" onClick={collapseAll} className="w-2rem h-2rem p-button-outlined" /> */}
    </div>
  );
  return (
    <div>
      {/* <Navbar /> */}
      { loading ? <Spinner/> :
      <div className="row my-4 mx-2 gap-2">
        <div className="row d-flex justify-content-end">
          <TreeSelect value={selectedNodeKey} onChange={(e) => {
            sort(e.value)
            setSelectedNodeKey(e.value)
          }} options={nodes}
            className="md:w-20rem w-full col-md-3" placeholder="Sort"
            expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} panelHeaderTemplate={headerTemplate}></TreeSelect>
        </div>
        <div className="col-md-12 booking-verification" style={{height:'75vh',overflowY:'auto'}} >
          {bookings.length > 0 ? bookings.map((x) => {
            return (
              <>
                <div className="bookings row m-3" >
                  <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <img onClick={() => navigate(`/veiw-detail/${x.vehicle._id}`) } className="booking-verify-vehicle-img" src={x.vehicle.image[0].url} alt="" style={{cursor:'pointer'}} />
                  </div>
                  <div className="col-md-6 vehicle-details row">
                    <div className="row">
                      <h5 className="col-md-6" >{x.vehicle.vehicleName}</h5>
                      <span className="col-md-6 ps-4">₹ {x.totalAmount}</span>
                    </div>
                    <div className="mb-1">
                      {x.duration}
                    </div>
                    <div className="col-md-6 pickUp">
                      <span className="d-block fw-bold" >Pick information</span>
                      <span className="d-block" >
                        Time : {new Date(x.address?.pickUp?.pickTime).toLocaleString(undefined, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className="d-block">
                        place : {x.address?.pickUp?.pickPlace}  <br /> {x.address?.pickUp?.pickCity}, {x.address?.pickUp?.pickState}
                      </span>
                    </div>
                    <div className="col-md-6 dropOff">
                      <span className="d-block fw-bold" >Drop information</span>
                      <span className="d-block" >
                        Time : {new Date(x.address?.dropOff?.dropTime).toLocaleString(undefined, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className="d-block">
                        place : {x.address?.dropOff?.dropPlace}  <br /> {x.address?.dropOff?.dropCity}, {x.address?.dropOff?.dropState}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center align-items-center gap-3 ">
                    {
                      x.approvel.approved && !x.approvel.declined &&
                      <div className="bg-success text-white rounded-pill px-2 py-1">
                        Approved
                      </div>}
                    {
                      x.approvel.declined && !x.approvel.approved &&
                      <div className="bg-danger text-white rounded-pill px-2 py-1">
                        Declined
                      </div>}
                    {
                      !x.approvel.declined && !x.approvel.approved &&
                      <div className="bg-info text-white rounded-pill px-2 py-1">
                        Pending
                      </div>
                    }
                  </div>
                  <div className="col-md-2 d-flex justify-content-center align-items-center gap-3 ">
                    {
                      x.approvel.approved && !x.approvel.declined && !x.paid && (
                        <button type="button" class="btn btn-dark px-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          <b>Pay</b> <FontAwesomeIcon icon={faCreditCard} />
                          {/* <!-- Modal --> */}
                          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <Payment props={x.totalAmount} setBookings={setBookings} couponId={x?.coupon} bookingId={x._id} />
                                </div>

                              </div>
                            </div>
                          </div>
                        </button>

                      )}

                    {
                      x.paid &&
                      <div className="bg-dark text-white rounded-1 p-2">
                        paid <FontAwesomeIcon icon={faCheckCircle} color="green" />
                      </div>
                    }

                  </div>
                </div>
                <hr />
              </>
            )
          })
           : <p className="text-center mt-4">no bookings available</p>
          }
        </div>
      </div>
    }
    </div>
  )
}