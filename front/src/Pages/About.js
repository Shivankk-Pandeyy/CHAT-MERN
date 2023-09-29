import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './page.css';
import ab from './about.gif';
import ab1 from './about1.png'
import { motion } from 'framer-motion';
const About = () => {
  return (
    <>
      <Header/>
      <div className='about'>
        <div className='about-1'>
          <motion.div className='about-2' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1}}><h2>SIMPLE,RELAIBLE,PRIVATE MESSAGING</h2>
          <h2>CALLING FOR FREE**</h2>
          <h2>AVAILABLE ALL OVER THE WORLD</h2>
          </motion.div>
          <motion.div className='about-3'  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.5}}>
            <img src={ab1} alt='ABOUT SECTION' style={{height:"45vh"}}></img>
          </motion.div>
        </div>
        <motion.div className='about-1'  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
        <img src={ab} alt='ABOUT US'></img>
        </motion.div>
      </div>
      <Footer/>
    </>
  )
}

export default About