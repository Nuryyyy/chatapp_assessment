import React from 'react'
import { NavLink } from 'react-router-dom'
import Profileview from './Profileview';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'



function Topbar() {

  const useravatar = JSON.parse(localStorage.getItem("chat-user"))
  const PF = "http://localhost:4000/upload/"
 
  return (

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  
  <div className="container-fluid">
    {/* <!-- Toggle button --> */}
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ><i className="fas fa-bars"></i>
                  <p>Chat-app</p>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
          height="15"
          alt="MDB Logo"
          loading="lazy"
        />

      </a>
     
    </div>
    {/* <!-- Collapsible wrapper --> */}

    
    <div className="d-flex align-items-center">
      {/* <!-- Icon --> */}
      <a className="text-reset me-3" href="#">
        <i className="fas fa-shopping-cart"></i>
      </a>

      {/* <!-- Notifications --> */}
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
        <FontAwesomeIcon icon={faRightFromBracket} className='logout'/>
  
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