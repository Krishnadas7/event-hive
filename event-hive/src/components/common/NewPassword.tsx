import {useEffect,useState} from 'react'
import { FcInfo } from "react-icons/fc";
import { useFormik } from 'formik';
import { resetValidation } from '../../validations/yupValidation';
import { resetPassword } from '../../api/userApi';
import { useLocation } from 'react-router-dom';
import dummyImage from '../../assets/link-expird-for-reset.png'
import axios from 'axios';
import { toast } from 'react-toastify';

interface Obj {
    password: string;
    forgotToken: string ;
}
function NewPassword() {
   const [validation,setValidation] = useState(false)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const forgotToken = searchParams.get('forgotToken');
   useEffect(()=>{
    const fetchData = async ()=>{
         const valid =await axios.post('http://localhost:3003/api/user/token-validation',{forgotToken:forgotToken})
         if(valid.data.success){
           setValidation(true)
         }
        //    console.log('from reset useEffect',valid); 
    }
     
      fetchData()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
    console.log('forgot token',forgotToken)
    const {values:resetValues,
        handleChange:resetHandleChange,
        handleSubmit:resetHandleSubmit,
        errors:resettErrors,
        touched:resetTouched} = useFormik({
             initialValues:{
                password:''
             },
             validationSchema:resetValidation,
             onSubmit: async(values)=>{
                const obj: Obj = {
                    password: values.password,
                    forgotToken: forgotToken || ''
                };
                 try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const res:any = await resetPassword(obj)
                    if(res){
                      toast.success('passowrd reset successfully')
                    }
                   
                //    const decode = jwtDecode()
                    // console.log('res from reset password',res);
                    
                 } catch (error) {
                    console.log(error);
                    
                 }
             }
        })
  return (
    <>
    {validation ? (<div className='flex justify-center items-center'>
    <div className='flex justify-center gap-5 items-center mt-[160px] shadow-md border-2 p-5 flex-col'>
            <form  className='flex flex-col gap-5' onSubmit={resetHandleSubmit}>
             <div className='flex gap-5 justify-center  items-center flex-col'>
            < FcInfo size={70}/>
            <span className='font-bold text-2xl'>Reset your password</span>
            {/* <p className='font-medium  text-gray-400'>Enter your email and we'll send you a link to reset your  password</p> */}
             </div>
             <div className='flex gap-5 flex-col justify-center items-center w-full '>
                 <label className='font-bold' htmlFor="">Enter new password</label>
                 <input type="password"  value={resetValues.password} onChange={resetHandleChange} name='password'
                 className='h-[40px] w-[400px] rounded-md focus:outline-blue-500 outline-none border-2 pl-2 border-blue-300 '/>
               {resettErrors.password && resetTouched.password && (
                      <div className="text-red-500 text-sm">{resettErrors.password}</div>
                    )}
                 <button  className=' w-[400px] bg-blue-500 text-white h-10 rounded-md hover:bg-blue-400' >Reset</button>
             </div>
             </form>
          </div>

 </div>) : (<div className='flex justify-center items-center mt-16'>
    <img src={dummyImage} alt="" />
 </div>)}
 </>
    
  )
}

export default NewPassword