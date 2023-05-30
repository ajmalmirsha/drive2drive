
import './ownernav.css'
import img from '../../../images/default.png'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOwnerDetails } from '../../../redux/ownerSlice'
import { useNavigate } from 'react-router-dom'
function OwnerNavBar() {
    const ow = useSelector(state => state.owner)
    useEffect(()=>{
        console.log(ow,8778);
    },[])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (

        <div className="nav-bar-owner mt-3  mx-4">
            <button onClick={()=>{
                localStorage.removeItem('owner')
                dispatch(
                    setOwnerDetails({})
                )
                navigate('/owner-login')
            }}>lOGOUT</button>
            <img className='profile-img-nav me-3' src={img} alt="" />
        </div>

    )
}


export default OwnerNavBar