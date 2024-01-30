import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileNav = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  const list = (
    <Box
      sx={{
        width: '50vw',
        backgroundColor: 'black',
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
      <List>
        {['Home', 'About', 'Vans'].map((text) => (
          <ListItem key={text}>
            <ListItemButton>
              <Link to={text.toLowerCase() === 'home' ? '/' : `/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <nav className={`mobile-nav-bar`}>
        <Drawer
          anchor='right'
          open={isOpen}
          onClose={toggleMobileNav(false)}
        >
          <div className='logo'>
            <h1 style={{ textAlign: 'center', background: 'black', color: 'white' }}>VanLife</h1>
          </div>
          {list}
        </Drawer>
      </nav>

      {!isOpen && (
        <IoIosMenu
          className={`menu-icon`}
          onClick={toggleMobileNav(true)}
        />
      )}
    </div>
  );
}
