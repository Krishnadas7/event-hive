import React from 'react';
import { Routes, Route } from "react-router-dom";
import UserLogin from '../pages/userPages/userLogin';
import UserSignup from '../pages/userPages/userSignup';
import HomePage from '../pages/userPages/HomePage';
import NewPassword from '../components/common/NewPassword';
import UserPrivateRoute from './PrivateRoutes/UserPrivateRoute';
import UserProfilePage from '../pages/userPages/UserProfile';
import EventListing from '../pages/userPages/EventListing';
import SelectedEventPage from '../pages/userPages/SelectedEventPage';
import PaymentSuccess from '../pages/userPages/PaymentSuccess';
// import RoomPage from '../pages/userPages/RoomPage';
import NotFoundPage from '../pages/userPages/NotFoundPage';
import AboutPage from '../pages/userPages/AboutPage';

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/new-password" element={<NewPassword />} />
      
      <Route element={<UserPrivateRoute />}>
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/user/events" element={<EventListing />} />
        <Route path="/user/success-page" element={<PaymentSuccess />} />
        <Route path="/user/selected-event/:eventId" element={<SelectedEventPage />} />
        {/* <Route path="/user/room/:roomId" element={<RoomPage />} /> */}
        <Route path="/user/about" element={<AboutPage />} />
        <Route path="/user/checkout-failed" element={<h1>faileddd</h1>} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoute;
