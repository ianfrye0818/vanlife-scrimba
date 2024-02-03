//library imports

//component imports
import Layout from '../../layout';
import SignInForm from './SignInForm';

export default function SignIn() {
  return (
    <Layout>
      <main className='h-screen flex flex-col justify-center items-center'>
        <SignInForm />
      </main>
    </Layout>
  );
}
