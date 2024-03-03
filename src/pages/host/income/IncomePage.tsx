import { useQuery } from '@tanstack/react-query';
import HostPageLayout from '../HostPageLayout';
import { getItembyID } from '../../../firebase/firebaseDatabase';
import { useUser } from '../../../hooks/useUser';
import { UserData } from '../../../types/UserData';
import { Order } from '../../../types/Order';
import ReactLoading from 'react-loading';
import IncomeCalculations from '../../../utils/incomeCalculations';
export default function IncomePage() {
  const { user } = useUser();

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
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
  if (error) {
    return <div>Something went wrong</div>;
  }

  //if data does not exisist return null and redirec to 404 not found page
  if (transactions === null || transactions === undefined || transactions.length === 0) {
    return <div>No Transactions Found</div>;
  }

  const totalSales = IncomeCalculations.getTotalSales(transactions);
  console.log(totalSales);
  const totalVansSole = IncomeCalculations.getNumberOfVansSold(transactions);
  console.log(totalVansSole);

  const totalNightsSold = IncomeCalculations.getTotalNightsSold(transactions);
  console.log(totalNightsSold);

  const transactionsLastThirtyDays = IncomeCalculations.getTransactionsLastThirtyDays(transactions);
  console.log(transactionsLastThirtyDays);

  const numberOfVansSoldLastThirtyDays =
    IncomeCalculations.getNumberOfVansSoldLastThirtyDays(transactions);
  console.log(numberOfVansSoldLastThirtyDays);

  const getTotalNightsSoldLastThirtyDays =
    IncomeCalculations.getTotalNightsSoldLastThirtyDays(transactions);
  console.log(getTotalNightsSoldLastThirtyDays);
  return (
    <HostPageLayout>
      <div>Income</div>
    </HostPageLayout>
  );
}
