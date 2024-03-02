//library imports
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//component imports
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from './card';
import { Button } from './button';
import { Avatar } from '@mui/material';
import RemoveItemDialog from './RemoveItemAlertDialog';

//custom imports
import { addItem, deleteItem, getItembyID, updateItem } from '../../firebase/firebaseDatabase';
import { useUser } from '../../hooks/useUser';

//utility imports
import protectData from '../../utils/ProtectData';
import removeItem from '../../utils/removeItem';

//type imports
import { CheckOutFormData, Order } from '../../types/CheckOutFormData';
import { useCart } from '../../hooks/useCart';
import SignInModal from '../SignInModal';
import { formatDate } from '../../utils/formatDate';
import { Timestamp } from 'firebase/firestore';
import CalendarScheduler from './CalendarScheduler';
import { Selected } from '@demark-pro/react-booking-calendar';
import { toast } from 'sonner';
import { useDates } from '../../hooks/useDates';
import { Van } from '../../types/VanInterfaces';

export default function OrderSummaryCard() {
  const { handleSubmit } = useFormContext<CheckOutFormData>();
  //use cart - custom hook for creating and managing cart for user
  const { cart } = useCart();
  const navigate = useNavigate();

  const { selectedDates, setSelectedDates, setDialogOpen } = useDates();
  const { user } = useUser();
  const numberOfDays = Math.floor(
    ((cart?.dates[1] as Timestamp).seconds - (cart?.dates[0] as Timestamp).seconds) / 86400
  );
  const total = cart?.van?.price ? cart.van.price * numberOfDays : 0;

  async function addToCart() {
    if (selectedDates.length === 0) {
      toast.error('Please select a date');
      return;
    }

    const updatedItem = updateItem('carts', cart?.id as string, {
      dates: selectedDates,
    });
    setDialogOpen(false);
    if (!updatedItem) {
      toast.error('Something went wrong, please try again');
    }
  }
  //reduces the cart array to a single value - the total price of all items in the cart

  async function onSubmit(data: CheckOutFormData) {
    //if cart was unable to load return from function
    if (!cart) {
      alert('Something went wrong, please try again');
      return;
    }
    //protect user data such as cc info
    const protectedData = protectData(data);

    //TODO: do not need all this info. break it out
    //create a new order
    const newOrder: Order = {
      ...protectedData,
      cart,
      user: user ? user.uid : '',
      total,
    };

    //upload order to db and get order id
    const orderId = await addItem('orders', newOrder);
    //clear cart
    if (!orderId) {
      alert('Something went wrong, please try again');
      return;
    }
    //add order id to users order array
    if (user) {
      const userData = await getItembyID('users', user.uid);
      if (userData) {
        await updateItem('users', user.uid, { orders: [...userData.orders, orderId] });
      }
    }
    const reserved = cart.van?.reserved ?? [];
    await updateItem(
      'vans',
      cart.van?.id as string,
      { reserved: [...reserved, { startDate: cart.dates[0], endDate: cart.dates[1] }] } as Van
    );
    //empty user cart
    await deleteItem('carts', cart.id); // empty user cart
    //navigate to order confirmation page passing along the order id as a param
    navigate('/order-confirmation/' + orderId);
  }
  return (
    <div className='lg:w-1/3'>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        {cart && (
          <CardContent>
            <div className='flex gap-2 items-center mb-4'>
              <Avatar src={cart.van?.imageURL}>{cart.van?.name[0]}</Avatar>
              <span>{cart.van?.name}</span>
              <RemoveItemDialog
                actionCallback={() => removeItem(cart)}
                triggerClassNames='text-sm text-gray-500 cursor-pointer underline'
                triggerText='Remove'
              />
              <span className='ml-auto'>${cart.van?.price}</span>
            </div>
            <div className='my-3'>
              <span className='block'>From:</span>{' '}
              <span className='block'>
                {' '}
                {formatDate(cart.dates[0] as Timestamp)} to {formatDate(cart.dates[1] as Timestamp)}
              </span>
              <span className='block'>({numberOfDays} days)</span>
              <br />
              <CalendarScheduler
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates as Selected[]}
                addToCart={addToCart}
                buttonClassName='text-gray-600 underline cursor-pointer text-sm p-0 bg-transparent hover:bg-transparent hover:underline hover:text-gray-500'
                buttonTitle='Change Dates'
                van={cart.van as Van}
              />
            </div>
            <div className='flex justify-between font-bold '>
              <span>Total</span>
              {total && (
                <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              )}
            </div>
          </CardContent>
        )}
        <CardFooter>
          {user ? (
            <Button
              className='bg-orange-600 hover:bg-orange-700 text-white hover:text-white p-3 w-full'
              onClick={handleSubmit(onSubmit)}
            >
              Checkout
            </Button>
          ) : (
            <SignInModal triggerButtonClassName='bg-orange-600 hover:bg-orange-700 text-white hover:text-white p-3 w-full' />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
