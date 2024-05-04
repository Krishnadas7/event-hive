import React from 'react'
import UserNavbar from '../userNavbar/UserNavbar'
import image  from '../../../assets/landing-page-image.webp'
import UserFooter from '../UserFooter/UserFooter'
const  LandingPage:React.FC = ():JSX.Element => {
  return (
    <>
    <UserNavbar/>
    {/* <div className='w-full  h-80 flex'> */}
        {/* <div className='w-1/2 flex justify-center items-center '> */}
        {/* <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
         focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5  w-[40px] text-center ">Blue</button> */}
         {/* <button className='bg-blue-500 from-blue-500 via-blue-600 w-[105px] h-10 border border-sky-500 text-white rounded-sm transform motion-safe:hover:scale-110 ...'>Get started</button> */}
        {/* </div> */}
         {/* <div className='w-1/2 bg-blue-300'>
               <p>sdlsgdlk</p>
        </div>
    </div> */}
    <div className='   p-8 m-7 h-96 rounded-md flex justify-center   items-center'>
       <p className='text-5xl font-bold mt-28 text-black '>The World's Leader in Hackathons and Developer Relations</p>
       {/* <button className='mt-[200px] shadow-lg shadow-slate-400 w-[150px] h-10 border  bg-white rounded-md end-0 bottom-0 relative text-indigo-400 rounded-sm transform motion-safe:hover:scale-110 ...'>Get started</button> */}
    </div>
    <div className='w-full mt-16 flex p-10 shadow-md backdrop-sepia-0 bg-white/30 ... bg-slate-100' >
        <div className='w-1/2 justify-center flex items-center flex-col'>
           <h4 className='text-black font-bold mb-5 shadow-md  shadow-gray-400'>FOR ORGANISATIONS</h4>
           <p className='text-4xl  font-bold'>Get Your Tech Into the Hands of Developers</p>
           <p className='mt-8 text-slate-400'>Market your technology to developers, activate developers to build using your technology, and engage developers that are already in your ecosystem</p>
                    <button type="button" className="text-white shadow-md shadow-slate-400 mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 w-36 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Learn More
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            </button>
        </div>
        <div className='w-1/2 p-10'>
        <div className=' bg-gray-400 w-full  relative   rounded-2xl md:h-[22rem] '>
        
        <img  className='object-contain  absolute top-[1rem] right-[1rem]  rounded-2xl 'src={image} alt="" />
        </div>
        </div>
    </div>
    <UserFooter/>
    </>
  )
}

export default LandingPage