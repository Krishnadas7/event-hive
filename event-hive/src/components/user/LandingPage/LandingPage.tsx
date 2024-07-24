import React, { useEffect, useState } from 'react'
import UserNavbar from '../userNavbar/UserNavbar'
import image  from '../../../assets/HomeDemoVideo.png'
import UserFooter from '../UserFooter/UserFooter'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { landingPageEventCount } from '../../../api/userApi';
import { landingPageLiveEventCount } from '../../../api/userApi';
import Counter from '../../common/Counter';


const  LandingPage:React.FC = ():JSX.Element => {
  const [eventC,setEventCount] = useState(0)
  const [liveC,setLiveCount] = useState(0)
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async () =>{
      const res =await landingPageEventCount()
      
      if(res?.data.success){
        setEventCount(res?.data?.data)
      }
    }
    fetchData()
  },[])
  useEffect(()=>{
   const fetchData = async () =>{
    const res  = await landingPageLiveEventCount()
    console.log('res from landing page',res)
    if(res?.data.success){
      setLiveCount(res?.data?.data)
    }
   }
   fetchData()
  },[])
  return (
    <>
    <UserNavbar/>
    
    <div className='bg-cover bg-center mt-26 bg-blue-500' >
      <div className='flex  w-full pt-[200px] max-md:px-4 max-sm:px-4 flex-col items-center justify-center '>
        <p className='text-4xl  font-bold text-white'>All-in-one Event Registration and  Marketing Platform</p>
        <p className='mt-9 text-gray-200  font-semibold '>Create and manage everything in one place for live,virtual or hybrid events</p>
      </div>
      <div className='mt-16 flex md:flex-row flex-col gap-4 items-center justify-center'>
        <button onClick={()=>navigate('/company')} className='bg-white w-[200px] hover:bg-transparent hover:border hover:text-white rounded-full h-14 '>create your event</button>
        <button onClick={()=>navigate('/user/about')} className='w-[200px] text-white   hover:bg-white hover:text-black rounded-full  h-14 border border-solid'>know more</button>
      
      </div>
     
      <div className='flex mt-9 w-full gap-7 md:flex-row sm:flex-col justify-center'>
        <div className='flex-col justify-center items-center flex '>
          <h1 className='font-bold text-white text-5xl '><Counter targetCount={eventC ? eventC : 0} duration={2} /></h1>
          <span className='text-white mb-14 font-semibold  mt-3'>event website created</span>
        </div>
      
        <div className=' flex  flex-col justify-center items-center'>
          <h1 className='font-bold text-white text-5xl '><Counter targetCount={liveC ? liveC : 0} duration={2} /></h1> 
          <span className='text-white mb-14 font-semibold mt-3 '>streaming events</span>
        </div>
      </div>
    
    </div>
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 2, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="sm:w-full max-md:flex-col md:flex-row flex sm:flex-col p-10  backdrop-sepia-0 bg-[#F4F7F8] animate-fade-up"
    >
     <div className='animate-fade-up  max-md:flex-col md:flex-row  flex sm:flex-col p-10  backdrop-sepia-0 bg-[#F4F7F8] ' >
        <div className='w-1/2 max-md:w-full max-sm:w-full flex   p- gap-7 flex-col'>
           <p className='text-4xl  mt-14 font-bold'>Modern Event Management Software for Exceptional Events</p>
           <p className='mt-8 mb-3 text-slate-400'>Watch 2-minute our overview now to see how you can effortlessly plan, promote, and execute successful events with Event Hive</p>
             <button onClick={()=>navigate('/company')} className='w-[200px] h-14  bg-blue-500 text-white rounded-md border border-solid'>create event</button>
        </div>
        <div className='w-1/2 max-md:w-full max-sm:w-full max-sm:mt-10'>
        
        <img  className='object-contain   'src={image} alt="" />
        </div>
    </div> 
    </motion.div>
    <UserFooter/>
    </>
  )
}

export default LandingPage