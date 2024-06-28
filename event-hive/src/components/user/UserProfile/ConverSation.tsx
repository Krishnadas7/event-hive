import React,{useEffect, useState} from 'react'
import image from '../../../assets/user-Profile2 (2).jpg'
import { getRandomUser } from '../../../api/userApi'
interface UserData{
  first_name:string;
  last_name:string;
  bio:string;
  qualification:string;
  socialmedialink1:string;
  socialmedialink2:string;
  createdAt:any;
}

function ConverSation({conversation,currentUser}) {
  const [user,setUser] = useState<UserData| null>(null)
  //  console.log('conver',currentUser);
   
 useEffect(()=>{
  const friendId = conversation.members.find((m:string)=>m!==currentUser._id)
  const getUser = async ()=>{
    const res = await getRandomUser(friendId)
    setUser(res?.data.data)
    console.log('res from getuser from chat',res?.data.data)
  }
  getUser()
 },[])

  return (
    <div className='flex gap-5   rounded-md p-1 hover:bg-gray-200 hover:border-gray-400 '>
        <div className=''>
        <img className='w-[40px] rounded-full h-[40px]' src={image} alt="" />
        </div>
        <div className='flex flex-col items-center  justify-center'>
            <span className='text-black font-bold'>{user?.first_name} {user?.last_name}</span>
            <span className='text-black font-bold'>{user?.createdAt}</span>
        </div>
      
    </div>
  )
}

export default ConverSation