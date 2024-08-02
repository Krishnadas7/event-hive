import { useFormik } from 'formik';
import React,{useState,useEffect} from 'react';
import { companyRegisterValidation } from '../../../validations/yupValidation';
import { sendEmail } from '../../../api/companyApi';
import { CustomModal } from '../../common/Modal';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input'
import { OTP_EXPIRED } from '../../../config/toastMessages';
import image from '../../../assets/company_login_page.png'
import { toast } from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { setCompany, setTimeInfo } from '../../../slices/authSlice';
import { clearTimeInfo } from '../../../slices/authSlice';
import { RootState } from '../../../app/store';
import { companyRegister } from '../../../api/companyApi';
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
      const currentTime:number = new Date().getTime()
      dispatch(setTimeInfo({timestamp:currentTime}))
      dispatch(setCompany({...values}))
      try {
        const res = await sendEmail(values)
        if(res?.success){  
          setIsModalOpen(true)
        }else{
          toast.error(res?.message)
          return 
        }
      } catch (error) {
        setIsModalOpen(false)
        dispatch(clearTimeInfo())
      }
    }
  });

  
   const resendOtpHandler = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    setTimer(60)
    setresendButton(false)
    e.preventDefault()
      const currentTime:number = new Date().getTime()
      dispatch(setTimeInfo({timestamp:currentTime}))
      if(companyInfo && companyInfo.company_name && 
        companyInfo.company_email && companyInfo.company_website &&
         companyInfo.company_address && companyInfo.industry_type && 
         companyInfo.company_description && companyInfo.password){
          const {company_name,company_email,
            company_website, company_address,industry_type,
            company_description,password
          }=companyInfo
          const obj ={company_name,company_email,
            company_website, company_address,industry_type,
            company_description,password
          }
          const res =  await sendEmail(obj) 
          
          if(res?.success){
            toast.success(res.message)
          }else{
            toast.error(res?.message)
          }
         }
   }
   async function handleOTPVerification(){
    const OTP_VALIDITY_DURATION = 60 * 1000;
    
      const {timestamp} = timerInfo 
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - timestamp;
      if (timeElapsed > OTP_VALIDITY_DURATION) {
        toast.error(OTP_EXPIRED);
        return;
      }
        const res = await companyRegister(otp)
        if(res?.success){
          setIsModalOpen(false)
          toast.success(res?.message)
          navigate('/company')
        }else{
          toast.error(res?.message)
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
          {resendButton && 
          (<button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>resendOtpHandler(e)} className="text-blue-500">Resend OTP?</button>) } 
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
        
         <div className='p-4 '>
         <form className='w-[500px] max-sm:ml-5 mb-5 h-[500px]' onSubmit={companySubmit}>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Name</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
         
          <input type="text" value={companyValues.company_name}  name='company_name'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="company name"/>
          </div>
          {companyErrors.company_name && companyTouched.company_name && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_name}</div>
              )}
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Email</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="email" value={companyValues.company_email}  name='company_email'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="company email"/>
          </div>
          {companyErrors.company_email && companyTouched.company_email && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_email}</div>
              )}
         </div>

        
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Address</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="text" value={companyValues.company_address}  name='company_address'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address"/>
          </div>
          {companyErrors.company_address && companyTouched.company_address && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_address}</div>
              )}
          </div>
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Website</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="url" value={companyValues.company_website}  name='company_website'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="website"/>
          </div>
          {companyErrors.company_website && companyTouched.company_website && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_website}</div>
              )}
          </div>
         
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Industry Type</label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="text" value={companyValues.industry_type}  name='industry_type'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="industry type"/>
          </div>
          {companyErrors.industry_type && companyTouched.industry_type && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.industry_type}</div>
              )}
          </div>
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Company Destiption </label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="text" value={companyValues.company_description}  name='company_description'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description"/>
          </div>
          {companyErrors.company_description && companyTouched.company_description && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.company_description}</div>
              )}
          </div>
          <div className='flex justify-between'>
          <div>
          <label className='text-gray-500 font-semibold ' htmlFor="">Password </label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="password" value={companyValues.password}  name='password'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password"/>
          </div>
          {companyErrors.password && companyTouched.password && (
                <div className="text-red-500 text-sm pb-2 mt-3">{companyErrors.password}</div>
              )}
          </div>
          <div className=''>
          <label className='text-gray-500 font-semibold ' htmlFor="">Confirm Password </label>
          <div className='flex bg-gray-200 w-full mt-2 mb-3 rounded-md' >
          <input type="password" value={companyValues.confirm_password}  name='confirm_password'
           onChange={companyChange} id="input-group-1" className="bg-gray-200  outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="confirm password"/>
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
      
    </div>
    </>
  );
}

export default CompanySignup;
