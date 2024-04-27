import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { signUp } from '../../../api/userApi'
import { setCredential } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  mobile: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues: FormValues = {
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    confirm_password:'',
    mobile:''
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const response :any= await signUp(values)
      dispatch(setCredential(response.data.user))
      navigate('/login')
    } catch (error) {
      // Handle error
      console.error(error)
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className='lg:flex md:flex  sm:flex-row' >
        <div className='flex md:w-1/2 sm:w-full flex-col h-screen justify-center  items-center '>
          <h4 className='text-slate-700 text-xl mt-6'>Already signed up?</h4>
          <p className='text-gray-500 mt-6'>Log into your Account so you can explore</p>
          <Link to={'/login'}><button className='text-slate-500 border-slate-950 border h-9 w-28 mt-6'>LOG IN</button></Link>
        </div>
        <div className='flex flex-col  flex-auto h-screen md:w-1/2 bg-slate-700 items-center justify-center '>
          <p className='text-white'>SignUp for an Account</p>
            <form className='mt-3 ' onSubmit={formik.handleSubmit}>
                <div className='flex sm:flex-row  flex-wrap'>
                 <div className='flex flex-col mt-6  relative'>
                 <input 
                   name="first_name"
                   value={formik.values.first_name}
                   onChange={formik.handleChange}
                   placeholder="firstName"
                   className="peer h-full  border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                   <label
                     className="after:content[''] pointer-events-none absolute left-0 w-full -top-1.5 flex h-full  select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                       firstName
                   </label>
                 </div>
                 <div className='flex flex-col relative mt-6 ml-5  sm:ml-5'>
                   <input 
                     name="last_name"
                     value={formik.values.last_name}
                     onChange={formik.handleChange}
                     placeholder="lastName"
                     className="peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                   <label
                     className="after:content[''] pointer-events-none absolute left-0 w-full -top-1.5 flex h-full  select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                       lastName
                   </label>
                 </div>
                </div> 
                <div className='flex flex-wrap relative mt-6 flex-col'>
                  <input 
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Email"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                <div className='flex flex-wrap mt-6 relative flex-col'>
                  <input 
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    placeholder="Mobile"
                    type='number'
                    className=" peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Mobile
                  </label>
                </div>
                <div className='flex flex-wrap mt-6 relative flex-col'>
                  <input 
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    type="password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className=" after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
                <div className='flex mt-6 flex-wrap relative flex-col'>
                  <input 
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    placeholder="Confirm password"
                    type="password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Confirm password
                  </label>
                </div>
                <div className=' flex items-center mt-6 justify-center  flex-row  '>
                  <button 
                    type="submit"
                    className="text-white hover:text-white border 
                    focus:outline-none
                    rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 w-full
                    dark:hover:text-white
                    ">
                    SIGN UP
                  </button>
                </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default Register
