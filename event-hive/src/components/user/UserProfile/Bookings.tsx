import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allBookings } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Booking } from '../../../validations/validationTypes';

const TABLE_HEAD = ["SL/NO", "Booking Date", "Payment Status", "Ticket","Amount"];

// Function to format date in the desired format
const formatBookingDate = (dateString: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const bookingDate = new Date(dateString);
  const dayOfWeek = days[bookingDate.getDay()];
  const month = months[bookingDate.getMonth()];
  const dayOfMonth = bookingDate.getDate();
  const year = bookingDate.getFullYear();
  const hours = bookingDate.getHours().toString().padStart(2, '0');
  const minutes = bookingDate.getMinutes().toString().padStart(2, '0');
  const seconds = bookingDate.getSeconds().toString().padStart(2, '0');
  
  return `${dayOfWeek} ${month} ${dayOfMonth} ${year} ${hours}:${minutes}:${seconds}`;
};

function Bookings() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [booking, setBooking] = useState<Booking[]>([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allBookings(userInfo._id);
        console.log('Booking data:', res.data.data);
        setBooking(res?.data.data);
      } catch (error) {
        toast.error('Something went wrong while fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg border border-gray-300 mb-10 mr-3 mt-[50px] ml-5">
      <div className='flex justify-center items-center py-2'>
        <h1 className='text-2xl text-black font-bold'>Bookings</h1>
      </div>
      <div className="overflow-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="border bg-blue-400 border-blue-gray-200 bg-blue-gray-50 p-2">
                  <span className="text-sm text-blue-gray-500 text-white font-medium">{head}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {booking.map((data, index) => (
              <tr key={index}>
                <td className='p-2 border-b border-blue-gray-200'>
                  <div className="flex text-black items-center gap-3">
                    {index + 1}
                  </div>
                </td>
                <td className='p-2 border-b border-blue-gray-200'>
                  <span className="text-sm text-blue-700">{formatBookingDate(data.booking_date)}</span>
                </td>
                <td className='p-2 border-b border-blue-gray-200'>
                  <span className={`text-sm text-blue-700 ${data.payment_status=='completed' ? 'text-green-500' : 'text-red-600'}`}>{data.payment_status}</span>
                </td>
                <td className='p-2 border-b border-blue-gray-200'>
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center flex-col">
                      <button className='text-black'>{data.ticket_type}</button>
                    </div>
                  </div>
                </td>
                <td className='p-2 border-b border-blue-gray-200'>
                  <span className="text-sm text-blue-700">Rs.{data.payment_amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
