import React, { useState, useEffect } from 'react';
import { RootState } from '../../../app/store';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userLogOut } from '../../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../../api/userApi';
import { AiOutlineLogout } from "react-icons/ai";
import { liveChecking } from '../../../api/userApi';
import NavbarImage from '../../../assets/navbar-image.webp'
import { FaAsymmetrik } from "react-icons/fa";



const UserNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profile, setProfile] = useState(false);
  const [liveicon,setLiveicon] = useState(false)
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async () =>{
      // if(userInfo){
      const res = await liveChecking(userInfo?._id as string)
      if(res?.data.data>0){
        setLiveicon(true)
      }else{
        setLiveicon(false)
      }
    // }
    }
    fetchData()
  },[userInfo])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [userInfo]);

  const handleLogout = async()=>{
    try {
     setProfile(false)
      dispatch(userLogOut())
      
    } catch (error) {
      console.error(error);
    }
  }
  const handleProfile= async ()=>{
    const res = await getProfile()
    if(res){
      navigate('/user/profile')
    }
    
  }

  return (
    <header className={`h-20 top-0 fixed w-full transition-all  z-10 duration-300 ${scrolled ? ' bg-blue-500': 'bg-blue-500'}`}>
      <div className='flex justify-between w-full'>
        <div className='flex justify-center items-center text-white'>
          <div className='flex justify-center ml-4 gap-2 items-center '>
          <FaAsymmetrik size={30} className='mt-5 ' />
          <h1 className=' font-bold mt-6  '>Event hive</h1>
          </div>
        
          <ul className='flex ml-12 gap-14'>
            <li className='mt-7 flex   md:dark:hover:text-white hover:underline font-bold' 
             onClick={()=>navigate('/')}
             >Home</li>
            <li className=' mt-7 flex   md:dark:hover:text-white hover:underline font-bold'
            onClick={()=>navigate('/user/events')}
            >Events</li>
            <li className=' mt-7 flex   md:dark:hover:text-white hover:underline font-bold'
            onClick={()=>navigate('/user/about')}
            >About</li>
           
          </ul>
        </div>
        <div className='flex mt-5 ' >
          {/* <HiMinus /> */}
          {userInfo ? (<button    onClick={() => setProfile(!profile)}
         className={`font-mono pr-7 flex font-bold test-sm`}><img src={ userInfo.profileImg !='' ?userInfo.profileImg : NavbarImage} className='w-12 h-12 ml-6 object-cover rounded-full' alt="" />
        { liveicon &&<span className="absolute top-5 right-12 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>}
         <PiDotsThreeOutlineVerticalFill className='text-white mt-4' size={20}/></button>) 
          : ( <Link to={'/user/signup'}><button className=' border border-solid w-[150px] h-10 text-white rounded-full font-bold hover:bg-white hover:text-blue-500 text-sm mr-3'>Signin</button></Link>)}
          {profile && (
          <div className=" mt-14 absolute z-10 text-sm font-medium h-[220px] text-white bg-white w-[300px] right-4  rounded-lg shadow-sm">
            <div className='w-full flex flex-col  h-5 '>
             <span className='text-slate-400 pl-3'>signed as</span>
             <span className='text-gray-500 mt-2 pl-3'><b>{userInfo ? userInfo.name : 'null'}</b></span>
             <span className='text-gray-500 mt-2 pl-3'>{userInfo ? userInfo.email : 'null'}</span>
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

export default UserNavbar;
