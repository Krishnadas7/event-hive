import { updateProfile } from '../../../../api/userApi';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setCredential } from '../../../../slices/authSlice';
import { RootState } from '../../../../app/store';
import { editProfileValidation } from '../../../../validations/yupValidation';

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
// Define EditDataProps interface
interface EditDataProps {
  data: UserProfile;
  setData: (data: UserProfile) => void;
}

// Component to edit user profile data
function EditData({ data, setData }: EditDataProps) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { values: editValues, handleChange: editChange, handleSubmit: editSubmit } = useFormik({
    initialValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      qualification: data.qualification || '',
      bio: data.bio || '',
      socialmedialink1: data.socialmedialink1 || '',
      socialmedialink2: data.socialmedialink2 || '',
    },
    validationSchema: editProfileValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
        const res = await updateProfile(values);
        if (res?.success) {
          setData(res?.data);
          if (userInfo && userInfo.profileImg) {
            const obj: UserProfile = {
              _id: res.data._id,
              email: res.data.email,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              profileImg: userInfo.profileImg,
            };
            dispatch(setCredential({ ...obj }));
          }
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      
    },
  });

  return (
    <div className="h-auto p-6 flex flex-col gap-3 bg-slate-200">
      <form action="" className="gap-3 flex flex-col" onSubmit={editSubmit}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-600">First Name</label>
            <input
              type="text"
              className="outline-none h-[35px] bg-white text-gray-600 rounded-md pl-3"
              name="first_name"
              onChange={editChange}
              value={editValues.first_name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-600">Last Name</label>
            <input
              type="text"
              className="outline-none h-[35px] bg-white text-gray-600 rounded-md pl-3"
              name="last_name"
              onChange={editChange}
              value={editValues.last_name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-600">Qualification</label>
            <input
              type="text"
              className="outline-none h-[35px] bg-white text-gray-600 rounded-md pl-3"
              name="qualification"
              onChange={editChange}
              value={editValues.qualification}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="" className="text-gray-600">Bio</label>
          <textarea
            name="bio"
            className="w-[820px] h-24 outline-none bg-white text-gray-600 pl-3 pb-2"
            onChange={editChange}
            value={editValues.bio}
          ></textarea>
        </div>
        <div className="flex gap-10 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-600">Social media link1</label>
            <input
              type="text"
              className="outline-none w-[300px] pr-5 h-[35px] bg-white text-gray-600 rounded-md pl-5"
              name="socialmedialink1"
              onChange={editChange}
              value={editValues.socialmedialink1}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-600">Social media link2</label>
            <input
              type="text"
              className="outline-none w-[300px] pr-5 h-[35px] bg-white text-gray-600 rounded-md pl-5"
              name="socialmedialink2"
              onChange={editChange}
              value={editValues.socialmedialink2}
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditData;
