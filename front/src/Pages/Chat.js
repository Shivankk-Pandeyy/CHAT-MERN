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
import adduser from './adduser.png';
import axios from 'axios';
import socketIO from 'socket.io-client';
const ENDPOINT='http://localhost:8000/';
const Chat = () => {
    const {id}=useParams();
    const identity=window.sessionStorage.setItem("id",id);
    console.log(window.sessionStorage)
    const [unidata,setUNIdata]=useState({
        name:"",
        email:"",
    });
    const [fr,setFr]=useState({
        name:"",
        email:"",
        id:"",
        user:"",
    });
    const [user,setUser]=useState([]);
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/Login');
    }
    useEffect(()=>{
        const socket=socketIO(ENDPOINT,{transports:["websocket"]})
        axios.get("http://localhost:8000/login/"+id)
        .then((res)=>{
            console.log(res.data.name,res.data.email);
            setUNIdata({
                ...unidata,
                name:res.data.name,
                email:res.data.email,
            });
            console.log(unidata);
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
        axios.get("http://localhost:8000/login")
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
        //SOCKETS START 
        socket.on('connect',()=>{
            console.log("New Connection");     
        })
        if(unidata.name && unidata.email){
            socket.emit('joined',unidata);
        }
        socket.on('welcome',(data,unidata)=>{
            console.log(data.user,data.message);
        })
        socket.on('joined',(data)=>{
            console.log(data.user,data.message);
        })
        socket.on('leave',(data)=>{
            console.log(data.user,data.message);
        });
        return()=>{
            socket.emit('disconnected')
            socket.off();
        }
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
        <div className='search'>
            <img src={search} alt='SEARCH'></img>
            <input type='text' placeholder='Search'></input>
            <button>Search</button>
        </div>
        <div className='chattitle'>
            <h2>All Users</h2>
        </div>
        <div className='conversation'>
            {
                user.map((val)=>{
                    if(val._id===id){
                        return;
                    }
                    return(
                        <>
                <div className='conversationbox'>
                <div className='c1'>
                <img src={user1} alt='PROPIC'></img>
                </div>
                <div className='c2'>
                    <div className='c22'>
                        <p>NAME: {val.name}</p>
                        <button><img src={adduser} title='Add Friend' onClick={()=>{
                            const name1=[val.name][0];
                            const email=[val.email][0];
                            const idfr=[val._id][0];
                            console.log(name1,email,idfr);
                            setFr({
                                name:name1,
                                email:email,
                                id:idfr,
                                user:id,
                            });
                            console.log(fr);
                            if(fr.name===name1 && fr.email===email && fr.id===idfr && fr.user===id){
                                axios.post("http://localhost:8000/friends/"+id,fr)
                                .then((res)=>{
                                    alert("Friend Added")
                                })
                                .catch((err)=>{
                                    console.log(err);
                                    if(err.response.data==="ALREADY"){
                                        alert("ALREADY A FRIEND");
                                    }
                                })
                            }
                            else{
                                alert("Sure To Add??")
                            }
                        }}></img></button>                    
                    </div>
                    <div className='c3'>
                        <p>EMAIL: {val.email}</p>
                    </div>
                </div>
            </div>
                        </>
                    )
                })
            }
        </div>
        </motion.div>
        <motion.div className='workarea-home' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <img src={logo} alt='ABOUT DISSCUZZ'></img>
        </motion.div>
        </div>
    </>
  )
}

export default Chat;