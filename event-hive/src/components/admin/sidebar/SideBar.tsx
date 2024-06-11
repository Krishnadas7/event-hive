import React, { ReactElement, Suspense, lazy, useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { GoLaw } from "react-icons/go";   
import { RootState } from '../../../app/store';
import { useSelector,useDispatch } from 'react-redux';
import { adminLogOut} from '../../../slices/authSlice';
import { FaUsers } from "react-icons/fa";
import EventList from '../selections/EventList';
import { MdEmojiEvents } from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai"
import CompanyList from '../selections/companyList';
const DashboardComponent = lazy(()=> import('../selections/DashboardComponent'))
const UsersComponent = lazy(()=> import('../selections/UsersComponent'))



function SideBar() {
   const [open,setOpen]=useState(false)
   const [num,setNum]=useState(0)
   const {adminInfo} = useSelector((state:RootState)=>state.auth)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   interface Option {
      name: string;
      icon: ReactElement;
      onClick: () => void;
   }

   const options: Option[] = [
      { name: 'Dashboard', icon: <RiDashboard3Fill size={30} />, onClick: () => {} },
      // { name: 'Lawyers', icon: <GoLaw  size={30} />, onClick: () => {} },
      {name:'Users', icon: <FaUsers size={30}/>,onClick: () => {}},
      {name:'Events', icon: <MdEmojiEvents size={30}/>,onClick: () => {}},
      {name:'Company', icon: <AiOutlineBank size={30}/>,onClick: () => {}}
   ];
   
    const handleOptionClick = (index:number)=>{
       if(num!==index){
         setNum(index)
       }
    }
    const handleLogout = async ()=>{
     dispatch(adminLogOut())
      navigate('/admin')
    }
  return (
    < >
    <div className='w-full  flex'>
      {
      open&&(<div className='w-full z-50 sm:hidden min-h-screen fixed transition-all duration-300 ease-in-out bg-orange-200'>
         <div className='w-full p-4 flex justify-end'><IoClose  onClick={()=>setOpen(false)} size={30}/></div>
         <div className='h-[70px] w-full p-4 bg-amber-900'></div>
         {options.map((option,index)=>{
            return(
               (<div key={index} onClick={()=>handleOptionClick(index)} className='w-full hover:bg-slate-300 h-16 flex justify-start text-black items-center p-5'><span>{option.icon}</span> <span className='ml-3 font-semibold'>{option.name}</span></div>)
            )
         })}
      </div>)
      }
      <div className={`${open?'w-64 ':'w-28'} bg-gray-500 h-full fixed max-sm:hidden `}>
         <div className='h-[70px] w-full flex items-center justify-center '>
            <span className='font-semibold'>Event Hive</span>
         </div>
         {options.map((option,index)=>{
            return(
               open?(<div key={index} onClick={()=>handleOptionClick(index)} className='

               w-full px-4 py-2 
               
               mr-4
               hover:bg-gray-400 
               transition-colors duration-300
             hover:text-black
             focus:text-black
             active:bg-gray-500
             active:text-black
               h-16 flex justify-start text-
               items-center p-5'><span>{option.icon}</span> <span className='ml-3 font-semibold'>{option.name}</span></div>)
               :
               (<div key={index} onClick={()=>handleOptionClick(index)} className='w-full
                hover:bg-gray-400  h-16 p-3 mr-4
                 text-black flex items-center 
                 justify-center
                 '>{option.icon}</div>)
            )
         })}

      </div>
      <div className={`${open?'sm:ml-64 ':'sm:ml-28'}  w-full h-[70px] `}>
         <div className='w-full h-[70px]  flex items-center fixed bg-gray-200  justify-between px-3 '>
            <TiThMenu onClick={()=>setOpen(!open)} size={30}/>
            <div className={`w-12 h-12 mt-5 sm:ml-3 rounded-xl absolute ${open ? 'right-[345px]' : 'right-[200px]'}  `}>
               {adminInfo?(<button onClick={()=>handleLogout()} className={`font-semibold   h-10 ${open ? 'mr-[800px]' : 'mr-[200px]'} border-black rounded-full hover:text-white hover:bg-slate-800 border-2 border-solid  w-28`}>logout</button>)
               :(<button className='font-semibold  h-10 border-black rounded-sm border-2 border-solid  w-28'>login</button>)}
               
            </div>
         </div>
         
      </div>
    </div>
    <div className={` overflow-y-auto h-auto ${open ? 'ml-[268px]'  : 'ml-[125px]' }   mr-3 mt-3 rounded-md bg-gray-50`} >
      <Suspense fallback={<div>loading...</div>}>
      {num ==0 && <DashboardComponent/>}
      {num ==1 && <UsersComponent/>}
      {num ==2 && <EventList/>}
      {num ==3 && <CompanyList/>}
      </Suspense>
   </div>
    </>
  )
}

export default SideBar