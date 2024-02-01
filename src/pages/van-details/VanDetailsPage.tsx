import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Van } from '../../types/VanInterfaces';
import Layout from '../../layout';
import ReactLoading from 'react-loading';

export default function VanDetails() {
  const [van, setVan] = useState<Van | null>(null);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans);
      })
      .finally(() => setloading(false));
  }, [id]);

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

  if (!van) {
    navigate('/not-found');
    return null;
  }

  return (
    <Layout>
      <div
        style={{
          textDecoration: 'underline',
          marginBottom: '20px',
          marginTop: '50px',
          paddingLeft: '20px',
        }}
      >
        <Link to='/vans'>{'<- Back to Vans'}</Link>
      </div>
      <div className='van-details-page'>
        <div className='van-details-page-img-container'>
          <img
            src={van.imageUrl}
            alt={van.name}
          />
        </div>
        <div className='van-details-page-text-container'>
          <div className={`van-card-type ${van.type}`}>{van.type}</div>
          <h2>{van.name}</h2>
          <p style={{ fontWeight: 'bold' }}>Price: ${van.price}/day</p>
          <p style={{ lineHeight: '1.5rem' }}>{van.description}</p>
          <button className='btn btn-primary'>Rent this van</button>
        </div>
      </div>
    </Layout>
  );
}
