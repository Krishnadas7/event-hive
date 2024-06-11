import React, { useEffect, useState } from 'react';
import UserNavbar from '../userNavbar/UserNavbar';
import UserFooter from '../UserFooter/UserFooter';
import { useParams } from 'react-router-dom';
import { selectedEvent } from '../../../api/userApi';
import { IEvent } from '../../../types/schema';
import image from '../../../assets/WhatsApp Image 2023-10-05 at 11.29.42 PM.jpeg'

function SelectedEvent() {
    const [event, setEvent] = useState<IEvent[]>([]);
    const params  = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await selectedEvent(params.eventId as string);
            console.log('====', res?.data.data);
            setEvent(res?.data.data[0]);
        }
        fetchData();
    }, []);
    const dateObj = new Date(event.start_date);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      const formattedDate = dateObj.toLocaleString('en-US', options);
    console.log('form ',formattedDate)
    const companyDetails = event.companyDetails ? event.companyDetails[0] : null;
    return (
        <>
            <UserNavbar />
            <div className='w-full px-32 mt-36'>
                <div className='h-[510px] rounded-md relative' style={{
                    backgroundImage: `url(${event.event_poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className='absolute flex max-sm:flex-col top-24 left-16'>
                        <div className='mt-14'>
                        <p  className='text-white  font-mono dark:text-white text-5xl'>
                        {event.event_name}
                        </p>
                    <h1 className='mt-8  text-2xl  text-white dark:text-white'>
                    {companyDetails?.company_name}
                    </h1>
                    <p className='max-w-xl max-sm:-ml-16 max-sm:bg-white pb-3 max-sm:px-4 py-4 max-sm:rounded-md mt-4 max-sm:text-black text-white'>
                         {companyDetails?.company_description}
                    </p>
                        </div>
                        <div className='flex max-sm:mt-1'>
                            <div className='w-[300px] rounded-md max-sm:bg-gray-100 max-sm:-ml-16  ml-32 max-md:ml-32 bg-white h-[300px]'>
                                     <div className='px-5 py-5 flex flex-col gap-5'>
                                        <span className='font-bold'>Date & Time</span>
                                        <p>{formattedDate}</p>
                                     </div>
                                     <div className='px-5 flex flex-col gap-5 mt-6' >
                                       <button className='h-10 text-white w-full bg-blue-500 rounded-md
                                        hover:bg-white hover:text-blue-500 hover:border border-blue-500'>BOOK NOW</button>
                                       <button className='h-10 text-blue-500 w-full bg-white border border-blue-500 rounded-md
                                       hover:bg-blue-500 hover:text-white
                                       '>BOOK NOW</button>
                                       <button className='h-10  text-gray-500'>No Refund</button>
                                     </div>
                            </div>
                        </div>
                   
                    </div>
                </div>
            </div>
            <div className='w-full flex gap-6 justify-start flex-col max-sm:mt-[610px] md:mt-20 px-28'>
                <h1 className='text-2xl font-semibold dark:text-black font-mono '>DESCRIPTION</h1>
                    <p className='leading-7 font-normal'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            </div>
            <UserFooter />
        </>
    )
}

export default SelectedEvent;
