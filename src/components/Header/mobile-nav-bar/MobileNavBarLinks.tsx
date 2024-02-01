import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import MobileNavBarAuthLinks from './MobileNavBarAuthLinks';
import { Link } from 'react-router-dom';

type MobileNavBarLinksProps = {
  toggleMobileNav: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export default function MobileNavBarLinks({ toggleMobileNav }: MobileNavBarLinksProps) {
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
        {['Home', 'About', 'Vans'].map((text) => (
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
        <MobileNavBarAuthLinks />
      </List>
    </Box>
  );
  return list;
}
