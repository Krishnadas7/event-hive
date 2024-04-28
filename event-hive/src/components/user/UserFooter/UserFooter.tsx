import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const  UserFooter:React.FC = () => {
  return (
    <>
    <div className='w-full flex h-48  bg-gray-500 mt-16 justify-around text-white text-sm'>
        <div className='flex justify-center items-center'>
         <h1 className='font-mono font-bold'>EVENT HIVE</h1>
        </div>
        <div className='flex justify-center items-center mb-11'>
            <ul className='leading-7'>
                <li><b>Contact Us</b></li>
                <li className='flex mt-3 ' ><MdLocationPin className='mt-2 '/> &nbsp;Location</li>
                <li className='flex'><MdEmail className='mt-2'/> &nbsp;skrishnadas@gmial.com</li>
            </ul>
        </div>
        <div className='flex justify-center items-center'>
            <ul className='leading-7'>
                <li ><b>About</b></li>
                <li className='mt-3'>Features</li>
                <li>Pricing</li>
                <li>Gallery</li>
                <li>Team</li>
            </ul>
        </div>
        <div className='flex  flex-col'>
          <span className='mt-6'><b>Subscribe</b></span>
          <div className='mt-5 flex flex-col'>
          <input type="text" className='h-6 focus:border-transparent border focus:outline-none text-black p-2' placeholder='Email' />
          <button className='bg-black h-6 mt-2'>Subscribe</button>
          <span className='mt-2 ml-14'><b>Follow us</b></span>
          <div className='ml-2'>
            <ul className='flex justify-around leading-7 mt-3'>
                <li><FaFacebook/></li>
                <li><AiFillTwitterCircle className='' /></li>
                <li><AiFillInstagram/></li>
                <li><IoLogoWhatsapp/></li>
            </ul>
          </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default UserFooter;
