import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { setCredential } from '../../../slices/authSlice';
import { login } from '../../../api/userApi';
import { loginValidation } from '../../../validations/yupValidation';
import { MyError } from '../../../validations/validationTypes';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

interface LoginFormValues {
     email:string;
     password:string;
}

const Login: React.FC = () => {
     const [forgot,setForgot] = useState(false)

     const dispatch = useDispatch()
     const navigate = useNavigate()
     // const initialValues : LoginFormValues ={
     // email:'',
     // password:''
     // }

     // const onSubmit = async (values:LoginFormValues) =>{
     //       try {
     //           const response :any = await login(values)
     //           console.log('reesssssssss',response);
               
     //           dispatch(setCredential({...response.data}))
     //            navigate('/')  
     //       } catch (error) {
     //           console.log(error);
               
     //       }
     // }
     // const formik = useFormik({
     //      initialValues:initialValues,
     //      onSubmit:onSubmit
     // })
     const {values:loginValues,handleChange:loginHandleChange,handleSubmit:loginHandleSubmit,errors:loginErrors,touched:loginTouched}= useFormik({
          initialValues:{
               email:"",
               password:""
          },
          validationSchema:loginValidation,
          onSubmit: async (values) => {
               try {
                    const response :any = await login(values)
                    dispatch(setCredential({...response.data}))
                          navigate('/')  
               } catch (error) {
                    toast.error((error as MyError)?.data?.message || (error as MyError)?.error)
               }
          }
     })
  return (
    <>
     <div className='flex w-full flex-col-reverse md:flex-row  sm:justify-center sm:items-center'>
        <div className='w-full  md:w-1/2 bg-slate-500 h-screen flex items-center justify-center flex-col'>
            <h3 className='mb-5 text-white'>Log into your Account</h3>
            <p className='mb-5 text-slate-400'>Log into your account so you can build your career</p>
            <form onSubmit={loginHandleSubmit}>
            <div className='flex w-80 flex-wrap relative mt-6 flex-col'>
               
                 <input placeholder="Email"
                 name='email'
                 value={loginValues.email}
                 onChange={loginHandleChange}
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                      <label
                      className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Email
                      </label>
                     
                 </div>
                 {loginErrors.email && loginTouched.email && (
                      <div className="text-white text-sm">{loginErrors.email}</div>
                    )}
                 <div className='flex flex-wrap mt-6 relative flex-col'>
                 <input placeholder="Password"
                 name='password'
                 value={loginValues.password}
                 onChange={loginHandleChange}
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                      
                      <label
                      className=" after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                     Password
                      </label>
                     
                 </div>
                 {loginErrors.password && loginTouched.password && (
                      <div className="text-white text-sm">{loginErrors.password}</div>
                    )}
                 <div className=' flex  mt-6   flex-col  '>
                <button type="submit" 
                 className="text-white hover:text-white border 
                  focus:outline-none
                   rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 w-full
                    dark:hover:text-white
                    ">SIGN IN</button>
                    
                    {/* <p>OR sign Up using</p> */}

                </div>
                <button className='text-white underline  mt-3 ml-7'>Forgot your password?<b> Reset it here.</b></button>
                 </form> 
                 
        </div>
        
        <div className='w-full sm:w-1/2 sm:items-center sm:justify-center h-screen flex items-center justify-center flex-col'>
            <p className='mb-5'>Do you have an Account?</p>
            <p className='mb-5 text-slate-700'>Let's get you all set up so you can start creating your first onboard experience</p>
           
            <Link to={'/signup'}><button className='text-slate-500 border-slate-950 border h-9 w-28 mt-6'>SIGN UP</button></Link> 
        </div>
     </div>
    </>
  )
}

export default Login