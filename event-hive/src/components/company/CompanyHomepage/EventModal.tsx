import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FaImage } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import * as Yup from 'yup';
import { createEvent } from '../../../api/companyApi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { toast } from 'react-toastify';
import { eventTypes,EventType,ParticipanyTypes,participantTypes } from '../../../utils/data';
interface EventModalProps {
  onClose: () => void;
}
export interface EventData {
    event_name?:string;
    event_type?:string;
    start_date?:string;
    starting_time?:string;
    end_date?:string;
    ending_time?:string;
    users_limit?:string;
    participants?:string;
    event_description?:string;
    ticket_type?: string;
    ticket_amount?: string;
}


export const EventCreationValidation = Yup.object({
  event_name: Yup.string().required('Please enter event name'),
  event_type: Yup.string().required('Select an event type'),
  start_date: Yup.string().required('Select date'),
  starting_time: Yup.string().required('Select time'),
  end_date: Yup.string().required('Select date'),
  participants:Yup.string(),
  ending_time: Yup.string().required('Select time'),
  users_limit: Yup.string().required('Enter limit'),
  event_description: Yup.string().required('Type description for events'),
  ticket_type: Yup.string().required('Select ticket type'),
  ticket_amount: Yup.string().required('select'),
});
function EventModal({onClose}:EventModalProps) {
    const [selectedImage,setSelectedImage] = useState<string | null>(null)
    const [imageFile,setimageFile] = useState<File | null >()
    const {companyInfo} = useSelector((state:RootState)=>state.auth)
  
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | null) =>{
        if(e && e.target.files && e.target.files.length>0){
            const file = e.target.files[0]
            console.log('fileee==',file)
            if(file){
                const imageUrl = URL.createObjectURL(file)
                setSelectedImage(imageUrl)
                console.log('fileee==',file)
                setimageFile(file)
            }
        }
      }
      const formik = useFormik({
        initialValues:{
            event_name:'',
            event_type:'',
            start_date:'',
            starting_time:'',
            end_date:'',
            ending_time:'',
            participants:'individual',
            users_limit:'',
            event_description:'',
            ticket_type: 'free',
            ticket_amount: ''
        },
        
        onSubmit: async (values:EventData) =>{
            const formData = new FormData()
            Object.keys(values).forEach(key =>{
              const value = values[key as keyof EventData];
              if (value !== undefined) {
                  formData.append(key, value);
              }
            })
            if(imageFile){
              if(companyInfo && companyInfo._id){
                formData.append('event_poster',imageFile)
                formData.append('company_id',companyInfo._id)
              } 
            }
            const res = await createEvent(formData as EventData)
            console.log(res,'=====================')
            if(res?.success){
              onClose()
              toast.success(res?.message)
            }else{
              toast.error(res?.message)
            }
        }
      })
  return (
    <motion.div
    initial={{ opacity: 1, y: -300 }}
    animate={{ opacity: 1, y: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="  backdrop-sepia-0  animate-fade-up"
  >
    <div className='w-full bg-white'>
    <div className='flex items-center justify-center'>
      <span className='text-2xl mt-3 text-gray-700 font-semibold'>Create Event</span>
    </div>
    <form action="" onSubmit={formik.handleSubmit}>
      <div className='bg-white'>
        <div className='flex flex-col px-10 gap-2 mt-5'>
          <label htmlFor="" className='text-gray-400'>Event Name <span className='font-bold text-black'>:</span> </label>
          <input onChange={formik.handleChange} value={formik.values.event_name} name='event_name' type="text" className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500' />
          <p className='text-gray-400'>Title of your event (example: Tech conference 2024)</p>
        </div>
        <div className='flex flex-col px-10 gap-2 mt-5'>
          <label htmlFor="" className='text-gray-400'>Event Type <span className='font-bold text-black'>:</span> </label>
          <select
            onChange={formik.handleChange}
            value={formik.values.event_type}
            name='event_type'
            className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500'
          >
            {eventTypes.map((eventType: EventType, index: number) => (
              <option key={index} value={eventType.value} disabled={eventType.disabled}>
                {eventType.label}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col px-10 gap-2 mt-5'>
          <label htmlFor="" className='text-gray-400'>Participants <span className='font-bold text-black'>:</span> </label>
          <select
            onChange={formik.handleChange}
            value={formik.values.participants}
            name='participants'
            className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500'
          >
            {participantTypes?.map((participantTypes: ParticipanyTypes, index: number) => (
              <option key={index} value={participantTypes.value} >
                {participantTypes.label}
              </option>
            ))}
          </select>
        </div>
        <div className='flex px-10 gap-8 mt-5'>
          <div className='flex-col'>
            <label htmlFor="" className='text-gray-400'>Event Starts <span className='font-bold text-black'>:</span> </label>
            <input onChange={formik.handleChange} value={formik.values.start_date} name='start_date' type="date" className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500' />
          </div>
          <div className='flex'>
            <div className="mt-6">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                </svg>
              </div>
              <input onChange={formik.handleChange} value={formik.values.starting_time} name='starting_time' type="time" id="time" className="h-10 border leading-none border-gray-400 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 outline-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
          <div className='flex-col'>
            <label htmlFor="" className='text-gray-400'>Event Ends <span className='font-bold text-black'>:</span> </label>
            <input onChange={formik.handleChange} value={formik.values.end_date} name='end_date' type="date" className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500' />
          </div>
          <div className='flex'>
            <div className="mt-6">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                </svg>
              </div>
              <input onChange={formik.handleChange} value={formik.values.ending_time} name='ending_time' type="time" id="time" className="h-10 border leading-none border-gray-400 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 outline-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
        </div>
        <div className='flex flex-col px-10 gap-2 mt-5'>
          <label htmlFor="" className='text-gray-400'>Users Limit <span className='font-bold text-black'>:</span> </label>
          <input onChange={formik.handleChange} value={formik.values.users_limit} name='users_limit' type="number" max={100} className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500' />
        </div>
        <div className='flex flex-col px-10 gap-2 mt-5'>
          <label htmlFor="" className='text-gray-400'>Ticket Type <span className='font-bold text-black'>:</span> </label>
          <div className='flex gap-4'>
            <label>
              <input
                type='radio'
                name='ticket_type'
                value='free'
                checked={formik.values.ticket_type === 'free'}
                onChange={formik.handleChange}
              /> Free
            </label>
            <label>
              <input
                type='radio'
                name='ticket_type'
                value='paid'
                checked={formik.values.ticket_type === 'paid'}
                onChange={formik.handleChange}
              /> Paid
            </label>
          </div>
        </div>
        {formik.values.ticket_type === 'paid' && (
          <div className='flex flex-col px-10 gap-2 mt-5'>
            <label htmlFor="" className='text-gray-400'>Ticket Amount <span className='font-bold text-black'>:</span> </label>
            <input onChange={formik.handleChange} value={formik.values.ticket_amount} name='ticket_amount' type="number" className='w-full h-10 pl-2 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500' />
          </div>
        )}
        <div className='flex flex-col px-10 gap-2 pb-5 mt-5'>
          <label htmlFor="" className='text-gray-400'>Add a cover image for your event <span className='font-bold text-black'>:</span> </label>
          <div className='w-full gap-4 h-[300px] p-3 flex flex-col border-gray-400 border-dashed border-4 justify-center items-center'
            style={{
              backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            {!selectedImage && (
              <>
                <FaImage className='bg-white text-blue-500' size={100} />
                <p className='text-gray-500 font-semibold'>pick an image from your computer for upload</p>
                <div className='h-[100px] rounded-md w-[200px] border-2 flex border-blue-500'>
                  <MdFileUpload size={20} className='text-blue-500 mt-2 ml-4' />
                  <p className='text-gray-600 font-semibold mt-1 ml-2'>upload your own
                  </p>
                </div>
              </>
            )}
            <input type="file" name='event_poster' onChange={handleImageChange} className='w-full opacity-0 h-[300px] p-3 rounded-md border-gray-400 outline-none border-dashed border-4 focus:border-blue-500' />
          </div>
        </div>
        <div className='flex flex-col px-10 gap-2 pb-4 mt-3'>
          <label htmlFor="" className='text-gray-400'>Event Description<span className='font-bold text-black'>:</span> </label>
          <textarea onChange={formik.handleChange} value={formik.values.event_description} name='event_description' className='w-full h-[200px] p-4 rounded-md border-gray-400 outline-none border-2 focus:border-blue-500' />
        </div>
        <div className='flex flex-col px-10 gap-2 pb-4 mt-5'>
          <button type='submit' className='pl-4 pr-3 h-10 bg-blue-500 text-white'>save and continue</button>
        </div>
      </div>
    </form>
  </div>
  </motion.div>
  )
}

export default EventModal