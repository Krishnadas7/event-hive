import  { useEffect, useState } from 'react';
import { SearchIcon } from "@heroicons/react/solid";
import { getAllCompany, blockCompany } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import { ICompany } from '../../../types/schema';
import image from '../../../assets/navbar-image.webp'
import { LineWave } from 'react-loader-spinner';

const TABLE_HEAD = ["name", "email", "url", "country", "contact phone", "contact name", "Actions"];

function CompanyList() {
  const [company, setCompany] = useState<ICompany[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [flag, setFlag] = useState(false);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCompany();
      setCompany(res?.data);
    };
    fetchData();
  }, [flag,loading]);

  const handleBlock = async (companyId :string) => {
    setLoading(true)
    const res = await blockCompany(companyId);
    if(!res.success){
      toast.error(res?.message)
      return
    }
    setFlag(!flag);
      toast.success(res?.message);
      setLoading(false)
    
  };

  const filteredCompanies = company?.filter((details:ICompany) =>{
    if(details.company_name){
     return details.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    }
    
  });

  return (
    <>
      <div className={` ${loading ? 'opacity-45' : ''}h-full relative mt-3 ml-3 mr-3 w-full overflow-hidden rounded-lg bg-gray-200 shadow-md p-4`}>
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
        <div className={`${loading ? 'opacity-45' : ''} mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center`}>
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

        <div className={`${loading ? 'opacity-45' : ''} h-[400px] overflow-auto`}>
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
              {filteredCompanies?.map((details) => (
                <tr key={details._id}>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <div className="flex items-center gap-3">
                      <img alt='wait...' src={details.company_logo ? details.company_logo: image} className="h-[60px] w-[60px] rounded-full object-cover border border-blue-gray-200" />
                      <span className="text-sm text-blue-gray-700 font-semibold">{details.company_name}</span>
                    </div>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">{details.company_email}</span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">
                      {details.company_website ? details.company_website : 'Not Added'}
                      </span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">
                      {details.country ? details.country : 'Not Added'}
                      </span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">
                      {details.contact_personphone ? details.contact_personphone: 'Not Added'}
                      </span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <span className="text-sm text-blue-gray-700">
                      {details.contact_personname ? details.contact_personname : "Not Added" }
                      </span>
                  </td>
                  <td className='p-2 border-b border-blue-gray-200'>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center justify-center flex-col">
                        <button onClick={() => handleBlock(details._id as string)}
                          className={`w-36 mt-1 h-8 ${details.is_block ? 'bg-green-500' : 'bg-red-600'} rounded-full text-white border border-slate-600`}>
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
      </div>
    </>
  );
}

export default CompanyList;
