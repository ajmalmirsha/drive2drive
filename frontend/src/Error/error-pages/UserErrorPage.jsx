
import { useNavigate } from 'react-router-dom'
import './userErrorPage.css'
export default function UserErrorPage ({link}) {
    const navigate = useNavigate()
    return (
       <div className="user-Error">
        <h1 className="head-404">404</h1>
<p className="message-404">The page you want isn't available 😭</p>
<a className="home-link-404" onClick={() => navigate(link) }>return to homepage</a>
       </div>
    )
}