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
      <main className='container h-screen'>
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
