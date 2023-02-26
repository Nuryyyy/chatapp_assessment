import React, { useEffect, useState, useRef } from 'react'
import ChatInput from './ChatInput'
import axios from '../api/axios'
import Topbar from './Topbar';
// import '../App.css'


function ChatSection({ currentChat, currentuser, socket }) {
    
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef()
    const sendmsg_url = '/api/message/addmsg'
    const receivemsg_url = '/api/message/getmsg'
    const PF = "http://localhost:4000/upload/"

    useEffect(() => {
        
        const getAllMsg = async () => {
            
            if (currentChat) {
                const data = await JSON.parse(localStorage.getItem('chat-user'))
                const response = await axios.post(receivemsg_url, {
                    from: currentuser.userid,
                    to: currentChat.userid
                })
                setMessages(response.data)
            }
            
        }
        getAllMsg()
    }, [currentChat])


    const handleSendMsg = async (msg) => {
        await axios.post(sendmsg_url,
            JSON.stringify({
                from: currentuser.userid,
                to: currentChat.userid,
                message: msg
            })
        )
        socket.current.emit("send-msg", {
            to: currentChat.userid,
            from: currentuser.userid,
            message: msg
        })
        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [messages])

    return (
    
    <div className="chat-section">
        
    <div className="scrollbarh pt-3 pe-3" data-mdb-perfect-scrollbar="true" >
      {messages.map((message) => {
        if (message.fromSelf) {
          return (
            <div className="d-flex flex-row justify-content-end" key={message.msgid} ref={scrollRef}>
              <div>
                <p className="user-message small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{message.message}</p>  
                <p className="small me-3 mb-3 rounded-3 text-muted">{new Date(message.time).toLocaleTimeString()}</p>
              </div>
              <img src={PF + `${currentuser.image}`} alt="avatar 1" className='rounded-circle avatar' />
            </div>
          );
        } else {
          return (
            <div className="d-flex flex-row justify-content-start" key={message._id}>
              <img src={PF + `${currentChat.image}`} alt="avatar 1" className='rounded-circle avatar' />
              <div>
                <p className="messagechat small p-2 ms-3 mb-1 rounded-3">{message.message}</p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{new Date(message.time).toLocaleTimeString()}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
    <div className="input">
      <ChatInput handleSendMsg={handleSendMsg} currentuser={currentuser} />
    </div>
  </div>
);

}

export default ChatSection