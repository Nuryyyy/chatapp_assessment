import React from 'react'
import Robot from '../assets/robot.gif'

function Welcome({ currentuser }) {
  return (
    <div className='welcome'>
      <div className='message'>
        <h2>Welcome {currentuser.username}!</h2>
        <h3>Choose a chat to start Messaging.</h3>
      </div>
      <div className="d-flex justify-content-center">
        <img src={Robot} alt="robot icon" className="rounded" />
      </div>
    </div>
  )
}

export default Welcome
