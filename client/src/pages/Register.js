import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css'
import axios from '../api/axios';

function Register() {

    const register_url = '/api/auth/register'
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const toastOptions= {
        position:"bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
    }

    useEffect(()=> {
      if(localStorage.getItem('chat-user')){
        navigate('/')
      }
    },[])

    const handleValidation = () => {

        if(password !== confirmPassword) {
            toast.error("Password did not match", toastOptions
            )
            return false;

        }
        else if (password.length<7) {
            toast.error("Password should have at least 8 characters", toastOptions)
            return false
        }
        else if (username.length<4) {
            toast.error("Username should be greater than 5 characters", toastOptions)
            return false
        }
        else if (email==="") {
            toast.error("Email is required", toastOptions)
            return false
        }
        else {
            return true 
        }
        
        
        
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
       
        if (handleValidation()) {
            
            try {
                const response = await axios.post(register_url, 
                    JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        // confirmPassword: confirmPassword
                    }

                    ))
                    
                    if (response.status === 200) {
                      localStorage.setItem('chat-user', JSON.stringify(response.data))
                      navigate('/')
                    }
                    if (response.status === 401) {
                      toast.error(response.msg, toastOptions)
                    }
            } catch (error) {
                console.log(error)
            }

            
          

            
        }
        

    }
    
  return (
    <section className="backgroundImage vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card unknown">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit} className='register'>

                <div className="form-outline mb-4">
                  <input 
                    type="text" 
                    id="username" 
                    name="username"
                    className="form-control form-control-lg"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required />
                  <label className="form-label" htmlFor="username">Username</label>
                </div>

                <div className="form-outline mb-4">
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control form-control-lg" 
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                  <label className="form-label" htmlFor="email">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control form-control-lg" 
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    className="form-control form-control-lg" 
                    value={confirmPassword}
                    onChange={(e)=>setconfirmPassword(e.target.value)}
                    />
                  <label className="form-label" htmlFor="confirmPassword">Repeat your password</label>
                </div>

                {/* <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div> */}

                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                    className="fw-bold text-body"><u>Login here</u></Link></p>

              </form>
              <ToastContainer />

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Register