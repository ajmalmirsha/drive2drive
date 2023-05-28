import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function AdminHome() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('admin')
        if (!token) {
            navigate('/admin/login')
        }
    }, [])
    return (
        <>admin home page !!
            <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem('admin')
                navigate('/admin/login')
            }}>Logout</button>
        </>
    )
}