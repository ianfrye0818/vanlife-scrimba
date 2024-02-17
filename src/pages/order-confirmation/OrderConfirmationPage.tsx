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
import { Cart } from '../../types/CartItemInterface';
import { Avatar } from '@mui/material';

//TODO: fetch order from DB and diplay logic
//TODO: refactor this page

type Order = {
  id: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  city: string;
  cvc: string;
  email: string;
  name: string;
  state: string;
  street: string;
  total: number;
  user?: string;
  zip: string;
  cart: Cart;
};

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

  if (error) {
    return <div>Something went wrong</div>;
  }
  if (order === null || order === undefined) {
    navigate('/not-found');
    return null;
  }

  console.log(order);
  return (
    <Layout>
      <div className='h-screen flex flex-col'>
        <main className='flex-1 p-6 md:p-12'>
          <h1 className='text-2xl font-semibold mb-6'>Order Confirmation</h1>
          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className='text-right'>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.cart.items.map((item) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Avatar src={item.imageURL}>{item.name[0]}</Avatar>
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className='text-right'>{item.price * item.quantity}</TableCell>
                        </TableRow>
                      );
                    })}
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
                  {order.name}
                  <br />
                  {order.street}
                  <br />
                  {order.city}, {order.state} {order.zip}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>
                  Visa ending in {order.cardNumber.slice(-4)}
                  <br />
                  Expiration: {order.expiryDate}
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
