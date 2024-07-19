import { FaFacebook, FaLinkedin} from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ViewData({data}:any) {  
  return (
    <div className="  h-auto p-6 bg-slate-200">
             <div className="space-y-4">
               <div className="flex items-center ">
                 <p className="text-black font-semibold w-32">First Name:</p>
                 <p className="text-black">{data?.first_name}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Last Name:</p>
                 <p className="text-black">{data?.last_name}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Email:</p>
                 <p className="text-black">{data?.email}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Mobile:</p>
                 <p className="text-black">{data?.mobile}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Qualification:</p>
                 <p className="text-black">{data?.qualification}</p>
               </div>
               <div className="flex items-center">
                 <p className="text-black font-semibold w-32">Bio:</p>
                 <p className="text-black">{data?.bio}</p>
               </div>
             </div>
             <div className="flex mt-4 space-x-4">
               <a href={data?.socialmedialink1} className="text-black " target="_blank" rel="noopener noreferrer">
                 <FaFacebook size={24} />
               </a>
               <a href={data?.socialmedialink2} className="text-black" target="_blank" rel="noopener noreferrer">
                 <FaLinkedin size={24} />
               </a>
             </div>
           </div>
  )
}

export default ViewData