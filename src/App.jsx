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
import Editprofile from './component/EditProfile'
import Products from './component/Products'
import SellProduct from './component/SellProduct'
import Payment from './component/payment'
import PaymentForm from './component/PaymentForm'
import Footer from './component/Footer'
import Advert from './component/Adverts'
import Detail from './component/Detail'
function App() {


  return (
    <>
      <div className='route' >
      <div>
          <NAVV />
      </div>
        <div>
        <NAVV2 />
        </div>
        
      <Routes>
        <Route path="/" element={<Layouts />} />
          <Route path="/home" element={<Layouts />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentform" element={<PaymentForm />} />
        <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/advert" element={<Advert />} />
      </Routes>
      <div>
        <Footer></Footer>
      </div>
      
       
      </div>
    </>
  )
}

export default App
