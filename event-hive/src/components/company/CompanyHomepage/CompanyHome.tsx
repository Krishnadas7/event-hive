import { useEffect, useState } from 'react';
import CompanyNavbar from '../CompanyNavbar/CompanyNavbar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { liveEvents } from '../../../api/companyApi';
import { Event } from '../../../validations/validationTypes';
import MembersModal from '../../common/Members';
import { closeEvent } from '../../../api/companyApi';
import { MdOutlineRestartAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function CompanyHome() {
  const navigate = useNavigate();
  const { companyInfo } = useSelector((state: RootState) => state.auth);
  const [event, setEvent] = useState(false);
  const [change, setChange] = useState(false);
  const [data, setData] = useState<Event[]>([]);
  const [countdowns, setCountdowns] = useState<{ [key: string]: { days: number; hours: number; minutes: number; seconds: number } }>({});
  console.log(companyInfo,companyInfo._id,'detailfffffff')
  const handleOpenModal = () => {
    setEvent(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await liveEvents(companyInfo._id);
        console.log(companyInfo,companyInfo._id,'detailfffffff')
        setData(res?.data.data);

        // Initialize countdowns for each event
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const initialCountdowns = res?.data.data.reduce((acc: any, event: Event) => {
          acc[event._id as string] = calculateTimeLeft(event.end_date as string, event.ending_time as string);
          return acc;
        }, {});
        setCountdowns(initialCountdowns);
      } catch (error) {
        toast.error('something error');
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyInfo._id, change,event]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const newCountdowns = { ...prevCountdowns };
        data.forEach((event) => {
          newCountdowns[event._id as string] = calculateTimeLeft(event.end_date as string, event.ending_time as string);
        });
        return newCountdowns;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const handleClosing = async (eventId: string) => {
    try {
      const res = await closeEvent(eventId);
      if (res?.data.success) {
        setChange(!change);
      }
      console.log(res?.data.data);
    } catch (error) {
      toast.error('something error');
    }
  };

  // Function to calculate the remaining time
  const calculateTimeLeft = (endDate: string, endingTime: string) => {
    const endDateTime = new Date(`${endDate}T${endingTime}:00`);
    const difference = endDateTime.getTime() - new Date().getTime();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  return (
    <>
      <CompanyNavbar onOpenModal={handleOpenModal} />

      <div className='w-full mt-28 px-40 max-sm:px-2 max-xl:px-2 max-lg:px-2 h-auto relative'>
        {
          data.length < 1 && (<div className='flex items-center justify-center gap-2 h-screen'> 
            <p className='text-blue-500 text-2xl font-bold'>YOU DONT HAVE ANY EVENT!!</p>
            <button className='px-11 bg-blue-500 py-2 text-white rounded-md' onClick={()=>navigate('/company/profile')}>Go and Create</button>
          </div>)
        }
        {data?.map((event) => {
          const timeLeft = countdowns[event._id as string] || { days: 0, hours: 0, minutes: 0, seconds: 0 };

          return (
            <div
              key={event._id}
              className='relative flex flex-col p-3 mt-3 bg-gray-200 rounded-md'
            >
              <img
                src={event.event_poster}
                alt={event.event_name}
                className='h-[400px] object-cover rounded-md w-full'
              />
              <span className={` ${event.live === 'open' ? 'bg-green-600' : 'bg-red-500'} absolute top-3 right-3 rounded-md pl-11 pr-11 font-bold text-white`}>
                {event.live === 'open' ? 'on live' : 'closed'}
              </span>
              {event.live === 'open' && (
                    <div className=' text-black font-bold absolute top-40 bg-white px-5 py-5 left-20 rounded-md bg-opacity-40 text-3xl'>
                      Closing in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </div>
                  )}
              <div className='absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-gray-100 bg-opacity-85'>
                <div className='flex flex-col gap-2 pl-3'>
                  <span className='font-bold text-2xl'>{event.event_name}</span>
                  {/* <span className='font-medium text-gray-500'>CLOSING - {event.end_date} {event.ending_time}</span> */}
                 
                  <div className='flex gap-2'>
                    <MembersModal eventId={event._id as string} type={event.participants as string} />
                    {event.event_type !== 'hackathons' && event.live !== 'closed' && (
                      <div className='flex bg-blue-600 rounded-md px-5'>
                        <MdOutlineRestartAlt className='mt-1 text-white' size={25} />
                        <button onClick={() => navigate(`/company/live-streaming/${event._id}`)} className='text-white'>
                          Start the event
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex flex-col items-end pr-3'>
                  <span className='font-bold'>REGISTRATIONS</span>
                  <span className='text-4xl font-bold font-mono'>
                    {event.registrations?.length}/{event.users_limit}
                  </span>
                  {event.live === 'open' ? (
                    <button onClick={() => handleClosing(event._id as string)} className='rounded-md bg-red-600 font-bold pl-11 py-1 mt-2 pr-11 text-white'>
                      Close
                    </button>
                  ) : (
                    <button className='rounded-md bg-blue-600 pl-11 py-1 font-bold mt-2 pr-11 text-white'>
                      Closed
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CompanyHome;
