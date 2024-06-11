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
// import { MyError } from '../../../validations/validationTypes';
// import * as Yup from 'yup'
import { toast } from 'react-toastify';

interface DecodedCredential{
     name:string;
     email:string;
} 
// interface LoginFormValues {
//      email:string;
//      password:string;
// }

const Login: React.FC = () => {
     const [forgot,setForgot] = useState(false)
     const [isModalOpen, setIsModalOpen] = useState(false);
     const {userInfo} = useSelector((state:RootState)=>state.auth)
     const dispatch = useDispatch()
     const navigate = useNavigate()
     useEffect(()=>{
          if(userInfo){
               navigate('/user')
          }
      
     },[])
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
     <div className='flex  w-full flex-col-reverse md:flex-row  sm:justify-center sm:items-center'>
        <div className='w-full  md:w-1/2 bg-slate-500 h-screen flex items-center justify-center flex-col'>
            <h3 className='mb-5 animate-rotate-x animate-infinite text-white'>Log into your Account</h3>
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
                 <input placeholder="Password" type='password'
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
                 <div className=' flex  mt-6 mb-3  flex-col  '>
                <button type="submit" 
                 className="text-white hover:text-white border 
                  focus:outline-none
                   rounded-lg text-sm px-5 py-2.5 mb-3 text-center me-2 mt-5 w-full
                    dark:hover:text-white
                    ">SIGN IN</button>
                    
                    {/* <p>OR sign Up using</p> */}
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
                                   
                <button onClick={(e)=>handleForgot(e)} className='text-white underline  mt-3 ml-7'>Forgot your password?<b> Reset it here.</b></button>
                 </form> 
                 
        </div>
        
        <div className='w-full sm:w-1/2 sm:items-center sm:justify-center h-screen flex items-center justify-center flex-col'>
            <p className='mb-5'>Do you have an Account?</p>
            <p className='mb-5 text-slate-700'>Let's get you all set up so you can start creating your first onboard experience</p>
           
            <Link to={'/user/signup'}><button className='text-slate-500 border-slate-950 border h-9 w-28 mt-6'>SIGN UP</button></Link> 
        </div>
     </div>
    
    </>
  )
}

export default Login