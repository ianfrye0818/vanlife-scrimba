//library imports
import { useForm, FormProvider } from 'react-hook-form';

//component imports
import Layout from '../../Layout';
import CheckOutForm from './CheckOutForm';
import OrderSummaryCard from './OrderSummaryCard';

export default function Component() {
  //creates context to be able to pass down to the form components
  const methods = useForm();

  return (
    <Layout>
      <main className='container'>
        <FormProvider {...methods}>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-12 mb-10'>
            <CheckOutForm />
            <OrderSummaryCard />
          </div>
        </FormProvider>
      </main>
    </Layout>
  );
}
