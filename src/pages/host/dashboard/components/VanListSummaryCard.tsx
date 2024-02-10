import { Link } from 'react-router-dom';

export default function VanListSummaryCard() {
  return (
    <div className='container flex flex-col my-3'>
      <div className='container bg-white flex items-center gap-4 p-4 md:p-8'>
        <img
          src='https://images.pexels.com/photos/2832251/pexels-photo-2832251.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt='Your van'
          width={100}
          height={100}
        />
        <div>
          <h3>Modest Explorer</h3>
          <p>$60/day</p>
        </div>
        <Link
          className='text-gray-500 underline ml-auto'
          to=''
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
