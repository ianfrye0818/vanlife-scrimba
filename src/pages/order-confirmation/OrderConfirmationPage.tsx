//librairies import
import { Link } from 'react-router-dom';

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

//TODO: fetch order from DB and diplay logic
//TODO: refactor this page

export default function OrderConfirmationPage() {
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
                    <TableRow>
                      <TableCell>Acme T-Shirt</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell className='text-right'>$40.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Acme Jeans</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell className='text-right'>$60.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className='flex items-center justify-end'>
                <div className='text-lg font-medium'>Total: $100.00</div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>
                  John Doe
                  <br />
                  123 Main St.
                  <br />
                  Anytown, CA 12345
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>
                  Visa ending in 1234
                  <br />
                  Expiration: 01/23
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
