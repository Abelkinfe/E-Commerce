import React from 'react'
import './Account.css'
import { Link } from 'react-router-dom';
import payorder from './shopping-cart.png'
import logsec from './login.png'
import location from './location.png'
import profile from './profile.png'
import customer from './customer.png'
import payment from './payment.png'
const Account = () => {
  return (
    <>
      <div className='box-container'>
      <Link to="/">
          <div className='box'>
            
          <div className='image-container'>
        <img src={payorder} alt='Icon' className='icon' />
      </div>
      <div className='content'>
        <h3>Your Order</h3>
        <p>Track,return,cancel,an order,download invoice or buy agian</p>
      </div>
          
          </div>
        </Link>
        
        <Link to="/">
        <div className='box'>
        <div className='image-container'>
        <img src={logsec} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Login&security</h3>
        <p>Edit login,name and email,password</p>
      </div>
       
          </div>
        </Link>
        


        <Link to="/">
        <div className='box'>
        <div className='image-container'>
        <img src={location} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Your Profile</h3>
        <p>edit,remove or set default address</p>
      </div>
       
          </div>
        </Link>
        
        <Link to="/">
        <div className='box'>
        <div className='image-container'>
        <img src={profile} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>profile</h3>
        <p>manage,add or remove user profile for personalized experience</p>
      </div>
       
          </div>
        </Link>
        
        <Link to="/">
        <div className='box'>
        <div className='image-container'>
        <img src={customer} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Customer Service</h3>
        <p>Browse self service option,help articels or contact us</p>
      </div>
       
          </div>
        </Link>
        <Link to="/">
        <div className='box'>
        <div className='image-container'>
        <img src={payment} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Your payments</h3>
        <p>view all transaction,manage payment methods & setting</p>
      </div>
       
          </div>
          </Link>
        </div>
      </>
  )
}

export default Account