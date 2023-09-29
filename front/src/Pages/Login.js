import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import pic from './login.avif';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [data,setData]=useState({
    email:"",
    password:""
  });
  const [id,setId]=useState([]);
  const handleData=(e)=>{
    const {name,value}=e.target;
    setData({
      ...data,
      [name]:value
    });
  };

  const submitData=(e)=>{
    e.preventDefault();
    if(data.email && data.password){ 
    axios.post("http://localhost:8000/Login",data)
    .then((res)=>{
      id.map((val)=>{
        if(data.email===val.email){
          navigate(`/Welcome/${val._id}`);
        }
      })
      setData({
        email:"",
        password:"",
      });
    })
    .catch((err)=>{
      console.log(err);
      if(err.response.data.message==="WRONG PASSWORD"){
        alert("Invalid Password");
      }
      else if(err.response.data.message==="NOT AN USER"){
         alert("Invalid Email");     
      }
      else{
        alert("Invalid Credentials");
      }
    })
    }
    else{
      alert("All Fields Are Mandatory");
    }
  }
  useEffect(()=>{
    axios.get("http://localhost:8000/login")
    .then((res)=>{
      setId(res.data);
      console.log(id);
    })
    .catch((err)=>{
      console.log({err:err.message});
    })
  },[])
  return (
    <>
      <Header/>
      <div className='signup'>
      <motion.div className='signupimg' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.2}}>
        <img src={pic} alt='SIGNUP HERE '></img>
      </motion.div>
      <motion.form onSubmit={submitData} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1}}>
        <div className='signupbox'>
          <div className='signup1'>
          <label title='Required Feild'>Email</label>
          <input type='text' placeholder='ENTER YOUR EMAIL' name='email' onChange={handleData} autoComplete='off' value={data.email}></input>
          </div>
          <div className='signup1'>
          <label title='Required Feild'>Password</label>
          <input type='password' placeholder='ENTER YOUR PASSWORD' name='password' onChange={handleData} autoComplete='off' value={data.password}></input>
          </div>
          <button type='submit'>Login</button>
          <NavLink to='/Signup'>Signup?</NavLink>
          <p> Indicates Fields Are Mandatory</p>
        </div>
      </motion.form>
      </div>
      <Footer/>
    </>
  )
}

export default Login