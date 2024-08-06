import React from 'react'
import './Account.css'
import { Link } from 'react-router-dom';
import payorder from './shopping-cart.png'
import location from './location.png'
import profile from './profile.png'
import customer from './customer.png'
import payment from './payment.png'
import stock from './stock.png'
import {  animate, delay, motion } from "framer-motion"
const Account = () => {
  const acccardleft = {
    ini: {
      x:-700
    },
    ani: {
      x: 0,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness:200
      }
    }
  }
  const acccardlefttu = {
    ini: {
      x:-700
    },
    ani: {
      x: 0,
      transition: {
        delay: 1.5,
        type: 'spring',
        stiffness:200
      }
    }
  }
  const acccardtop = {
    ini: {
      y:-700
    },
    ani: {
      y: 0,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness:200
      }
    }
  }
  const acccardright = {
    ini: {
      x:700
    },
    ani: {
      x: 0,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness:200
      }
    }
  }
  const acccardrighttu = {
    ini: {
      x:700
    },
    ani: {
      x: 0,
      transition: {
        delay: 1.5,
        type: 'spring',
        stiffness:200
      }
    }
  }
  const acccardbot = {
    ini: {
      y:700
    },
    ani: {
      y: 0,
      transition: {
        delay: 1.5,
        type: 'spring',
        stiffness:200
      }
    }
  }
  return (
    <>
      <div className='box-container'>
        <motion.div variants={acccardleft} initial='ini' animate='ani'>
      <Link to="/">
          <div className='boxx'>
            
          <div className='image-container'>
        <img src={payorder} alt='Icon' className='icon' />
      </div>
      <div className='content'>
        <h3>Your Order</h3>
        <p>Track,return,cancel,an order,download invoice or buy agian</p>
      </div>
          
          </div>
        </Link>
        </motion.div>

        <motion.div variants={acccardtop} initial='ini' animate='ani'>
        <Link to="/sell">
        <div className='boxx'>
        <div className='image-container'>
        <img src={stock} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>your product</h3>
        <p>sell and manage your product</p>
      </div>
       
          </div>
        </Link>
        </motion.div>

        <motion.div variants={acccardright} initial='ini' animate='ani'>
        <Link to="/address">
        <div className='boxx'>
        <div className='image-container'>
        <img src={location} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Your location</h3>
        <p>set default address</p>
      </div>
       
          </div>
        </Link>
        </motion.div>

        <motion.div variants={acccardlefttu} initial='ini' animate='ani'>
        <Link to="/editprofile">
        <div className='boxx'>
        <div className='image-container'>
        <img src={profile} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>profile</h3>
        <p>manage,add or remove user profile for personalized experience</p>
      </div>
       
          </div>
        </Link>
        </motion.div>
        <motion.div variants={acccardbot} initial='ini' animate='ani'>
        <Link to="/">
        <div className='boxx'>
        <div className='image-container'>
        <img src={customer} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Customer Service</h3>
        <p>Browse self service option,help articels or contact us</p>
      </div>
       
          </div>
          </Link>
          
        </motion.div>
        
        <motion.div variants={acccardrighttu} initial='ini' animate='ani'>
        <Link to="/payment">
        <div className='boxx'>
        <div className='image-container'>
        <img src={payment} alt='Icon' className='icon' />
            </div>
            <div className='content'>
        <h3>Your payments</h3>
        <p>view all transaction,manage payment methods & setting</p>
      </div>
       
          </div>
        </Link>
      </motion.div>
      
        </div>
      </>
  )
}

export default Account