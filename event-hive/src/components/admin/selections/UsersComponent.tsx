import React, { useEffect, useState } from 'react';
import { IUser } from '../../../types/schema';
import './all.css'
import { getUser } from '../../../api/adminApi';
import { AxiosResponse } from 'axios';
import { SearchIcon, ArrowDownIcon } from "@heroicons/react/solid";
const TABLE_HEAD = ["Users", "email", "mobile",  "Actions"];
import { blockUnblock } from '../../../api/adminApi';
import { toast } from 'react-toastify';


const  UsersComponent:React.FC =() => {
const [users,setUsers] = useState<IUser[]>([])
const [flag,setFlag] = useState<boolean>(true)
 
  useEffect(()=>{
    const fetchData = async ():Promise<void> =>{
      const datas:any  = await getUser()
      console.log('dataaaaaaa',datas.data.data);
      setUsers(datas.data.data)
    }
    fetchData()
  },[flag])

  const handleBlock = async (_id: string) => {
    try {
      console.log('clickeddddd');
      const res: any = await blockUnblock(_id);
      setFlag(!flag)
      toast.success('updated successfully');

    } catch (error) {
      toast.error('something went wrong');
    }
  }
  
  return (
    <>
       <div className="h-auto mt-3 ml-3 mr-3 w-full  rounded-lg bg-white shadow-md p-4 ">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div >
            <h2 className="text-xl font-semibold text-blue-gray-700 ">USERS LIST</h2>
            {/* <p className="text-sm text-gray-500 mt-1">These are details about the last transactions</p> */}
          </div>
          <div className="flex gap-2">
            <div className="w-full md:w-72">
              <div className="flex items-center border border-gray-300 rounded-md bg-slate-300 px-2 ">
                <input type="text" placeholder="Search" className="w-full bg-slate-300 outline-none py-2" />
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            {/* <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm">
              <ArrowDownIcon className="h-4 w-4" /> Download
            </button> */}
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
                users.map((user,index)=>(
                  <tr key={user.email}>
                      <td className='p-2 border-b border-blue-gray-200'>
                        <div className="flex items-center gap-3">
                          <img  className="h-10 w-10 bg-black rounded-full object-contain rounded-md border border-blue-gray-200" />
                          <span className="text-sm text-blue-gray-700 font-semibold">{user.first_name+" "+user.last_name}</span>
                        </div>
                      </td>
                      <td className='p-2 border-b border-blue-gray-200'>
                        <span className="text-sm text-blue-gray-700">{user.email}</span>
                      </td>
                      <td className='p-2 border-b border-blue-gray-200'>
                        <span className="text-sm text-blue-gray-700">{user.mobile}</span>
                      </td>
                      {/* <td className='p-2 border-b border-blue-gray-200'>
                        <div className="w-max">
                          <span className='text-xs font-semibold rounded-md px-2 py-1 bg-white'>TRUE</span>
                        </div>
                      </td> */}
                      <td className='p-2 border-b border-blue-gray-200'>
                        <div className="flex items-center justify-center gap-3">
                          {/* <img  className="h-9 w-12 rounded-md border border-blue-gray-200 p-1" /> */}
                          <div className="flex items-center justify-center flex-col">
                            {/* <span className="text-sm text-blue-gray-700 font-medium capitalize"> BLOCK PERMANENT</span> */}
                            {/* <span className="text-xs text-blue-gray-700 opacity-70">10-10-2000</span> */}
                            <button className='bg-blue-600  w-48 h-8 rounded-full text-white border border-slate-600'>ban</button>
                            <button onClick={() => 
                              handleBlock(user._id as string)} className={`w-48 mt-1 h-8 ${user.is_block ? 'bg-green-500' : 'bg-red-600'} rounded-full  text-white border border-slate-600`}>
                              {user.is_block ? 'unblock' : 'block'}
                            </button>

                          </div>
                        </div>
                      </td>
                      {/* <td className='p-2 border-b border-blue-gray-200'>
                        <button className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </td> */}
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
          {/* <div className="flex items-center gap-2">
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">1</button>
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">2</button>
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">3</button>
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">...</button>
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">8</button>
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">9</button>
            <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">10</button>
          </div> */}
          <button className="p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default UsersComponent;
