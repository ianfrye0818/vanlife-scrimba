//library imports
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//component imports
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useCart } from '../../hooks/useCartContext';

export default function OrderSummaryCard() {
  const { handleSubmit } = useFormContext<FormData>();
  //use cart - custom hook for creating and managing cart for user = TODO: add to local storage to be persisted
  const { cart } = useCart();
  const navigate = useNavigate();

  //reduces the cart array to a single value - the total price of all items in the cart
  const total = cart.reduce((reducer, item) => {
    return reducer + item.price;
  }, 0);

  //on submit - TODO: replace with actual backend logic to handle payment
  //adds the cart and total to the form data and logs it to the console
  //navigates to the order confirmation page
  function onSubmit<FormData>(data: FormData) {
    data = { ...data, cart, total };
    console.log(data);
    navigate('/order-confirmation');
  }
  return (
    <div className='lg:w-1/3'>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.map((item) => (
            <div className='flex justify-between'>
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${item.price}</span>
            </div>
          ))}

          <div className='flex justify-between font-bold'>
            <span>Total</span>
            <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type='submit'
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
