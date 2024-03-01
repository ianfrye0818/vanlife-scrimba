//library imports
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';

//component imports
import Layout from '../../Layout';
import { DialogBox } from '../../components/ui/DialogBox';
import ReviewVanForm from '../../components/ReviewVanForm';
import { StarIcon } from 'lucide-react';
import { ImageCarousel } from '../../components/ui/imageCarousel';
import Reviews from '../../components/Reviews';
import SignInModal from '../../components/SignInModal';

//custom imports
import { getItembyID, updateItem } from '../../firebase/firebaseDatabase';

//context & hook imports
import { useUser } from '../../hooks/useUser';

//type imports
import { Van } from '../../types/VanInterfaces';
import { CartItem } from '../../types/CartItemInterface';
import { useCart } from '../../hooks/useCart';

export default function VanDetails() {
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart } = useCart();

  //query db and get van by id
  const {
    data: van,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['van', id],
    queryFn: async () => {
      const data = await getItembyID('vans', id as string);
      return data as Van;
    },
  });

  //check if items are already in teh cart
  function checkIfItemIsInCart() {
    if (cart && van) {
      const item = cart.items.find((item: CartItem) => item.id === van.id);
      if (item) return item;
      return null;
    }
    return null;
  }

  //add items to teh cart
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
              label: 'Go to Cart',
              onClick: () => {
                navigate('/cart');
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
              label: 'Go to Cart',
              onClick: () => {
                navigate('/cart');
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
        duration: 3000,
        description: (
          <div className='flex gap-2 items-center'>
            Please sign in to rent this van. <SignInModal />
          </div>
        ),
      });
    }
  }

  //while loading - show loading spinner
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

  //if there is an error, show the error message
  if (error) {
    return <div>Something went wrong</div>;
  }

  //if data does not exisist return null and redirec to 404 not found page
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
        <div className=' flex flex-col gap-4 min-h-screen md:h-auto mb-5'>
          <div className='flex flex-col gap-8 p-3 lg:flex-row pb-9 '>
            <div className='flex-1'>
              <div className='w-full flex justify-center items-center '>
                <ImageCarousel
                  mainImage={van.imageURL as string}
                  imageBucketPath={van.imageBucketPath}
                />
              </div>
            </div>
            <div className='flex-1 md:p-x-12 flex flex-col gap-10'>
              <div
                className={`p-3 text-[#ffead0] inline max-w-28 text-center rounded-xl text-xl ${van.type}`}
              >
                {van.type}
              </div>
              <h2 className='text-2xl font-bold'>{van.name}</h2>
              <p className='font-bold'>Price: ${van.price}/day</p>
              <p className='leading-6'>{van.description}</p>
              {van.uid === user?.uid ? (
                <Link to={`/host/vans/${van.id}/edit`}>
                  <button className='bg-orange-500 text-white p-3 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out w-40 text-center cursor-pointer'>
                    Edit Van
                  </button>
                </Link>
              ) : (
                <button
                  onClick={addToCart}
                  className='bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out w-40 text-center cursor-pointer'
                >
                  Rent this van
                </button>
              )}

              <div>
                <DialogBox
                  titleText='Leave us a review!'
                  dialogTriggerButton={
                    <button className='underline text-gray-600 cursor-pointer flex gap-2'>
                      Leave us a review{' '}
                      <StarIcon
                        className='text-yellow-500 '
                        fill='currentColor'
                      />
                    </button>
                  }
                  header
                  open={open}
                  setOpen={setOpen}
                >
                  <ReviewVanForm
                    van={van}
                    setOpen={setOpen}
                  />
                </DialogBox>
              </div>
            </div>
          </div>
          <div>{van.reviews && van.reviews.length > 0 && <Reviews van={van} />}</div>
        </div>
      </main>
    </Layout>
  );
}
