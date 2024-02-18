//library imports

//component imports
import { useContext, useEffect } from 'react';
import Layout from '../../Layout';
import SignInForm from './components/SignInForm';
import { AuthContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/host/dashboard');
    }
  }, [user, navigate]);
  return (
    <Layout>
      <main className='h-screen flex flex-col justify-center items-center'>
        <SignInForm />
      </main>
    </Layout>
  );
}
