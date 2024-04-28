import React from 'react'
import {  Routes, Route } from "react-router-dom";
import UserLogin from '../pages/userPages/userLogin';
import UserSignup from '../pages/userPages/userSignup';
import HomePage from '../pages/userPages/HomePage';

const UserRoute: React.FC = () =>{
  return (
    
    <Routes>
     <Route path='/' element={<HomePage/>}></Route>
     <Route path='/signup' element={<UserSignup/>}></Route> 
     <Route path='/login' element={<UserLogin/>}></Route>
    </Routes>
  )
}

export default UserRoute