//library imports
import { Link } from 'react-router-dom';

//component imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import MobileNavBarAuthLinks from './MobileNavBarAuthLinks';
import { FaShoppingCart } from 'react-icons/fa';

//declare props so taht I can pass in the toggle function to ppen and close the mobile nav
type MobileNavBarLinksProps = {
  toggleMobileNav: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export default function MobileNavBarLinks({ toggleMobileNav }: MobileNavBarLinksProps) {
  const navBarLinks = ['Home', 'About', 'Vans'];
  const list = (
    <Box
      sx={{
        width: '60vw',
        backgroundColor: '#1f1f1f',
        height: '100%',
        color: 'white',
        padding: '20px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      role='presentation'
      onClick={toggleMobileNav(false)}
      onKeyDown={toggleMobileNav(false)}
    >
      <List className=' w-full h-full text-center'>
        {navBarLinks.map((text) => (
          <ListItem key={text}>
            <ListItemButton>
              <Link
                className='text-center block w-full p-2'
                to={text.toLowerCase() === 'home' ? '/' : `/${text.toLowerCase()}`}
              >
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem>
          <ListItemButton>
            <Link
              className='text-center flex gap-2 justify-center bg-green-500 p-3 items-center rounded-md w-full'
              to='/cart'
            >
              <FaShoppingCart />
              Go to Cart
            </Link>
          </ListItemButton>
        </ListItem>
        {/* displays appropriate navbar links based on if the user is logged in or not */}
        <MobileNavBarAuthLinks />
      </List>
    </Box>
  );
  return list;
}
