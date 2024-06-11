import React from 'react'
import UserNavbar from '../userNavbar/UserNavbar'
import image  from '../../../assets/HomeDemoVideo.png'
import UserFooter from '../UserFooter/UserFooter'
import { motion } from 'framer-motion';
import { Grid } from 'react-loader-spinner'
import homepageBackground from '../../../assets/Blog-Tech-Events.jpg';

const  LandingPage:React.FC = ():JSX.Element => {
  return (
    <>
    <UserNavbar/>
    
    {/* <div className='relative mt-28'> */}
    <div className='bg-cover bg-center mt-26 bg-blue-500' >
    {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}
      <div className='flex  w-full pt-[200px] flex-col items-center justify-center '>
        <p className='text-4xl  font-bold text-white'>All-in-one Event Registration and  Marketing Platform</p>
        <p className='mt-9 text-gray-200  font-semibold '>Create and manage everything in one place for live,virtual or hybrid events</p>
      </div>
      <div className='mt-16 flex md:flex-row flex-col gap-4 items-center justify-center'>
        <button className='bg-white w-[200px] hover:bg-transparent hover:border hover:text-white rounded-full h-14 '>create your event</button>
        <button className='w-[200px] text-white   hover:bg-white hover:text-black rounded-full  h-14 border border-solid'>request demo</button>
      
      </div>
     
      <div className='flex mt-9 w-full gap-7 md:flex-row sm:flex-col justify-center'>
        <div className='flex-col justify-center items-center flex '>
          <h1 className='font-bold text-white text-5xl '>200,000</h1>
          <span className='text-white mb-14 font-semibold  mt-3'>event website created</span>
        </div>
      
        <div className=' flex  flex-col justify-center items-center'>
          <h1 className='font-bold text-white text-5xl '>7,00,000</h1> 
          <span className='text-white mb-14 font-semibold mt-3 '>registration procced</span>
        </div>
      </div>
    {/* </div> */}
    {/* <div className="absolute inset-0 bg-blue-500 bg-opacity-40"></div> */}
    </div>
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 2, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="sm:w-full max-md:flex-col md:flex-row flex sm:flex-col p-10  backdrop-sepia-0 bg-[#F4F7F8] animate-fade-up"
    >
     <div className='animate-fade-up sm:w-full max-md:flex-col md:flex-row  flex sm:flex-col p-10  backdrop-sepia-0 bg-[#F4F7F8] ' >
        <div className='w-1/2 sm:w-full p-6 gap-7 flex-col'>
           <p className='text-4xl  mt-14 font-bold'>Modern Event Management Software for Exceptional Events</p>
           <p className='mt-8 mb-3 text-slate-400'>Watch our 2-minute video overview now to see how you can effortlessly plan, promote, and execute successful events with Eventzilla</p>
             <button className='w-[200px] h-14  bg-blue-500 text-white rounded-md border border-solid'>create event</button>
        </div>
        <div className='w-1/2 sm:w-full p-10'>
        
        <img  className='object-contain   'src={image} alt="" />
        </div>
    </div> 
    </motion.div>
    <UserFooter/>
    </>
  )
}

export default LandingPage