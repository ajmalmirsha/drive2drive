import SpamReportList from "./Spam/SpamReportList";
import MainGraph from "./graph/MainGraph";



export default function Dashboard () {
    return (
        <div className="col-md-10 col-sm-9 vh-100 overflow-auto ">
            <MainGraph/>
            <SpamReportList/>
        </div>
    )
}
