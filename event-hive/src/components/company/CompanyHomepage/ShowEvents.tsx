import React, { useEffect, useState } from 'react';
import { getEvent } from '../../../api/companyApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { IEvent } from '../../../types/schema';
import image from '../../../assets/event Image.jpg';

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
        <div className="border relative pl-3 w-full mt-3 bg-white">
            <div className="flex justify-center my-4 px-9">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border border-black w-full text-black rounded-md outline-none"
                />
            </div>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-6 mt-4">
                {filteredEvents?.map((event, index) => (
                    <div key={index} className="flex flex-col gap-2 bg-white p-3">
                        <div>
                            <img className="w-full h-[200px]" src={event.event_poster} alt="" />
                        </div>
                        <div className="flex flex-col gap-5 text-black">
                            <div className="flex flex-col">
                                <span className="font-bold">{event.event_name}</span>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{event.start_date} {event.starting_time}</span>
                                    {/* <span className="bg-green-500 pl-3 pr-3 rounded-md text-white">Active</span> */}
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
