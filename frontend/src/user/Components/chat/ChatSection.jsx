import { useEffect, useRef, useState } from "react"
import { userApi } from "../../../utils/Apis"
import { useErrorHandler } from '../../ErrorHandlers/ErrorHandler';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'
import './chat.css'
import img from '../../../images/default.png'
import { ToastContainer, toast } from "react-toastify";
export default function ChatSection({ sender, socket }) {
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([])
  const { userAuthenticationHandler } = useErrorHandler()
  const [msgSent, setMsgSent] = useState(false)
  const user = useSelector(state => state.user)
  const [arrivalMsg, setArrivalMsg] = useState(null)
  const scrollRef = useRef()
  const [senderDetails, setSenterDetails] = useState({})
  useEffect(() => {
    if (sender) {
      userApi.post('/get-all-messages', { to: sender }).then(({ data: { messages } }) => {
        setMessages(messages)
      })
    }
  }, [msgSent])
  const sendMessage = (e) => {
    e.preventDefault()
    socket.current.emit("send-msg", {
      to: sender,
      from: user.id,
      msg: msg
    })
    msg.length > 0 && userApi.post('/sent-message', { msg, to: sender }).then(({ data }) => {
      setMsgSent(prevState => !prevState);
      setMsg('')

      const msgs = [...messages]
      msgs.push({ fromSelf: true, message: msg })
      setMessages(msgs)
    }).catch(err => {
      userAuthenticationHandler(err)
    })
  }

  useEffect(() => {
    toast.warning('on recive msg')
    if (socket.current) {

      socket.current.on("msg-recieve", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg })
        toast.success('msg recieved')
      })
    }
   
  }, [])
  useEffect(()=> {
     userApi.get(`/get-owner-details/${sender}`).then(({ data: { data } }) => {
      setSenterDetails(data)
    })
  },[sender])

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
  }, [arrivalMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])
  return (
    <div className=" bg-dark d-flex flex-column p-0  h-100">
      <div className="head-sec bg-dark text-white row align-items-center">
        <div className="col-md-2 p-0 d-flex align-items-center justify-content-center">
          <img className="chat-profile rounded-circle my-1" src={img} alt="" />
        </div>
        <div className="col-md-3 p-0">{senderDetails?.username}</div>
        <div className="col-md-7 d-flex justify-content-end">
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

      </div>
      <div className="body-sec bg-white overflow-auto" style={{ height: '100%' }}>
        {
          messages.length > 0 && messages.map((x) => {
            return (
              < div ref={scrollRef} key={uuidv4()} >
                {
                  x.fromSelf ?
                    <div className="d-flex justify-content-end">
                      <p className={`text-white sent-msg px-2 py-1 `}>{x.message}</p>
                    </div>
                    :
                    <div className="d-flex justify-content-start ">
                      <p className={`text-black recived-msg px-2 py-1`}>{x.message}</p>
                    </div>
                }
              </ div>
            )
          })}
      </div>
      <div className="footer-sec mt-auto">
        <form className="p-1 row m-0 p-0 " onSubmit={sendMessage}>
          <div className="col-md-11 m-0 p-0">
            <input className=" chat-input" value={msg} onChange={(e) => setMsg(e.target.value)} type="text" />
          </div>
          <div className="col-md-1 m-0 p-0">
            <button className=" send-btn btn btn-success" type="submit" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button></div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}