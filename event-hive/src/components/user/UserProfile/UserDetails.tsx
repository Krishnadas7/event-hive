import React, { useEffect, useState, useRef } from 'react';
import image from '../../../assets/user-Profile2 (2).jpg';
// import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";
// import { useFormik } from 'formik';
import {  userData } from '../../../api/userApi';
// import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import PencilIcon from '../../common/PencilIcon';
import Modal from '../../common/ImageCropModal';
import ViewData from './Selections/ViewData';
import EditData from './Selections/EditData';

interface UserData {
  first_name: string;
  last_name: string;
  bio: string;
  email:string;
  mobile:string;
  qualification: string;
  socialmedialink1: string;
  socialmedialink2: string;
}



function UserDetails() {
  // const [edit, setEdit] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const avatarUrl = useRef(image);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const updateAvatar = (imgSrc: any) => {
    avatarUrl.current = imgSrc;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await userData(userInfo.email);
      setData(res.data.data);
      console.log('details from userdetails',res.data.data)
    }; 
    fetchData();
  }, [userInfo.email]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setImageFile(e.target.files[0]);
  //   }
  // };

  // const { values: editValues, handleChange: editChange, handleSubmit: editSubmit, errors: editErrors, touched: editTouched } = useFormik({
  //   initialValues: {
  //     first_name: '',
  //     last_name: '',
  //     qualification: '',
  //     bio: '',
  //     socialmedialink1: '',
  //     socialmedialink2: '',
  //   },
  //   enableReinitialize: true,
  //   onSubmit: async (values) => {
  //     try {
  //       const res = await updateProfile(values);
  //       if (res.data.success) {
  //         // setData(res.data.data);
  //         setEdit(!edit);
  //         toast.success(res.data.message);
  //       } else {
  //         toast.error('Something went wrong');
  //       }
  //     } catch (error) {
  //       toast.error('Error updating profile');
  //     }
  //   },
  // });

  return (
    <div className="bg-white shadow-lg border border-gray-300 mb-10 mr-3 mt-[15px]">
      <div className="flex items-center justify-center"
       style={{
        backgroundImage: `url(${userInfo.profileImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}>
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={avatarUrl.current}
              alt="Avatar"
              className="w-[200px] h-[200px] rounded-full border-2 border-gray-400"
            />
            <button
              className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
              title="Change photo"
              onClick={() => setModalOpen(true)}
            >
              <PencilIcon />
            </button>
          </div>
          {modalOpen && (
            <Modal
              updateAvatar={updateAvatar}
              closeModal={() => setModalOpen(false)}
            />
          )}
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
            <button
              className={`tab w-[300px] flex items-center justify-center text-black ${activeTab === 2 ? 'border-b-8 border-slate-500' : ''} p-4`}
              onClick={() => setActiveTab(2)}
            >
              Cover
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 0 && (
             <ViewData data={data}/>
           
            
            )}
            {activeTab === 1 && (
              <EditData data={data} setData={setData}/>
            )}
            {activeTab === 2 && (
              <div className="bg-slate-100 h-[300px]">Tab content 3</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
