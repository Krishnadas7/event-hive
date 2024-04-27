import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Register from './components/user/Register/Register'
import Login from './components/user/Login/Login'
import UserNavbar from './components/user/userNavbar/UserNavbar'
import LandingPage from './components/user/LandingPage/LandingPage'
import HomePage from './pages/userPages/HomePage/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
   <Router>
     <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/signup' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
     </Routes>
   </Router>
    </>
  )
}

export default App
