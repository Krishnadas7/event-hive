import React from 'react'
import { UseDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";


function Login() {

     
  return (
    <>
     <div className='flex '>
        <div className='w-1/2 bg-slate-500 h-screen flex items-center justify-center flex-col'>
            <h3 className='mb-5 text-white'>Log into your Account</h3>
            <p className='mb-5 text-slate-400'>Log into your account so you can build your career</p>
            <form action="">
            <div className='flex w-80 flex-wrap relative mt-6 flex-col'>
               
                 <input placeholder="Email"
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                      <label
                      className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Email
                      </label>
                     
                 </div>
                 <div className='flex flex-wrap mt-6 relative flex-col'>
                 <input placeholder="Password"
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                      <label
                      className=" after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                     Password
                      </label>
                 </div>
                 <div className=' flex items-center mt-6 justify-center  flex-row  '>
                <button type="button" 
                 className="text-white hover:text-white border 
                  focus:outline-none
                   rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 w-full
                    dark:hover:text-white
                    ">SIGN IN</button>
                    {/* <p>OR sign Up using</p> */}

                </div>
                 </form> 
        </div>
        <div className='w-1/2 h-screen flex items-center justify-center flex-col'>
            <p className='mb-5'>Do you have an Account?</p>
            <p className='mb-5 text-slate-700'>Let's get you all set up so you can start creating your first onboard experience</p>
           
            <Link to={'/signup'}><button className='text-slate-500 border-slate-950 border h-9 w-28 mt-6'>SIGN UP</button></Link> 
        </div>
     </div>
    </>
  )
}

export default Login