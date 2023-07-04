import { useEffect, useRef, useState } from "react"
import { ownerApi, userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import '../ownerHome/sidebar.css'
import { ToastContainer, toast } from "react-toastify"
import { io } from "socket.io-client"
import img from '../../../images/default.png'
export default function OwnerChatSection({ sender, socket }) {
    const owner = useSelector(state => state.owner)
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState([])
    const { userAuthenticationHandler } = useErrorHandler()
    const [msgSent, setMsgSent] = useState(false)
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const scrollRef = useRef()
    useEffect(() => {
        if (sender.id) {
            ownerApi.post('/get-all-messages', { to: sender.id }).then(({ data: { messages } }) => {
                console.log(messages,77676);
                setMessages(messages)
            })
        }
    }, [msgSent,sender.id])
    // useEffect(() => {
    //     socket.current = io(process.env.REACT_APP_URL)
    //     socket.current.emit("add-user",sender)
    // },[])
    useEffect(() => {
        console.log('msg-recive useEffect ',socket);
        if (socket.current) {
            setTimeout(()=>{
            socket.current.on("msg-recieve", ({msg,from}) => {
                console.log('on msg reciv e emit ',msg);
              sender.id == from && setArrivalMsg({ fromSelf: false, message: msg,time:'just now' })
                // toast.success('msg recived')
            })
        },100)
        }
    }, [])

    useEffect(() => {
        console.log('mesga',messages);
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])


    const sendMessage = (e) => {
        e.preventDefault()
        console.log('sender',sender,socket);
        socket.current.emit("send-msg", {
            to: sender.id,
            from: owner.id,
            msg
        })
        msg.length > 0 && ownerApi.post('/sent-message', { msg, to: sender.id }).then(({ data }) => {
            setMsgSent(prevState => !prevState);
            setMsg('')
        console.log('mesga',messages);
            const msgs = [...messages]
            msgs.push({ fromSelf: true, message: msg })
            setMessages(msgs)
        }).catch(err => {
            userAuthenticationHandler(err)
        })
    }

    
  
    return (

        // <div className="col-md-9 bg-dark d-flex flex-column min-vh-80">
        //     <div className="head-sec text-white">
        //         {sender}
        //     </div>
        //     <div className="body-sec overflow-auto" style={{ height: '200px' }}>
        //         {
        //             messages.length > 0 && messages.map((x) => {
        //                 return (
        //                     <div ref={scrollRef} key={uuidv4()} >
        //                         {
        //                             x.fromSelf ?
        //                                 <div className="d-flex justify-content-end">
        //                                     <p className={`text-white bg-info`}>{x.message}</p>
        //                                 </div>
        //                                 :
        //                                 <div className="bg-success w-25">
        //                                     <p className={`text-white`}>{x.message}</p>
        //                                 </div>
        //                         }

        //                     </div>
        //                 )
        //             })}
        //     </div>
        //     <div className="footer-sec mt-auto">
        //         <form onSubmit={sendMessage}>
        //             <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" />
        //             <button type="submit" >send</button>
        //         </form>
        //     </div>
        // </div>

        <div class="chat">
        <div class="chat-header clearfix">
            <div class="row">
                <div class="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    { sender?.image &&  <img src={sender?.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ? 
           sender.image : sender.image ? `${process.env.REACT_APP_URL}/public/images/${sender.image}`
            : img} alt="avatar" />}
                    </a>
                    <div class="chat-about">
                        <h6 class="m-b-0">{sender?.username}</h6>
                        {/* <small>Last seen: 2 hours ago</small> */}
                    </div>
                </div>
                
            </div>
        </div>



        <div class="chat-history">
            <ul class="m-b-0" >
                 {
                   messages.length > 0 && messages.map((x) => {
                         return (
                            <>
                      {
                                    x.fromSelf ?
                <li class="clearfix d-flex justify-content-end" ref={scrollRef} key={uuidv4()}>
                    <div class="message m-0 p-0 other-message " style={{ borderBottomRightRadius : "0"}}>
                    <span className="ms-2 me-3 d-block" >{x.message}</span>
                    <div className="msg-footer mx-2 text-end">
                    {x.time}
                    </div>
                    </div>
                    {/* <div class="message-data ">
                        <span class="message-data-time">{x.time}</span>
                    </div> */}
                </li> :
                                         
                <li class="clearfix" ref={scrollRef} key={uuidv4()}>
                    <div class="message m-0 p-0  my-message" style={{ borderBottomLeftRadius : "0"}}>
                        <span className="ms-2 me-3 d-block" >{x.message}</span>
                    <div className="msg-footer mx-2 text-end ">
                    {x.time}
                    </div>
                    </div>
                    <div class="message-data">
                        <span class="message-data-time"></span>
                    </div>
                </li> }
                </>
                         ) } ) }
            </ul>
        </div>




        <div class="chat-message clearfix">
            <div class="input-group d-block mb-0">
                <form className="row" onSubmit={sendMessage} >
                    <div className="col-md-11 col-sm-11 col-11">
                <input value={msg} onChange={(e) => setMsg(e.target.value)}
                 type="text" class="form-control " placeholder="Type a message..." />        
                 </div>                            
                <div class="input-group-prepend col-md-1 col-sm-11 col-11">
                    <button type="submit" className="btn btn-success" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                    </button>
                </div>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
    )
}