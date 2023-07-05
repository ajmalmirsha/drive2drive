import { useEffect, useState } from "react";
import { adminApi } from "../../../utils/Apis";
import SalesReport from "../../components/Sales-Report/SalesReport";
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler";
import Spinner from "../../../common/spinners/Spinner"


export default function SalesReportPage () {
    const { adminAuthenticationHandler } = useErrorHandler()
    const [ report, setReport] = useState([]);
    const [ loading, setLoading ] = useState(false)
    useEffect(() => {
        setLoading(true)
        adminApi.get('/get/sales-report').then(({data:{data}}) => {
            setLoading(false)
           setReport(data)
        }).catch( err => {
            adminAuthenticationHandler(err)
        })
     }, []);
    return (
        <div className="col-md-10">
        { loading ? <Spinner/> :
         <SalesReport  report={report} />
        }
    </div>
    )
}