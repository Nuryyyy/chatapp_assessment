import React from 'react'
import Robot from '../assets/robot.gif'

function Welcome({currentuser, userItems}) {
  return (
      <div className='welcome'> 

              <div className="d-flex flex-row justify-content-start">
          
          <h2>
              Welcome {currentuser.username}!
          </h2>
                  <h3>Choose a chat to start Messaging.</h3>
          </div>
      <img src={Robot} alt="robot" className="rounded mx-auto d-block" />
      
      
        </div>   

      
  )
}

export default Welcome