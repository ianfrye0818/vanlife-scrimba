//librairies import
import { Link, useNavigate } from 'react-router-dom';

//components import
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from '../../components/ui/card';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import Layout from '../../Layout';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getItembyID } from '../../firebase/firebaseDatabase';
import ReactLoading from 'react-loading';
import { Avatar } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { Order } from '../../types/Order';
import { calculateNumberOfDays } from '../../utils/calculateNumberOfDays';
import { Timestamp } from 'firebase/firestore';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: async () => {
      const data = await getItembyID('orders', orderId as string);
      return data as Order;
    },
  });
  //loading show loading spinner
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
  //error show error message
  if (error) {
    return <div>Something went wrong</div>;
  }
  //if order is not found show not found page
  if (order === null || order === undefined) {
    navigate('/not-found');
    return null;
  }

  const numberOfDays = calculateNumberOfDays(
    order.datesReserved[0] as Timestamp,
    order.datesReserved[1] as Timestamp
  );
  const vanTotal = order.total;

  return (
    <Layout>
      <div className='h-screen flex flex-col md:container mt-20 md:mt-0'>
        <main className='flex-1 p-6 md:p-12'>
          <h1 className='text-2xl font-semibold mb-2'>Order Confirmation</h1>
          <h2 className='text-xl text-gray-500 mb-6'>OrderID: {orderId}</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className='text-right'># of Days</TableHead>
                      <TableHead className='text-right'>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Avatar src={order.vanOrdered.vanImage}>{order.vanOrdered.vanName}</Avatar>
                      </TableCell>
                      <TableCell>{order.vanOrdered.vanName}</TableCell>
                      <TableCell className='text-center'>{numberOfDays}</TableCell>
                      <TableCell className='text-right'>${vanTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dates:</TableCell>
                      <TableCell colSpan={2}>
                        {formatDate(order.datesReserved[0] as Timestamp)} to{' '}
                        {formatDate(order.datesReserved[1] as Timestamp)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className='flex items-center justify-end'>
                <div className='text-lg font-medium'>Total: ${order.total.toFixed(2)}</div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>
                  {order.customerInfo.name}
                  <br />
                  {order.customerInfo.address.street}
                  <br />
                  {order.customerInfo.address.city}, {order.customerInfo.address.state}{' '}
                  {order.customerInfo.address.zip}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>
                  Visa ending in {order.card.number.slice(-4)}
                  <br />
                  Expiration: {order.card.expiryDate}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='mt-6 text-center'>
            <p className='text-lg font-medium mb-4'>
              Thank you for your order! You will receive an email confirmation shortly.
            </p>
            <Button
              size='lg'
              variant='default'
            >
              <Link to='/'>Return to Homepage</Link>
            </Button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
