import { useEffect, useState } from "react";
import { adminApi } from "../../../utils/Apis";
import SalesReport from "../../components/Sales-Report/SalesReport";
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler";


export default function SalesReportPage () {
    const { adminAuthenticationHandler } = useErrorHandler()
    const [ report, setReport] = useState([]);
    useEffect(() => {
        adminApi.get('/get/sales-report').then(({data:{data}}) => {
           setReport(data)
        }).catch( err => {
            adminAuthenticationHandler(err)
        })
     }, []);
    return (
        <div className="col-md-10">
    <SalesReport  report={report} />
    </div>
    )
}