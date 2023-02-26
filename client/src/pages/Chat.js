import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import axios, { BASE_URL } from '../api/axios'
import '../App.css'
import Topbar from '../components/Topbar'
import Contacts from '../components/Contacts'
import Welcome from "../components/Welcome";
import ChatSection from "../components/ChatSection";


function Chat() {

  const getusers_url = 'api/auth/allusers'
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  // const [currentuser, setCurrentuser] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)


  
  const currentuser = JSON.parse(localStorage.getItem("chat-user"))

  
  
// error when using this
// useEffect(() => {
//   const fetchCurrentUser = async () => {
//     if (localStorage.getItem("chat-user")) {
//       setCurrentuser(JSON.parse(localStorage.getItem("chat-user")));
//     } else {
//       navigate('/login');
//     }
//   };
//   fetchCurrentUser();
// }, [currentuser]);


  

  useEffect(() => {
    const getAllUsers = async () => {
      if (currentuser) { // check if currentuser is defined
        if (currentuser.image) {
          const response = await axios.get(`${getusers_url}/${currentuser.userid}`)
          setContacts(response.data)
        } else {
          navigate('/')
        }
      }
    }
    getAllUsers()
  }, []) 
  

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat">
      <header><Topbar /></header>
      <section className=''>
        <div className="container py-5">

          <div className="row">
            <div className="col-md-12">

              <div className="card" id="chat3" >
                <div className="card-body">

                  <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                      <Contacts
                        contacts={contacts}
                        currentuser={currentuser}
                        changeChat={handleChatChange} />
                    </div>
                    <div className="col-md-6 col-lg-7 col-xl-8">
                      {currentChat === undefined ? (
                        <Welcome currentuser={currentuser}/>
                      ) : (
                        
                          <ChatSection currentChat={currentChat} currentuser={currentuser} socket={socket} />
                       
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Chat;
