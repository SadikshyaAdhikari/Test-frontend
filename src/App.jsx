import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {Login} from './auth/pages/Login.jsx'
// import './App.css'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
