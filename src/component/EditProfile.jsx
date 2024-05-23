import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext'
import './Editprofile.css'
const Editprofile = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [userImage, setUserImage] = useState(null);
  const { updateUser} = useAuthContext();
  
  const handleSubmit = async (event)=>{
    event.preventDefault();
    updateUser({ name, email, password, userImage });
    console.log(updateUser);
  }
  
  
  

  return (
    <div>
      <h2>Profile</h2>
     
          <form onSubmit={handleSubmit}>
          <div>
          <label>UserName:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
      
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div >
          <label htmlFor="user_img">User Image:</label>
          <input
            type="file"
            id="user_img"
            value={userImage}
            onChange={(e)=> setUserImage(e.target.value)}
            className="form-control2"
          />
        </div>
        <button className='btn' type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Editprofile;