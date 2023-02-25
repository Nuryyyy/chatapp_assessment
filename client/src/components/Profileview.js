import React from 'react'
import { useState, useEffect } from 'react'
import { axiosPublic } from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import '../App.css'

function Profileview() {

  // const upload_url = "/api/auth/"

  //url to fetch photo
  const PF = "http://localhost:4000/upload/"
  
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
 
   //to retrieve current avatar of user
  const currentUser = JSON.parse(localStorage.getItem("chat-user"))

  useEffect(()=> {
    if(localStorage.getItem('chat-user')){
      navigate('/login')
    }
  },[])
  
  const upload = async () => {
    try {
    const formData = new FormData();
    formData.append("image", file);
      const response = await axiosPublic.post('/upload', formData)
    return response.data;

  } catch (err) {
    console.log(err);
  }
  }
  
  //need it to put
  const uploadPhoto = async (e) => {
  e.preventDefault()
  const imgUrl = await upload()
  try {
    const response = await axios.put(`/api/auth/${currentUser.userid}` , 
    JSON.stringify({
      image: imgUrl
    }),) 
      currentUser.image = response.data
      localStorage.setItem(
          "chat-user",
          JSON.stringify(currentUser)
        );
   
    
    // // localStorage.setItem({ "currentUser.image"})
    //   // window.location.reload() 
  } catch (error) {
    console.log(error)
  }

 }

  return (

    
// <!-- Modal -->

  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Profile</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
                  <div className="row container py-3 h-100">
                      <div className="text-center">
                      {/* <img className="rounded-circle shadow-1-strong mb-4"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="avatar" style={{ "width": "150px"}} />              */}
              

                    {file 
                    ?<img src={URL.createObjectURL(file)} 
                      alt="Profile" className="profilepic rounded-circle shadow-1-strong mb-4"/>
                : <img src={PF + `${currentUser.image}`}
                    alt="Profile" className="profilepic rounded-circle shadow-1-strong mb-4"/>}
              
                        
          <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h5 className="mb-3">{currentUser.username}</h5>
          
                </div>
                <label htmlFor="file" className="form-label fw-lighter">Change Profile</label>
                <input
                  className="form-control form-control-sm"
                  id="file"
                  type="file"
                  style={{ display: "none" }} 
                  onChange={(e) => setFile(e.target.files[0])} />
      </div>
    </div>
  </div>
         

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="file btn btn-primary" htmlFor="file" onClick={uploadPhoto}>Save changes</button>
      </div>
    </div>
  </div>

  )
}

export default Profileview