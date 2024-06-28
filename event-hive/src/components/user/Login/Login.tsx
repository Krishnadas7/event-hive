import {ThreeDots} from 'react-loader-spinner'
import { motion } from 'framer-motion';
import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { setCredential } from '../../../slices/authSlice';
import { login } from '../../../api/userApi';
import { forgotValidation, loginValidation } from '../../../validations/yupValidation';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { googleAuth } from '../../../api/userApi';
import { CustomModal } from '../../common/Modal';
import { forgotPassword } from '../../../api/userApi';
import { useSelector,useDispatch } from 'react-redux';
import { FcInfo } from "react-icons/fc";
import { RootState } from '../../../app/store';
import { toast } from 'react-toastify';

interface DecodedCredential{
     name:string;
     email:string;
} 


const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
       if(userInfo){
            navigate('/')
       }
   
  },[])
 
  const {values:loginValues,
       handleChange:loginHandleChange,
       handleSubmit:loginHandleSubmit,
       errors:loginErrors,
       touched:loginTouched
  }= useFormik({
       initialValues:{
            email:"",
            password:""
       },
       validationSchema:loginValidation,
       onSubmit: async (values) => {
            try {
                 const response :any = await login(values)
                 console.log('response from login page',response);  
                 localStorage.setItem("userAccessToken",response.data.userAccessToken)  
                 localStorage.setItem("userRefreshToken",response.data.userRefreshToken)  
                
                 
                 dispatch(setCredential({...response.data.data}))
                       navigate('/')
            } catch (error : any) {
                 toast.error('wrong password or email')
            }
       }
  })
  // ======forgot password
  const {values:forgotValues,
       handleChange:forgotHandleChange,
       handleSubmit:forgotHandleSubmit,
       errors:forgotErrors,
       touched:forgotTouched} = useFormik({
            initialValues:{
                 email:''
            },
            validationSchema:forgotValidation,
            onSubmit: async (values : any) =>{
                 const {email} = values
                 const name = email.split('@')[0]
                 setIsModalOpen(true)

                 try {
                      const response:any = await forgotPassword({name,email})
                      console.log('res from forgot password',response);
                      
                 } catch (error) {
                      toast.error('invalid email for forgot')
                 }
            }
       })

  const handleForgot = (e:any) =>{
       e.preventDefault()
        setIsModalOpen(true)

  }

  return (
    <>
    { isModalOpen && (<CustomModal isOpen={isModalOpen} onRequestClose={()=>setIsModalOpen(false)}>
             <div className='flex justify-center gap-5 items-center flex-col'>
               <form onSubmit={forgotHandleSubmit}>
                <div className='flex gap-3 justify-center mt-[50px] items-center flex-col'>
               < FcInfo size={70}/>
               <span className='font-bold text-2xl'>Forgot password</span>
               <p className='font-medium  text-gray-400'>Enter your email and we'll send you a link to reset your  password</p>
                </div>
                <div className='flex gap-3 flex-col justify-center items-center w-full '>
                    <input type="text " value={forgotValues.email} onChange={forgotHandleChange} name='email'
                    className='h-[40px] w-72 rounded-md focus:outline-blue-500 outline-none border-2 pl-2 border-blue-300 '/>
                    {forgotErrors.email && forgotTouched.email && (
                      <div className="text-red-500 text-sm">{forgotErrors.email as string}</div>
                    )}
                    <button  className=' w-60 bg-blue-500 text-white h-10 rounded-md hover:bg-blue-400' >Submit</button>
                </div>
                </form>
             </div>
    </CustomModal>) }
    <div className="w-full flex max-sm:flex-col max-md:flex-col">
      <div className="w-[60%] max-sm:w-full max-md:w-full h-screen flex flex-col justify-center items-center bg-blue-500">
          <div className="flex flex-col gap-4 items-center justify-center">
                        <motion.div
                        initial={{ opacity: 1, y: -300 }}
                        animate={{ opacity: 2, y: 10 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="  backdrop-sepia-0  animate-fade-up"
                      >
      
             <p className="text-3xl text-white hover:pointer-events-none"> EVENT <b>HIVE</b></p>
                       </motion.div>
                      <motion.div
                        initial={{ opacity: 1, x: -500 }}
                        animate={{ opacity: 1, x: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="  backdrop-sepia-0  animate-fade-up"
                      >

             <p className="text-white hover:pointer-events-none ">All-in-one Platform for in-person & virtual Events</p>
                  </motion.div>
                  <motion.div
                          initial={{ opacity: 1, x: 500 }}
                          animate={{ opacity: 2, x: 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          className="  backdrop-sepia-0 flex  animate-fade-up"
                        >
                          <div className="-mt-4">
                            <ThreeDots
                            visible={true}
                            height="20"
                            width="20"
                            color="#fff"
                          
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            />
                            </div>
                          </motion.div>
          </div>
          <div className="absolute bottom-10 flex gap-6 mt-32 text-white dark:text-white font-sans text-sm">
          <span className="underline">Terms of Service</span>
           <span className="underline">Prvacy Policy</span>
           <span className="underline " >Contact Us</span>
          </div>
      </div>
      <div className="flex flex-col max-sm:py-10 max-md:py-10 justify-center  items-center w-full">
        <div className="w-[45%] max-sm:w-[60%] ">
        <div className="flex flex-col gap-2 justify-center items-center"> 
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className='text-gray-500'>Dont have an account? <Link className='text-blue-500 underline' to={'/user/signup'}> Sign up now</Link></p>
        </div>
        <form action="" className="mt-5 " onSubmit={loginHandleSubmit}>
        <div className="flex flex-col   gap-3">
        
             <div className="flex flex-col gap-2 ">
                   <label htmlFor="" className="text-gray-500 font-medium">Email Address</label>
                   <input 
                    name='email'
                    value={loginValues.email}
                    onChange={loginHandleChange}
                    placeholder='email'
                    type="email" className={ loginErrors.email && loginTouched.email ? `outline-none px-2  rounded-md  py-2 border   border-red-500` : 'outline-none px-2  rounded-md  py-2 border border-blue-600 focus:border-blue-400 '}  />
             </div>
             {loginErrors.email && loginTouched.email && (
                      <div className="text-red-500 text-sm">{loginErrors.email}</div>
                    )}
             <div className="flex flex-col gap-2 ">
                   <label htmlFor="" className="text-gray-500 font-medium">Password</label>
                   <input 
                    name='password'
                    value={loginValues.password}
                    onChange={loginHandleChange}
                    placeholder='password'
                   type="password" className={ loginErrors.password && loginTouched.password ? `outline-none px-2 rounded-md  py-2 border border-red-500` :'outline-none px-2  rounded-md  py-2 border border-blue-600 focus:border-blue-400' }  />
             </div>
             {loginErrors.password && loginTouched.password && (
                      <div className="text-red-500 text-sm">{loginErrors.password}</div>
                    )}
             <div className=" flex justify-end">
              <button onClick={(e)=>handleForgot(e)} className="underline  text-gray-600">forgot your password?</button>
             </div>
             <div className="flex justify-center items-center">
              <button type="submit" className="bg-blue-500  w-full py-2 hover:bg-blue-400
                hover:text-white rounded-md text-white">Sign in</button>
             </div>
          
        </div>
        </form> 
        </div>
        <div className="mt-5  flex justify-center flex-col gap-2 items-center w-full">
         <div className='flex justify-center items-center'>
          <p>OR</p>
         </div>
        <GoogleLogin 
                    onSuccess={ async (credentialResponse) => {
                         if(credentialResponse && credentialResponse.credential){
                    const decoded = jwtDecode(credentialResponse.credential) as DecodedCredential
                         console.log('deee',decoded);
                    const {name,email}  = decoded
                    const charSet ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                    let password =''
                    for(let i=0;i<=6;i++){
                         const randomIndex = Math.floor(Math.random() * charSet.length)
                         password+= charSet.charAt(randomIndex)
                    }
                    console.log('p',password);
                    try {
                         const res :any =await googleAuth({name,email,password})
                         localStorage.setItem("userAccessToken",res.data.userAccessToken)  
                         localStorage.setItem("userRefreshToken",res.data.userRefreshToken)  
                         console.log('res from googleAuth ',res);
                         dispatch(setCredential({...res.data.data}))
                         navigate('/user')  
                    } catch (error) {
                         console.log('ee',error);
                    }
                    }
                    }}
                    onError={() => {
                    console.log('Login Failed');
                    }}
                    />
        </div>
      </div>
    </div>
    </>
  )
}

export default Login