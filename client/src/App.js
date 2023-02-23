import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import './App.css';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetProfile from './components/SetProfile';
import SetProfileV2 from './components/SetProfileV2'
import RegisterV2 from './pages/RegisterV2'
import ChatV2 from './pages/ChatV2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        {/* <Route path='/registerV2' element={<RegisterV2/>} /> */}
        <Route path='/login' element={<Login/>} />
        <Route path='/setProfile' element={<SetProfile/>} />
        <Route path='/setProfileV2' element={<SetProfileV2/>} />
        <Route path='/' element={<Chat/>} />
        <Route path='/chatv2' element={<ChatV2/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
