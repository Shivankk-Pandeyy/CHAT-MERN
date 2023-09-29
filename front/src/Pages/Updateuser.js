import React, { useEffect, useState } from 'react'
import './page.css'
import user12 from './user.png';
import grp from './grp.png';
import single from './single.png';
import add from './homebtn.png';
import search from './search.png';
import logout1 from './logout.png';
import { NavLink, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios'
import user1 from './favicon.png';
import { motion } from 'framer-motion';
import userpannel from './userpannel.png';
const Updateuser = () => {
    const [user,setUser]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/Login');
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/login")
        .then((res)=>{
            setUser(res.data);
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
    },[])
  return (
    <>
        <div className='chat'>
        <motion.div className='sidebar'>
        <div className='header'>
        <NavLink to={`/Welcome/${id}`}><img src={add} alt='HOMEPAGE' title='HomePage'></img></NavLink>
        <NavLink to={`/Update/${id}`}><img src={user12} alt='USER' title='My Info'></img></NavLink>
        <NavLink to={`/Friends/${id}`}><img src={single} alt='SINGLE USER' title='My Chats'></img></NavLink>
    
        <img src={logout1} alt='ADD' title='LogOut' onClick={()=>logout()}></img>
        </div>
        <div className='chattitle'>
            <h2>USER INFO</h2>
        </div>
        <div className='conversation-update'>
        <img src={userpannel} alt='USER PANNEL INFO'></img>
        </div>
        </motion.div>
        <motion.div className='workarea-update' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            {
                user.map((val)=>{
                    if(val._id===id){
                        return(
                            <div className='personalinfo'>
                                <img src={user1}></img>
                                <h1 style={{textDecoration:"underline"}}>User Information</h1>
                                <h2 style={{textDecoration:"underline"}}>Name</h2>
                                <h2 style={{color:"#fca311"}}>{val.name}</h2>
                                <h2 style={{textDecoration:"underline"}}>Email</h2>
                                <h2 style={{color:"#fca311"}}>{val.email}</h2>
                                <button ><NavLink to={`/Updating/${val._id}`}>Update Details</NavLink></button>
                            </div>
                        )
                    }
                })
            }
        </motion.div>
        </div>
    </>
  )
}

export default Updateuser