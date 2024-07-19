import successIcon from '../../../assets/booking-success-icon.png'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className='flex px-60 max-sm:px-0 h-screen items-center justify-center'>
        <div className='w-full flex-col gap-4 flex items-center justify-center'>
        <img className='' src={successIcon} alt="" style={{
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: 'center', // Centers the image in the div
        backgroundRepeat: 'no-repeat' // Prevents the image from repeating
     }}/>
     <p className='text-2xl font-bold'>Yours Booking successfully completed
     </p>
     <div className='flex border rounded-md border-black px-5 py-2' onClick={()=>navigate('/')}>
     <FaHome className='' size={25}/>
     <button className='px-1 hover:ease-in transition transform duration-75 font-bold bg-transparent text-black '> 
        GO HOME
     </button>
     </div>
     
        </div>
    </div>
  )
}

export default SuccessPage