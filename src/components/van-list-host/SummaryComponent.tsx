import { Link } from 'react-router-dom';

//TODO: fetch data from database
export default function SummaryComponent() {
  return (
    <div className='flex justify-between items-center container bg-[#FFEAD0] p-6 md:p-8'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>Welcome!</h2>
        <p>
          Income last <span>30 days</span>
        </p>
        <p className='text-3xl font bold'>$2,660</p>
      </div>
      <div>
        <Link
          className='text-gray-500 underline'
          to=''
        >
          Details
        </Link>
      </div>
    </div>
  );
}
