import { useState } from 'react'
import UserNavbar from '../../components/user/userNavbar/UserNavbar'
import UserFooter from '../../components/user/UserFooter/UserFooter'
import { useSelector } from 'react-redux'
import { createReport } from '../../api/userApi'
import { RootState } from '../../app/store'
import { Obj } from '../../types/schema'
import {toast} from 'react-hot-toast'


function AboutPage() {
    const [contact,setContact] = useState('')
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    const handleSubmit =async (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        
        if(userInfo){
            const obj:Obj={
                userEmail:userInfo.email as string,
                report:contact
            }
            const res = await createReport(obj)
            if(res?.success){
                setContact('')
                toast.success(res?.message)
            }else{
                toast.error(res?.message)
                return
            }
            
        }  
    }
  return (<>  
    <UserNavbar/>
    <div className='w-full max-sm:flex-col-reverse max-sm:px-4 flex mt-40 bg-gray-50'>
        <div className='flex flex-col gap-4 w-full items-center '>
            <h1 className='text-2xl font-bold max-sm:mt-8'>Contact Us</h1>
            <p className='w-2/3'>For any inquiries or support, please feel free to reach out to us at skrishnadas38@gmail.com or follow us on linkedin</p>
           <textarea value={contact} onChange={(e)=>setContact(e.target.value)}  placeholder='say something about event hive...'
            className='h-52 outline-none rounded-md border p-4 border-blue-400  w-3/5' name="" id=""></textarea>
             <div className='flex justify-center  w-full '>
             <button onClick={(e)=>handleSubmit(e)} className='px-7 w-3/5 py-2 rounded-md bg-blue-500 text-white font-bold '>submit</button>
             </div>
            
        </div>
        <div className='w-full flex gap-3 flex-col'>
          <h1 className='text-2xl font-bold'>Who we Are</h1>
         <p className=''>At EVENT HIVE, we are passionate about connecting tech enthusias
            ts, professionals, and innovators through immersive and dynamic tech events. Our platform serves as a comprehensive hub for hosting hackathons, workshops, webinars, and various tech-related events that foster collaboration, learning, and growth.</p>
          <h1 className='text-2xl font-bold'>OUR MISSION</h1>
          <p>Our mission is to empower the tech community by providing a seamless
             and engaging platform for event creation and participation. We aim to bridge the gap between ideas and execution, bringing together like-minded individuals to solve real-world problems, share knowledge, and drive innovation.</p>
           <h1 className='text-2xl font-bold'>What we offer</h1>
           <ul className='list-disc'>
            <li>Hackathons: Whether you're a seasoned developer or a newbie, our hackathons provide the perfect environment to challenge yourself, collaborate with others, and create groundbreaking solutions.</li>
            <li>Workshops: Learn from industry experts through hands-on workshops that cover the latest technologies, tools, and trends in the tech world.</li>
             <li>Webinars: Join our interactive webinars to gain insights from thought leaders and stay updated on the latest developments in the tech industry.</li>
             <li>Networking Opportunities: Connect with peers, mentors, and potential collaborators to expand your professional network and explore new opportunities.</li>
            </ul>
        </div>

    </div>
    <UserFooter/>
    </>

  )
}

export default AboutPage