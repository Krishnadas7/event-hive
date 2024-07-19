import { ReactElement, Suspense, lazy, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { useSelector,useDispatch } from 'react-redux';
import { adminLogOut} from '../../../slices/authSlice';
import { FaUsers } from "react-icons/fa";
import EventList from '../selections/EventList';
import { MdEmojiEvents } from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai"
import { SiWebmoney } from "react-icons/si";
import CompanyList from '../selections/companyList';
import { MdOutlineReportGmailerrorred } from "react-icons/md";
const DashboardComponent = lazy(()=> import('../selections/DashboardComponent'))
const UsersComponent = lazy(()=> import('../selections/UsersComponent'))
const SalesReport = lazy(()=>import('../selections/SalesReport'))
const ReportPage = lazy(()=>import('../selections/Report'))



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
      {name:'Company', icon: <AiOutlineBank size={30}/>,onClick: () => {}},
      {name:'Sales Report', icon: <SiWebmoney size={30}/>,onClick: () => {}},
      {name:'Reports', icon: <MdOutlineReportGmailerrorred size={30}/>,onClick: () => {}},
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
    <div className='w-full shadow-lg shadow-gray-300 flex'>
      {
      open&&(<div className='w-full  z-50 sm:hidden min-h-screen fixed transition-all duration-300 ease-in-out bg-white'>
         <div className='w-full p-4 flex justify-end'><IoClose  onClick={()=>setOpen(false)} size={30}/></div>
         <div className='h-[70px] w-full p-4 bg-gray-300'></div>
         {options.map((option,index)=>{
            return(
               (<div key={index} 
                  onClick={()=>handleOptionClick(index)} 
                  className='w-full
                   hover:bg-slate-100
                    h-16 flex
                   justify-start text-black
                     items-center p-5'>
                      <span>
                      {option.icon}
                     </span>
                      <span className='ml-3 font-semibold'>
                      {option.name}
                      </span>
                      </div>
                     )
                     )
         })}
      </div>)
      }
      <div className={`${open?'w-64 ':'w-28'}  bg-white shadow-xl shadow-gray-400 h-full fixed max-sm:hidden `}>
         <div className='h-[70px] w-full flex items-center justify-center '>
            <span className=' font-bold text-black'>Event Hive</span>
         </div>
         {options.map((option,index)=>{
            return(
               open?(<div key={index} onClick={()=>handleOptionClick(index)} className='
               
               w-full px-4 py-2 
               text-black
               mr-4
               
               hover:bg-gray-200 
               transition-colors duration-300
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
      <div className={`${open?'sm:ml-64 ':'sm:ml-28'}   w-full h-[70px] `}>
         <div className='w-full h-[70px]  flex items-center fixed bg-white  justify-between px-3 '>
            <TiThMenu className='text-black' onClick={()=>setOpen(!open)} size={30}/>
            <div className={`w-12 h-12 mt-5 sm:ml-3 rounded-xl absolute ${open ? 'right-[345px]' : 'right-[200px]'}  `}>
               {adminInfo?(<button onClick={()=>handleLogout()} className={`font-semibold   h-10 ${open ? 'mr-[800px]' : 'mr-[200px]'} border-gray-500 rounded-full   border-2 text-gray-400  w-28`}>logout</button>)
               :(<button className='font-semibold  h-10 border-black rounded-sm border-2 border-solid  w-28'>login</button>)}
               
            </div>
         </div>
         
      </div>
    </div>
    <div className={` overflow-y-auto h-auto ${open ? 'ml-[268px]'  : 'ml-[125px]' } max-sm:ml-0 max-sm:px-3 max-sm:mt-8   mr-3 mt-3 rounded-md bg-gray-50`} >
      <Suspense fallback={<div>loading...</div>}>
      {num ==0 && <DashboardComponent/>}
      {num ==1 && <UsersComponent/>}
      {num ==2 && <EventList/>}
      {num ==3 && <CompanyList/>}
      {num ==4 && <SalesReport/>}
      {num ==5 && <ReportPage/>}
      </Suspense>
   </div>
    </>
  )
}

export default SideBar