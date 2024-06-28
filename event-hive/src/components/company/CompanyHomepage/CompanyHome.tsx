import React, { useEffect, useState } from 'react';
import CompanyNavbar from '../CompanyNavbar/CompanyNavbar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { liveEvents } from '../../../api/companyApi';
import { Event } from '../../../validations/validationTypes';
import MembersModal from '../../common/Members';
import { closeEvent } from '../../../api/companyApi';

function CompanyHome() {
  const { companyInfo } = useSelector((state: RootState) => state.auth);
  const [event, setEvent] = useState(false);
  const [change,setChange] = useState(false)
  const [data, setData] = useState<Event[]>([]);
 console.log('data from homepage',data)
  const handleOpenModal = () => {
    setEvent(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await liveEvents(companyInfo._id);
        setData(res?.data.data);
      } catch (error) {
        toast.error('something error');
      }
    };
    fetchData();
  }, [companyInfo._id,change]);

  const handleClosing = async (eventId:string) =>{
     try {
        const res = await closeEvent(eventId)
        if(res?.data.success){
          setChange(!change)
        }
        console.log(res?.data.data)
     } catch (error) {
      
     }
  }
  return (
    <>
      <CompanyNavbar onOpenModal={handleOpenModal} />
      <div className='w-full mt-28 px-40 max-sm:px-2 max-xl:px-2 max-lg:px-2 h-auto'>
        {data?.map((event) => (
          <div
            key={event._id}
            className='relative flex  flex-col p-3 mt-3 bg-gray-200 rounded-md'
          >
            <img
              src={event.event_poster}
              alt={event.event_name}
              className='h-[400px] object-cover rounded-md w-full'
            />
            <span className={ ` ${event.live =='open' ? 'bg-green-600' :'bg-red-500'}absolute  top-3 right-3 rounded-md pl-11 pr-11 font-bold text-white`}>
              {event.live == 'open' ? 'on live' : 'closed'}
            </span>
            <div className='absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-gray-100 bg-opacity-85'>
              <div className='flex flex-col gap-2 pl-3'>
                <span className='font-bold   text-2xl'>{event.event_name}</span>
                <span className='font-medium text-gray-500'>CLOSING - {event.end_date}</span>
                  <MembersModal eventId={event._id}/>
              </div>
              <div className='flex flex-col items-end pr-3'>
                <span className='font-bold'>REGISTRATIONS</span>
                <span className='text-4xl font-bold font-mono'>
                  {event.registrations?.length}/{event.users_limit}
                </span>
                {
                  event.live=='open' ? ( <button onClick={()=>handleClosing(event._id as string)} className='rounded-md bg-red-600 font-bold pl-11 py-1 mt-2 pr-11  text-white'>
                  Close
                </button>) : (
                  <button  className='rounded-md  bg-blue-600 pl-11 py-1 font-bold mt-2 pr-11  text-white'>
                  Closed
                </button>
                )
                }
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CompanyHome;
