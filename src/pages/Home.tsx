import Layout from '../Layout';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Layout>
      <main className='homepage'>
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>
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
