//library imports

//component imports
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import SignUpForm from './SignUpForm';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

export default function SignUp() {
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
        <SignUpForm />
      </main>
    </Layout>
  );
}
