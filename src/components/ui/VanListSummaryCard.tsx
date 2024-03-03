import { Link } from 'react-router-dom';
import { Van } from '../../types/VanInterfaces';

type VanListSummaryCardProps = {
  van: Van;
};

export default function VanListSummaryCard({ van }: VanListSummaryCardProps) {
  return (
    <div className='md:container flex flex-col my-3 px-2 rounded-lg border bg-card text-card-foreground shadow-sm'>
      <div className='container bg-white flex items-center gap-4 p-4 md:p-8'>
        <img
          src={van.imageURL}
          alt={van.name}
          width={100}
          height={100}
        />
        <div>
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
          <p>Available? {van.available.toString()}</p>
        </div>
        <div className='ml-auto flex gap-1'>
          <Link
            className='text-gray-500 underline '
            to={`/host/vans/${van.id}/edit`}
          >
            Edit
          </Link>
          /
          <Link
            className='text-gray-500 underline ml-auto'
            to={`/vans/${van.id}`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
