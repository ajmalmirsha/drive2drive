import { Column } from "jspdf-autotable";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { adminApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler";


export default function ListVehicle () {
    const { adminAuthenticationHandler } = useErrorHandler()
    const [ nodes, setNodes ] = useState([])
    useEffect(()  => {
        adminApi.get('/get/all/vehicles').then(({data:{data}}) => {
            setNodes(data)
        }).catch( err => {
            adminAuthenticationHandler(err)
        })
    },[])
    return (
        <div className="col-md-10 pt-5">
            <DataTable value={nodes} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column sortable field="product_name"  header="Product Name" style={{ width: '25%' }}></Column>
                <Column field="category" filter header="Category" style={{ width: '25%' }}></Column>
                <Column field="type" header="Type" style={{ width: '25%' }}></Column>
                <Column field="segment" header="Segment" style={{ width: '25%' }}></Column>
                <Column field="price" header="Rent" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    )
}