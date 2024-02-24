import { Link } from 'react-router-dom';
import HostPageLayout from '../HostPageLayout';
import VanListSummary from '../components/VanListSummary';

export default function HostVansPage() {
  return (
    <HostPageLayout>
      <main className='md:container h-full'>
        <div className='flex justify-between items-center p-4'>
          <h1 className='text-3xl font bold'>Your Hosted Vans</h1>
          <Link
            className='p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md'
            to='/host/add-a-van'
          >
            Add A Van
          </Link>
        </div>
        <VanListSummary />
      </main>
    </HostPageLayout>
  );
}
