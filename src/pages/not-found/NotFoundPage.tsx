import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div>
      <div className='flex flex-col text-center justify-center items-center h-screen bg-slate-100 gap-8'>
        <h1 className='text-7xl text-red-500'>
          Oops! <br /> It seems we've hit a snag!
        </h1>
        <p className='text-lg text-gray-800'>The page you're looking for could not be found.</p>
        <Link
          className='text-xl inliine-block bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-300'
          to='/'
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
}
