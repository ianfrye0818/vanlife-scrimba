import { useQuery } from '@tanstack/react-query';
import HostPageLayout from '../HostPageLayout';
import { getItembyID } from '../../../firebase/firebaseDatabase';
import { useUser } from '../../../hooks/useUser';
import { UserData } from '../../../types/UserData';
import { Order } from '../../../types/Order';
import ReactLoading from 'react-loading';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '../../../components/ui/card';

import IncomeCalculations from '../../../utils/incomeCalculations';
import BarChart from '../../../components/ui/barchart';
export default function IncomePage() {
  const { user } = useUser();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', user?.uid],
    queryFn: async () => {
      const response = (await getItembyID('users', user?.uid as string)) as UserData;
      const transactionOrders = await Promise.all(
        response.transactions.map(async (transaction) => {
          return (await getItembyID('orders', transaction)) as Order;
        })
      );
      return transactionOrders;
    },
    enabled: user !== null && user !== undefined,
    retry: 1,
  });

  // while loading show the "bubble" loading component from react-loading
  if (isLoading) {
    return (
      <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
        <ReactLoading
          type='bubbles'
          color='green'
          height={300}
          width={375}
        />
      </div>
    );
  }

  // if there is an error, show the error message

  //if data does not exisist return null and redirec to 404 not found page
  if (transactions === null || transactions === undefined || transactions.length === 0) {
    return (
      <HostPageLayout>
        <main className='min-h-[calc(100vh-200px)] flex flex-col justify-center items-center'>
          No Transactions Found
        </main>
      </HostPageLayout>
    );
  }

  const vanSalesData = IncomeCalculations.getVansSoldByVan(transactions).map((van) => ({
    name: van.vanName,
    value: van.totalSales,
  }));

  const vanNightsData = IncomeCalculations.getVansSoldByVan(transactions).map((van) => ({
    name: van.vanName,
    value: van.totalNights,
  }));

  return (
    <HostPageLayout>
      <div className='flex flex-col min-h-screen'>
        <main className='grid flex-1 min-h-[calc(100vh_-_theme(spacing.14))] gap-4 p-4 md:gap-8 md:p-10'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-4xl font-bold'>
                  ${IncomeCalculations.getTotalSales(transactions)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue Last 30 Days</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-4xl font-bold'>
                  ${IncomeCalculations.getTotalSalesLastThirtyDays(transactions)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Vans Rented</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-4xl font-bold'>
                  {IncomeCalculations.getNumberOfVansSold(transactions)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Vans Rented Last 30 Days</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-4xl font-bold'>
                  {IncomeCalculations.getNumberOfVansSoldLastThirtyDays(transactions)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Nights</CardTitle>
                <CardDescription>Total nights stayed in all vans</CardDescription>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-4xl font-bold'>
                  {IncomeCalculations.getTotalNightsSold(transactions)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nights in the Last 30 Days</CardTitle>
                <CardDescription>Total nights stayed in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-4xl font-bold'>
                  {IncomeCalculations.getTotalNightsSoldLastThirtyDays(transactions)}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Van</CardTitle>
                <CardDescription>Visual representation of sales by van</CardDescription>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <BarChart
                  className='w-full aspect-[1.5]'
                  data={vanSalesData}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nights by Van</CardTitle>
                <CardDescription>
                  Visual representation of sales by van in the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <BarChart
                  className='w-full aspect-[1.5]'
                  data={vanNightsData}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </HostPageLayout>
  );
}
