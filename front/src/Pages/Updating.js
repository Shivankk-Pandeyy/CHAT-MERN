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
const Updating = () => {
    const [info,setInfo]=useState({
        name:"",
        email:""
    });
    const [user,setUser]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/Login');
    }
    const handledata=(e)=>{
        const {name,value}=e.target;
        setInfo({
            ...info,
            [name]:value
        });
    };
    const submitData=(e)=>{
        e.preventDefault();
        if(info.name && info.email){ 
            axios.put("http://localhost:8000/UpdateUser/"+id,info)
            .then((res)=>{
                console.log(res);
                if(res.data==="Email exists"){
                    alert("Email Already Exists");
                }
                else{
                    navigate('/Update/'+id);
              setInfo({
                email:"",
                password:"",
              });
                }
            })
            .catch((err)=>{
              console.log(err);
              alert("Email Exists");
            })
            }
            else{
              alert("All Fields Are Mandatory");
            }
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/login")
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
    },[]);
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
            <h2>User Info</h2>
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
                            <h1 style={{textDecoration:"underline"}}>Update Information</h1>
                            <form onSubmit={submitData}>
                            <h2 style={{textDecoration:"underline"}}>Name:[{val.name}]</h2>
                            <input type='text' placeholder='ENTER NAME'  onChange={handledata} name='name' autoComplete='off'></input>
                            <h2 style={{textDecoration:"underline"}}>Email:[{val.email}]</h2>
                            <input type='text' placeholder='ENTER EMAIL' onChange={handledata} name='email' autoComplete='off'></input>
                            <button type='submit'>Update Details</button>
                            </form>
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

export default Updating