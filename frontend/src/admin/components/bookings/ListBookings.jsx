
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { adminApi } from '../../../utils/Apis';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
import Spinner from "../../../common/spinners/Spinner"

export default function BasicFilterDemo() {
    const [ loading, setLoading ] = useState(false)
    const [ booking, setBooking ] = useState([])
    const { adminAuthenticationHandler } = useErrorHandler()
    useEffect(()=> {
        setLoading(true)
        adminApi.get('/get/all-bookings').then(({data:{data}}) => {
            setLoading(false)
           setBooking(data)
        }).catch(err => {
            adminAuthenticationHandler(err)
        })
    },[])
 
    
    const verifiedBodyTemplate = (rowData) => {
        return rowData.paid ? <FontAwesomeIcon color='green' icon={faCheckCircle} /> : <FontAwesomeIcon color='red' icon={faCircleXmark} />
    };
 

    return (
        <div className="col-md-10">
            { loading ? <Spinner/> : 
        <div className="card">
            <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={booking} removableSort tableStyle={{ minWidth: '50rem' }}>
                <Column field="vehicle.vehicleName"  header="vehicle" sortable style={{ width: '25%' }}></Column>
                <Column field="userId.username" header="User" sortable style={{ width: '25%' }}></Column>
                <Column field="vehicle.ownerId.username" header="Owner" sortable style={{ width: '25%' }}></Column>
                {/* <Column field="duration" header="Duration"  style={{ width: '25%' }}></Column> */}
                <Column field="payment.method" header="Payment" sortable  style={{ width: '25%' }}></Column>
                <Column field="payment.paymentId" header="PaymentId"  style={{ width: '25%' }}></Column>
                <Column field="status" header="Status" sortable style={{ width: '25%' }}></Column>
                <Column field="totalAmount" header="TotalAmount" sortable style={{ width: '25%' }}></Column>
                <Column field="paid" header="Paid" dataType="boolean" body={verifiedBodyTemplate} sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
            }
        </div>
    );
}
        