//library imports
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

//interface imports
import { Van } from '../../types/VanInterfaces';
//component imports
import Layout from '../../layout';
import { useCart } from '../../hooks/useCartContext';

export default function VanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const { data, error, isLoading } = useQuery({
    queryKey: ['van', id],
    queryFn: async () => {
      const { data } = await axios.get<{ vans: Van }>(`/api/vans/${id}`);
      return data;
    },
  });

  function addToCart() {
    if (data) {
      dispatch({ type: 'ADD', payload: { ...data.vans, quantity: 1 } });
    }
    toast('Item Added to Cart', {
      description: `${van.name} was added to your cart.`,
      action: {
        label: 'Remove',
        onClick: () => dispatch({ type: 'REMOVE', payload: { id: van.id } }),
      },
    });
  }

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
      <div className='underline mb-5 mt-14 pl-5'>
        <Link to='/vans'>{'<- Back to Vans'}</Link>
      </div>
      <div className='flex flex-col gap-8 p-3 lg:flex-row min-h-screen md:h-auto mb-12 pb-9'>
        <div className='flex-1'>
          <img
            className='w-full bg-cover rounded-2xl'
            src={van.imageUrl}
            alt={van.name}
          />
        </div>
        <div className='flex-1 md:p-12 flex flex-col gap-10'>
          <div
            className={`p-3 text-[#ffead0] inline max-w-28 text-center rounded-xl text-xl ${van.type}`}
          >
            {van.type}
          </div>
          <h2 className='text-2xl font-bold'>{van.name}</h2>
          <p className='font-bold'>Price: ${van.price}/day</p>
          <p className='leading-6'>{van.description}</p>
          <button
            onClick={addToCart}
            className='btn btn-primary'
          >
            Rent this van
          </button>
          <Link to='/cart'>Go To Cart</Link>
        </div>
      </div>
    </Layout>
  );
}
