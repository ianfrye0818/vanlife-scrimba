import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Van } from '../../types/VanInterfaces';
import Layout from '../../layout';

export default function VanDetails() {
  const [van, setVan] = useState<Van | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans);
      });
  }, [id]);

  return (
    <Layout>
      <div className='van-details-page'>
        <div className='van-details-page-img-container'>
          <img
            src={van?.imageUrl}
            alt={van?.name}
          />
        </div>
        <div className='van-details-page-text-container'>
          <div className={`van-card-type ${van?.type}`}>{van?.type}</div>
          <h2>{van?.name}</h2>
          <p style={{ fontWeight: 'bold' }}>Price: ${van?.price}/day</p>
          <p style={{ lineHeight: '1.5rem' }}>{van?.description}</p>
          <button className='btn btn-primary'>Rent this van</button>
        </div>
      </div>
    </Layout>
  );
}
