import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCompanyProfileData } from '../../../api/companyApi';
import { toast } from 'react-toastify';
import { companyProfileEdit } from '../../../api/companyApi';

export interface CompanyData {
  company_name: string;
  company_email: string;
  company_address: string;
  state: string;
  postal_code: string;
  country: string;
  company_website: string;
  locality: string;
  company_description: string;
  contact_personname: string;
  contact_personphone: string;
  industry_type: string;
}

function ProfileDetails() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // New state to hold the file
  const [data, setData] = useState<CompanyData | null>(null);
  // const [chek,setCheck] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCompanyProfileData();
      setData(res?.data.data);
    };
    fetchData();
  },[]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setSelectedFile(file);  // Set the selected file
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      company_name: data?.company_name || '',
      company_email: data?.company_email || '',
      company_address: data?.company_address || '',
      state: data?.state || '',
      postal_code: data?.postal_code || '',
      country: data?.country || '',
      company_website: data?.company_website || '',
      locality: data?.locality || '',
      company_description: data?.company_description || '',
      contact_personname: data?.contact_personname || '',
      contact_personphone: data?.contact_personphone || '',
      industry_type: data?.industry_type || '',
    },
    enableReinitialize: true,
    validationSchema: companyEditProfileValidation,
    onSubmit: async (values: CompanyData) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key as keyof CompanyData]);
        
      });
      if (selectedFile) {
        formData.append('company_logo', selectedFile);  // Append the file
        formData.append('token',localStorage.getItem('companyAccessToken') as string)
      }
      try {
        const res = await companyProfileEdit(formData);
        if(res?.data.success){
          console.log('res from edit profile',res);
          toast.success('Profile updated successfully');
          setData(res.data.data)
          // console.log('====',data)
          // setCheck(!chek)

        }
        
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
  });
  return (
    <div className='border relative pl-3 w-full bg-white'>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <h1 className='text-md font-mono'>COMPANY DETAILS</h1>
        </div>
        <div className='flex mt-4 gap-5 max-sm:flex-col'>
          <div className='flex-col flex-1 flex p-2'>
            <label htmlFor='company_name'>Company Name</label>
            <input
              name='company_name'
              value={formik.values.company_name}
              onChange={formik.handleChange}
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
              type='text'
            />
            {formik.touched.company_name && formik.errors.company_name && (
              <div className='text-red-500'>{formik.errors.company_name}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='company_email'>Company Email</label>
            <input
              name='company_email'
              value={formik.values.company_email}
              onChange={formik.handleChange}
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
              type='email'
            />
            {formik.touched.company_email && formik.errors.company_email && (
              <div className='text-red-500'>{formik.errors.company_email}</div>
            )}
          </div>
        </div>
        <div className='flex mt-4 gap-5 max-sm:flex-col'>
          <div className='flex-col flex-1 flex p-2'>
            <label htmlFor='company_website'>Company Website</label>
            <input
              name='company_website'
              value={formik.values.company_website}
              onChange={formik.handleChange}
              type='url'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.company_website && formik.errors.company_website && (
              <div className='text-red-500'>{formik.errors.company_website}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='company_address'>Company Address</label>
            <input
              name='company_address'
              value={formik.values.company_address}
              onChange={formik.handleChange}
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
              type='text'
            />
            {formik.touched.company_address && formik.errors.company_address && (
              <div className='text-red-500'>{formik.errors.company_address}</div>
            )}
          </div>
        </div>
        <div className='flex mt-4 gap-5 max-sm:flex-col'>
          <div className='flex-col flex-1 flex p-2'>
            <label htmlFor='company_contactperson'>Contact Person Name</label>
            <input
              name='company_contactperson'
              value={formik.values.contact_personname}
              onChange={formik.handleChange}
              type='text'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.contact_personname && formik.errors.contact_personname && (
              <div className='text-red-500'>{formik.errors.contact_personname}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='company_contactphone'>Contact Person Phone</label>
            <input
              name='company_contactphone'
              value={formik.values.contact_personphone}
              onChange={formik.handleChange}
              type='number'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.contact_personphone && formik.errors.contact_personphone && (
              <div className='text-red-500'>{formik.errors.contact_personphone}</div>
            )}
          </div>
        </div>
        <div className='flex mt-4 gap-5 max-sm:flex-col'>
          <div className='flex-col flex-1 flex p-2'>
            <label htmlFor='state'>State</label>
            <input
              name='state'
              value={formik.values.state}
              onChange={formik.handleChange}
              type='text'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.state && formik.errors.state && (
              <div className='text-red-500'>{formik.errors.state}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='postal_code'>Pin</label>
            <input
              name='postal_code'
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              type='number'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.postal_code && formik.errors.postal_code && (
              <div className='text-red-500'>{formik.errors.postal_code}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='country'>Country</label>
            <input
              name='country'
              value={formik.values.country}
              onChange={formik.handleChange}
              type='text'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.country && formik.errors.country && (
              <div className='text-red-500'>{formik.errors.country}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='locality'>Locality</label>
            <input
              name='locality'
              value={formik.values.locality}
              onChange={formik.handleChange}
              type='text'
              className='outline-none h-10 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.locality && formik.errors.locality && (
              <div className='text-red-500'>{formik.errors.locality}</div>
            )}
          </div>
        </div>
        <div className='flex mt-4 gap-5 max-sm:flex-col'>
          <div className='flex-col flex-1 flex p-2'>
            <label htmlFor='company_description'>Company Description</label>
            <textarea
              name='company_description'
              value={formik.values.company_description}
              onChange={formik.handleChange}
              rows={4}
              className='outline-none pt-2 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            />
            {formik.touched.company_description && formik.errors.company_description && (
              <div className='text-red-500'>{formik.errors.company_description}</div>
            )}
          </div>
          <div className='flex flex-1 flex-col p-2'>
            <label htmlFor='industry_type'>Industry Type</label>
            <select
              name='industry_type'
              value={formik.values.industry_type}
              onChange={formik.handleChange}
              className='outline-none h-12 border border-blue-300 focus:border-blue-500 pl-2 rounded-md'
            >
              <option value='tech'>Tech</option>
              <option value='education'>Education</option>
              <option value='internships'>Internships</option>
            </select>
            {formik.touched.industry_type && formik.errors.industry_type && (
              <div className='text-red-500'>{formik.errors.industry_type}</div>
            )}
          </div>
        </div>
        <div className='flex mt-3 flex-col'>
          <h1 className='mb-3'>Upload Company Logo</h1>
          <div
            className='w-[300px] h-[100px] border-blue-500 rounded-md border-2 flex items-center justify-center'
            style={{
              backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!selectedImage && (
              <svg
                className='w-[300px] h-[60px] ml-24'
                xmlns='http://www.w3.org/2000/svg'
                fill=''
                viewBox='0 0 24 24'
              >
                <path
                  fill=''
                  d='M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z'
                  clipRule='evenodd'
                  fillRule='evenodd'
                ></path>
              </svg>
            )}
            <input
              name='company_logo'
              onChange={handleImageChange}
              type='file'
              className='w-[300px] opacity-0 h-[100px]'
            />
          </div>
          <button type='submit' className='text-white bg-blue-500 h-10 mt-4'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;

export const companyEditProfileValidation = Yup.object({
  company_name: Yup.string().required('Please enter company name'),
  company_email: Yup.string().email('Invalid email format').required('Please enter company email'),
  company_address: Yup.string().required('Enter company address'),
  postal_code: Yup.string().required('Enter the pin code'),
  locality: Yup.string().required('Enter locality'),
  state: Yup.string().required('Enter your state'),
  company_description: Yup.string().required('Enter your company description'),
  company_website: Yup.string().url('Invalid URL').required('Enter company website'),
  contact_personname: Yup.string().required('Enter contact name'),
  contact_personphone: Yup.string().required('Enter contact phone'),
  country: Yup.string().required('Enter country'),
  industry_type: Yup.string().required('Select any industry'),
  // company_logo: Yup.mixed().required('Select company logo'),
});
