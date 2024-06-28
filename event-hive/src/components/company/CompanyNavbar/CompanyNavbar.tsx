import React, { useState, useEffect } from 'react';
// import { HiMinus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { RootState } from '../../../app/store';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userLogOut } from '../../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getImage, getProfile } from '../../../api/userApi';
import image from  '../../../assets/user-profile-icon-vector-avatar-600nw-2247726673.webp'
import { AiOutlineLogout } from "react-icons/ai";
import { clearCompany } from '../../../slices/authSlice';

interface CompanyNavbarProps {
    onOpenModal: () => void;
  }
  const CompanyNavbar: React.FC<CompanyNavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [profile, setProfile] = useState(false);
  const {companyInfo} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [companyInfo]);

  const handleLogout = async()=>{
    try {
     setProfile(false)
      dispatch(clearCompany())
      
    } catch (error) {
      console.error(error);
    }
  }
  const handleProfile= async ()=>{
    const res = await getProfile()
    navigate('/company/profile')
  }

  

  return (
    <header className={`h-20 top-0 fixed w-full transition-all  z-10 duration-300 ${scrolled ? ' bg-blue-500': 'bg-blue-500'}`}>
      <div className='flex justify-between w-full'>
        {/* <div className='flex justify-center p-5 items-center'>
          <h1 className=' font-bold'>Event hive</h1>
        </div> */}
        <div className='flex justify-center items-center text-white'>
        <h1 className=' font-bold mt-6 ml-6'>Event hive</h1>
          <ul className='flex ml-12'>
            <li className='mt-7 flex   md:dark:hover:text-white hover:underline font-mono' 
             onClick={()=>navigate('/company/homepage')}
             >Hosted Events</li>
            {/* <li className='ml-6 mt-7 flex   md:dark:hover:text-white hover:underline font-mono'
            onClick={()=>navigate('/user/events')}
            >Events</li> */}
            {/* <li className='ml-8 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>BLOG<IoIosArrowDown className='mt-1 w-3' /></li> */}
            {/* <li className='ml-8 mt-7 flex font-mono font-bold text-md md:dark:hover:text-blue-400 hover:underline'>ABOUT<IoIosArrowDown className='mt-1 w-3' /></li> */}
          </ul>
        </div>
        <div className='flex mt-5 ' >
          {/* <HiMinus /> */}
          {companyInfo ? (<><button 
           onClick={onOpenModal}  className='max-sm:p-0 max-sm:text-sm max-sm:h-10 max-sm:mt-4 max-sm:mr-0 pl-3 pr-3 py-2 rounded-full bg-blue-500 border border-white mr-5 text-white
          hover:bg-white hover:text-blue-500'>
            Create Your Event
            </button><button    onClick={() => setProfile(!profile)}
         className={`font-mono mr-[80px] pl-4 pr-4 py-2 rounded-md text-white mt-1 flex font-bold test-sm`}>{companyInfo.company_name}</button></>) 
          : ( <Link to={'/company/signup'}><button className=' border border-solid w-[150px] h-10 text-white rounded-full font-bold hover:bg-white  hover:text-blue-500 text-sm'>Signin</button></Link>)}
          {profile && (
          <div className=" mt-14 absolute z-10 text-sm font-medium h-[350px] text-white bg-white w-[300px] right-4  rounded-lg shadow-sm">
            <div className='w-full flex flex-col  h-5 '>
             <span className='text-slate-400 pl-3'>signed as</span>
             <span className='text-gray-500 mt-2 pl-3'><b>{companyInfo ? companyInfo.company_name : 'null'}</b></span>
             <span className='text-gray-500 mt-2 pl-3'>{companyInfo ? companyInfo.company_email : 'null'}</span>
            </div>
            <div className='mt-20 '>
              <ul className='text-black flex flex-col gap-3'>
             <li onClick={()=>handleProfile()} className='text-gray-500 hover:bg-slate-300 pl-3 h-7'>Account</li>
               <li className='text-gray-500  hover:bg-slate-300 pl-3 h-7'>Wallet</li>
               <div  className='text-red-500 flex items-center gap-3 hover:bg-slate-300 pl-3 h-7'>
                <AiOutlineLogout className='w-6 h-6'/>
                <span onClick={() => handleLogout()}>Logout</span>
              </div>

              </ul>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}

export default CompanyNavbar;
