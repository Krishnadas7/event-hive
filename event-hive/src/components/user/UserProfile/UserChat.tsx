/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import ConverSation from './ConverSation';
import Message from './Message';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './userChat.css';
import { RootState } from '../../../app/store';
import {io} from 'socket.io-client'
import { IoIosSearch } from "react-icons/io";
import { allUsers } from '../../../api/userApi';
import { IUser } from '../../../types/schema';
import { BsFillSendFill } from "react-icons/bs";
import image from '../../../assets/Two hands holding phones with messages in speech bubbles.jpg'


function UserChat() {
  const [conversation, setConversation] = useState([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalmessage,setArrivalMessage] = useState<any>(null)
  const [messages, setMessages] = useState<any>([]);
  const [allusers,setAllUsers] = useState<IUser[]>([])
  const socket = useRef<any>(undefined);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [change,setChange] = useState(false)
  const [test,setTest] = useState(false)
  
  const testFalse = ()=>{
    setTest(!test)
  }
  const filteredUsers = allusers?.filter(user => 
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

      useEffect(()=>{
          socket.current =io('http://localhost:3003')
          socket.current.on('getMessage',(data:any)=>{
           setArrivalMessage({
            sender:data.senderId,
            text:data.text,
            createdAt: Date.now()
           })
          })
      },[])
        useEffect(()=>{
        const fetchData = async () =>{
          const res = await allUsers()
          console.log('users from chat collections',res?.data.data)
          setAllUsers(res?.data.data);

        }
        fetchData()
        },[])
        console.log('all users===',allusers)
      useEffect(()=>{
       arrivalmessage &&
        currentChat?.members.includes(arrivalmessage.sender) &&
       setMessages((prev:any)=>[...prev,arrivalmessage])
      },[arrivalmessage,currentChat])

    useEffect(()=>{
    socket.current.emit("addUser",userInfo?._id)
    socket.current.on("getUser",(users:any)=>{
      console.log('users==',users)
    })
    },[userInfo])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/api/conversation?userId=${userInfo?._id}`);
        console.log('from conversattion',res.data.data)
        
        setConversation(res?.data.data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    getData();
  }, [userInfo?._id,change]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/api/message?conversationId=${currentChat?._id}`,{
          withCredentials:true
        });
        console.log('res from current chat',res.data.data);
        
        setMessages(res.data.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    if (currentChat) {
      getMessage();
    }
  }, [currentChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    testFalse()
    const message = {
      conversationId: currentChat._id,
      sender: userInfo?._id,
      text: newMessage
    };
    const receiverId = currentChat.members.find((member:string)=>member!==userInfo?._id)
     socket.current.emit('sendMessage',{
      senderId:userInfo?._id,
      receiverId,
      text:newMessage
     })

    try {
      const res = await axios.post('http://localhost:3003/api/message', message);
      setMessages([...messages, res.data.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  const handleConversation = async (userId:string) =>{
    const obj={
      senderId:userInfo?._id,
      receiverId:userId
    }
    const res = await axios.post('http://localhost:3003/api/conversation',obj)
    console.log('res from rsss===',res)
    setSearchQuery('')
    setChange(!change)
  }

  
 
  return (
    <div className='flex rounded-md  gap-4  shadow-lg border border-gray-300 h-screen fixed w-4/5 mt-[17px] p- pr-5'>
      <div className='flex flex-col bg-white rounded-md w-[300px]'>
        <div className='p-1 rounded-full flex  border border-black mt-1 ml-2 mr-2'> 
        <IoIosSearch className='text-black ml-2 mt-1' size={30}/>
        <input
            type="text"
            className='outline-none rounded-full h-8 w-full  pl-3 placeholder-white text-black'
            placeholder='search..'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='mt-2 absolute top-8 z-50  '>
        {searchQuery && (
          <div className='mt-2 w-[250px] ml-5 bg-white  p-2 rounded-md'>
            {filteredUsers.map((user) => (
              <div key={user._id} onClick={()=>handleConversation(user._id as string)} className='flex items-center  p-2  w-full'>
                <span className='text-black hover:text-gray-500 font-bold'>{user.first_name} {user.last_name} </span>
              </div>
            ))}
          </div>
        )}
        </div>
        {conversation.map((c:any) => (
          <div className='mt-2 ' key={c._id} onClick={() => setCurrentChat(c)}>
            <ConverSation test={test} conversation={c}  currentUser={userInfo} />
          </div>
        ))}
      </div>
      <div className='flex flex-col bg-white p-2 rounded-md flex-1'>
        {currentChat ? (
          <>
            <div className='flex flex-col h-[480px] overflow-y-auto hide-scrollbar'>
              {messages.map((m:any, index:number) => (
                <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                  <Message message={m} own={m.sender === userInfo?._id} />
                </div>
              ))}
            </div>
            <div className='flex mt-6 bottom-0'>
              <div className='flex w-full gap-2 flex-1 px-5 '>
              <textarea
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                className='w-full rounded-full border-gray-800 
                outline-none bg-transparent border-2  text-gray-700 h-11 pl-4 pt-2'
                placeholder='Type here...'
              />
              <button onClick={handleSubmit} className='text-black h-[40px] w-[60px] flex
               justify-center items-center   rounded-full border-gray-800  border'>
             <BsFillSendFill className='text-blue-500' size={20}/>
              </button>
              </div>
            </div>
          </>
        ) : (
          <div className='flex p-24 h-screen'>
           <img className='object-cover relative ' src={image} alt="" />
           {/* <span className='absolute  text-black'>Open a new conversation</span> */}
          </div>
         
        )}
      </div>
    </div>
  );
}

export default UserChat;
