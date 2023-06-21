import { useEffect, useState } from "react"
import { ownerApi } from "../../../utils/Apis"
import '../ownerHome/sidebar.css'
import img from '../../../images/default.png'


export default function OwnerListContacts ({setSender,socket}) {
    const [contacts, setContacts] = useState([])
    const [listUpdated, setListUpdated] = useState(null)
    useEffect(()=> {
        console.log('gone');
        ownerApi.get('/get-all-contacts').then( ({data:{data}}) => {
           console.log(data,88);
           setContacts(data)
        })
    },[listUpdated])
    useEffect(() => {
        if (socket.current) {
            setTimeout(()=>{
            socket.current.on("new-user", (msg) => {
              setListUpdated(msg)
            })
        },100)
        }
    },[])
    return (
        <div id="plist" class="people-list">
               
        <ul class="list-unstyled chat-list mt-2 mb-0">
            { contacts.length > 0 && contacts.map((x) => {
                return(
            <li class="clearfix my-1" onClick={() => { setSender({id:x._id,username:x.username,image:x.image}) }} >
                <img src={x.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ? 
           x.image : x.image ? `${process.env.REACT_APP_URL}/public/images/${x.image}`
            : img} alt="avatar"  />
                <div class="about">
                    <div class="name">{x.username}</div>
                    {/* <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                             */}
                </div>
            </li>
             ) })
           }
        </ul>
    </div>
    )
}