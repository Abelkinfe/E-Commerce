import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext'
import './Editprofile.css'
import {  animate, delay, motion } from "framer-motion"
const Editprofile = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [userImage, setUserImage] = useState(null);
  const { updateUser} = useAuthContext();
  const sideani = {
    ini: {
        x:-700
    },
    ani: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness:500
        }
    }
  }
  const anifo= {
    int: {
        x:-1000
      },
      ani: {
        x: 0,
        transition: {
          delay: 1.5,
          type: 'spring',
          stiffness:500
        }
      }
}
  const handleSubmit = async (event)=>{
    event.preventDefault();
    updateUser({ name, email, password, userImage });
    console.log(updateUser);
  }
  
  
  

  return (
    <div className='king'>
       <motion.div variants={sideani} animate='ani' initial='ini'  className="sideedit">
        {/* {user && (
          <div className="user-containeredit">
            <div className="circle-imageedit">
              <img src={`${BASE_URL}storage/${user.user_image}`} alt="" className="user-imageedit" />
            </div>
            <span className="usernameedit">{user.name}</span>
          </div>
        )} */}
      </motion.div>
     
    <div className='editcontainer'>
      <h2 className='htu'>EDIT PROFILE</h2>
      <motion.div variants={anifo} initial='ini' animate='ani'>
          <form className='editform' onSubmit={handleSubmit}>
          <label htmlFor='name' >UserName:</label>
            <input
              id='name'
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
              placeholder="Enter your new name"
              className='editname'
          />
        
          <label htmlFor='email' >Email:</label>
            <input
              id='email'
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
              placeholder="Enter your new email"
              className='editemail'
          />
        
      
        
          <label htmlFor='password' >Password:</label>
            <input
              id='password'
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
              placeholder="Enter your new password"
              className='editpassword'
          />
        
        
          <label htmlFor="user_img">User Image:</label>
          <div className='editimage'> <input
            type="file"
            id="user_img"
            value={userImage}
            onChange={(e)=> setUserImage(e.target.value)}
              className="editfile"
              
          /></div>
         
        
        <button className='btnedit' type="submit">Save Changes</button>
        </form>
        </motion.div>
        </div>
    
    </div>
  );
};

export default Editprofile;