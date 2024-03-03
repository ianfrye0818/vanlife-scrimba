import { Link } from 'react-router-dom';
import HostPageLayout from '../HostPageLayout';
import VanListSummary from '../../../components/van-list-host/VanListSummary';

export default function HostVansPage() {
  return (
    <HostPageLayout>
      <main className='md:container min-h-screen p-2 md:p-0'>
        <div className='flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-0'>
          <h1 className='text-3xl font-bold'>Your Hosted Vans</h1>
          <Link
            className='p-3 w-full md:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white rounded-md'
            to='/host/vans/add'
          >
            Add A Van
          </Link>
        </div>
        <VanListSummary />
      </main>
    </HostPageLayout>
  );
}
