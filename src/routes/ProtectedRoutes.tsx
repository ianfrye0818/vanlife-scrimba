import { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in');
    }
    console.log('rednered');
  });
  if (!isSignedIn) return null;

  return <div>{children}</div>;
}
