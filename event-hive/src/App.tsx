import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';
import CompanyRoute from './routes/CompanyRoute';


function App() {

  return (
    <>
    <ToastContainer/>
   <Router>
     <Routes>
      <Route path='/*' element={<UserRoute/>}></Route>
      <Route path='/admin/*' element={<AdminRoute/>}></Route>
      <Route path="/company/*" element={<CompanyRoute />} />
     </Routes>
   </Router>
    </>
  )
}

export default App
