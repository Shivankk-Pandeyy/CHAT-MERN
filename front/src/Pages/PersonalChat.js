import React , {useEffect, useState} from 'react';
import './page.css';
import chatpage from './chatpage.png';
import user12 from './user.png';
import single from './single.png';
import add from './homebtn.png';
import search from './search.png';
import logout1 from './logout.png';
import { NavLink, useNavigate ,useParams} from 'react-router-dom';
import del from './delete.png'
import { motion } from 'framer-motion';
import axios from 'axios';
import socketIO from 'socket.io-client';
const ENDPOINT='http://localhost:8000/';
const socket=socketIO(ENDPOINT,{transports:["websocket"]});
const PersonalChat = () => {
    const {id}=useParams();//reciver
    const identity=window.sessionStorage.id;//sender
    const [unidata,setUNIdata]=useState({
        name:"",
        email:"",
    });    
    const [sender,setSender]=useState("");//GETTIING SENDER NAME
    const [reciever,setReciever]=useState("");//GETTING RECIEVER NAME
    const [name,setName]=useState(""); 
    const [msg,setMsg]=useState("");
    const [data,setData]=useState({
        sender:identity,
        reciever:id,
        message:msg,
    });
    const [msgs,setMsgs]=useState([]);//MESSAGES GETTER USING API
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/Login');
    };
    const getdata=async()=>{
        await setData({
            sender:identity,
            reciever:id,
            message:msg,
        })
            if(data.reciever==="" || data.sender==="" || data.message===""){
                alert("Sure To Send?");
            }
            else{
                const res=await axios.post("http://localhost:8000/messages",data);
                console.log(data)
                setMsg('')
            }
    };
    const submitmsg=(e)=>{
        e.preventDefault()
        getdata() 
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/login")
        .then((res)=>{
            res.data.map((val)=>{
                if(val._id===id){
                    setName(val.name)
                    setReciever(val.name)
                }
                else if(val._id===identity){
                    setSender(val.name);
                }
            })
        })
        .catch((err)=>{
          console.log({err:err.message});
        })
        //SOCKETS START 
        socket.on('connect',()=>{
            alert("Welcome!")     
        })
        if(unidata.name && unidata.email){
            socket.emit('joined',unidata);
        }
        socket.on('welcome',(data)=>{
            
        })
        socket.on('userJoined',(data)=>{
            
        })
        //GETTING MESSAGES
        axios.get("http://localhost:8000/messages")
        .then((res)=>{
            setMsgs(res.data)
        })
        .catch((err)=>console.log(err))
    },[submitmsg])   
  return (
    <>
    <div className='chat'>
    <motion.div className='sidebar'>
    <div className='header'>
    <NavLink to={`/Welcome/${identity}`}><img src={add} alt='HOMEPAGE' title='HomePage'></img></NavLink>
        <NavLink to={`/Update/${identity}`}><img src={user12} alt='USER' title='My Info'></img></NavLink>
        <NavLink to={`/Friends/${identity}`}><img src={single} alt='SINGLE USER' title='My Chats'></img></NavLink>
        <img src={logout1} alt='ADD' title='LogOut' onClick={()=>logout()}></img>
    </div>
    <div className='search'>
        <img src={search} alt='SEARCH'></img>
        <input type='text' placeholder='Search'></input>
        <button>Search</button>
    </div>
    <div className='chattitle'>
            <h2>Your Feeds</h2>
        </div>
        <div className='conversation-update'>
        <img src={chatpage} alt='USER CHATS PANNEL'></img>
        </div>
    </motion.div>
    <motion.div className='workarea-chat' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <div className='chat-header'>
            <h2>Secure,Relaible,Private</h2>
            <h2>{reciever}</h2>
            </div>
            <div className='messages-class'>
                <div className='messages-class-1'>
                {
                        msgs.map((val)=>{
                           
                            if(val.sender===identity){
                                return(
                                    <>
                                    <div className='messages-class-12'>
                                        <p>SENT BY:{sender}</p>
                                        <p>MSG:{val.message} </p>
                                    </div>
                                    </>
                                )
                            }
                            else if(val.reciever===identity){
                                return(
                                    <>
                                    <div className='messages-class-11'>
                                        <p>USERNAME:{reciever}</p>
                                        <p>MSG:{val.message} </p>
                                    </div>
                                    </>
                                )
                            }
                           }
                        )
                    } 
                </div> 
            </div>
            <form onSubmit={submitmsg}>
                <input type='text' placeholder='Message....' onChange={(e)=>{
                    setMsg(e.target.value);
                }} value={msg}></input>
                <button type='submit'>Send</button>
            </form>
    </motion.div>
    </div>
</>
  )
}
export default PersonalChat;