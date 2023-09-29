import React , {useEffect, useState} from 'react'
import './page.css'
import logo from './2.png'
import user12 from './user.png';
import grp from './grp.png';
import single from './single.png';
import add from './homebtn.png';
import search from './search.png';
import logout1 from './logout.png';
import { NavLink, useNavigate ,useParams} from 'react-router-dom';
import user1 from './favicon.png';
import { motion } from 'framer-motion';
import adduser from './adduser.png'
import axios from 'axios';
import gc from './groupchat.png'
const Groupchat = () => {
    const [user,setUser]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/Login');
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/login")
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
    },[])
  return (
    <>
    <div className='chat'>
    <motion.div className='sidebar' >
    <div className='header'>
    <NavLink to={`/Welcome/${id}`}><img src={add} alt='HOMEPAGE' title='HomePage'></img></NavLink>
    <NavLink to={`/Update/${id}`}><img src={user12} alt='USER' title='My Info'></img></NavLink>
    <NavLink to={`/Friends/${id}`}><img src={single} alt='SINGLE USER' title='My Chats'></img></NavLink>
    <NavLink to={`/GroupChats/${id}`}><img src={grp} alt='GROUP USER' title='Create Group'></img></NavLink>
    
    <img src={logout1} alt='ADD' title='LogOut' onClick={()=>logout()}></img>
    </div>
    <div className='search'>
        <img src={search} alt='SEARCH'></img>
        <input type='text' placeholder='Search'></input>
        <button>Search</button>
    </div>
    <div className='chattitle'>
        <h2>Groups</h2>
    </div>
    <div className='conversation'>
        {
           
        }
    </div>
    </motion.div>
    <motion.div className='workarea-home' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
        <img src={gc} alt='GROUP CHAT'></img>
    </motion.div>
    </div>
</>
  )
}

export default Groupchat