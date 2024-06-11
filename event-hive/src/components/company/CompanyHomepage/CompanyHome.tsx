import React, { ReactElement, Suspense, lazy, useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { useSelector,useDispatch } from 'react-redux';
import { userLogOut } from '../../../slices/authSlice';
import { IoMdArrowDropdown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import image from '../../../assets/WhatsApp Image 2023-10-05 at 11.29.42 PM.jpeg'
import { AiOutlineLogout } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { clearCompany } from '../../../slices/authSlice';
import ProfileDetails from './ProfileDetails';
// import { CustomModal } from '../../common/Modal';
import EventModal from './EventModal';
import ShowEvents from './ShowEvents';
// import ViewProfile from './ViewProfile';
// import UserDetails from './UserDetails';
// const viewProfile = lazy(()=> import('./ViewProfile'))

function CompanyHome() {
    const [profile, setProfile] = useState(false);
   const [open,setOpen]=useState(false)
   const [num,setNum]=useState(0)
   const {companyInfo} = useSelector((state:RootState)=>state.auth)
   const [event,setEvent ]= useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   interface Option {
      name: string;
      icon: ReactElement;
      onClick: () => void;
   }
   const handleCloseModal = () =>{
      setEvent(false)
   }

   const options: Option[] = [
      
      { name: 'Company Profile', icon: <CiUser size={20} />, onClick: () => {} },
      { name: 'Events', icon: <CiUser size={20} />, onClick: () => {} },
      // { name: 'Lawyers', icon: <GoLaw  size={30} />, onClick: () => {} },
      // {name:'Events', icon: <CiSettings size={20}/>,onClick: () => {}}
   ];
   
    const handleOptionClick = (index:number)=>{
       if(num!==index){
         setNum(index)
       }
    }
    const handleLogout = async ()=>{
     dispatch(clearCompany())
      // navigate('/company')
      setProfile(false)
    }
  return (
    < >
    {event && (< div className='w-[1000px] delay-[2000ms] border shadow-md h-screen flex ml-[18%] mt-[100px]  bg-[#F6F6F6] rounded-md absolute z-50 '>
      <EventModal onClose={handleCloseModal} />
    </div>)}
    <div className='w-full  flex'>
      {
      open&&(<div className='w-full sm:hidden min-h-screen fixed transition-all duration-300 ease-in-out bg-orange-200'>
         <div className='w-full p-4 flex justify-end'><GiHamburgerMenu  onClick={()=>setOpen(false)} size={30}/></div>
         <div className='h-[70px] w-full p-4 bg-amber-900'></div>
         {options.map((option,index)=>{
            return(
               (<div key={index} onClick={()=>handleOptionClick(index)} className='w-full hover:bg-slate-300 h-16 flex justify-start text-black items-center p-5'><span>{option.icon}</span> <span className='ml-3 font-semibold'>{option.name}</span></div>)
            )
         })}
      </div>)
      }
      <div className={`${open?'w-[270px]':'w-[125px]'} bg-blue-500 h-full fixed max-sm:hidden `}>
         <div className='h-[70px] bg-blue-500 w-full flex items-center justify-center '>
            <span className='font-semibold text-white'>{open ? 'Event Hive' : 'E'}</span>
         </div>
         {options.map((option,index)=>{
            return(
               open?(<div key={index} onClick={()=>handleOptionClick(index)} className='
               flex justify-between
               w-full px-4
               bg-blue-500
               text-gray-200
               hover:bg-[#1970CF]
               mr-4
               mt-3
               h-16 
               items-center p-5'><span className='flex'>{option.icon} &nbsp;{option.name}</span> <IoMdArrowDropdown/></div>)
               :
               (<div key={index} onClick={()=>handleOptionClick(index)} className='w-full
               hover:bg-[#1970CF]  h-16 p-3 mr-4
                 text-white flex items-center mt-3
                 justify-center
                 bg-blue-500
                 '>{option.icon}</div>)
            )
         })}

      </div>
      <div  className={`${open?'sm:ml-64 ':'sm:ml-28'}  w-full h-[80px]  `}>
         <div className='w-full h-20 z-50  bg-blue-500 flex items-center fixed    px-3 '>
            <TiThMenu className='text-white' onClick={()=>setOpen(!open)} size={30}/>
             <button onClick={()=>{
                setEvent(!event)
             }} className={`${open ? 'ml-[850px]' : 'ml-[994px]'} text-white border-2 border-white h-12 pl-3 rounded-full pr-3`}>create your event</button>
            <div  className={`w-12 h-11 mb-1  fixed rounded-xl ${open ? 'right-[150px]':'right-48'} `}>
           
               {companyInfo?(<button onClick={() => setProfile(!profile)}  className={`font-semibold ${open ? 'ml-[100px]' : 'ml-[142px]'} h-10  rounded-sm  mb-4 w-28`}>
               <img src={image} className='w-12 h-12 ml-6 rounded-full' alt="" />
               </button>)
               :(<button onClick={()=>{
                  navigate('/company')
               }} className={`border border-solid w-[150px] h-10 text-white rounded-full ${open ? 'ml-[32px]' : 'ml-[74px]'} font-bold hover:bg-white hover:text-blue-500 text-sm`}>Signup</button>)}
               {profile && (
          <div  className= {`mt-3 ${open ? 'ml-[-120px]':'ml-[-80px]'}  absolute  
           text-sm font-medium h-[350px] text-white bg-[#ffff] w-[300px]   rounded-lg shadow-sm`}>
            <div className='w-full flex flex-col  h-5 '>
             <span className='text-slate-400 pl-3'>signed as</span>
             <span className='text-gray-500 mt-2 pl-3'><b>{companyInfo ? companyInfo.company_name : 'null'}</b></span>
             <span className='text-gray-500 mt-2 pl-3'>{companyInfo ? companyInfo.company_email : 'null'}</span>
            </div>
            <div className='mt-20 '>
              <ul className='text-black flex flex-col gap-3'>
              <Link to={'/company/profile'}> <li className='text-gray-500 hover:bg-slate-300 pl-3 h-7'>Account</li></Link>
               <li className='text-gray-500  hover:bg-slate-300 pl-3 h-7'>Wallet</li>
               <div  className='text-red-500 flex items-center gap-3 hover:bg-slate-300 pl-3 h-7'>
                <AiOutlineLogout className='w-6 h-6'/>
                <button onClick={()=>handleLogout()}>Logout</button>
              </div>

              </ul>
            </div>
          </div>
        )}
            </div>
         </div>
         
      </div>
    </div>
    <div className={` overflow-y-auto h-screen ${open ? 'ml-[268px]' : 'ml-[125px]' } p-5   rounded-md bg-[#F6F6F6]`} >
      {/* <h1>dsldslksdkl</h1> */}
      <Suspense fallback={<div></div>}>
      {num ==0 && <ProfileDetails/>}
      {num ==1 && <ShowEvents/>}
      </Suspense>
   </div>
    </>
  )
}

export default  CompanyHome
