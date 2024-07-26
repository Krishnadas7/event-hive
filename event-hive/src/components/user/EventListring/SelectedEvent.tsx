/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import UserNavbar from '../userNavbar/UserNavbar';
import UserFooter from '../UserFooter/UserFooter';
import { useParams } from 'react-router-dom';
import { selectedEvent } from '../../../api/userApi';
import { motion } from 'framer-motion';
import { IEvent } from '../../../types/schema';
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { ticketBooking } from '../../../api/userApi';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';
import TeamAdd from '../../common/TeamAdd';
import { useNavigate } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';

const public_stripe_key = 'pk_test_51PQWx603Z9ZoAMB6ZQFq8S4avHgFoBDXC8fFv1Yjafo5Py2QAoAECKCI6l1MS15aAUHtEuN0dMvpQtbtPcNoksAw00P3AyZUgd';

interface Obj {
    user_id: string;
    event_id: string | undefined;
    company_id: string;
    payment_status: string;
    payment_amount: string;
    ticket_type: string;
    team?: string[];
}

function SelectedEvent() {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [team, setTeam] = useState(false);
    const [book, setBook] = useState(false);
    const params = useParams();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await selectedEvent(params.eventId as string);
            console.log('Event data:', res?.data.data);
            setEvent(res?.data.data[0]);
        };
        fetchData();
    }, [params.eventId]);

    if (!event) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <LineWave
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="line-wave-loading"
                />
            </div>
        );
    }

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
    const formattedDate = dateObj.toLocaleString('en-US', options as any);
    console.log('Formatted Date:', formattedDate);

    const companyDetails = event.companyDetails ? event.companyDetails[0] : null;
    const members: string[] = JSON.parse(localStorage.getItem('teamData') as any) || [];

    const handleRegistration = async (e: React.FormEvent, participants: string) => {
        e.preventDefault();

        // Check if a team is needed and if it is available
        if (participants !== 'individual') {
            if (!members || members.length < 3) {
                setBook(true);
                return;
            }
        }

        let stripePromise;
        const paymentStatus = 'nill';

        // Create the booking object
        const obj: Obj = {
            user_id: userInfo?._id as string,
            event_id: event._id,
            company_id: event.company_id,
            payment_status: paymentStatus,
            payment_amount: event.amount,
            ticket_type: event.ticket
        };

        if (event.participants !== 'individual') {
            obj.team = members;
        }

        try {
            // Book the ticket
            const res = await ticketBooking(obj);
            console.log('Booking response:', res);

            if (res?.data.success) {
                localStorage.removeItem('teamData');

                // If the event requires payment, handle Stripe checkout
                if (event.ticket === 'paid') {
                    try {
                        stripePromise = await loadStripe(public_stripe_key);
                        if (stripePromise) {
                            await stripePromise.redirectToCheckout({
                                sessionId: res.data.data
                            });
                        } else {
                            console.error('Failed to initialize Stripe');
                        }
                    } catch (error) {
                        console.error('Error from Stripe checkout:', error);
                    }
                } else {
                    navigate('/user/success-page');
                }
            } else {
                toast.error(res?.data.message);
            }
        } catch (error) {
            console.error('Error during booking:', error);
        }
    };

    return (
        <>
            <UserNavbar />
            <div className='w-full px-32 mt-36'>
                <div className='h-[510px] rounded-md relative' style={{
                    backgroundImage: `url(${event?.event_poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className='absolute flex max-sm:flex-col top-24 left-16'>
                        {book &&
                            <motion.div
                                initial={{ opacity: 1, y: -300 }}
                                animate={{ opacity: 2, y: 10 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="backdrop-sepia-0 absolute left-[50%] animate-fade-up"
                            >
                                <div
                                    onClick={() => setBook(!book)}
                                    className='absolute rounded-md gap-3 p-4 flex flex-col justify-center bg-red-500 w-[300px] transition-all duration-300 ease-in-out'
                                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                                >
                                    <div className='flex gap-2'>
                                        <FaInfoCircle size={20} className='text-white mt-1' /> <p className='text-white mt-1 font-bold uppercase'>Please create your team</p>
                                    </div>
                                    <div className='w-full'>
                                        <button onClick={() => setBook(false)} className='bg-white font-bold rounded-md w-full px-4 py-1 '>Okay</button>
                                    </div>
                                </div>
                            </motion.div>
                        }
                        <div className='mt-14'>
                            <p className='text-white font-mono dark:text-white text-5xl'>
                                {event?.event_name}
                            </p>
                            <h1 className='mt-8 text-2xl text-white bg-black bg-opacity-40 dark:text-white'>
                                {companyDetails?.company_name}
                            </h1>
                            <p className='max-w-xl max-sm:-ml-16 max-sm:bg-white pb-3 max-sm:px-4 bg-black bg-opacity-40 py-4 max-sm:rounded-md mt-4 max-sm:text-black text-white'>
                                {companyDetails?.company_description}
                            </p>
                        </div>
                        <div className='flex max-sm:mt-1'>
                            <div className={`w-[300px] rounded-md max-sm:bg-gray-100 max-sm:-ml-16 ml-32 max-md:ml-32 bg-white bg-opacity-65 ${event.ticket === 'paid' ? 'h-[300px]' : 'h-[230px]'}`}>
                                <div className='px-5 py-1 flex flex-col gap-2'>
                                    <span className='font-bold'>Date & Time</span>
                                    <p>{formattedDate}</p>
                                    <p>Ticket type: <span className='uppercase font-mono text-black font-bold'>{event.ticket}</span></p>
                                    {event.ticket === 'paid' && (<p className='font-bold text-black'>Rs.{event.amount}</p>)}
                                </div>
                                {event.participants === 'individual' ? (
                                    <div className='w-full h-10 px-5'>
                                        <span>You can join</span>
                                    </div>
                                ) : (
                                    <div className='w-full h-10 px-5'>
                                        <button
                                            className='text-white w-full uppercase py-2 bg-blue-500 px-3 rounded-md'
                                            onClick={() => setTeam(!team)}>Create your team</button>
                                    </div>
                                )}
                                {team && (
                                    <motion.div
                                        initial={{ opacity: 1, y: -300 }}
                                        animate={{ opacity: 2, y: 1 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="relative backdrop-sepia-0 animate-fade-up"
                                    >
                                        <div className='w-[500px] h-[350px] bg-gray-50 border-2 rounded-md absolute right-80 -bottom-24'>
                                            <div className='flex items-center justify-center mt-1 font-mono'>
                                                <h1 className='font-bold uppercase'>Create your team by 4</h1>
                                            </div>
                                            <TeamAdd />
                                        </div>
                                    </motion.div>
                                )}
                                <div className='px-5 flex flex-col gap-3 mt-3'>
                                    <button onClick={(e) => handleRegistration(e, event.participants)} className='h-10 text-white w-full bg-blue-500 rounded-md hover:bg-white hover:text-blue-500 hover:border border-blue-500'>Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserFooter />
        </>
    );
}

export default SelectedEvent;
