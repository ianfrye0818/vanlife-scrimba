import { IoStar } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function ReviewSummary() {
  return (
    <div className='bg-[#FFDDB2] flex justify-between items-center gap-5 container p-4 md:p-8'>
      <div className='flex flex-col md:flex-row'>
        <p className='text-2xl font-bold'>Review Score</p>
        <p className='flex gap-2 items-center text-lg'>
          <IoStar className='text-orange-300' />
          5.0 / <span className='font-bold'>5</span>
        </p>
      </div>
      <Link
        className='text-gray-500 underline ml-auto mr-2 md:mr-0'
        to=''
      >
        Details
      </Link>
    </div>
  );
}
