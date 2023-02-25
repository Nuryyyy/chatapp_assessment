import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import '../App.css'
import Topbar from '../components/Topbar'
import Contacts from '../components/Contacts'
import Welcome from "../components/Welcome";
import ChatSection from "../components/ChatSection";

function Chat() {

  const getusers_url = 'api/auth/allusers'
  const navigate = useNavigate()

  const [contacts, setContacts] = useState([])
  const [currentuser, setCurrentuser] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  
  //  const currentuser = JSON.parse(localStorage.getItem("chat-user"))  
  
  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const response = await JSON.parse(localStorage.getItem('chat-user'));
  //     setCurrentuser(response);
     
  //   };

  //   getCurrentUser();
  // }, []);



useEffect(() => {
  const fetchUser = async () => {
    try {
      const user = await JSON.parse(
        localStorage.getItem('chat-user')
      );
      setCurrentuser(user);
    } catch (error) {
      navigate("/login");
    }
  };
  fetchUser();
}, [navigate, setCurrentuser]);
  // }
  useEffect(() => {
    const getAllUsers = async () => {

      if (currentuser) {
        if (currentuser.image) {
          const response = await axios.get(`${getusers_url}/${currentuser.userid}`)
          setContacts(response.data)
        }
        else {
          navigate('/')
        }
    }
    }
    getAllUsers()
  }, [currentuser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  console.log("current", currentChat)
  return (
    <>
      <header><Topbar /></header>
  <section className='background-color'>
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
                          <ChatSection currentChat={currentChat}  currentuser={currentuser}/>
                      )}
                      </div>
                   
                  
                    
     
            </div>
                  
                  

          </div>
        </div>

      </div>
    </div>

        </div>
       
      </section>

      </>
  )
}

export default Chat