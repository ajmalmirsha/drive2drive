import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'primereact/dropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


import { FilterMatchMode } from 'primereact/api';

export default function SalesReport({ report, owner }) {
  const [data, setData] = useState([])
  useEffect(() => {
    setData(report)
  }, [report])

  const filters = {
    'vehicle.vehicleName': { value: null, matchMode: FilterMatchMode.CONTAINS },
    "vehicle.category": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'vehicle.segment': { value: null, matchMode: FilterMatchMode.IN },
    'vehicle.type': { value: null, matchMode: FilterMatchMode.EQUALS },
    'vehicle.ownerId.username': { value: null, matchMode: FilterMatchMode.EQUALS },
    'totalAmount': { value: null, matchMode: FilterMatchMode.EQUALS }
  }


  const exportData = () => {
    const doc = new jsPDF();
    const tableData = data.map((item) => [
      item.vehicle.vehicleName,
      item.vehicle.category,
      item.vehicle.segment,
      item.vehicle.type,
      item.vehicle.ownerId.username,
      item.totalAmount,
      // item.updatedAt,
    ]);

    doc.autoTable({
      head: [
        ['Vehicle', 'Category', 'Segment', 'Type', 'Owner', 'Revenue'],
      ],
      body: tableData,
    });

    doc.save('sales_report.pdf');
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'Daily', code: 'NY' },
    { name: 'Weekly', code: 'RM' },
    { name: 'Monthly', code: 'LDN' },
  ];

  function handleSort(e) {
    let days = 0
    if (e.value.name === 'Weekly') {
      days = 7
    } else if (e.value.name === 'Daily') {
      days = 1
    } else if (e.value.name === 'Monthly') {
      days = 30
    }
  
    report.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - days);
    const lastWeekSales = report.filter((item) => new Date(item.updatedAt) >= oneWeekAgo);

    setData(lastWeekSales)
  }
  const paginatorLeft = <Dropdown value={selectedCity} onChange={handleSort} options={cities} optionLabel="name"
    placeholder="Sort" className="w-full md:w-14rem" />


  const paginatorRight = <FontAwesomeIcon onClick={exportData} icon={faDownload} />


  return (
    <div className="card">
      <DataTable removableSort id="myDataTable" filters={filters} filterDisplay="row" value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
        <Column field="vehicle.vehicleName" sortable filter header="Vehicle" style={{ width: '25%' }}></Column>
        <Column field="vehicle.category" sortable filter header="Category" style={{ width: '25%' }}></Column>
        <Column field="vehicle.segment" sortable filter header="Segment" style={{ width: '25%' }}></Column>
        <Column field="vehicle.type" sortable filter header="Type" style={{ width: '25%' }}></Column>
        {!owner && <Column field="vehicle.ownerId.username" sortable filter header="Owner" style={{ width: '25%' }}></Column>}
        <Column sortable body={(rowData) => {
          const formattedDate = new Date(rowData.updatedAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          });
          return <span>{formattedDate}</span>;
        }} field="updatedAt" header="Date" style={{ width: '25%' }}></Column>
        {/* <Column field="userId.username" header="Rented By" style={{ width: '25%' }}></Column> */}
        <Column field="totalAmount" sortable filter header="Revenue" style={{ width: '25%' }}></Column>
      </DataTable>
    </div>

  )
}