import VanListSummaryCard from './VanListSummaryCard';
import { Van } from '../../../types/VanInterfaces';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryItem } from '../../../firebase/firebaseDatabase';
import { useUser } from '../../../hooks/useUser';

export default function VanListSummary() {
  const { user } = useUser();
  const {
    data: vans,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hostedVans'],
    queryFn: async () => {
      return (await queryItem('vans', 'uid', user?.uid as string)) as Van[];
    },
    enabled: user !== undefined && user !== null,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.toString()}</p>;
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
