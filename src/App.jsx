import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './auth/pages/Home.jsx'
import { Login } from './auth/pages/Login.jsx'
import { Register } from './auth/pages/Register.jsx'
import { ForgotPassword } from './auth/pages/ForgotPassword.jsx';
import { VerifyOtp } from './auth/pages/VerifyOtp.jsx';
import { ResetPassword } from './auth/pages/ResetPassword.jsx';


import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element ={<ForgotPassword/>}/>
        <Route path="/verify-otp" element ={<VerifyOtp/>}/>
        <Route path="/reset-password/:resetToken" element ={<ResetPassword/>}/>

        

        </Routes>
    </Router>
  )
}

export default App
