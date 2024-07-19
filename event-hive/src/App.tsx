import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';
import CompanyRoute from './routes/CompanyRoute';
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
    <ToastContainer/>
    <Toaster/>
   <Router>
  {/* <PeerProvider> */}
     <Routes>
      <Route path='/*' element={<UserRoute/>}></Route>
      <Route path='/admin/*' element={<AdminRoute/>}></Route>
      <Route path="/company/*" element={<CompanyRoute />} />
     </Routes>
   {/* </PeerProvider> */}
   </Router>
    </>
  )
}

export default App
