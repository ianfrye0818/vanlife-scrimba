//library imports
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

//interface imports
//component imports
import Layout from '../../Layout';
import { getItembyID, updateItem } from '../../firebase/firebaseDatabase';
import { CartItem } from '../../types/CartItemInterface';
import { CartContext } from '../../context/CartContextProvider';
import { useContext } from 'react';
import { useUser } from '../../hooks/useUser';
import { DialogBox } from '../../components/ui/DialogBox';
import ReviewVan from '../../components/ReviewVan';

//TODO: refactor this component to be more readable
export default function VanDetails() {
  const { isSignedIn } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const {
    data: van,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['van', id],
    queryFn: async () => {
      const data = await getItembyID('vans', id as string);
      return data;
    },
  });

  function checkIfItemIsInCart() {
    if (cart && van) {
      const item = cart.items.find((item: CartItem) => item.id === van.id);
      if (item) return item;
      return null;
    }
    return null;
  }

  async function addToCart() {
    const itemInCart = checkIfItemIsInCart();
    if (van && isSignedIn && cart) {
      //if item is already in cart add 1 to quanity
      if (itemInCart) {
        const itemUpdated = await updateItem('carts', cart.id, {
          items: cart.items.map((item: CartItem) =>
            item.id === van.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
        if (itemUpdated) {
          toast('Item Added to Cart', {
            description: `${van.name} was added to your cart.`,
            action: {
              label: 'Remove',
              onClick: async () => {
                await updateItem('carts', cart.id, {
                  items: cart.items.filter((item: CartItem) => item.id !== van.id),
                });
              },
            },
          });
        } else {
          toast('Error', {
            description: 'Something went wrong, please try again',
          });
        }
      }
      //if item is not in cart add item to cart and set quantity to 1
      else {
        const itemAdded = await updateItem('carts', cart.id, {
          items: [...cart.items, { ...van, quantity: 1 }],
        });
        if (itemAdded) {
          toast('Item Added to Cart', {
            description: `${van.name} was added to your cart.`,
            action: {
              label: 'Remove',
              onClick: async () => {
                await updateItem('carts', cart.id, {
                  items: cart.items.filter((item: CartItem) => item.id !== van.id),
                });
              },
            },
          });
        } else {
          toast('Error', {
            description: 'Something went wrong, please try again',
          });
        }
      }
    } else {
      toast('Oops!', {
        description: 'Please sign in to add items to your cart.',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/sign-in'),
        },
      });
    }
  }

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
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
  if (van === null || van === undefined) {
    navigate('/not-found');
    return null;
  }

  return (
    <Layout>
      <main className='container'>
        <div className='underline mb-5 mt-14 pl-5'>
          <Link to='/vans'>{'<- Back to Vans'}</Link>
        </div>
        <div className='flex flex-col gap-8 p-3 lg:flex-row min-h-screen md:h-auto mb-12 pb-9'>
          <div className='flex-1'>
            <img
              className='w-full bg-cover rounded-2xl'
              src={van.imageURL}
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
              className='bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out w-40 text-center cursor-pointer'
            >
              Rent this van
            </button>
            <div>
              <DialogBox
                titleText='Leave us a review!'
                dialogTriggerButton={<button>Leave us a review</button>}
              >
                <ReviewVan />
              </DialogBox>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
