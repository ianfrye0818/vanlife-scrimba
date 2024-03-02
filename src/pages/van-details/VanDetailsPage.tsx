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

//custom imports
import { getItembyID, updateItem } from '../../firebase/firebaseDatabase';

//context & hook imports
import { useUser } from '../../hooks/useUser';

//type imports
import { Van } from '../../types/VanInterfaces';
import { useCart } from '../../hooks/useCart';
import CalendarScheduler from '../../components/ui/CalendarScheduler';
import { Timestamp } from 'firebase/firestore';
import { useDates } from '../../hooks/useDates';

export default function VanDetails() {
  const [open, setOpen] = useState(false);
  const { selectedDates, setSelectedDates } = useDates();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { setDialogOpen } = useDates();

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

  //add to cart function
  async function addToCart() {
    console.log('clicked');
    if (selectedDates.length === 0) {
      toast.error('Please select a date');
      return;
    }

    if (cart && van) {
      const updatedVan = await updateItem('carts', cart.id, {
        van,
        dates: selectedDates,
        uid: user?.uid,
        updatedAt: Timestamp.now(),
      });
      if (updatedVan) {
        setDialogOpen(false);
        navigate('/cart');
      } else {
        toast('Something went wrong. Please try again');
      }
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
                <div>
                  <CalendarScheduler
                    setSelectedDates={setSelectedDates}
                    selectedDates={selectedDates}
                    addToCart={addToCart}
                    buttonClassName='p-2 bg-green-600 hover:bg-green-700 text-white hover:text-white'
                    buttonTitle='Rent this van'
                    van={van}
                  />
                </div>
              )}

              {van.uid !== user?.uid && (
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
              )}
            </div>
          </div>
          <div>{van.reviews && van.reviews.length > 0 && <Reviews van={van} />}</div>
        </div>
      </main>
    </Layout>
  );
}
