import { useEffect, useRef, useState } from "react"
import { ownerApi, userApi } from "../../../utils/Apis"
import { useErrorHandler } from "../../../user/ErrorHandlers/ErrorHandler"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'

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
                console.log(messages);
                setMessages(messages)
            })
        }
    }, [msgSent])
    const sendMessage = (e) => {
        e.preventDefault()
        console.log(msg, sender);
        socket.current.emit("send-msg", {
            to: sender,
            from: owner.id,
            msg
        })
        msg.length > 0 && ownerApi.post('/sent-message', { msg, to: sender }).then(({ data }) => {
            console.log('on then');
            console.log(msg);
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
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                console.log('msg arrival', msg);
                setArrivalMsg({ fromSelf: false, message: msg })
            })
        }
    }, [])
    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])
    return (
        <div className="col-md-9 bg-dark d-flex flex-column min-vh-80">
            <div className="head-sec text-white">
                {sender}
            </div>
            <div className="body-sec overflow-auto" style={{ height: '200px' }}>
                {
                    messages.length > 0 && messages.map((x) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()} >
                                {
                                    x.fromSelf ?
                                        <div className="d-flex justify-content-end">
                                            <p className={`text-white bg-info`}>{x.message}</p>
                                        </div>
                                        :
                                        <div className="bg-success w-25">
                                            <p className={`text-white`}>{x.message}</p>
                                        </div>
                                }

                            </div>
                        )
                    })}
            </div>
            <div className="footer-sec mt-auto">
                <form onSubmit={sendMessage}>
                    <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" />
                    <button type="submit" >send</button>
                </form>
            </div>
        </div>
    )
}