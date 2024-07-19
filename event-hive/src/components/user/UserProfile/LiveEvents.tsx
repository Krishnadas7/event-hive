import { useEffect, useMemo, useCallback, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { liveListing } from '../../../api/userApi';
import { Booking } from '../../../validations/validationTypes';
// import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
// import { connectSocket,disconnectSocket } from '../../../slices/authSlice';

function LiveEvents() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [roomModal, setRoomModal] = useState(false);
  // const navigate = useNavigate()
  // const dispatch = useDispatch();
  const [booking, setBooking] = useState<Booking[]>([]);
//  const socket = useMemo(() => io('ws://localhost:8900'), []);
  // const {socket} = useSelector((state: RootState) => state.auth);
  const [email,setEmail] = useState('')
  const [room,setRoom] = useState('')
  // useMemo(() => {
  //   dispatch(connectSocket());
  // }, []);
  // useEffect(()=>{
  //   socket.connect('connect',()=>{
  //     console.log('socket connected in live events');
      
  //   })
  // },[])
  // const handleRoomJoined =useCallback(({roomId}:{roomId:string}) =>{
  //  navigate(`/user/room/${roomId}`)
  // },[navigate])
  // useEffect(()=>{
  //  socket.on('joined-room',handleRoomJoined)
  //  return () =>{
  //   socket.off('joined-room',handleRoomJoined)
  //  }
  // },[socket,handleRoomJoined])
  
  // const handleJoinRoom = () =>{
  //  socket.emit('join-room', { emailId: email, roomId: room });
  // }

  useEffect(() => {
    const fetchData = async () => {
      const res = await liveListing(userInfo._id);
      if (res?.data.success) {
        setBooking(res.data.data);
      }
      console.log('====dsdsds=====', res?.data.data);
    };
    fetchData();
  }, [userInfo._id]);

  const openRoomModal = () => {
    setRoomModal(!roomModal);
  };

  return (
    <div className="bg-white shadow-lg border border-gray-300 mb-10 mr-3 mt-[50px] ml-5">
      {booking?.map((event) => (
        <div key={event._id} className='px-3 relative flex py-3'>
          <div>
            <img className='object-contain  h-[300px] w-[400px]' src={event.eventDetails.event_poster} alt="" />
          </div>
          <div className='pl-4'>
            <ul className='gap-3 flex flex-col mt-7'>
              <li className='text-black font-semibold'>
                {event?.eventDetails?.event_name}
              </li>
              <li className='max-w-xl font-normal text-base text-gray-900'>
                {event?.eventDetails?.event_description}
              </li>
              <li className='max-w-xl font-bold text-base text-gray-900'>
               started : {event?.eventDetails?.start_date.split('T')[0]}  
              </li>
              <li className='max-w-xl font-bold text-base text-gray-900'>
                close date : {event?.eventDetails?.end_date.split('T')[0]}  
              </li>
              <li className='bg-yellow-100 px-5 py-2 rounded-md text-black uppercase font-bold'>
                 we will inform through email {userInfo.email}
              </li>
            </ul>
            <div className='w-full mt-5'>
              {/* <button onClick={openRoomModal} className='rounded px-4 py-1 bg-red-500 text-white font-bold'></button> */}
              {roomModal && (
                <div className='left-[50%] bottom-3 absolute'>
                  <div className='flex items-center bg-blue-400 py-4 px-6 justify-center'>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor="" className='text-black'>Enter your email</label>
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' className='text-black border rounded-md border-black outline-none py-2 px-4' />
                      <label htmlFor="" className='text-black'>Enter your room ID</label>
                      <input type="text" value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='Enter room' className='text-black border rounded-md border-black outline-none py-2 px-4' />
                      <button  className='font-bold text-white border-white border rounded-md py-2'>Enter</button>
                      {/* onClick={()=>handleJoinRoom()} */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LiveEvents;
