import { useEffect, useRef, useState } from "react";
import ListChatUsers from "../../../user/Components/chat/LIstChatUsers";
import OwnerNavBar from "../../components/ownerHome/OwnerNavBar";
import SideBar from "../../components/ownerHome/SideBar";
import ChatSection from "../../../user/Components/chat/ChatSection";
import OwnerListContacts from "../../components/chat/OwnerListContacts";
import OwnerChatSection from "../../components/chat/OwnerChatSection";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'
import '../../components/ownerHome/sidebar.css'
import { ToastContainer, toast } from "react-toastify";


export default function OwnerChatPage () {
    const socket = useRef()
    const owner = useSelector(state => state.owner)
    const [sender,setSender] = useState({})
    useEffect(()=>{
    console.log(owner,'s gfh');
    if(owner.id){
      socket.current = io(process.env.REACT_APP_URL)
      socket.current.emit("add-user",owner.id)
    }else {
      toast.error('owner not connected to socket')
    }
  },[sender])
    return (
        <>
          <div class="card chat-app">
        <OwnerListContacts setSender={setSender} socket={socket} />
        { sender.id &&
        <OwnerChatSection sender={sender} socket={socket} /> }
        <ToastContainer />
       </div>
        </>
    )
}