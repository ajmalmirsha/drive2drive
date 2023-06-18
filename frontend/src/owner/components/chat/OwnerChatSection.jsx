import { useEffect, useRef, useState } from "react"
import { ownerApi, userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import '../ownerHome/sidebar.css'
import { ToastContainer, toast } from "react-toastify"
export default function OwnerChatSection({ sender, socket }) {
    const owner = useSelector(state => state.owner)
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState([])
    const { userAuthenticationHandler } = useErrorHandler()
    const [msgSent, setMsgSent] = useState(false)
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const scrollRef = useRef()
    useEffect(() => {
        if (sender) {
            ownerApi.post('/get-all-messages', { to: sender }).then(({ data: { messages } }) => {
                setMessages(messages)
            })
        }
    }, [msgSent])
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMsg({ fromSelf: false, message: msg })
                toast.success('msg recived')
            })
        }
    }, [])

    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])


    const sendMessage = (e) => {
        e.preventDefault()
        socket.current.emit("send-msg", {
            to: sender,
            from: owner.id,
            msg
        })
        msg.length > 0 && ownerApi.post('/sent-message', { msg, to: sender }).then(({ data }) => {
            setMsgSent(prevState => !prevState);
            setMsg('')
           toast.success('msg sented')
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
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                    </a>
                    <div class="chat-about">
                        <h6 class="m-b-0">Aiden Chavez</h6>
                        <small>Last seen: 2 hours ago</small>
                    </div>
                </div>
                
            </div>
        </div>



        <div class="chat-history">
            <ul class="m-b-0">
                 {
                   messages.length > 0 && messages.map((x) => {
                         return (
                            <>
                      {
                                    x.fromSelf ?
                <li class="clearfix" ref={scrollRef} key={uuidv4()}>
                    <div class="message-data text-right">
                        <span class="message-data-time">10:10 AM, Today</span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                    </div>
                    <div class="message other-message float-right">{x.message} </div>
                </li> :
                                         
                <li class="clearfix">
                    <div class="message-data">
                        <span class="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div class="message my-message">{x.message}</div>
                </li> }
                </>
                         ) } ) }
            </ul>
        </div>




        <div class="chat-message clearfix">
            <div class="input-group mb-0">
                <form onSubmit={sendMessage} >
                <input value={msg} onChange={(e) => setMsg(e.target.value)}
                 type="text" class="form-control" placeholder="Enter text here..." />                                    
                <div class="input-group-prepend">
                    <button type="submit" >send</button>
                </div>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
    )
}