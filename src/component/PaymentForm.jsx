import React, { useState,useEffect } from 'react'
import useAuthContext from '../context/AuthContext'
import './paymentform.css'
const PaymentForm = () => {
    const [paymentprovider, setpaymentprovider] = useState('');
    const [account_no, setaccount_no] = useState('');
  const [value, setvalue] = useState('');
  const [receipt_number, setreceipt_number] = useState('');
    const { user, getUser } = useAuthContext();



    useEffect(() => {

        if (!user) {
            getUser();
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

    }
    return (
      <>
    <div className="App">
    <div className="sidebar">
      { user &&(
        <div className="user-container">
                      <div className="circle-image">
                      <img src={user.photo} alt='' className="product-image" />
          </div>
          <span className="username">{user.name}</span>
        </div>)
              }
            <div>
              
          
              </div>
      

</div>
    <div className="main-content">
    
<form   onSubmit={handleSubmit} className="transparent-form">
    <label htmlFor="provider_name">payment provider/bank name</label>
    <input value={paymentprovider} onChange={(e)=>setpaymentprovider(e.target.value)} type="text" id="provider_name" className='nam'  placeholder="upload payment provider/bank name" name="product_name" />

        
        <label htmlFor="price">account no/phone number</label>
        <input value={account_no} onChange={(e)=>setaccount_no(e.target.value)} type="text" id="price" name="price" placeholder="upload account number/phone number:if you are using wallet" />
        
    
    <label htmlFor="product_name">payment type:</label>
    <input value={value} onChange={(e)=>setvalue(e.target.value)} type="text" id="product_name" className='nam'  placeholder="upload payment type" name="product_name" />
   
    {/* <label htmlFor="receipt">receipt number:</label>
    <input value={receipt_number} onChange={(e)=>setreceipt_number(e.target.value)} type="text" id="receipt" className='nam'  placeholder="upload receipt number" name="product_name" /> */}
    <button type="submit">Submit</button>
        </form>
    
      
     
</div>
            </div>
            </>
  )
}

export default PaymentForm