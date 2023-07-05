import { useEffect, useState } from "react";
import SalesReport from "../../../admin/components/Sales-Report/SalesReport";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import SideBar from "../../components/ownerHome/SideBar";
import { ownerApi } from "../../../utils/Apis";
import Spinner from "../../../common/spinners/Spinner"



export default function OwnerSalesReport (){
    const [ loading, setLoading ] = useState(false)
    const [ report, setReport ] = useState([])
    useEffect(()=> {
        setLoading(true)
        ownerApi.get('/get/sales-report').then(({data:{data}}) => {
            setLoading(false)
             setReport(data)
        })
    },[])
    return(
        <div>
        <OwnerNavBar/>
    <div className="row my-4 mx-2 gap-2">
    <SideBar />
    { loading ? <Spinner/> :
        <div className="col-md-9 col-sm-7" >
         <SalesReport owner={true} report={report} />
        </div>
    }
        </div>
        </div>
    )
}