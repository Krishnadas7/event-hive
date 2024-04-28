import React, { useState, useEffect } from 'react';
import { HiMinus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const UserNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`h-20 top-0 fixed w-full transition-all z-10 duration-300 ${scrolled ? 'bg-black text-white' : 'bg-transparent'}`}>
      <div className='flex justify-between w-full'>
        <div className='flex justify-center p-5 items-center'>
          <h1 className='text-2xl font-bold'>Event hive</h1>
        </div>
        <div className='flex justify-center items-center'>
          <ul className='flex'>
            <li className='mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>HOME<IoIosArrowDown className='mt-1 w-3' /></li>
            <li className='ml-6 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>EVENTS<IoIosArrowDown className='mt-1 w-3' /></li>
            <li className='ml-8 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>BLOG<IoIosArrowDown className='mt-1 w-3' /></li>
            <li className='ml-8 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>ABOUT<IoIosArrowDown className='mt-1 w-3' /></li>
          </ul>
        </div>
        <div className='flex mt-5 pr-4 items-center'>
          <HiMinus />
          <Link to={'/signup'}><button className='font-mono font-bold text-sm'>Signin</button></Link>
        </div>
      </div>
    </header>
  );
}

export default UserNavbar;
