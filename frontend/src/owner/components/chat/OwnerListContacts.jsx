import { useEffect, useState } from "react"
import { ownerApi } from "../../../utils/Apis"
import '../ownerHome/sidebar.css'
import img from '../../../images/default.png'
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler"


export default function OwnerListContacts ({setSender,socket}) {
    const [contacts, setContacts] = useState([])
    const [listUpdated, setListUpdated] = useState(null)
    const { ownerAuthenticationHandler } = useErrorHandler()
    useEffect(()=> {
        ownerApi.get('/get-all-contacts').then( ({data:{data}}) => {
           setContacts(data)
        }).catch (err => {
          ownerAuthenticationHandler(err)
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
                <img src={ x.image?.url ?? img} alt="avatar"  />
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