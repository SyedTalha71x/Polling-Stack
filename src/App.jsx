import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './Components/Homepage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Components/Create'
import Navbar from './Components/Navbar'
import PollState from './Context/PollState'
import Dynamic from './Components/Dynamic'

function App() {
  return (
    <>
      <PollState>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Create' element={<Create />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Dynamic/:id' element={<Dynamic />} />
          </Routes>
        </Router>
      </PollState>
    </>
  )
}

export default App
