import { AuthContext } from '../context/AuthContextProvider';
import { useContext } from 'react';

export function useUser() {
  const authContext = useContext(AuthContext);
  //check if user is signed in
  const isSignedIn = authContext.user !== null;
  //check if the user is loaded
  const isLoaded = authContext.user !== undefined;
  //get the user
  const user = authContext.user;
  //check if the user is still loading
  const isLoading = !isLoaded;
  return { isSignedIn, isLoaded, isLoading, user };
}
