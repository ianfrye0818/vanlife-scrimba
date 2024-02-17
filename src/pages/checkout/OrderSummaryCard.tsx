//library imports
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//component imports
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { addItem, updateItem } from '../../firebase/firebaseDatabase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { CartContext } from '../../context/cartContext';
//TODO: refactor this component to be more readable

export default function OrderSummaryCard() {
  const { handleSubmit } = useFormContext<FormData>();
  //use cart - custom hook for creating and managing cart for user = TODO: add to local storage to be persisted
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //reduces the cart array to a single value - the total price of all items in the cart
  const total = cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  async function onSubmit<FormData>(data: FormData) {
    if (!cart) {
      console.error('No cart found');
      return;
    }
    const { cardNumber, cvc } = data as { cardNumber: string; cvc: string };

    const protectedCardNumber = '****-****-****-' + cardNumber.slice(-4);
    const protectedCVC = '**' + cvc.slice(-1);

    const protectedData = { ...data, cardNumber: protectedCardNumber, cvc: protectedCVC };

    const newOrder = { ...protectedData, cart, user: user ? user.uid : '', total };
    const orderId = await addItem('orders', newOrder);
    console.log('orderId', orderId);
    //clear cart
    if (!orderId) {
      alert('Something went wrong, please try again');
      return;
    }
    await updateItem('carts', cart!.id, { items: [] });
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
                className='flex justify-between'
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}

            <div className='flex justify-between font-bold'>
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
