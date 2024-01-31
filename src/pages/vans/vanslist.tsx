import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Van {
  id: string;
  name: string;
  price: number;
  desription?: string;
  imageUrl?: string;
  type?: string;
}

export default function Vanslist() {
  const [vans, setVans] = useState<Van[]>([]);
  useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  return (
    <div className='van-list'>
      {vans.map((van, index) => (
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
