import HostPageLayout from '../HostPageLayout';
import SummaryComponent from '../../../components/van-list-host/SummaryComponent';
import VanListSummary from '../../../components/van-list-host/VanListSummary';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <HostPageLayout>
      <div className='h-full'>
        <SummaryComponent />
        <div className='flex justify-between items-center p-3'>
          <div>
            <h2 className='4xl font-bold'>Your Listed vans</h2>
            <p className='text-sm'>Vans you have marked available will be listed below</p>
            <p className='text-sm'>
              To view all your vans,{' '}
              <Link
                className='underline text-gray-600'
                to='/host/vans'
              >
                click here
              </Link>
            </p>
          </div>
          <Link
            className='p-2 bg-orange-600 hover:bg-orange-700 text-white cursor-pointer'
            to={'/host/vans/add'}
          >
            Add a Van
          </Link>
        </div>
        <VanListSummary isListed />
      </div>
    </HostPageLayout>
  );
}
