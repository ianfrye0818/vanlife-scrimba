import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VanFilterContext } from './VansPage';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Van } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';

export default function Vanslist() {
  const { vanFilter } = useContext(VanFilterContext);
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['vans'],
    queryFn: async () => {
      const { data } = await axios.get<{ vans: Van[] }>('/api/vans');
      return data;
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          height: 'calc(100vh - 100px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ReactLoading
          type='bubbles'
          color='green'
          height={300}
          width={375}
        />
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (data === null || data === undefined) {
    navigate('/not-found');
    return null;
  }

  const vans = data.vans;
  const filteredVans =
    vanFilter.length > 0
      ? vans.filter((van) => vanFilter.includes(van.type as VanFilterEnum))
      : vans;

  return (
    <div className='van-list'>
      {filteredVans.map((van, index) => (
        <Link
          to={`/vans/${van.id}`}
          key={index}
        >
          <div className='van-card'>
            <img
              className='van-card-image'
              src={van.imageUrl}
              alt={van.name}
            />
            <div className='van-card-text-container'>
              <h2 className='van-card-title'>{van.name}</h2>
              <div className='van-card-price-container'>
                <span className='van-card-price'>${van.price}</span>
                <span className='van-card-price-label'>/day</span>
              </div>
            </div>
            <div className={`van-card-type ${van.type}`}>{van.type}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
