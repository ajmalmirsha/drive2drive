import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { adminApi } from '../../../utils/Apis';
// import { CustomerService } from './service/CustomerService';
// import { RefreshIcon, DownloadIcon } from 'primereact/icons';
import html2pdf from 'html2pdf.js';
export default function SalesReport () {
    const [ report, setReport] = useState([]);
    const dataTableRef = useRef(null);
    const exportData = () => {
        console.log('clicked');
        const input = dataTableRef.current;
    
        const options = {
          filename: 'sales_report.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
    
        html2pdf().set(options).from(input).save();
      };
    const paginatorLeft = <Button type="button" className="p-button-rounded p-button-text">
    <i className="fa fa-refresh" />
    Refresh
  </Button>;
  
  const paginatorRight = <FontAwesomeIcon onClick={exportData}   icon={faDownload} />

    useEffect(() => {
       adminApi.get('/get/sales-report').then(({data:{data}}) => {
          console.log(data); setReport(data)
       })
    }, []);
    return (
        <div className="col-md-10">
        <div className="card">
            <DataTable  ref={dataTableRef} id="myDataTable" value={report} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="vehicle.vehicleName" sortable filter header="Vehicle" style={{ width: '25%' }}></Column>
                <Column field="vehicle.category" header="Category" style={{ width: '25%' }}></Column>
                <Column field="vehicle.segment" header="Segment" style={{ width: '25%' }}></Column>
                <Column field="vehicle.type" header="Type" style={{ width: '25%' }}></Column>
                <Column field="vehicle.ownerId.username" header="Owner" style={{ width: '25%' }}></Column>
                {/* <Column field="userId.username" header="Rented By" style={{ width: '25%' }}></Column> */}
                <Column field="totalAmount" header="Revenue" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>    
        </div>
    )
}