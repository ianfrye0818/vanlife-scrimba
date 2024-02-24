import { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import HostVanContext from '../context/HostVanContext';

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const { isSignedIn, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      navigate('/sign-in');
    }
  }, [isSignedIn, isLoading, navigate]);

  if (isLoading) return null;
  if (!isSignedIn) return null;

  return <HostVanContext>{children}</HostVanContext>;
}
