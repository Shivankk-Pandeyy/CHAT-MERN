import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './page.css'
import con from './contactusform.png';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const Contact = () => {
  return (
    <>
      <Header/>
      <motion.div className='contact' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
      <div className='contact-1'>
      <img src={con} alt='CONTACT INFOOO'></img>
      </div>
      <motion.div className='contact-2' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1}}>
        <button><a href="tel:7389288618">Call Us</a></button>
        <button><a href='mailto:pandeyshivank21@gmail.com'>Email Us</a></button>
        <button><NavLink to='/Login'>Use DISSCUZZ</NavLink></button>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14877.562511039763!2d81.32892894999999!3d21.21635315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293d3c8e5399af%3A0xf75bba687e168639!2sSurya%20Treasure%20Island%20Mall%2C%20Bhilai!5e0!3m2!1sen!2sin!4v1695641371547!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='iframe'>Visit Us</iframe>
        

      </motion.div>
      </motion.div>
      <Footer/>
    </>
  )
}

export default Contact