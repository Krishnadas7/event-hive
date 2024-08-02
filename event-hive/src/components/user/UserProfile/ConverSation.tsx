import {useEffect, useState} from 'react'
import image from '../../../assets/user-Profile2 (2).jpg'
import {  getRandomUser } from '../../../api/userApi'
import { getNotification } from '../../../api/userApi'

interface UserData{
  _id?:string;
  first_name:string;
  last_name:string;
  bio:string;
  qualification:string;
  socialmedialink1:string;
  socialmedialink2:string;
  createdAt:number;
}
export interface IConversation {
  _id?: string;
  members?: string[];
  unreadCount?: Map<string, number>;
}
export interface UserInfo{
  _id?: string;
  email: string|null;
  name?: string;
  first_name?:string;
  last_name?:string;
  ProfileImg?:string;
  profileImg?:string;
  mobile?: string;
  password?: string;
  createdAt?:string;
  confirm_password?:string;
  timestamp?:number|null;
}


function ConverSation({conversation,currentUser,test}:{conversation:IConversation,currentUser:UserInfo,test:boolean}) {
  const [user,setUser] = useState<UserData| null>(null)
  const [notificationCount,setNotificationCount] = useState<number>(0);
  const idd = user?._id
   
 useEffect(()=>{
  const friendId = conversation?.members?.find((m:string)=>m!==currentUser?._id)
  const getUser = async ()=>{
    if(friendId){
      const res = await getRandomUser(friendId)
      if(res?.success){
      setUser(res?.data)
      }
    }
    
  }
  getUser()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])
 useEffect(()=>{
  const fetchData = async () =>{
    const res = await getNotification()
    if(res?.success){
      const responseData = res?.data?.chat;
      let userList
      if(responseData){
         userList = Object.keys(responseData);
          // Find the specific user ID
    const id = userList?.find((ids: string) => idd === ids);
    
    // Set the notification count for the specific user ID
    if (id) {
      setNotificationCount(responseData[id]);
    }
      }
    }
    
    

  }
  fetchData()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[user,test])
 
  return (
    <div className='flex gap-5   rounded-md p-1 hover:bg-gray-200 hover:border-gray-400 '>
        <div className=''>
        <img className='w-[40px] rounded-full h-[40px]' src={image} alt="" />
        </div>
        <div className='flex w-full  items-center  justify-between px-3'>
            <span className='text-black font-bold'>{user?.first_name} {user?.last_name}</span>
            <span className='text-white bg-red-500 rounded-full px-2  font-bold'>{notificationCount > 0 ? notificationCount : ''}</span>
        </div>
      
    </div>
  )
}

export default ConverSation