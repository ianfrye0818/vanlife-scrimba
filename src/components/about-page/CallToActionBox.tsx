import { Link } from 'react-router-dom';

export default function CallToActionBox() {
  return (
    <div className='w-full bg-[#ff8c38] min-h-60 text-[#1f1f1f] p-12 rounded-lg flex flex-col justify-between'>
      <div>
        <p className='text-xl text-[#161616] font-bold m-2'>Your Destination is waiting.</p>
        <p className='text-xl text-[#161616] font-bold m-2'>Your van is ready.</p>
      </div>
      <Link
        to={'/vans'}
        className='w-full bg-gray-700 text-white text-center py-2 hover:bg-gray-800 transition-all duration-300 ease-in-out'
      >
        Explore our vans
      </Link>
    </div>
  );
}
