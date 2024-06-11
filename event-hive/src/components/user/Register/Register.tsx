import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { signUp } from '../../../api/userApi'
import { setCredential } from '../../../slices/authSlice'
import Loader from '../../common/Loader';
import { useDispatch,useSelector } from 'react-redux'
import { sendOtpToEmail } from '../../../api/userApi';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuthenticatoin from '../../common/GoogleAuthenticatoin';
import { validationSchema } from '../../../validations/yupValidation';
import { setRegister } from '../../../slices/authSlice';
import { clearRegister } from '../../../slices/authSlice';
import * as Yup from 'yup'
import { MyError } from '../../../validations/validationTypes';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input'
import { CustomModal } from '../../common/Modal';
import { RootState } from '../../../app/store';
import { otpVerification } from '../../../api/userApi';
// interface FormValues {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   confirm_password: string;
//   mobile: string;
// }

const Register: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [load,setLoad] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer,setTimer] = useState(60)
  const [resendButton,setresendButton] = useState(false)
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSumbit, setSubmit] = useState(false)
  const {registerInfo} = useSelector((state :RootState)=>state.auth)
  useEffect(()=>{
    if(userInfo){
         navigate('/user')
    }

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
  // const initialValues: FormValues = {
  //   first_name:'',
  //   last_name:'',
  //   email:'',
  //   password:'',
  //   confirm_password:'',
  //   mobile:''
  // }

  // const onSubmit = async (values: FormValues) => {
  //   try {
  //     const response:any = await signUp(values)
  //     console.log('resssssssssssssssssssssssss',response);
      
  //     dispatch(setCredential(response.data.user))
  //     navigate('/login')
  //   } catch (error) {
  //     // Handle error
  //     console.error(error)
  //   }
  // }

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   onSubmit: onSubmit,
  // });
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
      let currentTime = new Date().getTime()
      console.log('timeee for register',currentTime)
       dispatch(setRegister({...values,timestamp:currentTime}))
       setSubmit(true)
        try {
          const { first_name, email } = values;
              const response:any = await sendOtpToEmail({first_name,email})
              // console.log('resssssssssssssssssssssssss',response);
              
              // dispatch(setCredential(response.data.user))
              // navigate('/login')
                  setIsModalOpen(true)
                  // toast.success(response.message)
      } catch (error) {
        setIsModalOpen(false)
        dispatch(clearRegister())
         toast.error((error as MyError)?.data?.message || (error as MyError)?.error )
      }
    }
  })
  async function handleOTPVerification(){
    const OTP_VALIDITY_DURATION = 60 * 1000; // 60 seconds in milliseconds
    // navigate("/user/setProfile");
    try {
     

      setLoad(true)
      const {email,timestamp}:any = registerInfo
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - timestamp;
      if (timeElapsed > OTP_VALIDITY_DURATION) {
        toast.error('OTP has expired');
        return;
    }
      const res:any = await otpVerification({otp,email})
       
         if(res.data.success){

            const {first_name,last_name,email,mobile,password,confirm_password}:any = registerInfo
            const res:any = await signUp({first_name,last_name,email,mobile,password,confirm_password})
            console.log('resssignup',res);
            if(res.data.success){
              setIsModalOpen(false)
              // toast.success('sdlksdlksd')
              setLoad(false)
             navigate('/user/login')
            }else{
              setLoad(false)
              // setIsModalOpen(false)
              toast.error('invalid otp')
            }
         }else{
          // setIsModalOpen(false)
          console.log('otp verification failed');
          
         }
    } catch (error) {
      setIsModalOpen(false)
      toast.error((error as MyError)?.data?.message || (error as MyError)?.error )
    }
}

const resendOtpHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  try {
    const {first_name,last_name,email,mobile,password,confirm_password}:any = registerInfo
    let currentTime = new Date().getTime()
    console.log('timeee for register',currentTime)
     dispatch(setRegister({first_name,last_name,email,mobile,password,confirm_password,timestamp:currentTime}))
     const response:any = await sendOtpToEmail({first_name,email})
     if(response.data.success){
      toast.success(response.data.message)
     }
     console.log('res from resend otp ',response)
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
          {resendButton && (<button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>resendOtpHandler(e as any)} className="text-blue-500">Resend OTP?</button>) } 
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



      <div className='lg:flex md:flex  sm:flex-row' >
        <div className='flex md:w-1/2 sm:w-full flex-col h-screen justify-center  items-center '>
          <h4 className='text-slate-700 text-xl mt-6'>Already signed up?</h4>
          <p className='text-gray-500 mt-6'>Log into your Account so you can explore</p>
          <Link to={'/user/login'}><button className='text-slate-500 border-slate-950 border h-9 w-28 mt-6'>LOG IN</button></Link>
        </div>
        <div className='flex flex-col  flex-auto h-screen md:w-1/2 bg-slate-800 items-center justify-center'>
          <p className='text-white'>SignUp for an Account</p>
            <form  className='mt-3' onSubmit={loginHandleSubmit}>
                <div className='flex sm:flex-row  flex-wrap'>
                  
                 <div className='flex flex-col mt-4  relative'>
                 <input 
                   name="first_name"
                   value={loginValues.first_name}
                   onChange={loginHandleChange}
                   placeholder="firstName"
                   className="peer h-full  border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                   <label
                     className="after:content[''] pointer-events-none absolute left-0 w-full -top-1.5 flex h-full  select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                       firstName
                   </label>
                   {loginErrors.first_name && loginTouched.first_name && (
                      <div className="text-white text-sm">{loginErrors.first_name}</div>
                    )}
                 </div>
                 
                 <div className='flex flex-col relative mt-3 ml-5  sm:ml-5'>
                   <input 
                     name="last_name"
                     value={loginValues.last_name}
                     onChange={loginHandleChange}
                     placeholder="lastName"
                     className="peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                   <label
                     className="after:content[''] pointer-events-none absolute left-0 w-full -top-1.5 flex h-full  select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                       lastName
                   </label>
                   {loginErrors.last_name && loginTouched.last_name && (
                      <div className="text-white text-sm">{loginErrors.last_name}</div>
                    )}
                 </div>
                
                </div> 
                <div className='flex flex-wrap relative mt-3 flex-col'>
                  <input 
                    name="email"
                    value={loginValues.email}
                    onChange={loginHandleChange}
                    placeholder="Email"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                {loginErrors.email && loginTouched.email && (
                      <div className="text-white text-sm">{loginErrors.email}</div>
                    )}
                <div className='flex flex-wrap mt-3 relative flex-col'>
                  <input 
                    name="mobile"
                    value={loginValues.mobile}
                    onChange={loginHandleChange}
                    placeholder="Mobile"
                    type='number'
                    className=" peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Mobile
                  </label>
                </div>
                {loginErrors.mobile && loginTouched.mobile && (
                      <div className="text-white text-sm">{loginErrors.mobile}</div>
                    )}
                <div className='flex flex-wrap mt-3 relative flex-col'>
                  <input 
                    name="password"
                    value={loginValues.password}
                    onChange={loginHandleChange}
                    placeholder="Password"
                    type="password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className=" after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
                {loginErrors.password && loginTouched.password && (
                      <div className="text-white text-sm">{loginErrors.password}</div>
                    )}
                <div className='flex mt-3 flex-wrap relative flex-col'>
                  <input 
                    name="confirm_password"
                    value={loginValues.confirm_password}
                    onChange={loginHandleChange}
                    placeholder="Confirm password"
                    type="password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Confirm password
                  </label>
                </div>
                {loginErrors.confirm_password && loginTouched.confirm_password && (
                      <div className="text-white text-sm">{loginErrors.confirm_password}</div>
                    )}
                <div className=' flex items-center mt-3 justify-center  flex-row  '>
                  <button 
                    type="submit"
                    className="text-white hover:text-white border 
                    focus:outline-none
                    rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 w-full
                    dark:hover:text-white
                    ">
                   {isModalOpen ?(<Loader />) : 'SIGN UP'} 
                  </button>
                </div>
            </form>
            <span className='text-white mt-2 mb-2 text-sm'>or using </span>
           <GoogleAuthenticatoin/>
        </div>
      </div>
    </>
  )
}

export default Register
