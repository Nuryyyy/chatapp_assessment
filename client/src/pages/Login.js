import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css'
import axios from '../api/axios';

function Login() {

    const register_url = '/api/auth/login'
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
    }, [])
  
  
    const handleValidation = () => {

        if (password === "") {
            toast.error("Username and Password is required", toastOptions)
            return false
        }
        else if (username.length === "") {
            toast.error("Username and Password is required", toastOptions)
            return false
        }
        // else if (email==="") {
        //     toast.error("Email is required", toastOptions)
        //     return false
        // }
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
                        password: password,
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
                    type="password" 
                    id="password" 
                    className="form-control form-control-lg" 
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>


                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">No account yet? <Link to="/register"
                    className="fw-bold text-body"><u>Register here</u></Link></p>

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

export default Login