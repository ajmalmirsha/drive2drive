import { useEffect, useState } from "react"
import { ownerApi } from "../../../utils/Apis"
import '../ownerHome/sidebar.css'
import img from '../../../images/default.png'


export default function OwnerListContacts ({setSender}) {
    const [contacts, setContacts] = useState([])
    useEffect(()=> {
        console.log('gone');
        ownerApi.get('/get-all-contacts').then( ({data:{data}}) => {
           console.log(data);
           setContacts(data)
        })
    },[])
    return (
        <div id="plist" class="people-list">
               
        <ul class="list-unstyled chat-list mt-2 mb-0">
            { contacts.length > 0 && contacts.map((x) => {
                return(
            <li class="clearfix" onClick={() => { setSender(x._id) }} >
                <img src={x.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ? 
           x.image : x.image ? `${process.env.REACT_APP_URL}/public/images/${x.image}`
            : img} alt="avatar"  />
                <div class="about">
                    <div class="name">{x.username}</div>
                    <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                </div>
            </li>
             ) })
           }
        </ul>
    </div>
    )
}