import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import './App.css';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetProfile from './components/SetProfile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        {/* <Route path='/registerV2' element={<RegisterV2/>} /> */}
        <Route path='/login' element={<Login/>} />
        <Route path='/setProfile' element={<SetProfile/>} />
        <Route path='/' element={<Chat/>} />
      
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
