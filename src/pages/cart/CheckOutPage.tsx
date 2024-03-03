//library imports
import { useForm, FormProvider } from 'react-hook-form';

//component imports
import Layout from '../../Layout';
import CheckOutForm from '../../components/forms/CheckOutForm';
import OrderSummaryCard from '../../components/ui/OrderSummaryCard';
import NoCartPage from './NoCartPage';
import { useCart } from '../../hooks/useCart';

export default function Component() {
  const { cart } = useCart();
  //creates context to be able to pass down to the form components
  const methods = useForm();

  return (
    <Layout>
      <main className=' p-2 md:p-0 md:container min-h-screen mt-20 md:mt-0'>
        {cart && cart.van ? (
          <FormProvider {...methods}>
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-12 mb-10'>
              <CheckOutForm />
              <OrderSummaryCard />
            </div>
          </FormProvider>
        ) : (
          <NoCartPage />
        )}
      </main>
    </Layout>
  );
}
