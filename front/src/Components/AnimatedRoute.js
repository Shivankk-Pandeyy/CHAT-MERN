import React from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import LandingPage from '../Pages/LandingPage';
import About from '../Pages/About';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Error from '../Pages/Error';
import Contact from '../Pages/Contact';
import Chat from '../Pages/Chat';
import PersonalChat from '../Pages/PersonalChat';
import Updateuser from '../Pages/Updateuser';
import Updating from '../Pages/Updating';
import Friends from '../Pages/Friends';
import Groupchat from '../Pages/Groupchat';
const AnimatedRoute = () => {
    const location=useLocation();
  return(
    <AnimatePresence location={location} key={location.pathname}>
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/About' element={<About/>}></Route>
            <Route path='Contact' element={<Contact/>}></Route>
            <Route path='/Login' element={<Login/>}></Route>
            <Route path='/Signup' element={<Signup/>}></Route>
            <Route path='/Welcome/:id' element={<Chat/>}></Route>
            <Route path='/Personal/:id' element={<PersonalChat/>}></Route>
            <Route path='/Update/:id' element={<Updateuser/>}></Route>
            <Route path='/Updating/:id' element={<Updating/>}></Route>
            <Route path='/Friends/:id' element={<Friends/>}></Route>
            <Route path='/GroupChats/:id' element={<Groupchat/>}></Route>
            <Route path='*' element={<Error/>}></Route>
        </Routes>
    </AnimatePresence>
  )
}
export default AnimatedRoute;