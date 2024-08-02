import React, { useEffect, useState } from 'react';
import image from './../../../assets/event_1.jpg';
import { getEventWithCompany, blockEvent } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import { IEvent } from '../../../types/schema';
import { LineWave } from 'react-loader-spinner';

const EventList = () => {
  const [data, setData] = useState([]);
  const [block, setBlock] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEventWithCompany();
      setData(res?.data);
    };
    fetchData();
  }, [block,loading]);

  const handleBlock = async (eventId: string) => {
    setLoading(true)
      const res = await blockEvent(eventId);
      if(!res.success){
        toast.error(res?.message);
        return
      }
      setBlock(!block);
      toast.success(res?.message);
      setLoading(false)
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };
  let filteredEvents
  if(data && data.length>0){
     filteredEvents = data?.filter((event:IEvent) => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);
      const startDateFilter = startDate ? new Date(startDate) : null;
      const endDateFilter = endDate ? new Date(endDate) : null;
  
      return (
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!startDateFilter || eventStartDate >= startDateFilter) &&
        (!endDateFilter || eventEndDate <= endDateFilter)
      );
    });
  }
  

  return (
    <div className={`${loading ? 'opacity-65' : ''}container mx-auto px-4 py-8`}>
      {loading && (
       <div className='w-full opacity-80 absolute h-screen flex items-center justify-center'>
       <LineWave 
               visible={true}
               height="100"
               width="100"
               color="#4fa94d"
               ariaLabel="line-wave-loading"
               wrapperStyle={{}}
               wrapperClass=""
               firstLineColor=""
               middleLineColor=""
               lastLineColor=""
               />
   </div>
    )}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search events"
          className="w-full max-w-lg p-2 border outline-none border-gray-300 rounded-full"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="flex items-center gap-4">
          <input
            type="date"
            className="p-2 border outline-none border-gray-300 rounded-md"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className="p-2 border outline-none border-gray-300 rounded-md"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div className={`${loading ? 'opacity-75' : ''} relative grid  grid-cols-1 sm:grid-cols-2 bg-gray-200 lg:grid-cols-3 gap-4`}>
      
        {filteredEvents?.map((details:IEvent, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
          >
            <img className="w-full h-48 object-cover object-center" src={details.event_poster ? details.event_poster : image} alt="" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{details.event_name}</h3>
              <p className="text-gray-600">{details.companyDetails[0]?.company_website}</p>
              <p className="text-gray-600">{details.companyDetails[0]?.country}</p>
              <div className="flex justify-between mt-4">
                <span className="text-gray-600">Open: {details.start_date}</span>
                <span className="text-gray-600">Close: {details.end_date}</span>
              </div>
              <div className="mt-4">
                {details.is_block ? (
                  <button
                    onClick={() => handleBlock(details._id as string)}
                    className="w-32 h-8 font-bold bg-green-600 text-white rounded"
                  >
                    UNBLOCK
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(details._id as string)}
                    className="w-32 h-8 font-bold bg-red-600 text-white rounded"
                  >
                    BLOCK
                  </button>
                )}
              </div>
              <div className="mt-4">
                <p className="text-gray-700">Description:</p>
                <p className="text-gray-700">
                  This event planned to showcase our views to all developers...
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
