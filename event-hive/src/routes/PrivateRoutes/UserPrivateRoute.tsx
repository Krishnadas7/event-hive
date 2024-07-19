import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Outlet, Navigate } from "react-router-dom";

const UserPrivateRoute: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  // Return Outlet if userInfo exists, otherwise navigate to login
  return userInfo ? <Outlet /> : <Navigate to="/user/login" replace />;
}

export default UserPrivateRoute;
