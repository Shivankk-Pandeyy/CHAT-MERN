import React , {useEffect, useState} from 'react'
import './page.css'
import user12 from './user.png';
import grp from './grp.png';
import single from './single.png';
import add from './homebtn.png';
import search from './search.png';
import logout1 from './logout.png';
import { NavLink, useNavigate ,useParams} from 'react-router-dom';
import user1 from './favicon.png';
import { motion } from 'framer-motion';
import axios from 'axios';
import fl from './friendlist.png';
import del from './delete.png'
import PersonalChat from './PersonalChat';
const Friends = () => {
    const [fr,setFr]=useState([]);
    const [user,setUser]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/Login');
    }
    const handledelete=(id1)=>{
        axios.delete("http://localhost:8000/friendsdel/"+id1)
        .then((res)=>{
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/login")
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
        axios.get("http://localhost:8000/friends/"+id)
        .then((res)=>{
            setFr(res.data)
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
    },[handledelete])
  return (
    <>
    <div className='chat'>
        <motion.div className='sidebar' >
        <div className='header'>
        <NavLink to={`/Welcome/${id}`}><img src={add} alt='HOMEPAGE' title='HomePage'></img></NavLink>
        <NavLink to={`/Update/${id}`}><img src={user12} alt='USER' title='My Info'></img></NavLink>
        <NavLink to={`/Friends/${id}`}><img src={single} alt='SINGLE USER' title='My Chats'></img></NavLink>
        <img src={logout1} alt='ADD' title='LogOut' onClick={()=>logout()}></img>
        </div>
        <div className='search'>
            <img src={search} alt='SEARCH'></img>
            <input type='text' placeholder='Search'></input>
            <button>Search</button>
        </div>
        <div className='chattitle'>
            <h2>Friends List</h2>
        </div>
        
        <div className='conversation'>
        {
                fr.map((val)=>{
                    if(val.user===id){
                        return(
                            <>
                    <div className='conversationbox'>
                    <div className='c1'>
                    <NavLink to={`/Personal/${val.id}`}><img src={user1} alt='PROPIC'></img></NavLink>
                    </div>
                    <div className='c2'>
                        <div className='c22'>
                            <p>NAME: {val.name}</p>
                            <button onClick={(e)=>{handledelete(val._id)}}><img src={del} title='Delete'></img></button>                    
                        </div>
                        <div className='c3'>
                            <p>EMAIL: {val.email}</p>
                        </div>
                    </div>
                </div>
                            </>
                        )
                    }
                    
                })
            }

        </div>
        </motion.div>
        <motion.div className='workarea-home' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <img src={fl} alt='FRIEND LIST'></img>
        </motion.div>
        </div>
    </>
    
  )
  
}
<PersonalChat />
export default Friends