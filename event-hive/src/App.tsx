import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';


function App() {

  return (
    <>
    <ToastContainer/>
   <Router>
     <Routes>
      <Route path='/*' element={<UserRoute/>}></Route>
      <Route path='/admin/*' element={<AdminRoute/>}></Route>
     </Routes>
   </Router>
    </>
  )
}

export default App
