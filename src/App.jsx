import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NAVV from './component/NAVV'
import NAVV2 from './component/NAVV2'
import Account from './component/Account'
import './App.css'
import LoginForm from './component/Form'
import Register from './component/Register'
import Layouts from './component/layout'
import { Routes, Route } from 'react-router-dom';
import Products from './component/Products'
function App() {


  return (
    <>
      <div>
        <NAVV/>
      </div>
      <div>
        <NAVV2/>
      </div>
      <Routes>
        <Route path="/" element={<Layouts />} />
        <Route path="/home" element={ <Layouts />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register/>} />
       </Routes>
     
   
    </>
  )
}

export default App
