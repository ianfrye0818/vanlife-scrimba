import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getItembyID } from '../../firebase/firebaseDatabase';
import { useUser } from '../../hooks/useUser';
import { UserData } from '../../types/UserData';
import { Order } from '../../types/Order';
import IncomeCalculations from '../../utils/incomeCalculations';

//TODO: fetch data from database
export default function SummaryComponent() {
  const { user } = useUser();

  const { data: transactions } = useQuery({
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

  return (
    <div className='flex justify-between items-center container bg-[#FFEAD0] p-6 md:p-8'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>Welcome!</h2>
        <p>Income last 30 Days</p>
        <p className='text-3xl font bold'>
          {transactions
            ? '$' + IncomeCalculations.getTotalSalesLastThirtyDays(transactions)
            : 'No Income Found'}
        </p>
      </div>
      <div>
        <Link
          className='text-gray-500 underline'
          to='/host/income'
        >
          Details
        </Link>
      </div>
    </div>
  );
}
