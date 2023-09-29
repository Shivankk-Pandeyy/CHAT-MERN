import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import pic from './1.png';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
const LandingPage = () => {
  return (
    <>
      <Header/>
      <div className='landing'>
      <motion.div className='l1' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.3}}>
        <img src={pic} alt='PIC'></img>
      </motion.div>
      <motion.div className='l1' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1}}>
      <h2>Welcome To The Virtual World Of</h2>
      <h2>Connection And Conversation</h2>
      <h2>Where Keystrokes Become Conversations</h2>
      <h2>And Strangers Become Friends</h2>
      <h2>₹0 Joining Fees</h2>
    
      <button><NavLink to='/Login'>Start Chatting Now</NavLink></button>
      </motion.div>
     
      </div>
      <Footer/>
    </>
  )
}

export default LandingPage