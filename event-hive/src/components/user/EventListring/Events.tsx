import React,{useEffect, useState} from 'react'
import UserNavbar from '../userNavbar/UserNavbar'
import backGroundImage from '../../../assets/event Image.jpg'
import UserFooter from '../UserFooter/UserFooter';
import { eventForUser } from '../../../api/userApi';
import { IEvent } from '../../../types/schema';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from 'react-toastify';
import { eventTypes } from '../../../utils/data';
import { filterEvent } from '../../../api/userApi';
import emptyImage from '../../../assets/empty_image.jpg'


const location = [
  { value: 'Choose', label: 'Choose' },
  { value: 'FREE', label: 'FREE' },
  { value: 'PAID', label: 'PAID' },
];


function Event() {
  const [selectedValue, setSelectedValue] = useState('');
  const [ticket,setTicket] = useState('')
  const [events,setEvents] = useState<IEvent[]>([])
  const [pagination,setPagination] = useState<number>(0)
  const [date,setDate]=useState<string>('')
  const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;
  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  const handleTicket = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setTicket(event.target.value)
  }
  useEffect(()=>{
  const fetchData = async () =>{
    const res = await eventForUser(pagination)
    console.log('resfrom userevents==',res)
    if(res?.success){
    setEvents(res?.data)
       
    }
  }
  fetchData()
  
  },[pagination])
 

 const handleSubmit = async () =>{
  
    const obj = {
      type:selectedValue,
      ticket,
      date
           }
    const res = await filterEvent(obj)
    if(res?.success){
    setEvents(res?.data)
    }else{
      toast.error(res?.message)
    }
  
 }
 
  return (
  <>
   <UserNavbar/>
     <div className='w-full bg-ble-400 h-auto mt-24 flex justify-center flex-col items-center' >
       <img src={backGroundImage} className='object-cover w-3/4 h-[400px]  rounded-md shadow-md ' alt="" />
       <div className='w-2/3 h-auto  pt-5 pb-5  absolute bottom-[90px]  
        xl:grid-cols-2 grid 
       rounded-md 
        mt-3 bg-blue-600'>
           <div className='grid gap-4  px-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2'>
               <div className='flex  flex-col flex-wrap gap-2 justify-center items-start'>
                      <label htmlFor="" className='font-bold text-white ml-3'>Type</label>
                      <select 
                        value={selectedValue}
                        onChange={handleChange}
                        className="p-2 bg-transparent outline-none text-white w-full rounded-md"
                         >
                          
                        {eventTypes.map((option, index) => (
                         <option className='text-blue-500' key={index} value={option.value}>
                        {option.label}
                          </option>
                            ))}
                         </select>
               </div>
               
               <div className='flex flex-col gap-2 justify-center items-start'>
                      <label htmlFor="" className='font-bold ml-3 text-white'>Ticket</label>
                      <select
                        value={ticket}
                        onChange={handleTicket}
                        className="p-2 text-white w-full outline-none bg-transparent rounded-md"
                         >
                        {location.map((option, index) => (
                         <option className='text-blue-500' key={index} value={option.value}>
                        {option.label}
                          </option>
                            ))}
                         </select>
               </div>
               <div className='flex flex-col gap-2 justify-center items-start'>
              <label htmlFor="start-date" className='ml-3 font-bold text-white'>Start Date</label>
              <input 
                value={date} 
                onChange={(e) => {
                  setDate(e.target.value);
                  console.log(e.target.value); // Log the value to the console
                }} 
                type="date" 
                min={todayStr} 
                className='p-2 w-full bg-transparent text-white outline-none rounded-md' 
                id="start-date" 
              />
            </div>
           </div>
           <div className=' px-3   '>
               <button onClick={()=>handleSubmit()} className=' border w-full  h-11  rounded-md mt-7 text-white bg-blue-600 font-bold 
               hover:bg-white hover:text-blue-600'>Apply Filter</button>
           </div>
      </div>
     </div>
     <div className='w-full mt-32 '>
      <div className='flex items-start'>
        <p className='ml-36 text-blue-600 text-2xl font-bold'><b>Upcoming</b> <span className='text-amber-500'><b>Events</b></span></p>
      </div>
     </div>
    <div className='w-full px-28' >
    </div>
    
   <div className='w-full grid md:grid-cols-2 md:px-28 px-10  xl:grid-cols-3 gap-7  grid-cols-1 sm:grid-cols-1 justify-around mt-10'>
   {
    events?.length>0 ?
    events?.map((event)=>( <div key={event._id} className="flex flex-col  bg-white border shadow-sm rounded-xl ">
      <img className=" w-[400px]  max-sm:w-full max-md:w-full h-[230px] p-3  rounded-t-xl " src={event.event_poster} alt="Image Description" />
      <div className="p-4 md:p-5 shadow-md ">
      <div className='flex justify-between'>
       <h3 className="text-lg font-bold ">
          {event.event_name}
        </h3>
        <h3 className="text-sm bg-gray-200 border px-2 py-1 rounded-md font-semibold text-blue-500 uppercase">
          {event.participants}
        </h3>
         
      </div>
        <p>{event.event_type}</p>
        <p className="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-1">
         {event.event_description}
        </p>
        
        <div className="mt-2 py-2  flex flex-col gap-4  gap-x-2 text-sm font-semibold rounded-lg border border-transparent justify-between text-gray-500  cursor-pointer">
          <div className='flex flex-col gap-4'><p>starts in - {event.start_date}</p> 
          <div className='flex justify-between'>
          <p>close in - {event.end_date}</p>

          <h3 className={`text-lg ${event.ticket == 'free' ? 'text-green-500' : 'text-blue-500'} rounded-md uppercase px-4 text-sm pt-1 font-bold`}>
          {event.ticket}&nbsp; Rs.{event.amount}
        </h3>
          </div>
          </div>
           <div className=' w-full '>
           <Link 
                            to={`/user/selected-event/${event._id}`} 
                            className='  rounded-md  transform transition-transform duration-300 hover:scale-110
                              px-[155px] bg-blue-500 text-white py-2 font-mono '
                        >
                          EXPLORE
                        </Link>
           </div>
        </div>
      </div>
    </div>)) : (<div className='text-black  w-full  flex items-center justify-center'>
      <div className=' flex    items-center justify-center'>
         <img className='ml-[900px] shadow-md shadow-slate-300 rounded-full max-sm:ml-[0px] max-md:ml-[0px] ' src={emptyImage} alt="" />
      </div>
    </div>)
   }
</div>
<div className='w-full  max-md:flex-col  mt-10 flex px-28 max-md:items-center max-md:justify-center max-sm:items-center max-sm:justify-center  items-center justify-center'>
   
    <div className="flex  items-center justify-between h-10 w-full bg-gray-200 p-2 rounded-lg">
      <div>
      <button 
        onClick={() => setPagination((pagination) => (pagination > 0 ? pagination - 1 : pagination))} 
        className="flex items-center bg-gray-200 transition-all duration-100 ease-in-out transform hover:scale-105 p-2 rounded-l-lg"
      >
        <MdKeyboardArrowLeft size={20} className="mr-1" />
        <span>Prev</span>
      </button>
      </div>
      <div><span className="font-bold mx-4">
       Page No {pagination+1}
      </span></div>
      <div>
      <button 
        onClick={() => setPagination((pagination) => pagination + 1)} 
        className="flex items-center bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 p-2 rounded-r-lg"
      >
        <span>Next</span>
        <MdOutlineKeyboardArrowRight size={20} className="ml-1" />
      </button>
      </div>
     
     
     
    </div>
    </div>
     <UserFooter/>
    
  </>
  )
}

export default Event