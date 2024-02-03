//library imports
import { Link } from 'react-router-dom';

//component imports
import Layout from '../../layout';

export default function Home() {
  return (
    <Layout>
      <main className='h-screen relative z-2 md:p-28 flex flex-col items-center gap-8 justify-center text-white homepage'>
        <h1 className='text-4xl md:text-7xl font-bold '>
          You got the travel plans, we got the travel vans.
        </h1>
        <p className='text-[#c8c7c7] text-3xl'>
          Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make
          your perfect road trip.
        </p>
        <Link
          className='btn btn-primary'
          to={'/vans'}
        >
          Find your van
        </Link>
      </main>
    </Layout>
  );
}
