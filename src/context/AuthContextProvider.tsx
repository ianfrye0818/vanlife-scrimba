import { useState, createContext, useEffect } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

//create the context
export const AuthContext = createContext({
  user: null as User | null,
  loading: true,
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};
//create the provider
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
