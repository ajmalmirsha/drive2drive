
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { adminApi } from '../../../utils/Apis';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchorCircleCheck, faAngleLeft, faCheckCircle, faCircleXmark, faCross, faCrosshairs } from '@fortawesome/free-solid-svg-icons';

export default function BasicFilterDemo() {

    const [ booking, setBooking ] = useState([])
    useEffect(()=> {
        adminApi.get('/get/all-bookings').then(({data:{data}}) => {
           setBooking(data)
           console.log(data);
        })
    },[])
 
    
    const verifiedBodyTemplate = (rowData) => {
        console.log(rowData);
        return rowData.paid ? <FontAwesomeIcon color='green' icon={faCheckCircle} /> : <FontAwesomeIcon color='red' icon={faCircleXmark} />
    };
 

    return (
        <div className="col-md-10">
        <div className="card">
            <DataTable value={booking} removableSort tableStyle={{ minWidth: '50rem' }}>
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
        </div>
    );
}
        