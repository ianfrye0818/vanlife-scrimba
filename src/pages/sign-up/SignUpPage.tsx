//library imports

//component imports
import Layout from '../../layout';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <Layout>
      <main className='h-screen flex flex-col justify-center items-center'>
        <SignUpForm />
      </main>
    </Layout>
  );
}
