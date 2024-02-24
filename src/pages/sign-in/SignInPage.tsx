//library imports

//component imports
import Layout from '../../Layout';
import SignInForm from './components/SignInForm';

export default function SignIn() {
  return (
    <Layout>
      <main className='h-screen flex flex-col justify-center items-center'>
        <SignInForm />
      </main>
    </Layout>
  );
}
