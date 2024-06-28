import React from 'react'
import {  Routes, Route } from "react-router-dom";
import UserLogin from '../pages/userPages/userLogin';
import UserSignup from '../pages/userPages/userSignup';
import HomePage from '../pages/userPages/HomePage';
import NewPassword from '../components/common/NewPassword';
import UserPrivateRoute from './PrivateRoutes/UserPrivateRoute';
import UserProfilePage from '../pages/userPages/UserProfile';
import EventListing from '../pages/userPages/EventListing';
import SelectedEventPage from '../pages/userPages/SelectedEventPage';
import PaymentSuccess from '../pages/userPages/PaymentSuccess';

const UserRoute: React.FC = () =>{
  return (
    
    <Routes>
     <Route path='/' element={<HomePage/>}></Route>
     <Route path='/user/signup' element={<UserSignup/>}></Route> 
     <Route path='/user/login' element={<UserLogin/>}></Route>
     <Route path='/user/new-password' element={<NewPassword/>}></Route>
   
    <Route path='/*'  element={<UserPrivateRoute/>}>
       <Route path='user/profile' element={<UserProfilePage/>}></Route>
       <Route path='user/events' element={<EventListing/>}></Route>
       <Route path='user/success-page' element={<PaymentSuccess/>}></Route>
       <Route path='user/checkout-failed' element={<EventListing/>}></Route>
       <Route path='user/selected-event/:eventId' element={<SelectedEventPage/>}></Route>
    </Route>

   
    </Routes>

  )
}

export default UserRoute