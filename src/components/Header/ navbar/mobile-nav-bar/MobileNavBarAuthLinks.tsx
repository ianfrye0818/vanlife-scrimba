//library imports
import { Link } from 'react-router-dom';

//component imports
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { logoutUser } from '../../../../firebase/firebaseAuth';
import SignInModal from '../../../SignInModal';

export default function MobileNavBarAuthLinks() {
  const { user } = useContext(AuthContext);

  //Creates auth links when the user is logged in or signin / sign up links when the user is not logged in.

  //uses Material UI List and ListItem components to create the links - will refactor to ShadCN UI once project is complete for more consistent styling.
  const authLinks = user ? (
    <>
      <ListItem>
        <ListItemButton>
          <Link
            className='text-center block w-full p-2 bg-blue-600'
            to='/host/dashboard'
          >
            <ListItemText primary='Dashboard' />
          </Link>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <button
            className='text-center block w-full p-2 bg-red-500 rounded-md'
            onClick={logoutUser}
          >
            <ListItemText primary='Logout' />
          </button>
        </ListItemButton>
      </ListItem>
    </>
  ) : (
    <>
      <ListItem>
        <ListItemButton>
          {/* <SignInModal triggerButtonClassName='bg-orange-500 hover:bg-orange-600 w-full p-3' /> */}
          <Link
            className='text-center block w-full p-2 bg-orange-500 hover:bg-orange-600'
            to='/signin'
          >
            Sign In
          </Link>
        </ListItemButton>
      </ListItem>
    </>
  );
  return authLinks;
}
