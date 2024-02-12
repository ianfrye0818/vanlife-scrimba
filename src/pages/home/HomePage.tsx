//library imports
import { Link } from 'react-router-dom';

//component imports
import Layout from '../../layout';

export default function Home() {
  return (
    <Layout>
      <main className='h-screen relative z-2 md:p-28 flex flex-col items-center gap-8 justify-evenly p-4 md:justify-center text-white homepage '>
        <div className='h-full max-w-[1280px] flex flex-col justify-evenly md:justify-center gap-12'>
          <h1 className='text-4xl md:text-7xl font-bold '>
            You got the travel plans, we got the travel vans.
          </h1>
          <p className='text-[#c8c7c7] text-3xl'>
            Add adventure to your life by joining the #vanlife movement. Rent the perfect van to
            make your perfect road trip.
          </p>
          <Link
            className='w-full p-3 bg-orange-500 text-white text-center text-2xl md:text-3xl font-bold hover:bg-orange-600 transition-all duration-300 ease-in-out'
            to={'/vans'}
          >
            Find your van
          </Link>
        </div>
      </main>
    </Layout>
  );
}
