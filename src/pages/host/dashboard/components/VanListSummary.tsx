import { Link } from 'react-router-dom';
import VanListSummaryCard from './VanListSummaryCard';

export default function VanListSummary() {
  return (
    <div className='bg-[#FFF7ED]'>
      <div className='flex items-center justify-between md: p-8'>
        <h2 className='text-2xl'>Your Listed Vans</h2>
        <Link
          className='text-gray-500 underline'
          to=''
        >
          Details
        </Link>
      </div>
      <div>
        <VanListSummaryCard />
        <VanListSummaryCard />
        <VanListSummaryCard />
        <VanListSummaryCard />
        <VanListSummaryCard />
        <VanListSummaryCard />
      </div>
    </div>
  );
}