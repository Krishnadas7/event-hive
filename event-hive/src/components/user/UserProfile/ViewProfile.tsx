import React, { useState } from 'react';
import { profileImageUpload, updateProfile } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { toast } from 'react-toastify';
import image from '../../../assets/WhatsApp Image 2023-10-05 at 11.29.42 PM.jpeg';
import { countryOptions, skillsOptions, eventTypesOptions, CountryOption } from '../../../app/datas';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MdModeEditOutline } from "react-icons/md";
import { useFormik } from 'formik';

const animatedComponents = makeAnimated();

interface Val {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  skills: CountryOption[];
  interest: CountryOption[];
  qualification: string;
  post_code: string;
  locality: string;
  country: string;
  state: string;
  bio: string;
  socialmedialink1: string;
  socialmedialink2: string;
}

const initialValues: Val = {
  first_name: '',
  last_name: '',
  address_line1: '',
  address_line2: '',
  skills: [],
  interest: [],
  qualification: '',
  post_code: '',
  locality: '',
  country: '',
  state: '',
  bio: '',
  socialmedialink1: '',
  socialmedialink2: ''
};

function ViewProfile() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmitImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      console.error('No image selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', imageFile);
    if (userInfo && userInfo._id) {
      formData.append('id', userInfo._id);
    }
    const response = await profileImageUpload(formData);
    if (response?.success) {
      toast.success(response?.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const res = await updateProfile(values);
      if (res?.success) {
        toast.success(res?.message);
      }else{
        toast.error(res?.message)
        return
      }
    },
  });

  return (
    <>
      <div className="bg-white ml-7 mr-3 mt-[25px] p-3 pr-5">
        <div className="border-b-4 border-solid border-gray-300">
          <p className="text-1xl mb-2 text-slate-700">Organization settings</p>
        </div>
        <div className="flex flex-col">
          <p className="ml-5 font-bold">Click here to change your profile image</p>
          <form onSubmit={handleSubmitImage} className='flex' encType="multipart/form-data">
            <div
              className="w-[150px] mt-2 border-double border-2 border-gray-400 ml-6 h-[150px] bg-cover bg-slate-500 flex justify-center items-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              <input
                type="file"
                className="bg-blue-400 w-[100%] h-[200px] opacity-0"
                onChange={handleFileChange}
              />
              <button className='flex ml-[140px] mb-[110px] bg-[#888888] rounded-full text-black font-semibold p-2' type="submit">
                <MdModeEditOutline size={25} className='text-black' />
              </button>
            </div>
          </form>
        </div>
        <div>
          <form className="mt-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap max-sm:flex-col gap-9">
              <div className="flex flex-col gap-1">
                <label htmlFor="first_name" className="text-slate-500 font-semibold">First Name*</label>
                <input
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  className="border-gray-700 rounded-md pl-2 focus:outline-none w-72 h-10 border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  name="first_name"
                  id="first_name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="last_name" className="text-slate-500 font-semibold">Last Name*</label>
                <input
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  name="last_name"
                  id="last_name"
                />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-lg font-medium">Contact Details</span>
              <div className="flex flex-wrap max-sm:flex-col gap-9 mt-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="address_line1" className="text-slate-500 font-semibold">Address line1*</label>
                  <input
                    value={formik.values.address_line1}
                    onChange={formik.handleChange}
                    className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                    type="text"
                    name="address_line1"
                    id="address_line1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address_line2" className="text-slate-500 font-semibold">Address line2*</label>
                  <input
                    value={formik.values.address_line2}
                    onChange={formik.handleChange}
                    className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                    type="text"
                    name="address_line2"
                    id="address_line2"
                  />
                </div>
              </div>
              <div className="flex gap-9 flex-wrap max-sm:flex-col mt-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="post_code" className="text-slate-500 font-semibold">Zip / Post code:</label>
                  <input
                    value={formik.values.post_code}
                    onChange={formik.handleChange}
                    className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                    type="text"
                    name="post_code"
                    id="post_code"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="locality" className="text-slate-500 font-semibold">Locality / Region:</label>
                  <input
                    value={formik.values.locality}
                    onChange={formik.handleChange}
                    className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                    type="text"
                    name="locality"
                    id="locality"
                  />
                </div>
              </div>
              <div className="flex gap-9 flex-wrap max-sm:flex-col mt-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="country" className="text-slate-500 font-semibold">Country:*</label>
                  <Select<CountryOption, false>
                    name="country"
                    value={countryOptions.find((option) => option.value === formik.values.country) || null}
                    onChange={(option) =>
                      formik.setFieldValue('country', option ? option.value : '')
                    }
                    options={countryOptions}
                    className="w-72 rounded-md h-10 border-gray-700 border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="state" className="text-slate-500 font-semibold">State / Territory:</label>
                  <input
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                    type="text"
                    name="state"
                    id="state"
                  />
                </div>
              </div>
              <div className="flex gap-9 flex-wrap max-sm:flex-col mt-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="skills" className="text-slate-500 font-semibold">Skills:</label>
                  <Select<CountryOption, true>
                    isMulti
                    name="skills"
                    value={formik.values.skills}
                    onChange={(options) =>
                      formik.setFieldValue('skills', options || [])
                    }
                    options={skillsOptions}
                    components={animatedComponents}
                    className="w-72 rounded-md border-gray-700 border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="interest" className="text-slate-500 font-semibold">Interests:</label>
                  <Select<CountryOption, true>
                    isMulti
                    name="interest"
                    value={formik.values.interest}
                    onChange={(options) =>
                      formik.setFieldValue('interest', options || [])
                    }
                    options={eventTypesOptions}
                    components={animatedComponents}
                    className="w-72 rounded-md border-gray-700 border"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="qualification" className="text-slate-500 font-semibold">Qualification:</label>
                <input
                  value={formik.values.qualification}
                  onChange={formik.handleChange}
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  name="qualification"
                  id="qualification"
                />
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="bio" className="text-slate-500 font-semibold">Bio:</label>
                <textarea
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-32 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  name="bio"
                  id="bio"
                />
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="socialmedialink1" className="text-slate-500 font-semibold">Social Media Link 1:</label>
                <input
                  value={formik.values.socialmedialink1}
                  onChange={formik.handleChange}
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  name="socialmedialink1"
                  id="socialmedialink1"
                />
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="socialmedialink2" className="text-slate-500 font-semibold">Social Media Link 2:</label>
                <input
                  value={formik.values.socialmedialink2}
                  onChange={formik.handleChange}
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  name="socialmedialink2"
                  id="socialmedialink2"
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
