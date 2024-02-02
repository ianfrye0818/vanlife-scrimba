import Layout from '../../layout';
import { useForm, FormProvider } from 'react-hook-form';
import CheckOutForm from './CheckOutForm';
import OrderSummaryCard from './OrderSummaryCard';

export default function Component() {
  const methods = useForm();

  return (
    <Layout>
      <FormProvider {...methods}>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-12 mb-10'>
          <CheckOutForm />
          <OrderSummaryCard />
        </div>
      </FormProvider>
    </Layout>
  );
}
