import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
export default function AuthRoutes({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/host/dashboard');
    }
  });

  if (isSignedIn) return null;
  return <div>{children}</div>;
}
