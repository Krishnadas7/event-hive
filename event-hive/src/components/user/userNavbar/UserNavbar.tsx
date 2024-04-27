import React from 'react'
import { HiMiniUser } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

function UserNavbar() {
  return (
    <header className='h-20   w-full'>
        <div className='flex justify-between w-full '>
          <div className='flex justify-center p-5 items-center '>
            <h3>Event hive</h3>
          </div>
        <div className=' flex justify-center  items-center'>
        <ul className='flex '>
            <li className=' mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>HOME<IoIosArrowDown className='mt-1 w-3'/></li>
            <li className='ml-6 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>EVENTS<IoIosArrowDown className='mt-1 w-3'/></li>
            <li className='ml-8 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>BLOG<IoIosArrowDown className='mt-1 w-3'/></li>
            <li className='ml-8 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>ABOUT<IoIosArrowDown className='mt-1 w-3'/></li>
        </ul>
        </div>
        <div className=' flex mt-5 pr-4 items-center'>
        <HiMiniUser/>
          <Link to={'/signup'}><button className='font-mono font-bold text-sm'>Signin</button></Link>
        </div>
        </div>
    </header>
  )
}

export default UserNavbar