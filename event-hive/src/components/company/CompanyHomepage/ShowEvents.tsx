import React, { useEffect, useState } from 'react';
import { getEvent } from '../../../api/companyApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { IEvent } from '../../../types/schema';

function ShowEvents() {
    const { companyInfo } = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState<IEvent[] | null>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await getEvent(companyInfo._id);
            setData(res?.data.data);
        };
        fetchData();
    }, [companyInfo._id]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredEvents = data?.filter((event) =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="border p-4 w-full mt-3 bg-white">
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border border-gray-300 w-full text-gray-700 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents?.map((event, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img className="w-full h-48 object-cover" src={event.event_poster} alt={event.event_name} />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-800">{event.event_name}</h2>
                            <div className="mt-2 bg-gray-100 rounded-md p-2 border border-gray-200">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Starts: {event.start_date} {event.starting_time}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Ends: {event.end_date} {event.ending_time}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Ticket: {event.ticket}</span>
                                    <span>Price: Rs.{event.amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowEvents;
