//library imports
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import CalendarScheduler from '../../components/ui/CalendarScheduler';
import ReactLoading from 'react-loading';

//custom imports
import { getItembyID, updateItem } from '../../firebase/firebaseDatabase';

//ook imports
import { useUser } from '../../hooks/useUser';
import { useDates } from '../../hooks/useDates';
import { useCart } from '../../hooks/useCart';

//type imports
import { Van } from '../../types/VanInterfaces';
import { Timestamp } from 'firebase/firestore';

export default function VanDetails() {
  //hooks
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  //custom hooks
  const { selectedDates, setSelectedDates, setDialogOpen } = useDates();
  const { user } = useUser();
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

  //add to cart function
  async function addToCart() {
    //handle edge cases if data is missing
    if (selectedDates.length === 0) {
      toast.error('Please select a date');
      return;
    }
    if (!user) {
      toast.error('Please sign in to rent a van');
      return;
    }
    if (!cart || !van) {
      toast.error('Something went wrong. Please try again');
      return;
    }

    //update cart with selected van and dates
    const updatedVan = await updateItem('carts', cart.id, {
      van,
      dates: selectedDates,
      uid: user?.uid,
      updatedAt: Timestamp.now(),
    });
    //handle edge case if data is missing
    if (!updatedVan) {
      toast.error('Something went wrong. Please try again');
      return;
    }
    //close diaglog and navigate to cart
    setDialogOpen(false);
    navigate('/cart');
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
    return (
      <div className='h-screen w-full flex flex-col justify-center items-center'>
        Something went wrong
      </div>
    );
  }

  //if data does not exisist return null and redirec to 404 not found page
  if (van === null || van === undefined) {
    navigate('/not-found');
    return null;
  }
  van.id, user?.uid;
  return (
    <Layout>
      <main className=' p-2 md:container'>
        <div className='underline mb-5 mt-14 pl-5'>
          <Link to='/vans'>{'<- Back to Vans'}</Link>
        </div>
        <div className=' flex flex-col gap-4 min-h-screen md:h-auto mb-5 '>
          <div className='flex flex-col gap-8 p-3 lg:flex-row lg:pb-9 '>
            <div className='flex-1 '>
              <div className='w-full flex justify-center items-center '>
                <ImageCarousel
                  mainImage={van.imageURL as string}
                  imageBucketPath={van.imageBucketPath}
                />
              </div>
            </div>
            <div className='flex-1  md:p-x-12 flex flex-col gap-4 w-full   lg:gap-10  '>
              <div
                className={`p-3 text-[#ffead0] inline max-w-28 text-center rounded-xl text-xl -order-1 lg:-order-2 ${van.type}`}
              >
                {van.type}
              </div>
              <h2 className='text-2xl font-bold -order-2 lg:-order-1'>{van.name}</h2>
              <p className='font-bold'>Price: ${van.price}/day</p>
              <p className='leading-6'>{van.description}</p>
              {/* if use owns the van - show edit van button instead of adding can to cart */}
              {van.uid === user?.uid ? (
                <Link to={`/host/vans/${van.id}/edit`}>
                  <button className='w-full bg-orange-500 text-white p-3 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out lg:w-40 text-center cursor-pointer'>
                    Edit Van
                  </button>
                </Link>
              ) : (
                <div>
                  {/* calendar scheduler for selecting dates  - shown if the van does not belong to the user*/}
                  <CalendarScheduler
                    setSelectedDates={setSelectedDates}
                    selectedDates={selectedDates}
                    callback={addToCart}
                    buttonClassName='p-2 bg-green-600 hover:bg-green-700 text-white hover:text-white w-full lg:w-auto'
                    buttonTitle='Rent this van'
                    van={van}
                  />
                </div>
              )}

              {/* if user does not own van able to leave a review  */}
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
