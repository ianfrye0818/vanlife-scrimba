//library imports
import { Link } from 'react-router-dom';

//component imports
import notFoundImg from '../../assets/404-error-page-not-found-hand-hold-plug-graphic-vector-26853731.jpg';

export default function Component() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <img
        src={notFoundImg}
        alt='404 error'
        className='w-96 h-96'
      />
      <p className='text-2xl text-gray-600 dark:text-gray-400 mt-4'>
        Opps looks like we hit a snag!
      </p>
      <p className='text-2xl text-gray-600 dark:text-gray-400 mt-4'>
        The page you're looking for does not exist
      </p>
      <Link
        className='mt-8 bg-orange-500 text-gray-100 py-2 px-4 rounded-md hover:bg-orange-600 '
        to='/'
      >
        Return to Homepage
      </Link>
    </div>
  );
}
