import React, { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    
    const [editUser, setedituser] = useState();
    const [sellproduct, setsellproduct] = useState();
    const [getproduct, setgetproduct] = useState();
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    
    const getUser = async () => {
        try {
           
            const token = localStorage.getItem('token');
            console.log('token is:',token)
    
            
            if (!token) {
                console.error("Token not found in localStorage.");
                navigate('/home');
                return;
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            
              const { data } = await axios.get('/api/user', config);
            setUser(data);
          
            console.log(data);
            
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        
       
    }



    const updateUser = async ({ ...data }) => {
        try {
            const token = localStorage.getItem('token');
      
            if (!token) {
                console.error("Token not found in localStorage.");
            
                return;
            }
      
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
      
            const response = await axios.put('/api/edit', data, config);
            setedituser(data);
            navigate('/home');
      
          
            return response;
        } catch (error) {
          
          console.error('Error updating user:', error);
          throw error;
        }
      };

    const login = async ({ ...data }) => {
         
        try {
           
            const response = await axios.post('api/login', data);
            const token = response.data.token; 
            localStorage.setItem('token', token);
            await getUser();
            console.log('Data sent successfully:', response.data);
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    }
    const logout = () => {
       
        localStorage.removeItem('token');
       
        navigate('/home');
    }

    // const userRegister = async ({ ...data }) => {
       
    //     try {
    //         console.log(data);
    //         const response = await axios.post('api/register', data);
    //         const token = response.data.token; 
    //         localStorage.setItem('token', token);
    //         await getUser();
    //         console.log('Data sent successfully:', response.data);
    //         navigate('/home');
    //     } catch (error) {
    //         if (error.response && error.response.status === 422) {
    //             setErrors(error.response.data.errors);
    //         }
    //     }
    // }
   

    
    
    const payform = async ({ ...data }) => {
        try {
            const token = localStorage.getItem('token');
      
            if (!token) {
                console.error("Token not found in localStorage.");
            
                return;
            }
      
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
      
            const response = await axios.post('/api/paymentform', data, config);
            navigate('/payment');
            console.log(response.data);
         
      
          
            return response;
        } catch (error) {
          
            console.error('Error:', error);
            throw error;
        }
    };
   
    
    const Getproduct = async () => {
       
        try {
           
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found in localStorage.");
                navigate('/home');
                return;
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            
            const response = await axios.get('/api/getproduct', config);

            setgetproduct(response.data);
            console.log(response.data);
            return response;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        
       
    };
    

   
    










    return (
        <AuthContext.Provider value={{
            user, errors, getUser,
            login, logout,
            updateUser, 
            payform, Getproduct,getproduct
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    return useContext(AuthContext);
}
