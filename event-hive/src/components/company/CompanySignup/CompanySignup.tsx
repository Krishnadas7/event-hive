import { useFormik } from 'formik';
import React,{useState,useEffect} from 'react';
import { companyRegisterValidation } from '../../../validations/yupValidation';
import { sendEmail } from '../../../api/companyApi';
import { CustomModal } from '../../common/Modal';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input'
import image from '../../../assets/company_login_page.png'
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { setTimeInfo } from '../../../slices/authSlice';
import { clearTimeInfo } from '../../../slices/authSlice';
import { RootState } from '../../../app/store';
import { companyRegister } from '../../../api/companyApi';
import { setCompany } from '../../../slices/authSlice';
import { clearCompany } from '../../../slices/authSlice';
import { Link } from 'react-router-dom';
function CompanySignup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {timerInfo} = useSelector((state:RootState)=>state.auth)
  const {companyInfo} = useSelector((state:RootState)=>state.auth)
  const [otp, setOtp] = useState("");
  const [resendButton,setresendButton] = useState(false)
  const [timer,setTimer] = useState(60)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(companyInfo){
      navigate('/company/homepage')
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

  const {
    values: companyValues,
    handleSubmit: companySubmit,
    handleChange: companyChange,
    errors: companyErrors,
    touched: companyTouched
  } = useFormik({
    initialValues: {
      company_name: '',
      company_email: '',
      company_website: '',
      company_address: '',
      industry_type: '',
      company_description: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: companyRegisterValidation,
    onSubmit:async (values) => {
      let currentTime = new Date().getTime()
      console.log('timeee for register',currentTime)
      dispatch(setTimeInfo({timestamp:currentTime}))
      dispatch(setCompany({...values}))
      // console.log('values from companySignup ', values);
      try {
        // if(values.password != values.confirm_password){
        //   toast.error('password and confirm do not matched')
        //   return 
        // }
        const res = await sendEmail(values)
        console.log('log from company signup',res);
        if(res?.data.success){  
          setIsModalOpen(true)
        }
      } catch (error) {
        setIsModalOpen(false)
        dispatch(clearTimeInfo())
        dispatch(clearCompany())
        toast.error('something went wrong try again...')
      }
    }
  });

  
   const resendOtpHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      
      const {company_name,company_email,
        company_website, company_address,industry_type,
        company_description,password
      }=companyInfo
      const res =  await sendEmail({
        company_name,
        company_email,
        company_website,
        company_address,
        industry_type,
        company_description,
        password
      }) 
      if(res?.data.success){
        toast.success(res.data.message)
      }
      setresendButton(false)
      setTimer(60)
    } catch (error) {
      
    }

   }
   async function handleOTPVerification(){
    console.log('cliced')
    const OTP_VALIDITY_DURATION = 60 * 1000;
    console.log(OTP_VALIDITY_DURATION);
    
     try {
      console.log(timerInfo);
      
      const {timestamp} = timerInfo
      console.log(timestamp);
      
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - timestamp;
      if (timeElapsed > OTP_VALIDITY_DURATION) {
        toast.error('OTP has expired');
        return;
      }
        const res = await companyRegister(otp)
        console.log('res from otp verification',res)
        if(res?.data.success){
          setIsModalOpen(false)
          toast.success(res.data.message)
          navigate('/company')

        }
       
     } catch (error) {
      toast.error('some')
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
    <>
    
    </>
    <div className='md:w-full max-md:flex-col h-screen flex '>
       <div className='bg-white md:w-1/2 sm:w-full  flex  '>
          <img src={image} alt="" className=''/>
       </div>
       <div className=' gap-6 flex items-center mt-5 flex-col  md:w-1/2 sm:w-full '>
         {/* <h1 className='text-3xl font-semibold'>Welcome back :)</h1> */}
         {/* <div className=''>
         <p className='w-[450px] text-slate-500 font-semibold'>To keep connected with us please login with your personal information by email address and password</p>
         </div> */} 
         <div className='p-4 '>
         <form className='w-[500px] max-sm:ml-5 mb-5 h-[500px]' onSubmit={companySubmit}>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Name</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="text" value={companyValues.company_name}  name='company_name'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.company_name && companyTouched.company_name && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_name}</div>
              )}
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Email</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="email" value={companyValues.company_email}  name='company_email'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.company_email && companyTouched.company_email && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_email}</div>
              )}
         </div>

         {/* ======22 */}
        
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Address</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="text" value={companyValues.company_address}  name='company_address'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.company_address && companyTouched.company_address && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_address}</div>
              )}
          </div>
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Website</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="url" value={companyValues.company_website}  name='company_website'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.company_website && companyTouched.company_website && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_website}</div>
              )}
          </div>
         
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Industry Type</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="text" value={companyValues.industry_type}  name='industry_type'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.industry_type && companyTouched.industry_type && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.industry_type}</div>
              )}
          </div>
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Destiption </label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="text" value={companyValues.company_description}  name='company_description'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.company_description && companyTouched.company_description && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_description}</div>
              )}
          </div>
          <div className='flex justify-between'>
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Password </label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="password" value={companyValues.password}  name='password'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.password && companyTouched.password && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.password}</div>
              )}
          </div>
          <div className=''>
          <label className='text-gray-500 font-semibold ' htmlFor="">Confirm Password </label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          {/* <svg className="w-4 h-4 mr-1 ml-3 mt-3  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg> */}
          <input type="password" value={companyValues.confirm_password}  name='confirm_password'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email"/>
          </div>
          {companyErrors.confirm_password && companyTouched.confirm_password && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.confirm_password}</div>
              )}
          </div>
          </div>
          <div className='flex mb-9 pb-6 gap-10 mt-5'>
            <button type='submit' className='pl-4 pr-4 w-1/2 h-10 hover:bg-gray-100 bg-blue-500 hover:text-gray-500 text-gray-50 rounded-full'>Create</button>
           <Link to='/company/login'> <button  className='pl-4 pr-4 h-10 w-[250px] bg-gray-200 hover:bg-blue-500 hover:text-white rounded-full text-gray-500'>Login</button> </Link>
          </div>
        </form>
       </div>
       </div>
      {/* ======2222 */}
      
    </div>
    </>
  );
}

export default CompanySignup;