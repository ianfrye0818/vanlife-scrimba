import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { VanFilterContext } from './Vans';
import { Van } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';

export default function Vanslist() {
  const [vans, setVans] = useState<Van[]>([]);
  const { vanFilter } = useContext(VanFilterContext);
  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

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
