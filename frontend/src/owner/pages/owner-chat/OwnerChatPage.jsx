import { useEffect, useRef, useState } from "react";
import ListChatUsers from "../../../user/Components/chat/LIstChatUsers";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import SideBar from "../../components/ownerHome/SideBar";
import ChatSection from "../../../user/Components/chat/ChatSection";
import OwnerListContacts from "../../components/chat/OwnerListContacts";
import OwnerChatSection from "../../components/chat/OwnerChatSection";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'

export default function OwnerChatPage () {
    const socket = useRef()
    const owner = useSelector(state => state.owner)
    const [sender,setSender] = useState('')
    useEffect(()=>{
    console.log(owner,'sgfh');
    if(owner.id){
      socket.current = io(process.env.REACT_APP_URL)
      socket.current.emit("add-user",owner.id)
    }
  },[])
    return (
        <>
        <OwnerNavBar/>
        <div className="row my-4 mx-2 gap-2">
        <SideBar/>
        <div className="col-md-9 col-sm-7 bg-primary row" >
        <OwnerListContacts setSender={setSender} />
        { sender &&
        <OwnerChatSection sender={sender} socket={socket} /> }
        </div>
        </div>
        </>
    )
}