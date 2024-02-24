import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
export default function AuthRoutes({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isSignedIn, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      navigate('/host/dashboard');
    }
  }, [isSignedIn, isLoading, navigate]);

  if (isLoading) return null;
  if (isSignedIn) return null;
  return <div>{children}</div>;
}
