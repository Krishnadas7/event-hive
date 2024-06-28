import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CompanySignupPage from '../pages/companyPages/CompanySignupPage'
import CompanyLoginPage from '../pages/companyPages/CompanyLoginPage'
import CompanyPrivateRoute from './PrivateRoutes/CompanyPrivateRoute'
import CompanyProfilePage from '../pages/companyPages/CompanyProfilePage'
import CompanyHomePage from '../pages/companyPages/CompanyHomePage'
function CompanyRoute() {
  return (
    <>
     <Routes>
      <Route path="/" element={<CompanyLoginPage />} />
      <Route path="signup" element={<CompanySignupPage />} />
        <Route path='*' element={<CompanyPrivateRoute/>}>
                 <Route path='homepage' element={<CompanyHomePage/>}/>
                 <Route path='profile' element={<CompanyProfilePage/>}/>
        </Route> 
    </Routes>
    </>
  )
}

export default CompanyRoute