import image from '../../../assets/user-Profile2 (2).jpg';
import { formatDistanceToNow } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Message({ message, own }:any) {
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });
  return (
    <div className={own ? '' : 'flex justify-end'}>
      <div className='flex flex-col'>
        <div className='flex gap-4'>
          <img className='w-[40px] rounded-full h-[40px]' src={image} alt="Profile" />
          <div className={`relative h-auto p-3   mr-7 max-w-[350px] rounded-lg shadow-md ${own ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
            <span className='p-3'>{message.text}</span>
            {own ? (
              <div className="absolute bottom-0 left-[-7px] w-4 h-0 border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
            ) : (
              <div className="absolute bottom-0 right-[-7px] w-0 h-0 border-t-[10px] border-t-green-500 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
            )}
          </div>
        </div>
        <div className={`flex ${own ? 'justify-start' : 'justify-start'} w-full mt-2 mb-2 items-end text-gray-500`}>
          <span className={`${own ? 'ml-16 text-sm' : 'ml-16 text-sm'}`}>{timeAgo.split('about')}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
