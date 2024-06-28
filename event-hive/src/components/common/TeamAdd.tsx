import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IoAddCircleSharp } from "react-icons/io5";

function TeamAdd() {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [exist, setExist] = useState(false);
    const [members, setMembers] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [reach, setReach] = useState(false);

    // Load members from local storage when component mounts
    useEffect(() => {
        const storedMembers = localStorage.getItem('teamData');
        if (storedMembers) {
            setMembers(JSON.parse(storedMembers));
        }
    }, []);

    const handleChange = async (e) => {
        console.log('event___valueee', e.target.value);
        setExist(false);
        try {
            setEmail(e.target.value);
        } catch (error) {
            console.error(error);
        }
    }

    const handleMembers = () => {
        if (members.length > 2) {
            setReach(true);
            return;
        }
        if (members.includes(email)) {
            setExist(true);
            return;
        }
        const newMembers = [...members, email];
        setMembers(newMembers);
        localStorage.setItem('teamData', JSON.stringify(newMembers));
        setEmail('');
    }

    const handleRemove = (index: number) => {
        const newMembers = members.filter((_, i) => i !== index);
        setMembers(newMembers);
        localStorage.setItem('teamData', JSON.stringify(newMembers));
    }

    return (
        <div className='w-full px-4 flex items-center flex-col py-5'>
            <div className='flex w-full'>
                <div className='flex w-full flex-col'>
                    <input
                        className='outline-none border border-white focus:border-blue-500 rounded-md bg-gray-200 w-full py-2 px-2'
                        value={email}
                        placeholder='enter email'
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name=""
                        id=""
                    />
                    {exist && <p className='text-red-500'>already added this user</p>}
                    {reach && <p className='text-red-500'>only 4 members allowed in a group</p>}
                    <p className='ml-6 mt-2 font-bold mb-2'>{userInfo.email} Add your team</p>
                </div>
                <button onClick={handleMembers} className='text-white w-auto px-3 hover:bg-white hover:border-blue-500 hover:text-blue-500 bg-blue-400 h-11 rounded-md border'>
                    <IoAddCircleSharp size={30}/>
                    </button>
            </div>
            <div onClick={() => setReach(false)} className='w-full'>
                <ul>
                    {members?.map((value, index) => (
                        <div key={index} className='w-full mt-2 flex justify-between'>
                            <li className='py-2 text-black font-mono'>{index + 1}.&nbsp;&nbsp;{value}</li>
                            <button onClick={() => handleRemove(index)} className='bg-red-500 text-white px-2 -py-1 rounded-md'>remove</button>
                        </div>
                    ))}
                </ul>
            </div>
            <div className='w-full flex justify-end mt-3'>
                {members.length === 3 && <button className='px-2 bg-blue-400 text-white py-1 rounded-md'>Create your team</button>}
            </div>
        </div>
    );
}

export default TeamAdd;
