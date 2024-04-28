import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomePage from '../pages/adminPages/adminHomePage';
import AdminLoginPage from '../pages/adminPages/adminLoginPage';
const AdminRoute :React.FC= () =>{
  return (
    <>

        <Routes>
            <Route path='/dashboard' element={<AdminHomePage/>}></Route>
            <Route path='/login' element={<AdminLoginPage/>}></Route>
        </Routes>

    </>
  )
}

export default AdminRoute