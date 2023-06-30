import { useEffect, useState } from "react";
import SalesReport from "../../../admin/components/Sales-Report/SalesReport";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import SideBar from "../../components/ownerHome/SideBar";
import { ownerApi } from "../../../utils/Apis";



export default function OwnerSalesReport (){
    const [ report, setReport ] = useState([])
    useEffect(()=> {
        ownerApi.get('/get/sales-report').then(({data:{data}}) => {
             setReport(data)
        })
    },[])
    return(
        <div>
        <OwnerNavBar/>
    <div className="row my-4 mx-2 gap-2">
    <SideBar />
        <div className="col-md-9 col-sm-7" >
         <SalesReport owner={true} report={report} />
        </div>
        </div>
        </div>
    )
}