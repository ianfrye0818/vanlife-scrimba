import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { VanFilterContext } from './Vans';
import { Van } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';
import ReactLoading from 'react-loading';

export default function Vanslist() {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(false);
  const { vanFilter } = useContext(VanFilterContext);
  useEffect(() => {
    setLoading(true);
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setVans(data.vans);
      });
  }, []);

  const filteredVans =
    vanFilter.length > 0
      ? vans.filter((van) => vanFilter.includes(van.type as VanFilterEnum))
      : vans;

  if (loading) {
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
