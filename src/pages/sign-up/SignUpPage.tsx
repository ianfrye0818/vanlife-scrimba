//library imports

//component imports
import Layout from '../../Layout';
import SignUpForm from '../../components/forms/SignUpForm';

export default function SignUp() {
  return (
    <Layout>
      <main className='h-screen flex flex-col justify-center items-center'>
        <SignUpForm />
      </main>
    </Layout>
  );
}
