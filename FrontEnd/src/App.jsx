import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './Components/Todo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Pages/Navbar'
import Home from './Components/Pages/Home'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import Authentication from './Components/Authentication'

function App() {
  



  return (
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path="/" element= {<Authentication> <Home /></Authentication> }/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='*' element={<h1 style={{color:"red"}}> Page not found....</h1>}/>


     </Routes>
     </BrowserRouter>
     


    </>
  )
}

export default App
