import { OTP_EXPIRED } from '../../../config/toastMessages';
import {ThreeDots} from 'react-loader-spinner'
import { motion } from 'framer-motion';
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { signUp } from '../../../api/userApi'
import Loader from '../../common/Loader';
import { useDispatch,useSelector } from 'react-redux'
import { sendOtpToEmail } from '../../../api/userApi';
import 'react-toastify/dist/ReactToastify.css';
import { validationSchema } from '../../../validations/yupValidation';
import { setRegister, UserInfo } from '../../../slices/authSlice';
import { clearRegister } from '../../../slices/authSlice';
import { toast } from 'react-hot-toast';
import OtpInput from 'react-otp-input'
import { CustomModal } from '../../common/Modal';
import { RootState } from '../../../app/store';
import { otpVerification } from '../../../api/userApi';
import { IUser } from '../../../types/schema';
import { INVALID_OTP } from '../../../config/toastMessages';
import { OTP_VERIFICATION_FAILED } from '../../../config/toastMessages';


const Register: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer,setTimer] = useState(60)
  const [resendButton,setresendButton] = useState(false)
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const {registerInfo} = useSelector((state :RootState)=>state.auth)
  useEffect(()=>{
    if(userInfo){
         navigate('/')
    }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
useEffect(()=>{
  let interval:NodeJS.Timeout;
  if(isModalOpen && timer > 0){
    interval = setInterval(() =>{
        setTimer((prevTimer)=>prevTimer-1)
    },1000)
  }else if(timer===0){
    setresendButton(true)
  }
  return () => clearInterval(interval)
},[isModalOpen,timer])
 
  const {values:loginValues,
    handleChange:loginHandleChange,
    handleSubmit:loginHandleSubmit,
    errors:loginErrors,
    touched:loginTouched}= useFormik({
    initialValues:{
      first_name:'',
      last_name:'',
      mobile:'',
      email:'',
      password:'',
      confirm_password:''
    },
    validationSchema:validationSchema,
    onSubmit: async (values) =>{
      
      const currentTime:number = new Date().getTime()
       dispatch(setRegister({...values,timestamp:currentTime}))
      //  setSubmit(true)
        try {
          const { first_name, email } = values;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const response = await sendOtpToEmail(first_name,email)
                   if(!response.success){
                    toast.error(response.message)
                    return
                   }
                  setIsModalOpen(true)
      } catch (error) {
        setIsModalOpen(false)
        dispatch(clearRegister())
         toast.error(INVALID_OTP)
      }
    }
  })
  async function handleOTPVerification(){
    const OTP_VALIDITY_DURATION = 60 * 1000; // 60 seconds in milliseconds
    try {
      const { email, timestamp } = registerInfo ?? { email: '', timestamp: 0 };
      
      const currentTime = new Date().getTime();
      if(timestamp){
        const timeElapsed = currentTime - timestamp;
        console.log(timestamp,'this i outside',timeElapsed,OTP_VALIDITY_DURATION)
        if (timeElapsed > OTP_VALIDITY_DURATION) {
          console.log(timestamp,'this i inside',timeElapsed,OTP_VALIDITY_DURATION)
          toast.error(OTP_EXPIRED);
          return;
      }
      }
      if(email){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await otpVerification({otp,email})
        console.log('res from otp verification',res)
        if(res?.success){
          if(registerInfo != null){
            const {first_name,last_name,email,mobile,password,confirm_password}:UserInfo = registerInfo
          const res = await signUp({first_name,last_name,email,mobile,password,confirm_password} as IUser )
          console.log('resssignup',res);
          if(res?.success){
            toast.success(res?.message)
            setIsModalOpen(false)
           navigate('/user/login')
          }else{
            toast.error(INVALID_OTP)
          }
          }
       }else{
        toast.error(res.message)
       }
      }
    } catch (error) {
      setIsModalOpen(false)
      toast.error(OTP_VERIFICATION_FAILED)
    }
}

const resendOtpHandler = async (e: React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
  try {
    const {first_name,last_name,email,mobile,password,confirm_password} =registerInfo ?? {first_name:'',last_name:'', email: '', mobile:'',password:'',confirm_password:'' };
     if(first_name && last_name && email&&mobile && password && confirm_password){
    const currentTime:number = new Date().getTime()
     dispatch(setRegister({first_name,last_name,email,mobile,password,confirm_password,timestamp:currentTime}))
      const response = await sendOtpToEmail(first_name,email)
      if(response?.success){
       toast.success(response?.message)
      }
     
    }
     setresendButton(false)
    setTimer(60)
  } catch (error) {
    setIsModalOpen(false)
    dispatch(clearRegister())
  }
 
}

  return (
    <>
  {isModalOpen && (
   <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
   <div className="flex flex-col  items-center mt-10 px-6 gap-6">
       <h2 className="font-gillroy text-2xl font-semibold md:text-3xl">Event Hive OTP Verification</h2>
       <p className="text-lg">Please enter the OTP (one time password) send to your registered email to complete the verification.</p>
       <div className="h-[50px] w-full flex items-center justify-center">
       <OtpInput
           value={otp}
           onChange={setOtp}
           numInputs={6}
           renderSeparator={<span>-</span>}
           renderInput={(props) => <input {...props} 
           style={{
               width: "50px",
               height: "50px",
               borderRadius: "5px",
               border: "1px solid #dd742a",
               fontSize: "20px",
               fontWeight: "bold",
               textAlign: "center",
               marginRight: "10px",
               marginLeft: "10px",
               outline: "none",
           }}/>}
       />
       </div>
       <div className="flex justify-between w-full">
           <p>Remaining Time: {timer}</p>
          {resendButton && (<button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>resendOtpHandler(e)} className="text-blue-500">Resend OTP?</button>) } 
       </div>
       <div className="flex justify-between w-full gap-4">
           <button 
               className="w-1/2 px-5 py-3 rounded-md bg-[#dd742a] text-white font-semibold hover:bg-[#999999]"
               onClick={handleOTPVerification}
           >
           Verify'
           </button>
           <button 
               className="w-1/2 border-[#dd742a] border-[1px] rounded-md"
                onClick={() => setIsModalOpen(false)}
           >
           Cancel
           </button>
       </div>
   </div>
</CustomModal>
)}
    <div className="w-full flex max-sm:flex-col max-md:flex-col ">
      <div className="w-[60%] max-sm:w-full max-md:w-full  h-screen flex flex-col justify-center items-center bg-blue-500">
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
        <div className="w-[50%] max-sm:w-[60%]">
        <div className="flex flex-col gap-2 justify-center items-center"> 
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <p className='text-gray-500'>Dont have an account? <Link className='text-blue-500 underline' to={'/user/login'}> Sign in</Link></p>
        </div>
        <form action="" className="mt-5 w-full" onSubmit={loginHandleSubmit}>
        <div className="flex flex-col   gap-3">
        
            <div className='flex max-sm:flex-col max-sm:gap-3 max-md:flex-col justify-between '>
              <div className='flex flex-col gap-1 '>
              <label htmlFor="" className="text-gray-500 font-medium">First Name</label>
                   <input 
                    name="first_name"
                    value={loginValues.first_name}
                    onChange={loginHandleChange}
                    placeholder='first name'
                    type="text" className={loginErrors.first_name && loginTouched.first_name ? `outline-none px-2   rounded-md  py-2 border   border-red-500`: 
                    'outline-none px-2   rounded-md  py-2 border   border-blue-500'}  />
                     {loginErrors.first_name && loginTouched.first_name && (
                      <div className="text-red-500 mt-1 text-sm">{loginErrors.first_name}</div>
                    )}
              </div>
             
              <div className='flex flex-col gap-1'>
              <label htmlFor="" className="text-gray-500 font-medium">Last Name</label>
                   <input 
                     name="last_name"
                     value={loginValues.last_name}
                     onChange={loginHandleChange}
                     placeholder='last name'
                    type="text" className={loginErrors.last_name && loginTouched.last_name ? `outline-none px-2  rounded-md  py-2 border   border-red-500`: 
                    'outline-none px-2  rounded-md  py-2 border   border-blue-500'}  />
                     {loginErrors.last_name && loginTouched.last_name && (
                      <div className="text-red-500 mt-1 text-sm">{loginErrors.last_name}</div>
                    )}
              </div>
             
            </div>
            <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="" className="text-gray-500 font-medium">Email</label>
                   <input 
                    name="email"
                    value={loginValues.email}
                    onChange={loginHandleChange}
                    placeholder='email'
                    type="email" className={loginErrors.email && loginTouched.email ?
                       `outline-none px-2  rounded-md  py-2 border   border-red-500`:'outline-none px-2  rounded-md  py-2 border   border-blue-500' }  />
              </div>
              {loginErrors.email && loginTouched.email && (
                      <div className="text-red-500 text-sm">{loginErrors.email}</div>
                    )}
              <div className='flex flex-col gap-1'>
              <label htmlFor="" className="text-gray-500 font-medium">Mobile</label>
                   <input 
                     name="mobile"
                     value={loginValues.mobile}
                     onChange={loginHandleChange}
                     placeholder='mobile'
                    type="text" className={loginErrors.mobile && loginTouched.mobile ?
                       `outline-none px-2  rounded-md  py-2 border   border-red-500`:'outline-none px-2  rounded-md  py-2 border   border-blue-500' }  />
              </div>
              {loginErrors.mobile && loginTouched.mobile && (
                      <div className="text-red-500 text-sm">{loginErrors.mobile}</div>
                    )}
              <div className='flex flex-col gap-1'>
              <label htmlFor="" className="text-gray-500 font-medium">Password</label>
                   <input 
                    name="password"
                    value={loginValues.password}
                    onChange={loginHandleChange}
                    placeholder='password'
                    type="password" className={loginErrors.password && loginTouched.password ?
                       `outline-none px-2  rounded-md  py-2 border   border-red-500`:
                       'outline-none px-2  rounded-md  py-2 border   border-blue-500' }  />
              </div>
              {loginErrors.password && loginTouched.password && (
                      <div className="text-red-500 text-sm">{loginErrors.password}</div>
                    )}
              <div className='flex flex-col gap-1'>
              <label htmlFor="" className="text-gray-500 font-medium">Confirm Password</label>
                   <input 
                     name="confirm_password"
                     value={loginValues.confirm_password}
                     onChange={loginHandleChange}
                     placeholder='comfirm password'
                    type="password" className={loginErrors.confirm_password && loginTouched.confirm_password ?
                       `outline-none px-2  rounded-md  py-2 border   border-red-500`:'outline-none px-2  rounded-md  py-2 border   border-blue-500' }  />
              </div>
              {loginErrors.confirm_password && loginTouched.confirm_password && (
                      <div className="text-red-500 text-sm">{loginErrors.confirm_password}</div>
                    )}
            </div>
            <div className="flex mt-2 justify-center items-center">
              <button type="submit" className="bg-blue-500  w-full py-2 hover:bg-blue-400
                hover:text-white rounded-md text-white"> 
                {isModalOpen ?(<Loader />) : 'SIGN UP'} 
                </button>
             </div>
          
        </div>
        </form> 
        </div>
        <div className="mt-5  flex justify-center flex-col gap-2 items-center w-full">
       
      </div>
    </div>
    </div>
    </>
  )
}

export default Register