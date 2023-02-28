import React, { useEffect, useState } from 'react'
import '../App.css'

function Contacts({ contacts, changeChat }) {

    
    const PF = "http://localhost:4000/upload/"

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);



        useEffect(() => {
        const getUser = async () => {
            const data = await JSON.parse(
                localStorage.getItem("chat-user"))
            setCurrentUserName(data.username)
            setCurrentUserImage(data.image)
            
        }

        getUser()
    }, [])

    const changeCurrentChat = (index, contact) => {

        setCurrentSelected(index);
        changeChat(contact);
       

    }
    return (
        <>
           
       
                <div>
                


                        <div className="p-3">
                            <h4>Contacts</h4>
                            {/* <div className="input-group rounded mb-3">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <span className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div> */}
                            <div data-mdb-perfect-scrollbar="true" className='scrollbarh' >
                               
                            <ul className="list-unstyled mb-0">
                                {contacts.map((contact, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={`p-2 border-bottom contact
                                            ${
                                                index === currentSelected ? "selected" : ""
                                            }`}
                                            onClick={() => changeCurrentChat(index, contact)} >
                                            <div className="d-flex flex-row">
                                            <div>
                                            <img
                                                src={ PF + `${contact.image}`}
                                                alt="avata" className="rounded-circle d-flex align-self-center me-3" width="60" />
                                            <span className="badge bg-success badge-dot"></span>
                                            </div>
                                            
                                             <div className="pt-1">
                                                <p className="fw-bold mb-0">{contact.username}</p>
                                            {/* <p className="small text-muted">Hello, Are you there?</p> */}
                                                </div>
                                               
                                            </div>
                                            
                                            {/* </a> */}
                                        </li>
                                        
                                        // samples

                                        
                                    )
                                })}

                               
                             </ul>       
                            </div>
                            

                        </div>

                    </div>
                                                

          
            
            
           
       
      
        </>
    )
             
}

export default Contacts