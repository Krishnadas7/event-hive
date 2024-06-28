import React, { useEffect } from 'react'
import { useState } from 'react';
import { companyLogin } from '../../../validations/yupValidation';
import {useFormik} from 'formik'
import {cLogin} from '../../../api/companyApi'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setCompany } from '../../../slices/authSlice';
import { UseSelector,useDispatch } from 'react-redux';
 import image from '../../../assets/company_login_page.png'
 import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

function CompanyLogin() {
  const {companyInfo} = useSelector((state:RootState)=>state.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(companyInfo){
      navigate('/company/homepage')
    }
   },[])
   const dispatch = useDispatch()
  const {values:loginValues,
    handleChange:loginHandleChange,
    handleSubmit:loginHandleSubmit,
    errors:loginErrors,
    touched:loginTouched
}= useFormik({
  initialValues:{
    company_email:'',
    password:''
  },
  validationSchema:companyLogin,
  onSubmit: async (values) =>{
    console.log('values form company login',values)
    try {
      const res = await cLogin(values)
      console.log('res from company login',res)
      if(res?.data.success){
        localStorage.setItem("companyAccessToken",res.data.companyAccessToken)  
        localStorage.setItem("companyRefreshToken",res.data.companyRefreshToken)  
        toast.success(res?.data.message)
        dispatch(setCompany({...res.data.data}))
        navigate('/company/homepage')
      }else{
        toast.error('something went wrong in you details')
      }
    } catch (error) {
      console.log(error);
      
    }
   
  }
})
  return (
    <>
    <div className='md:w-full max-md:flex-col h-screen flex '>
       <div className='bg-white md:w-1/2 sm:w-full  flex  '>
          <img src={image} alt="" className=''/>
       </div>
       <div className=' gap-6 flex items-center justify-center flex-col md:w-1/2 sm:w-full '>
         <h1 className='text-3xl font-semibold'>Welcome back :)</h1>
         {/* <div className=''>
         <p className='w-[450px] text-slate-500 font-semibold'>To keep connected with us please login with your personal information by email address and password</p>
         </div> */}
         <div className='p-10'>
        <form action="" className='w-[350px] ' onSubmit={loginHandleSubmit}>
          <label className='text-gray-500 font-semibold ' htmlFor="">Email</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg>
          <input type="text" value={loginValues.company_email}  name='company_email'
           onChange={loginHandleChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {loginErrors.company_email && loginTouched.company_email && (
                <div className="text-red-500 text-sm pb-2">{loginErrors.company_email}</div>
              )}
          <label className='text-gray-500 font-semibold ' htmlFor="">Password</label>
          <div className='flex bg-gray-200 w-full mt-2 rounded-md' >
          <svg className="w-4 h-4 mr-1 ml-3 mt-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3.5c-4.1 0-7.4 3.1-8.6 6.7.3.9.8 1.7 1.4 2.5.7.8 1.5 1.5 2.4 2.1 1.8 1 3.9 1.4 5.9 1.4s4.1-.4 5.9-1.4c.9-.6 1.7-1.3 2.4-2.1.6-.8 1.1-1.6 1.4-2.5-1.2-3.6-4.5-6.7-8.6-6.7zm0 11c-2.6 0-5.2-1-7.2-3 1-1 2.1-1.7 3.3-2.1 1.4-.4 2.8-.5 4.1-.1 1.4.4 2.6 1.2 3.6 2.1-.6.5-1.3.9-2.1 1.1-1.6.6-3.2.5-4.7-.3zM10 6c-2.3 0-4.1 1.8-4.1 4.1 0 1.1.4 2.2 1.1 3 .6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1 .7-.8 1.1-1.9 1.1-3 0-2.3-1.8-4.1-4.1-4.1zm0 6.2c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1s2.1.9 2.1 2.1c0 1.1-.9 2.1-2.1 2.1z"/>
        </svg>
          <input type="password" id="input-group-1" value={loginValues.password} 
           onChange={loginHandleChange}
           name='password'
           className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your password"/>
          </div>
          {loginErrors.password && loginTouched.password && (
                <div className="text-red-500 text-sm pb-2 mt-3">{loginErrors.password}</div>
              )}
          {/* <button className='mt-2  font-normal text-gray-500'>forgot password?</button> */}
          <div className='flex mt-9 justify-between mb-9'>
            <button type='submit' className='pl-4 w-full pr-4 h-10 hover:bg-gray-100 bg-blue-500 hover:text-gray-500 text-gray-50 rounded-full'>Login Now</button>
           
          </div>
        </form>
        <Link to='/company/signup'>
        <button className='pl-4 pr-4 h-10 w-full bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-gray-500'>Create Account</button>
        </Link>
      
       </div>
       </div>
     
    </div>
    </>
  )
}

export default CompanyLogin