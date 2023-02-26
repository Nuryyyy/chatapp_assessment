import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons'



function ChatInput({ currentuser, handleSendMsg }) {
    
    const PF = "http://localhost:4000/upload/"
    
    const [msg, setMsg] = useState("")


    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    //Supposedly where emoji functions
//     const handleEmojiPickerhideShow = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//   };

//   const handleEmojiClick = (event, emojiObject) => {
//     let message = msg;
//     message += emojiObject.emoji;
//     setMsg(message);
//   };


    const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
        
        
  };
  return (
      <div>
          <form onSubmit={(event) => sendChat(event)}>
                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                  <img src={ PF + `${currentuser.image}`}
                  alt="avatar 3" className='rounded-circle avatar2' />
              
              <input
                type="text"
                className="form-control form-control-lg"
                id="inputmsg"
                placeholder="Type message"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
          />
                  {/* EMOOJI should have been here */}
                  {/* <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                  <a className="ms-3 text-muted" href="#!"><FontAwesomeIcon icon={faSmile} /></a> */}
                  <button type='submit' id="inputmsg" className='btn'><FontAwesomeIcon icon={faPaperPlane} /> </button>
                 

 
                  
              </div>
               </form>
    </div>
  )
}

export default ChatInput
