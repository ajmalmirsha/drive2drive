import { useState, useRef, useEffect } from "react";
import ChatSection from "../../Components/chat/ChatSection";
import {io} from 'socket.io-client'
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function ChatPage ({ownerId}) {
    const socket = useRef()
    const user = useSelector(state => state.user)
    const [sender,setSender] = useState(ownerId)
    useEffect(()=> {
      if(user.id){
        socket.current = io(process.env.REACT_APP_URL)
        socket.current.emit("add-user",user.id)
      }
    },[])
    return (
        <div className="row h-100">
        { sender &&
        <ChatSection  sender={sender} socket={socket} /> }
        <ToastContainer />
        </div>
    )
}