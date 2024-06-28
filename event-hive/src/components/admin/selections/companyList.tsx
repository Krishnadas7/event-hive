import React, { useEffect, useState } from 'react';
import { SearchIcon } from "@heroicons/react/solid";
import { getAllCompany, blockCompany } from '../../../api/adminApi';
import { toast } from 'react-toastify';

const TABLE_HEAD = ["name", "email", "url", "country", "contact phone", "contact name", "Actions"];

function CompanyList() {
  const [company, setCompany] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCompany();
      setCompany(res?.data.data);
    };
    fetchData();
  }, [flag]);

  const handleBlock = async (companyId :string) => {
    await blockCompany(companyId);
    setFlag(!flag);
    toast.success('Company blocked successfully');
  };

  const filteredCompanies = company?.filter((details) =>
    details.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h-full mt-3 ml-3 mr-3 w-full rounded-lg bg-gray-200 shadow-md p-4">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-blue-gray-700">COMPANY LIST</h2>
          </div>
          <div className="flex gap-2">
            <div className="w-full md:w-72">
              <div className="flex items-center border border-gray-300 rounded-md bg-slate-300 px-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-300 outline-none py-2"
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
              {filteredCompanies?.map((details:any) => (
                <tr key={details._id}>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <div className="flex items-center gap-3">
                      <img alt='wait...' src={details.company_logo} className="h-[60px] w-[60px] rounded-full object-cover border border-blue-gray-200" />
                      <span className="text-sm text-blue-gray-700 font-semibold">{details.company_name}</span>
                    </div>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">{details.company_email}</span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">{details.company_website}</span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">{details.country}</span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">{details.contact_personphone}</span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">{details.contact_personname}</span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center justify-center flex-col">
                        <button onClick={() => handleBlock(details._id)}
                          className={`w-48 mt-1 h-8 ${details.is_block ? 'bg-green-500' : 'bg-red-600'} rounded-full text-white border border-slate-600`}>
                          {details.is_block ? 'unblock' : 'block'}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
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

export default CompanyList;
