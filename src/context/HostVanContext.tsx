import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { queryItem } from '../firebase/firebaseDatabase';
import { Van } from '../types/VanInterfaces';
import { useUser } from '../hooks/useUser';

export const HostContext = createContext<{
  vans: Van[];
  error: string | null;
  isError: boolean;
  isLoading: boolean;
  setVans: (vans: Van[]) => void;
}>({ vans: [] as Van[], error: null, isError: false, isLoading: true, setVans: () => {} });

export default function HostVanContext({ children }: PropsWithChildren) {
  const [vans, setVans] = useState<Van[]>([]);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoading: userIsLoading } = useUser();
  useEffect(() => {
    if (!userIsLoading && user) {
      queryItem('vans', 'uid', user.uid)
        .then((data) => {
          setVans(data as Van[]);
        })
        .catch((error) => {
          setError(error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setVans([]);
    }
  }, [user, userIsLoading]);

  return (
    <HostContext.Provider value={{ vans, error, isError, isLoading, setVans }}>
      {children}
    </HostContext.Provider>
  );
}
