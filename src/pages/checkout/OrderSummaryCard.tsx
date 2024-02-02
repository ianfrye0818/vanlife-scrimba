import { useFormContext } from 'react-hook-form';
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useCart } from '../../hooks/useCartContext';
export default function OrderSummaryCard() {
  const { handleSubmit } = useFormContext<FormData>();
  const { cart } = useCart();

  //TODO:Replace with actual backend logic to handle payment

  const total = cart.reduce((reducer, item) => {
    return reducer + item.price;
  }, 0);

  function onSubmit<FormData>(data: FormData) {
    data = { ...data, cart, total };
    console.log(data);
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
