import VanListSummaryCard from './VanListSummaryCard';
import { Van } from '../../../types/VanInterfaces';
import { useContext } from 'react';
import { HostContext } from '../../../context/HostVanContext';
import { Link } from 'react-router-dom';

export default function VanListSummary() {
  const { vans, isLoading, isError } = useContext(HostContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{isError.toString()}</p>;
  }

  if (!vans || vans.length === 0) {
    return (
      <main>
        <h1>Your Hosted Vans</h1>
        <p>
          You have not hosted any vans yet. <Link to={'/host/add-a-van'}>Add a van</Link>
        </p>
      </main>
    );
  }

  return (
    <div className='bg-[#FFF7ED] p-2 h-full'>
      <div>
        {vans.map((van: Van) => (
          <VanListSummaryCard
            key={van.id}
            van={van}
          />
        ))}
      </div>
    </div>
  );
}
