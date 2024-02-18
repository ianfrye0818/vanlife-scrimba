//library imports
import { useForm, FormProvider } from 'react-hook-form';

//component imports
import Layout from '../../Layout';
import CheckOutForm from './components/CheckOutForm';
import OrderSummaryCard from './components/OrderSummaryCard';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import NoCartPage from './NoCartPage';

export default function Component() {
  const cart = useContext(CartContext);
  //creates context to be able to pass down to the form components
  const methods = useForm();

  return (
    <Layout>
      <main className='container'>
        {cart && cart?.items.length > 0 ? (
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
