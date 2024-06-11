import React,{useState,useEffect} from 'react'
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { userData } from '../../../../api/userApi';

interface UserData {
    first_name: string;
    last_name: string;
    bio: string;
    email:string;
    mobile:string;
    qualification: string;
    socialmedialink1: string;
    socialmedialink2: string;
  }

function ViewData({data}) {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    // const [data, setData] = useState<UserData | null>(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const res: any = await userData(userInfo.email);
    //       setData(res.data.data);
    //       console.log('details from userdetails',res.data.data)
    //     }; 
    //     fetchData();
    //   }, [userInfo.email]);
//   console.log('dataaa==',d);
  
  return (
    <div className="  h-auto p-6 bg-slate-200">
             <div className="space-y-4">
               <div className="flex items-center ">
                 <p className="text-black font-semibold w-32">First Name:</p>
                 <p className="text-black">{data?.first_name}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Last Name:</p>
                 <p className="text-black">{data?.last_name}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Email:</p>
                 <p className="text-black">{data?.email}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Mobile:</p>
                 <p className="text-black">{data?.mobile}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Qualification:</p>
                 <p className="text-black">{data?.qualification}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Bio:</p>
                 <p className="text-black">{data?.bio}</p>
               </div>
             </div>
             <div className="flex mt-4 space-x-4">
               <a href={data?.socialmedialink1} className="text-black " target="_blank" rel="noopener noreferrer">
                 <FaFacebook size={24} />
               </a>
               <a href={data?.socialmedialink2} className="text-black" target="_blank" rel="noopener noreferrer">
                 <FaLinkedin size={24} />
               </a>
             </div>
           </div>
  )
}

export default ViewData