import { useEffect, useState } from 'react';
import SignUpForm from '../../components/forms/SignUpForm';
import SignInForm from '../../components/forms/SignInForm';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';

export default function SignInPage() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  useEffect(() => {
    if (user) navigate('/host/dashboard');
  }, [user, navigate]);

  if (isLoading) return null;

  return (
    <Layout>
      <div className='h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center'>
        {signup ? <SignUpForm setSignup={setSignup} /> : <SignInForm setSignup={setSignup} />}
      </div>
    </Layout>
  );
}
