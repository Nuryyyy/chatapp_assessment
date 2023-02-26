import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Profileview from './Profileview';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'




function Topbar() {

  // const useravatar = JSON.parse(localStorage.getItem("chat-user"))

  const [useravatar, setUseAvatar] = useState("")
  const PF = "http://localhost:4000/upload/"
  const navigate = useNavigate()


  useEffect(() => {
  const fetchCurrentUser = async () => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    } else {
      setUseAvatar(
        JSON.parse(localStorage.getItem("chat-user"))
      );
    }
  };
  fetchCurrentUser();
}, []);


  //handle logout
  const handleLogout = async () => {
    localStorage.clear()
    navigate('/login')
}

  return (

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  
  <div className="container-fluid">
 
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <h3>Chat-app</h3>
      </a>
     
    <div className="d-flex align-items-center">
      <div>
        <a>
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> 
        </a>
        
      </div>
     

                      {/* <!-- Button trigger modal --> */}
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

                      {/* <a data-bs-toggle="modal"data-bs-target="#profileview"> */}
        <div onClick={handleLogout} className="pointer">
        <FontAwesomeIcon icon={faRightFromBracket} className='logout'/>
        </div>
          <img
            src={PF + `${useravatar.image}`}
            className="rounded-circle"
            height="25"
            alt="Profile"
            loading="lazy"
            data-bs-toggle="modal" data-bs-target="#profileView"/>
            
        
                      

     
    </div>
    
    {/* modal call */}
    <div className="modal fade" id="profileView" tabIndex="-1" aria-labelledby="profileView" aria-hidden="true">
        <div><Profileview/> </div>
        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>

  </div>
    {/* modal call */}
               
      </nav>
      

  )
}

export default Topbar