import { updateProfile } from '../../../../api/userApi';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { setCredential } from '../../../../slices/authSlice';
import { RootState } from '../../../../app/store';
import { editProfileValidation } from '../../../../validations/yupValidation';
interface UserProfile {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    profileImg: string|undefined;
  }
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditData({ data,setData }:any) {

  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch()
  const { values: editValues, handleChange: editChange, handleSubmit: editSubmit} = useFormik({
    initialValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      qualification: data.qualification,
      bio: data.bio,
      socialmedialink1: data.socialmedialink1,
      socialmedialink2: data.socialmedialink2,
    },
    validationSchema:editProfileValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const res = await updateProfile(values);
        if (res.data.success) {

            console.log('data from edit page===',res.data.data)
            setData(res.data.data)
            if(userInfo && userInfo.ProfileImg){
              const obj:UserProfile={
                _id:res.data.data._id,
                email:res.data.data.email,
                first_name:res.data.data.first_name,
                last_name:res.data.data.last_name,
                profileImg:userInfo?.profileImg
            }
            dispatch(setCredential({...obj}))
            console.log('=====objData',obj)
            }
           
          toast.success(res.data.message);
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error('Error updating profile');
      }
    },
  });
  return (
    <div className="h-auto p-6 flex flex-col gap-3 bg-slate-200">
        <form action="" className='gap-3 flex flex-col' onSubmit={editSubmit}>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-1'>
            <label htmlFor="" className='text-gray-600'>First Name</label>
            <input type="text"  className='outline-none h-[35px] bg-white text-gray-600 rounded-md pl-3'  name="first_name" id="" onChange={editChange} value={editValues.first_name} />
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="" className='text-gray-600'>Last Name</label>
            <input type="text" className='outline-none h-[35px] bg-white text-gray-600 rounded-md pl-3'  name="last_name" id="" onChange={editChange} value={editValues.last_name} />
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="" className='text-gray-600'>Qualification</label>
            <input type="text" className='outline-none h-[35px] bg-white text-gray-600 rounded-md pl-3'  name="qualification" id="" onChange={editChange} value={editValues.qualification} />
        </div>
      </div>
      <div className='w-full flex flex-col gap-1'>
        <label htmlFor="" className='text-gray-600'>Bio</label>
         <textarea name="bio" className='w-[820px] h-24 outline-none bg-white text-gray-600 pl-3 pb-2' onChange={editChange} value={editValues.bio} id=""></textarea>
      </div>
      <div className='flex gap-10 w-full'>
            <div className='flex flex-col gap-1'>
            <label htmlFor="" className='text-gray-600'>Social media link1</label>
            <input type="text" className='outline-none w-[300px]  pr-5 h-[35px] bg-white text-gray-600 rounded-md pl-5'  name="socialmedialink1" id="" onChange={editChange} value={editValues.socialmedialink1} />
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="" className='text-gray-600'>Social media link2</label>
            <input type="text" className='outline-none w-[300px]  pr-5 h-[35px] bg-white text-gray-600 rounded-md pl-5'  name="socialmedialink2" id="" onChange={editChange} value={editValues.socialmedialink2} />
            </div>
            <div className='flex bg-white mt-7'>
                <button type='submit' className='bg-blue-500 h-[35px] rounded-md  w-36'>Save</button>
            </div>
      </div>
      </form>
    </div>
  );
}


export default EditData;
