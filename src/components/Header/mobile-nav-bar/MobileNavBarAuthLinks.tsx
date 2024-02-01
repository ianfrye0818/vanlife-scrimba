import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
export default function MobileNavBarAuthLinks() {
  //TODO: Replace null with user object
  const user = null;

  const authLinks = user ? (
    <>
      <ListItem>
        <ListItemButton>
          <Link
            className='text-center block w-full p-2 bg-orange-500 rounded-md'
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
            onClick={() => {}}
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
          <Link
            className='bg-orange-500 p-2 rounded-md w-full text-center uppercase font-bold'
            to='/sign-in'
          >
            <ListItemText primary='Sign In' />
          </Link>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <Link
            className='bg-blue-700 p-2 rounded-md w-full text-center uppercase font-bold'
            to='/sign-up'
          >
            <ListItemText primary='Sign Up' />
          </Link>
        </ListItemButton>
      </ListItem>
    </>
  );
  return authLinks;
}
