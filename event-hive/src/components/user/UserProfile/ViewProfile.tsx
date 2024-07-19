import React, { useState } from 'react';
import { profileImageUpload } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { toast } from 'react-toastify';
import { updateProfile } from '../../../api/userApi';
import image from '../../../assets/WhatsApp Image 2023-10-05 at 11.29.42 PM.jpeg'
import { countryOptions, skillsOptions, eventTypesOptions, CountryOption } from '../../../app/datas';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MdModeEditOutline  } from "react-icons/md";
import { useFormik } from 'formik';

const animatedComponents = makeAnimated();

const initialValues = {
  first_name: '',
  last_name: '',
  address_line1: '',
  address_line2: '',
  skills: '',
  interest: '',
  post_code: '',
  locality: '',
  country: '',
  state: '',
  bio: '',
  socialmedialink1:'',
  socialmedialink2:''
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
    formData.append('id', userInfo._id);

    try {
      const response: any = await profileImageUpload(formData);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      let res = await updateProfile(values as any)
      if(res){
        console.log('values')
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
              style={{
                backgroundImage:
                  `url(${image})`,
              }}
            >
              <input
                type="file"
                className="bg-blue-400 w-[100%] h-[200px] opacity-0"
                onChange={handleFileChange}
              />
                <button className='flex ml-[140px] mb-[110px]   bg-[#888888]  
                 rounded-full text-black font-semibold  p-2
                  ' type="submit"><MdModeEditOutline  size={25} className='text-black'/></button>
            </div>
          
          </form>
        </div>
        <div>
          <form className="mt-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap max-sm:flex-col gap-9">
              <div className="flex flex-col gap-1">
                <label htmlFor="first_name" className="text-slate-500 font-semibold">
                  First Name*
                </label>
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
                <label htmlFor="last_name" className="text-slate-500 font-semibold">
                  Last Name*
                </label>
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
                  <label htmlFor="address_line1" className="text-slate-500 font-semibold">
                    Address line1*
                  </label>
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
                  <label htmlFor="address_line2" className="text-slate-500 font-semibold">
                    Address line2*
                  </label>
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
                  <label htmlFor="post_code" className="text-slate-500 font-semibold">
                    Zip / Post code:
                  </label>
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
                  <label htmlFor="locality" className="text-slate-500 font-semibold">
                    Locality / Region:
                  </label>
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
                  <label htmlFor="country" className="text-slate-500 font-semibold">
                    Country:*
                  </label>
                  <Select
                    name="country"
                    value={countryOptions.find((option:any) => option.value === formik.values.country)}
                    onChange={(option: CountryOption | null) =>
                      formik.setFieldValue('country', option ? option.value : '')
                    }
                    options={countryOptions}
                    className="w-72 -z-5 rounded-md h-10 border-gray-700 border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="state" className="text-slate-500 font-semibold">
                    State / Territory:
                  </label>
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
            </div>
            <div className="mt-4 flex-wrap max-sm:flex-col">
              <span className="text-lg font-medium">Bio</span>
              <div className="flex flex-col flex-wrap gap-1 mt-3">
                <label htmlFor="bio" className="text-slate-500 font-semibold">
                  Bio/About you*
                </label>
                <textarea
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  className="border-gray-700 rounded-md pl-2 pt-2 pb-7 focus:outline-none w-1/2 h-24 border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500 resize-none"
                  name="bio"
                  id="bio"
                  placeholder="Something about you...."
                ></textarea>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-lg font-medium">Skills</span>
              <Select
                className="flex-wrap w-1/2 mt-4 rounded-md"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={skillsOptions}
                name="skills" // Ensure that the name matches the corresponding key in initialValues
                value={formik.values.skills} // Bind the value to formik's values
                onChange={(selectedOptions) => formik.setFieldValue('skills', selectedOptions)} // Set formik's field value on change
              />

            </div>
            <div className="mt-3">
              <span className="text-lg font-medium">Interest</span>
              <Select
                name='interest'
                className="w-1/2 mt-3 rounded-md"
                id="eventType"
                value={formik.values.interest}
                options={eventTypesOptions}
                onChange={(selectedOptions)=> formik.setFieldValue('interest',selectedOptions)}
                isMulti
                placeholder="Select event types..."
              />
            </div>
            <div className="flex flex-wrap max-sm:flex-col mt-3 gap-9">
              <div className="flex flex-col gap-1">
                <span className="text-lg font-medium mb-3">Social media links</span>
                <label htmlFor="facebook" className="text-slate-500 font-semibold">
                  Your facebook url*
                </label>
                <input
                  placeholder="eg https://www.facebook.com/eventhive"
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  value={formik.values.socialmedialink1}
                  onChange={formik.handleChange}
                  name="socialmedialink1"
                  id="facebook"
                />
              </div>
              <div className="flex flex-col gap-1 mt-11">
                <label htmlFor="linkedin" className="text-slate-500 font-semibold">
                  Your linkedin url*
                </label>
                <input
                  placeholder="eg https://www.linkedin.com/eventhive"
                  className="border-gray-700 pl-2 focus:outline-none w-72 h-10 rounded-md border-2 focus:border-blue-500 focus:shadow-md shadow-blue-500"
                  type="text"
                  value={formik.values.socialmedialink2}
                  onChange={formik.handleChange}
                  name="socialmedialink2"
                  id="linkedin"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-[200px] mt-7 mb-5 h-11 text-white font-semibold rounded-md bg-blue-500"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;