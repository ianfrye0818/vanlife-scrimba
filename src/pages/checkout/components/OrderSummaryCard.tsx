//library imports
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

//component imports
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Avatar } from '@mui/material';
import RemoveItemDialog from './RemoveItemAlertDialog';

//custom imports
import { addItem, getItembyID, updateItem } from '../../../firebase/firebaseDatabase';
import { AuthContext } from '../../../context/AuthContextProvider';
import { CartContext } from '../../../context/cartContext';

//utility imports
import protectData from '../utils/ProtectData';
import calculateTotal from '../utils/calculateTotal';
import removeItem from '../utils/removeItem';

//type imports
import { CheckOutFormData, Order } from '../../../types/CheckOutFormData';

export default function OrderSummaryCard() {
  const { handleSubmit } = useFormContext<CheckOutFormData>();
  //use cart - custom hook for creating and managing cart for user = TODO: add to local storage to be persisted
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //reduces the cart array to a single value - the total price of all items in the cart
  const total = calculateTotal(cart?.items);

  async function onSubmit(data: CheckOutFormData) {
    //if cart was unable to load return from function
    if (!cart) {
      alert('Something went wrong, please try again');
      return;
    }
    //protect user data such as cc info
    const protectedData = protectData(data);

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
    //empty user cart

    await updateItem('carts', cart!.id, { items: [] });
    //add order id to users order array
    if (user) {
      const userData = await getItembyID('users', user.uid);
      if (userData) {
        await updateItem('users', user.uid, { orders: [...userData.orders, orderId] });
      }
    }
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
            {cart.items.map((item) => (
              <div
                key={item.id}
                className='flex gap-2 items-center mb-4'
              >
                <Avatar src={item.imageURL}>{item.name[0]}</Avatar>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <RemoveItemDialog
                  removeItem={() => removeItem(item.id, cart)}
                  itemId={item.id}
                />
                <span className='ml-auto'>${item.price * item.quantity}</span>
              </div>
            ))}

            <div className='flex justify-between font-bold '>
              <span>Total</span>
              {total && (
                <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              )}
            </div>
          </CardContent>
        )}
        <CardFooter>
          <Button
            type='submit'
            disabled={cart?.items.length === 0}
            onClick={handleSubmit(onSubmit)}
            className='w-full p-3 bg-orange-500 hover:bg-orange-600 uppercase text-white font-bold'
          >
            Complete Purchase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
