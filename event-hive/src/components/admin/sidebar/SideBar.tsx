import React, { ReactElement, Suspense, lazy, useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { GoLaw } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
// import DashboardComponent from '../selections/DashboardComponent';
// import UsersComponent from '../selections/UsersComponent';
const DashboardComponent = lazy(()=> import('../selections/DashboardComponent'))
const UsersComponent = lazy(()=> import('../selections/UsersComponent'))



function SideBar() {
   const [open,setOpen]=useState(false)
   const [num,setNum]=useState(0)

   interface Option {
      name: string;
      icon: ReactElement;
      onClick: () => void;
   }

   const options: Option[] = [
      { name: 'Dashboard', icon: <RiDashboard3Fill size={30} />, onClick: () => {} },
      // { name: 'Lawyers', icon: <GoLaw  size={30} />, onClick: () => {} },
      {name:'Users', icon: <FaUsers size={30}/>,onClick: () => {}}
   ];
   
    const handleOptionClick = (index:number)=>{
       if(num!==index){
         setNum(index)
       }
    }
  return (
    < >
    <div className='w-full  flex'>
      {
      open&&(<div className='w-full sm:hidden min-h-screen fixed transition-all duration-300 ease-in-out bg-orange-200'>
         <div className='w-full p-4 flex justify-end'><IoClose  onClick={()=>setOpen(false)} size={30}/></div>
         <div className='h-[70px] w-full p-4 bg-amber-900'></div>
         {options.map((option,index)=>{
            return(
               (<div key={index} onClick={()=>handleOptionClick(index)} className='w-full hover:bg-slate-300 h-16 flex justify-start text-black items-center p-5'><span>{option.icon}</span> <span className='ml-3 font-semibold'>{option.name}</span></div>)
            )
         })}
      </div>)
      }
      <div className={`${open?'w-64 ':'w-28'} h-full fixed max-sm:hidden bg-slate-400`}>
         <div className='h-[70px] w-full flex items-center justify-center bg-slate-400'>
            <span className='font-semibold'>Event Hive</span>
         </div>
         {options.map((option,index)=>{
            return(
               open?(<div key={index} onClick={()=>handleOptionClick(index)} className='

               w-full px-4 py-2 
               border
               mr-4
               hover:bg-slate-500 
               transition-colors duration-300
             hover:text-black
             focus:text-black
             active:bg-gray-500
             active:text-black
               h-16 flex justify-start text-black
               items-center p-5'><span>{option.icon}</span> <span className='ml-3 font-semibold'>{option.name}</span></div>)
               :
               (<div key={index} onClick={()=>handleOptionClick(index)} className='w-full
                hover:bg-slate-500  h-16 p-3 mr-4
                 text-black flex items-center 
                 justify-center
                 '>{option.icon}</div>)
            )
         })}

      </div>
      <div className={`${open?'sm:ml-64 ':'sm:ml-28'}  w-full min-h-screen fixed `}>
         <div className='w-full h-[70px] flex items-center bg-slate-400 justify-between px-3 '>
            <TiThMenu onClick={()=>setOpen(!open)} size={30}/>
            <div className='w-12 h-12 t rounded-xl '></div>
         </div>
         
      </div>
    </div>
    <div className={`mt-[80px] overflow-y-auto h-64 ${open ? 'ml-[268px]' : 'ml-[125px]' }  mr-3  bg-gray-600`} >
      <Suspense fallback={<div>loading...</div>}>
      {num ==0 && <DashboardComponent/>}
      {num ==1 && <UsersComponent/>}
      </Suspense>
   </div>
    </>
  )
}

export default SideBar