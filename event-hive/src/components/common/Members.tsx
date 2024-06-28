import React, { useEffect, useState } from 'react';
import { allMembers } from '../../api/companyApi';
import { IUser } from '../../types/schema';
import { PiUsersFourThin } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";
import image from '../../assets/user-Profile2 (2).jpg'

const MembersModal = ({ eventId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [team, setTeam] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allMembers(eventId);
        setUsers(res?.data?.data[0]?.userDetails || []);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchData();
  }, [eventId]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTeam(false)
  };

  const toggleTeam = () => {
    setTeam(!team);
  };

  return (
    <>
      <button
        type="button"
        className="py-1 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={openModal}
      >
        <PiUsersFourThin size={20}/> Participants
      </button>

      {isOpen && (
        <div
          id="hs-slide-down-animation-modal"
          className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 scale-95 w-10/12 md:w-6/12">
            <div className="bg-blue-600 text-white py-3 px-5 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Participants</h3>
              <button className="text-white" onClick={closeModal}>
                <IoIosClose size={30} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {users.length > 0 ? (
                users.map((data, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">{index + 1}</span>
                      <img className="w-10 h-10 rounded-full" src={data.profileImage ? data.profileImage : image} alt="User" />
                      <p className="text-gray-800 font-semibold">{data.first_name} {data.last_name}</p>
                    </div>
                    {data.team && data.team.length > 0 ? (
                      <div className="relative">
                        <button onClick={toggleTeam} className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold">Team</button>
                        {team && (
                          <div className="bg-white border border-gray-200 rounded-md p-3 absolute top-full right-0 mt-2 shadow-lg">
                            {data.team.map((member, idx) => (
                              <p key={idx} className="text-gray-800 font-medium">
                                <span className="bg-blue-600 text-white rounded-full px-2 mr-2">{idx + 1}</span>{member}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold">Individual</button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No Users</p>
              )}
            </div>
            <div className="flex justify-end p-3">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembersModal;
