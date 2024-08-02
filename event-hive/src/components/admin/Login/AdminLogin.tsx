import {useEffect} from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { setAdminCredentials } from '../../../slices/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../app/store'
import { FormLogin } from '../../../validations/validationTypes'
import { login } from '../../../api/adminApi'

function AdminLogin():JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {adminInfo} = useSelector((state:RootState)=>state.auth)
 console.log('admin login');
 
   useEffect(()=>{
    if(adminInfo){
      navigate('/admin')
    }
   },[]) 

  const initialValues : FormLogin ={
   email: "",
   password: ""
  }

  const {values,handleChange,handleSubmit} = useFormik({
    initialValues:initialValues,
    onSubmit: async (values) =>{
      try {
        const {email,password}= values
        const res = await login({email,password})
        if(!res.success){
          toast.error(res.message)
          return
        }
        console.log('res from admin login',res)
        localStorage.setItem("adminAccessToken",res.data.adminAccessToken)  
        localStorage.setItem("adminRefreshToken",res.data.adminRefreshToken)  
        // console.log('login from res',res)
        dispatch(setAdminCredentials({...res.data}))
        toast.success(res.message)
        navigate('/admin/dashboard')
        
      } catch (error) {
        toast.error('admin login error')
      }
    }
  })
  return (
    <>
      <div className='flex justify-center items-center h-screen bg-slate-400'>
        <div className='w-[500px] bg-slate-400  mt-16 h-[400px] rounded-md flex items-center justify-center flex-col'>
            <h3 className='mb-5 font-bold text-white text-xl'>welcome Admin</h3>
            {/* <p className='mb-5 text-slate-400'>Log into your account so you can build your career</p> */}
            <form 
            onSubmit={handleSubmit}
            >
            <div className='flex w-80 flex-wrap relative mt-6 flex-col'>
               
                 <input placeholder="Email"
                 name='email'
                 value={values.email}
                 onChange={handleChange}
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                      <label
                      className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Email
                      </label>
                     
                 </div>
                 <div className='flex flex-wrap mt-6 relative flex-col'>
                 <input placeholder="Password"
                 name='password'
                 type='password'
                 value={values.password}
                 onChange={handleChange}
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 text-white" />
                      <label
                      className=" after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                     Password
                      </label>
                 </div>
                 <div className=' flex items-center mt-6 justify-center  flex-row  '>
                <button type="submit" 
                 className="text-white hover:text-white border 
                  focus:outline-none
                   rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 w-full
                    dark:hover:text-white
                    ">SIGN IN</button> 
                    {/* <p>OR sign Up using</p> */}

                </div>
                 </form> 
        </div>
        
     </div>
    </>
  )
}

export default AdminLogin