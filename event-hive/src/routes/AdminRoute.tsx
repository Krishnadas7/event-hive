import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomePage from '../pages/adminPages/adminHomePage';
import AdminLoginPage from '../pages/adminPages/adminLoginPage';
import AdminPrivateRoute from './PrivateRoutes/AdminPrivateRoute';
// import AdminPrivateRoute from './PrivateRoutes/AdminPrivateRoute';
const AdminRoute :React.FC= () =>{
  return (
    <>
   
        <Routes>
            {/* <Route path='/admin/dashboard' element={<AdminHomePage/>}></Route> */}
            <Route path='/login' element={<AdminLoginPage/>}></Route>
             <Route path='*' element={<AdminPrivateRoute/>}>
             <Route path='*' element={<AdminHomePage/>} />
             </Route>
        </Routes>

    </>
  )
}

export default AdminRoute