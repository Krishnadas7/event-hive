import React, { useEffect, useState } from 'react';
import image from '../../../assets/square11.jpg'
import { profileImageUpload, userData } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
// import PencilIcon from '../../common/PencilIcon';
// import Modal from '../../common/ImageCropModal';
import ViewData from './Selections/ViewData';
import EditData from './Selections/EditData';
import { setCredential } from '../../../slices/authSlice';
import { useDispatch } from 'react-redux';
// Define UserProfile interface
interface UserProfile {
  _id?: string;
  email: string; // Removed null and undefined to ensure email is always a string
  first_name: string;
  last_name: string;
  profileImg?: string;
  qualification?: string;
  bio?: string;
  socialmedialink1?: string;
  socialmedialink2?: string;
}


// Component for displaying and editing user details
function UserDetails() {
  const [imageSrc,setImagesrc] = useState<string | null>(null)
  const [file,setFile] = useState<File | null>(null)
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<UserProfile | null>(null);
  // const avatarUrl = useRef(image);
  // const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
 const dispatch = useDispatch()
  // const updateAvatar = (imgSrc: string) => {
  //   avatarUrl.current = imgSrc;
  // };
  function handleImageChange(e:React.ChangeEvent<HTMLInputElement>){
      const file  = e.target.files?.length ? e.target.files[0] : null
      if(file){
        setFile(file)
        setImagesrc(URL.createObjectURL(file))
      }
      
  }
  useEffect(()=>{
    console.log('userInfooooooo',userInfo);
    
      if(userInfo?.profileImg){
        console.log('profile link',userInfo.profileImg)
        setImagesrc(userInfo?.profileImg)
      }
  },[])
  async function handleSave(){
      if(!file){
        return 
      }
      const formData = new FormData();
      formData.append('image',file)
      if(userInfo && userInfo._id && userInfo.email){
        formData.append('id', userInfo._id);
     formData.append('email',userInfo.email)
     }
      const res = await profileImageUpload(formData)
      if(res?.success){
        alert('updated successfully')
        console.log('data from response == ',res?.data)
        dispatch(setCredential({...res?.data}))
      }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        const res = await userData(userInfo.email as string);
        console.log('userdata',res);
        
        if(res?.success){
        setData(res?.data);
        }
      }
    };
    fetchData();
  }, [userInfo]);
  console.log('image froms src ',imageSrc)
  
  return (
    <div className="bg-white shadow-lg border border-gray-300 mb-10 mr-3 mt-[15px]">
      <div className=' w-full gap-2  flex flex-col items-center justify-center'>
      <div className="rounded-full  h-[200px] w-[200px] relative" 
  style={{
    backgroundImage: `url(${imageSrc || image})`, // This will use the imported image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
  
>
  <input
    type="file" onChange={handleImageChange}
    className="opacity-0 h-[200px] w-[200px]"
  />
</div>

            <div>
              <button onClick={handleSave} className='bg-blue-600 px-4 py-2 rounded-md  text-white'>Save</button>
            </div>
      </div>
      <div>
        <div className="tabs ">
          <div className="tab-list flex border-b ">
            <button
              className={`tab w-[300px]  flex items-center justify-center text-black ${activeTab === 0 ? 'border-b-8 border-slate-300' : ''} p-4`}
              onClick={() => setActiveTab(0)}
            >
              Profile
            </button>
            <button
              className={`tab w-[300px] flex items-center justify-center text-black ${activeTab === 1 ? 'border-b-8 border-slate-400' : ''} p-4`}
              onClick={() => setActiveTab(1)}
            >
              Edit
            </button>
          </div>
          <div className="tab-content">
            {data && activeTab === 0 && <ViewData data={data} />}
            {data && activeTab === 1 && <EditData data={data} setData={setData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
