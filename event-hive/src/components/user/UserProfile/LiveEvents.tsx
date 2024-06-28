import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { liveListing } from '../../../api/userApi'
import { Booking } from '../../../validations/validationTypes'

function LiveEvents() {
   const {userInfo} = useSelector((state:RootState)=>state.auth)
   const [booking,setBooking] = useState<Booking[]>([])
    useEffect(()=>{
       const fetchData = async ()=>{
        const res = await liveListing(userInfo._id)
        if(res?.data.success){
         setBooking(res.data.data)
        }
        console.log('====dsdsds=====',res?.data.data)
       }
       fetchData()
    },[])
  return (
    <div className="bg-white shadow-lg border border-gray-300 mb-10 mr-3 mt-[50px] ml-5">
      {
         booking?.map((event)=>(
            <div className='px-3  flex py-3'>
               <div>
               <img className='object-contain h-[300px] w-full' src={event.eventDetails.event_poster} alt="" />
               </div>
               <div className='pl-4' >
                  <ul className='gap-3 flex flex-col'>
                     <li className='text-black font-semibold '>
                        {event?.eventDetails?.event_name}
                        </li>
                     <li className=' max-w-xl font-normal text-base text-gray-900 '>
                        {event?.eventDetails?.event_description}
                        </li>
                  </ul>
                  <div className='w-full mt-5'>
                     <button className='rounded px-4 py-1 bg-red-500 text-white font-bold'>join</button>
               </div>
               </div>
         </div>
         
         ))
      }
         
     </div>
  )
}

export default LiveEvents