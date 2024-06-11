import React,{useEffect, useState} from 'react'
import UserNavbar from '../userNavbar/UserNavbar'
import backGroundImage from '../../../assets/event Image.jpg'
import UserFooter from '../UserFooter/UserFooter';
import { eventForUser } from '../../../api/userApi';
import { IEvent } from '../../../types/schema';
import { Link } from 'react-router-dom';
const options = [
  { value: 'Choose Event Type', label: 'Choose Event Type' },
  { value: 'techevent', label: 'Tech Event' },
  { value: 'hackathon', label: 'Hackathon' },
];
const location = [
  { value: 'Choose location', label: 'Choose Location' },
  { value: 'India', label: 'Pakistan' },
  { value: 'Paksitan', label: 'Paksitan' },
];


function Event() {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const [selectedLocation,setSelectedLocation] = useState(location[0].value)
  const [events,setEvents] = useState<IEvent[]|null>([])
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleLocation = (event) => {
    setSelectedLocation(event.target.value)
  }
  useEffect(()=>{
  const fetchData = async () =>{
    const res = await eventForUser()
    setEvents(res?.data.data)
    console.log('res from events===',res);
  }
  fetchData()
  
  },[])
 console.log('===============',events)
 
  return (
  <>
   <UserNavbar/>
     <div className='w-full bg-ble-400 h-auto mt-24 flex justify-center flex-col items-center' >
       <img src={backGroundImage} className='object-cover w-3/4 h-[400px]  rounded-md shadow-md ' alt="" />
       <div className='w-2/3 h-auto max-md:flex-col flex-wrap pt-5 pb-5  absolute bottom-[90px]  flex rounded-md justify-around 
        mt-3 bg-blue-600'>
           <div className='flex max-md:flex-col gap-4 justify-center items-center'>
               <div className='flex flex-col flex-wrap gap-2 justify-center items-start'>
                      <label htmlFor="" className='font-bold text-white'>Looking for</label>
                      <select 
                        value={selectedValue}
                        onChange={handleChange}
                        className="p-2 border outline-none border-gray-300 w-64 rounded-md"
                         >
                          
                        {options.map((option, index) => (
                         <option key={index} value={option.value}>
                        {option.label}
                          </option>
                            ))}
                         </select>
               </div>
               
               <div className='flex flex-col gap-2 justify-center items-start'>
                      <label htmlFor="" className='font-bold text-white'>Location</label>
                      <select
                        value={selectedLocation}
                        onChange={handleLocation}
                        className="p-2 border border-gray-300 w-64 rounded-md"
                         >
                        {location.map((option, index) => (
                         <option key={index} value={option.value}>
                        {option.label}
                          </option>
                            ))}
                         </select>
               </div>
               <div className='flex flex-col gap-2 justify-center items-start'>
                      <label htmlFor="" className='font-bold text-white'>Start Date</label>
                      <input type="date" className='p-2 border outline-none border-gray-300 w-64 rounded-md' name="" id="" />
               </div>
               
              
           </div>
           <div className='flex justify-center items-center'>
               <button className=' border  h-11 w-40 rounded-md mt-7 text-white bg-blue-600 font-bold 
               hover:bg-white hover:text-blue-600'>search</button>
           </div>
      </div>
     
     </div>
     <div className='w-full mt-32 '>
      <div className='flex items-start'>
        <p className='ml-36 text-blue-600 text-2xl font-bold'><b>Upcoming</b> <span className='text-amber-500'><b>Events</b></span></p>
      </div>
     </div>
    
    
   <div className='w-full grid md:grid-cols-2 md:px-28 px-10  xl:grid-cols-3 gap-7  grid-cols-1 sm:grid-cols-1 justify-around mt-24'>
   {
    
    events?.map((event,index)=>( <div key={event._id} className="flex flex-col bg-white border shadow-sm rounded-xl ">
      <img className=" w-[400px]   h-[230px] p-3  rounded-t-xl " src={event.event_poster} alt="Image Description" />
      <div className="p-4 md:p-5 shadow-md ">
        <h3 className="text-lg font-bold ">
          {event.event_name}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
         {event.event_description}
        </p>
        <div className="mt-2 py-2 px-3 flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent justify-between text-gray-500  cursor-pointer">
          <div><span>{event.start_date} - {event.end_date}</span></div>
           <div>
           <Link 
                            to={`/user/selected-event/${event._id}`} 
                            className='w-36 h-8 text-white rounded-SM hover:text-blue-500 transform transition-transform duration-300 hover:scale-110
                            hover:bg-white hover:border border-blue-300 rounded-md bg-blue-500 px-2'
                        >
                            REGISTER
                        </Link>
           </div>
        </div>
      </div>
    </div>))
   }
   


</div>

     <UserFooter/>
    
  </>
  )
}

export default Event