//library imports
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//component imports
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from './card';
import { Button } from './button';
import { Avatar } from '@mui/material';
import RemoveItemDialog from './RemoveItemAlertDialog';
import SignInModal from '../SignInModal';
import CalendarScheduler from './CalendarScheduler';
import { toast } from 'sonner';

//custom imports
import { getItembyID, updateItem } from '../../firebase/firebaseDatabase';
import { formatDate } from '../../utils/formatDate';
import { createOrder } from '../../utils/createOrder';
import { protectData } from '../../utils/protectedData';
import { removeItem } from '../../utils/removeItem';

//type imports
// import { CheckOutFormData } from '../../types/CheckOutFormData';
import { Selected } from '@demark-pro/react-booking-calendar';
import { Timestamp } from 'firebase/firestore';
import { Van } from '../../types/VanInterfaces';
import { UserData } from '../../types/UserData';

//custom hook imports
import { useUser } from '../../hooks/useUser';
import { useCart } from '../../hooks/useCart';
import { useDates } from '../../hooks/useDates';
import { calculateNumberOfDays } from '../../utils/calculateNumberOfDays';
import calculateTotal from '../../utils/calculateTotal';
import { CheckOutFormData } from '../../types/CheckOutFormData';

export default function OrderSummaryCard() {
  //hooks
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext<CheckOutFormData>();
  const { cart } = useCart();
  const { selectedDates, setSelectedDates, setDialogOpen } = useDates();
  const { user } = useUser();

  //global variables
  const numberOfDays = calculateNumberOfDays(
    cart?.dates[0] as Timestamp,
    cart?.dates[1] as Timestamp
  );
  const total = calculateTotal(cart);

  //function to update dates if the user wants to change the dates they rent the van - gets passed into the add to cart function
  async function updatingDates() {
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

  async function onSubmit(data: CheckOutFormData) {
    //handle edge cases for missing data
    if (!user) {
      toast.error('Please sign in to checkout');
      return;
    }
    if (!cart) {
      toast.error('Could not load cart, please try again later');
      return;
    }
    if (!cart.van) {
      toast.error('Could not load van, please try again later');
      return;
    }
    const reservedDates = cart.van.reserved;

    //protect user data such as cc info
    const protectedData = protectData(data);

    //create a new order and get order id
    const orderId = await createOrder(protectedData, cart, user.uid as string, total as number);

    //add tranasaction to host suer
    const hostData = (await getItembyID('users', cart.van?.uid as string)) as UserData;
    await updateItem('users', cart.van?.uid as string, {
      transactions: [...hostData.transactions, orderId],
    });

    //if order id was unable to be created return from function and display error in toast
    if (!orderId) {
      toast.error('Problem creating order, please try again');
      return;
    }

    //update user data to show that they have a new order
    const userData = (await getItembyID('users', user.uid)) as UserData;
    await updateItem('users', user.uid, { orders: [...userData.orders, orderId] });

    //update the van to show that the dates are reserved
    if (reservedDates !== undefined && reservedDates.length !== 0) {
      await updateItem('vans', cart.van.id, {
        reserved: [...reservedDates, { startDate: cart.dates[0], endDate: cart.dates[1] }],
      });
    } else {
      await updateItem('vans', cart.van.id, {
        reserved: [{ startDate: cart.dates[0], endDate: cart.dates[1] }],
      });
    }

    //empty user cart by deleteing cart fromn DB
    await updateItem('carts', cart.id, { van: null, dates: [] });

    //navigate to order confirmation page passing along the order id as a param
    navigate('/order-confirmation/' + orderId);
  }

  //jsx return
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
              {/* remove item button for removing item from cart */}
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
                {/* uses a format date funciton to format timestamp into regular date string with just month/date/year */}
                {formatDate(cart.dates[0] as Timestamp)} to {formatDate(cart.dates[1] as Timestamp)}
              </span>
              <span className='block'>({numberOfDays} days)</span>
              <br />
              {/* calendar scheduler component for the user to be able to select dates */}
              <CalendarScheduler
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates as Selected[]}
                callback={updatingDates}
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
