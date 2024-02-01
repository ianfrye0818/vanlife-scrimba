//library imports
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useQuery } from '@tanstack/react-query';
//interface imports
import { Van } from '../../types/VanInterfaces';
//component imports
import Layout from '../../layout';

export default function VanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['van', id],
    queryFn: async () => {
      const { data } = await axios.get<{ vans: Van }>(`/api/vans/${id}`);
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

  const van = data.vans;
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
