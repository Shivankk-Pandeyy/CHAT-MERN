import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './page.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import pic from './signup.jpg';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  });
  const handleData=(e)=>{
    const {name,value}=e.target;
    setData({
      ...data,
      [name]:value
    });
  };
  const submitData=(e)=>{
    e.preventDefault();
    if(data.name && data.email && data.password){
    axios.post("http://localhost:8000/Register",data)
    .then((res)=>{
      alert("User Created");
      navigate("/Login")
      setData({
        name:"",
        email:"",
        password:"",
      });
    })
    .catch((err)=>{
      console.log(err.response.data);
      if(err.response.data==="ALREADY"){
        alert("Email Already Exists");
      }
    })
    }
    else{
      alert("All Fields Are Mandatory");
    }
  }
  return (
    <>
      <Header/>
      <div className='signup'>
      <motion.div className='signupimg' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.3}}>
        <img src={pic} alt='SIGNUP HERE '></img>
      </motion.div>
      <motion.form onSubmit={submitData} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1}}>
        <div className='signupbox'>
          <div className='signup1'>
          <label>Name</label>
          <input type='text' placeholder='ENTER YOUR NAME' name='name' onChange={handleData} autoComplete='off' value={data.name}></input>
          </div>
          <div className='signup1'>
          <label>Email</label>
          <input type='text' placeholder='ENTER YOUR EMAIL' name='email' onChange={handleData} autoComplete='off' value={data.email}></input>
          </div>
          <div className='signup1'>
          <label>Password</label>
          <input type='text' placeholder='ENTER YOUR PASSWORD' name='password' onChange={handleData} autoComplete='off' value={data.password}></input>
          </div>
          <button type='submit'>Signup</button>
          <NavLink to='/Login'>Already An User?</NavLink>
          <p> Indicates Fields Are Mandatory</p>
        </div>
      </motion.form>
      </div>
      <Footer/>
    </>
  )
}

export default Signup