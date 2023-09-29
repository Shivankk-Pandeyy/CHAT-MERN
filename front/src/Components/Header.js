import React from 'react'
import { NavLink } from 'react-router-dom'
import './component.css'
import favicon from '../Pages/favicon.png'
const Header = () => {
  return (
    <div className='navbar'>
    <div className='name'>
    <img src={favicon} alt='LOGO'></img>
    <p>UIUX Design Labs</p>
    </div>
    <div className='links'>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/About'>About</NavLink>
    <NavLink to='/Contact'>Contact</NavLink>
    </div>
    <div className='theme'>
    <NavLink to='/Login'>Login</NavLink>
    <NavLink to='/Signup'>Get Started</NavLink>
    </div>
    </div>
  )
}

export default Header