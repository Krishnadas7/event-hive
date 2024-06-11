import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Navigate, Outlet } from 'react-router-dom'

function CompanyPrivateRoute() {
  const {companyInfo} = useSelector((state:RootState)=>state.auth)

  return companyInfo?<Outlet/> : <Navigate to='/company' replace/>
}

export default CompanyPrivateRoute