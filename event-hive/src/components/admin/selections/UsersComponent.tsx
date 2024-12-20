import React, { useEffect, useState } from 'react';
import { IUser } from '../../../types/schema';
import './all.css'
import { getUser } from '../../../api/adminApi';
import { SearchIcon } from "@heroicons/react/solid";
const TABLE_HEAD = ["Users", "email", "mobile", "Actions"];
import { blockUnblock } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import image from '../../../assets/navbar-image.webp'
import { LineWave } from 'react-loader-spinner';

const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [flag, setFlag] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getUser()
      if(datas?.success){
        setUsers(datas?.data)
      }
      
    }
    fetchData()
  }, [flag,loading])

  const handleBlock = async (_id: string) => {
      setLoading(true)
      const res = await blockUnblock(_id);
      if(res?.success){
        setFlag(!flag)
        setLoading(false)
        toast.success(res?.message);
      }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users?.filter(user => 
    (user?.first_name + ' ' + user?.last_name).toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className={ `${loading ? 'opacity-70' : ''} h-full relative mt-3 ml-3 mr-3 w-full rounded-lg bg-gray-200 shadow-md p-4 `}>
      {loading && (
       <div className='w-full absolute h-screen flex items-center justify-center'>
       <LineWave 
               visible={true}
               height="100"
               width="100"
               color="#4fa94d"
               ariaLabel="line-wave-loading"
               wrapperStyle={{}}
               wrapperClass=""
               firstLineColor=""
               middleLineColor=""
               lastLineColor=""
               />
   </div>
    )}
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-blue-gray-700 ">USERS LIST</h2>
          </div>
          <div className="flex gap-2">
            <div className="w-full md:w-72">
              <div className="flex items-center border border-gray-300 rounded-md bg-slate-300 px-2 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-slate-300 outline-none py-2"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="border bg-blue-400 border-blue-gray-200 bg-blue-gray-50 p-2">
                    <span className="text-sm text-blue-gray-500 text-white font-medium">{head}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                filteredUsers?.map((user) => (
                  <tr key={user.email}>
                    <td className='p-2 border-b border-blue-gray-200'>
                      <div className="flex items-center gap-3">
                        <img alt='wait...' src={user.profileImage ? user.profileImage : image} className="h-[60px] w-[60px] rounded-full object-cover border border-blue-gray-200" />
                        <span className="text-sm text-blue-gray-700 font-semibold">{user.first_name } {user.last_name ? user.last_name : ''}</span>
                      </div>
                    </td>
                    <td className='p-2 border-b border-blue-gray-200'>
                      <span className="text-sm text-blue-gray-700">{user.email}</span>
                    </td>
                    <td className='p-2 border-b border-blue-gray-200'>
                      <span className="text-sm text-blue-gray-700">{user.mobile}</span>
                    </td>
                    <td className='p-2 border-b border-blue-gray-200'>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center justify-center flex-col">
                          <button onClick={() => handleBlock(user._id as string)} className={`w-48 mt-1 h-8 ${user.is_block ? 'bg-green-500 ' : 'bg-red-600'} rounded-full text-white border border-slate-600`}>
                            {user.is_block ? 'unblock' : 'block'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-blue-gray-200 p-2">
          <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
            Previous
          </button>
          <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default UsersComponent;
