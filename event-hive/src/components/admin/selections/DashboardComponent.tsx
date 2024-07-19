import { FaUsers } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import PriceChart from '../../charts/PriceCharts';
import BarChartComponent from '../../charts/LineCharts';
import { RiLiveFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { usersCount } from "../../../api/adminApi";
import { eventCount } from "../../../api/adminApi";
import { liveEventCounts } from "../../../api/adminApi";


function DashboardComponent() {
  const [usercount,setuserCount] = useState(0)
  const [eventcount,setEventCount] = useState(0)
  const [liveEventCount,setLiveEventCount] = useState(0)

  useEffect(()=>{
    const fetchDat = async () =>{
      try {
        const res = await usersCount()
        setuserCount(res?.data.data)
       console.log('users count ',usercount);
      } catch (error) {
        
      }
    }
    fetchDat()
  },[])
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const res = await eventCount()
        setEventCount(res?.data.data)
       console.log('users count ',usercount);
      } catch (error) {
        
      }
    }
    fetchData()
  },[])
  useEffect(()=>{
    try {
      const fetchData = async ()=>{
      const res = await liveEventCounts()
      setLiveEventCount(res?.data.data)
      }
      fetchData()
    } catch (error) {
      
    }
  },[])
  return (
    <>
     <div className='gap-4 flex  flex-col '>
       <div className=" flex gap-5 justify-evenly  max-sm:flex-col">
          <div className="bg-blue-500 gap-7 w-full rounded-md flex py-3 px-5">
             <div className="bg-white flex px-3 py-3  items-center justify-center rounded-md">
               <FaUsers className="text-blue-500" size={40}/>
             </div>
             <div className="flex flex-col">
                <span className="text-white font-black text-2xl">{usercount ?usercount:0 }</span>
                <span className="text-sm text-gray-200">Total Users</span>
             </div>
          </div>
          <div className="bg-blue-500 w-full gap-5 rounded-md flex py-3 px-5">
             <div className="bg-white flex px-3 py-3  items-center justify-center rounded-md">
               <FaWandMagicSparkles className="text-blue-500" size={40}/>
             </div>
             <div className="flex flex-col">
                <span className="text-white font-black text-2xl">{eventcount ? eventcount:0 }</span>
                <span className="text-sm text-gray-200">Total Events</span>
             </div>
          </div>
          <div className="bg-blue-500 w-full gap-5 rounded-md flex py-3 px-5">
             <div className="bg-white flex px-3 py-3  items-center justify-center rounded-md">
               <RiLiveFill className="text-blue-500" size={40}/>
             </div>
             <div className="flex flex-col">
                <span className="text-white font-black text-2xl">{liveEventCount ? liveEventCount : 0}</span>
                <span className="text-sm text-gray-200">Live Events</span>
             </div>
          </div>
          
       </div>
      
     </div>
     
    <div className='flex max-sm:flex-col bg-[#F7F9F2]   max-lg:flex-col justify-between  mb-10 mt-10 rounded-md p-10'>
      <div className='flex flex-col   w-full'>
        <div className='flex items-center  justify-center'>
          <span className='text-gray-600 mb-2  font-bold text-2xl'>Event Status Overview</span>
        </div>
        <div className='flex  rounded-md '>
          <PriceChart />
        </div>
      </div>
      <div className='flex flex-col w-full  max-sm:w-full'>
        <div className='flex items-center justify-center'>
          <span className='ml-10 text-gray-600 mb-12  font-bold text-2xl'>Rate of new users</span>
        </div>
        <div className='flex  max-sm:w-full'>
          <BarChartComponent />
        </div>
      </div>
    </div>
        </>
  )
}

export default DashboardComponent