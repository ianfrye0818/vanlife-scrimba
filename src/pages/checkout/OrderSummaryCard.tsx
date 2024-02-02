import { useFormContext } from 'react-hook-form';
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
export default function OrderSummaryCard() {
  const { handleSubmit } = useFormContext<FormData>();

  //TODO:Replace with actual backend logic to handle payment
  function onSubmit<FormData>(data: FormData) {
    console.log(data);
  }
  return (
    <div className='lg:w-1/3'>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span>Product 1 x 2</span>
              <span>$99.98</span>
            </div>
            <div className='flex justify-between'>
              <span>Product 2 x 1</span>
              <span>$49.99</span>
            </div>
            <div className='flex justify-between font-bold'>
              <span>Total</span>
              <span>$149.97</span>
            </div>
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
