//library imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//component imports
import ReactLoading from 'react-loading';

//type imports
import { Van } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';

//context imports
import { VanFilterContext } from './VansPage';

export default function Vanslist() {
  const { vanFilter } = useContext(VanFilterContext);
  const navigate = useNavigate();

  //fetches the vans from the server - uses react-query that also performs caching, refetching, and error/loading states
  const { data, error, isLoading } = useQuery({
    queryKey: ['vans'],
    queryFn: async () => {
      const { data } = await axios.get<{ vans: Van[] }>('/api/vans');
      return data;
    },
  });

  // while loading show the "bubble" loading component from react-loading
  if (isLoading) {
    return (
      <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
        <ReactLoading
          type='bubbles'
          color='green'
          height={300}
          width={375}
        />
      </div>
    );
  }

  // if there is an error, show the error message
  if (error) {
    return <div>Something went wrong</div>;
  }

  //if data does not exisist return null and redirec to 404 not found page
  if (data === null || data === undefined) {
    navigate('/not-found');
    return null;
  }

  //extract vans out of data.vans
  //TODO: refactor this logic into the fetch funciton
  const vans = data.vans;

  //filter the vans based on the vanFilter context
  const filteredVans =
    vanFilter.length > 0
      ? vans.filter((van) => vanFilter.includes(van.type as VanFilterEnum))
      : vans;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-5 p-0 w-full max-w-5xl my-16 mx-auto'>
      {filteredVans.map((van, index) => (
        <Link
          to={`/vans/${van.id}`}
          key={index}
        >
          <div className='p-5 rounded-xl flex flex-col justify-between gap-3 h-full md:border-1 md:border'>
            <img
              className='w-full bg-cover rounded-xl'
              src={van.imageUrl}
              alt={van.name}
            />
            <div className='flex justify-between items-center'>
              <h2>{van.name}</h2>
              <div className='flex flex-col justify-center items-end text-3xl'>
                <span>${van.price}</span>
                <span className='text-lg'>/day</span>
              </div>
            </div>
            <div
              className={`p-3 text-[#ffead0] inline max-w-28 text-center rounded-xl text-xl ${van.type}`}
            >
              {van.type}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
