import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css'
import loading from '../assets/loading.gif'
import axios from '../api/axios';

function SetProfile() {
  
  const setProfile_url = '/api/auth/setProfile'

  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate()

  const [avatar, setAvatar] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState(undefined)
  
  const toastOptions= {
    position:"bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
}
  const setProfileAvatar = async => {

  }


   useEffect(() => {
    (async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <main>
      <div className='container'>
      <h1>Pick an avatar</h1>
      </div>
      <div className='avatar'>
        {
          avatar.map((avatar, index) => {
            return (
              <div className={`avatar ${selected === index ? "selected" : ""}`}>

                <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelected(index)}
                  />
              </div>
            )
          })
        }
      </div>
      <button onClick={setAvatar} className="submit-btn">
            Set as Profile Picture
          </button>
    <ToastContainer />
    </main>
  )
}

export default SetProfile