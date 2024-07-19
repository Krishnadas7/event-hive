import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaAsymmetrik } from "react-icons/fa";

const  UserFooter:React.FC = () => {
  return (
    <>
    <div className='w-full flex py-10 flex-col shadow-lg shadow-gray-400 bg-[#EEEDEB] mt-16 justify-center items-center text-black text-sm'>
      <div className='w-full flex items-center gap-3 justify-center'>
        <FaAsymmetrik size={30}/>
          <span className='font-bold'>EVENT HIVE</span>
      </div>
      <div className='flex  gap-7 mt-8 uppercase'>
         <span>Pricing</span>
         <span>About</span>
         <span>News</span>
         <span>Reviews</span>
         <span>Updates</span>
      </div>
      <div className='mt-6'>
        <span className=''>STAY IN TOUCH</span>
      </div>
      <div>
      <ul className='flex justify-around gap-4 mt-3'>
                <li><FaFacebook size={23}/></li>
                <li><AiFillTwitterCircle size={25} className='' /></li>
                <li><AiFillInstagram size={25}/></li>
                <li><IoLogoWhatsapp size={25}/></li>
            </ul>
      </div>
      <div className='mt-4'>
        <span className='text-gray-600'>@Eventhive UI skrishnadas38</span>
      </div>
    </div>
    </>
  );
}

export default UserFooter;
